/**
 * generate-lesson-narration.ts
 *
 * Generates TTS audio narration for guided study lessons using OpenAI TTS API.
 * Currently targets lesson aih-1 ("Adorned with Godliness") as a proof of concept.
 *
 * Usage:
 *   OPENAI_API_KEY=sk-... npx tsx scripts/generate-lesson-narration.ts
 *
 * Audio files are saved to apps/mobile/assets/narration/{lessonId}/{nn}-{type}.mp3
 * Already-generated files are skipped, so the script is resumable.
 * After generation, narrationManifest.ts and narrationAudio.ts are updated.
 */

import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';
import { GUIDED_STUDIES } from '../apps/mobile/src/data/bibleStudies';
import type { StudyLesson } from '../apps/mobile/src/data/bibleStudies';
import type { SegmentType, WordTiming } from '../apps/mobile/src/data/narrationManifest';

// ── Config ──────────────────────────────────────────────────────────────────

const VOICE = 'nova' as const;  // female voice for Adorned in Holiness
const MODEL = 'tts-1-hd' as const;
const SPEED = 0.95;
const DELAY_MS = 1500; // delay between API calls for rate limits

const ASSETS_BASE = path.resolve(__dirname, '../apps/mobile/assets/narration');
const DATA_DIR = path.resolve(__dirname, '../apps/mobile/src/data');

/** Lessons to generate narration for */
const TARGET_LESSON_IDS = ['aih-1'];

// ── Helpers ─────────────────────────────────────────────────────────────────

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Get MP3 duration in milliseconds using a rough CBR estimate (good enough for manifest) */
function estimateMp3DurationMs(filePath: string): number {
  const stats = fs.statSync(filePath);
  const fileSizeBytes = stats.size;
  // tts-1-hd outputs ~48kbps MP3 on average at speed 0.95
  // More accurate: use the file bitrate. Rough estimate: 48kbps = 6000 bytes/sec
  const bytesPerSecond = 6000;
  return Math.round((fileSizeBytes / bytesPerSecond) * 1000);
}

interface SegmentDef {
  type: SegmentType;
  index: number;
  filename: string;
  text: string;
  /** Number of leading transition words in `text` that aren't displayed on screen */
  transitionWordCount: number;
}

interface GeneratedSegment {
  type: SegmentType;
  index: number;
  filename: string;
  durationMs: number;
  words: WordTiming[];
  displayStartMs: number;
}

/** Count words in a string (simple whitespace split) */
function countWords(s: string): number {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

/** Build the ordered segment list for a lesson — order must match StudyLessonView */
function buildSegments(lesson: StudyLesson, studyTitle: string): SegmentDef[] {
  const segments: SegmentDef[] = [];
  let seqNum = 0;

  const pad = (n: number) => String(n).padStart(2, '0');
  const title = lesson.title; // e.g. "Adorned with Godliness"
  const subtitle = lesson.subtitle; // e.g. "The Biblical Call to Modesty"

  // 0: Intro — plays over hero header, no display text
  const introText = `Welcome to lesson ${lesson.number} of ${studyTitle}. ${title} — ${subtitle}. Let's begin.`;
  segments.push({
    type: 'intro',
    index: 0,
    filename: `${pad(seqNum++)}-intro.mp3`,
    text: introText,
    transitionWordCount: countWords(introText), // entire text is spoken-only, no display text
  });

  // 1: Opening thought — natural opening, no transition needed
  segments.push({
    type: 'opening_thought',
    index: 0,
    filename: `${pad(seqNum++)}-opening_thought.mp3`,
    text: lesson.openingThought,
    transitionWordCount: 0,
  });

  // 2: Primary scripture
  const primary = lesson.scriptures.find((s) => s.isPrimary);
  if (primary) {
    const transition = `Let's turn to our primary passage for today's study on ${subtitle}. ${primary.reference}. ...`;
    segments.push({
      type: 'primary_scripture',
      index: 0,
      filename: `${pad(seqNum++)}-primary_scripture.mp3`,
      text: `${transition} ${primary.text}`,
      transitionWordCount: countWords(transition),
    });
  }

  // 3–4: Supporting scriptures
  const supporting = lesson.scriptures.filter((s) => !s.isPrimary);
  supporting.forEach((s, i) => {
    const transition =
      i === 0
        ? `Now let's look at a supporting passage that sheds more light on this theme. ${s.reference}. ...`
        : `And another passage to consider. ${s.reference}. ...`;

    segments.push({
      type: 'supporting_scripture',
      index: i,
      filename: `${pad(seqNum++)}-supporting_scripture_${i}.mp3`,
      text: `${transition} ${s.text}`,
      transitionWordCount: countWords(transition),
    });
  });

  // 5–9: Content paragraphs
  lesson.content.forEach((paragraph, i) => {
    const transition =
      i === 0
        ? `Now, let's walk through this passage together and unpack what Scripture is teaching us about ${subtitle.toLowerCase()}. ...`
        : '';

    const text = transition ? `${transition} ${paragraph}` : paragraph;

    segments.push({
      type: 'content',
      index: i,
      filename: `${pad(seqNum++)}-content_${i}.mp3`,
      text,
      transitionWordCount: transition ? countWords(transition) : 0,
    });
  });

  // 10–11: Word studies (use transliteration/pronunciation/meaning/explanation, NOT original chars)
  lesson.wordStudies.forEach((ws, i) => {
    const transition =
      i === 0
        ? `Let's dig deeper into the original language behind this passage. Our first word study: ${ws.transliteration}.`
        : `Our next word study: ${ws.transliteration}.`;

    const displayText = [
      `Pronounced ${ws.pronunciation}.`,
      `A ${ws.language} word meaning: ${ws.meaning}.`,
      ws.explanation,
    ].join(' ');

    segments.push({
      type: 'word_study',
      index: i,
      filename: `${pad(seqNum++)}-word_study_${i}.mp3`,
      text: `${transition} ${displayText}`,
      transitionWordCount: countWords(transition),
    });
  });

  // 12: Key insight
  const keyInsightTransition = `Here's the key insight from today's lesson on "${title}". ...`;
  segments.push({
    type: 'key_insight',
    index: 0,
    filename: `${pad(seqNum++)}-key_insight.mp3`,
    text: `${keyInsightTransition} ${lesson.keyInsight}`,
    transitionWordCount: countWords(keyInsightTransition),
  });

  // 13–15: Reflection questions
  lesson.reflectionQuestions.forEach((q, i) => {
    const transition =
      i === 0
        ? `Now, let's take a moment to reflect on what we've studied. ... Question one.`
        : `Question ${q.number}.`;

    segments.push({
      type: 'reflection_question',
      index: i,
      filename: `${pad(seqNum++)}-reflection_question_${i}.mp3`,
      text: `${transition} ${q.question}`,
      transitionWordCount: countWords(transition),
    });
  });

  return segments;
}

// ── Whisper word timestamps ──────────────────────────────────────────────────

async function getWordTimestamps(
  openai: OpenAI,
  mp3Path: string,
  transitionWordCount: number,
): Promise<{ words: WordTiming[]; displayStartMs: number }> {
  console.log(`    🎙 Running Whisper on ${path.basename(mp3Path)}...`);

  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(mp3Path),
    model: 'whisper-1',
    response_format: 'verbose_json',
    timestamp_granularities: ['word'],
  });

  const allWords = (transcription as any).words as Array<{
    word: string;
    start: number;
    end: number;
  }> ?? [];

  if (transitionWordCount >= allWords.length) {
    // Entire audio is transition (e.g. intro segment) — no display words
    return { words: [], displayStartMs: 0 };
  }

  const displayStartMs =
    transitionWordCount > 0
      ? Math.round(allWords[transitionWordCount].start * 1000)
      : 0;

  const displayWords: WordTiming[] = allWords
    .slice(transitionWordCount)
    .map((w) => ({
      word: w.word,
      start: w.start,
      end: w.end,
    }));

  return { words: displayWords, displayStartMs };
}

// ── File writers ─────────────────────────────────────────────────────────────

function writeNarrationAudio(lessons: Record<string, GeneratedSegment[]>) {
  const lessonEntries = Object.entries(lessons)
    .map(([id, segments]) => {
      const lines = segments
        .map(
          (s) =>
            `    '${s.filename}': require('../../assets/narration/${id}/${s.filename}')`,
        )
        .join(',\n');

      return `  '${id}': {\n${lines},\n  }`;
    })
    .join(',\n');

  const content = `/**
 * Static require() map for narration audio files.
 * React Native requires static require() calls — each must be written explicitly.
 *
 * Keyed by lessonId, then by filename.
 */

const NARRATION_AUDIO: Record<string, Record<string, number>> = {
${lessonEntries},
};

export default NARRATION_AUDIO;
`;

  const outPath = path.join(DATA_DIR, 'narrationAudio.ts');
  fs.writeFileSync(outPath, content, 'utf-8');
  console.log(`  narrationAudio.ts written to ${outPath}`);
}

function writeManifest(lessons: Record<string, { lessonId: string; segments: GeneratedSegment[]; totalDurationMs: number }>) {
  const entries = Object.entries(lessons)
    .map(([id, narration]) => {
      const segmentsStr = narration.segments
        .map((s) => {
          const wordsJson = JSON.stringify(s.words);
          return `      { type: '${s.type}', index: ${s.index}, source: NARRATION_AUDIO['${id}']['${s.filename}'], durationMs: ${s.durationMs}, words: ${wordsJson}, displayStartMs: ${s.displayStartMs} }`;
        })
        .join(',\n');

      return `  '${id}': {\n    lessonId: '${id}',\n    segments: [\n${segmentsStr},\n    ],\n    totalDurationMs: ${narration.totalDurationMs},\n  }`;
    })
    .join(',\n');

  const content = `/**
 * Narration manifest for guided study lessons.
 *
 * Populated by scripts/generate-lesson-narration.ts after running OpenAI TTS.
 * The segment order must match both the generation script and
 * StudyLessonView's segment mapping.
 */

import NARRATION_AUDIO from './narrationAudio';

export type SegmentType =
  | 'intro'
  | 'opening_thought'
  | 'primary_scripture'
  | 'supporting_scripture'
  | 'content'
  | 'word_study'
  | 'key_insight'
  | 'reflection_question';

export interface WordTiming {
  word: string;
  start: number; // seconds from segment audio start
  end: number;   // seconds from segment audio start
}

export interface NarrationSegment {
  type: SegmentType;
  /** Index within its type group (e.g. content[0], content[1]) */
  index: number;
  /** Local asset source (return value of require()) */
  source: number;
  /** Duration of this segment in milliseconds */
  durationMs: number;
  /** Per-word timestamps for display text only (empty for intro) */
  words: WordTiming[];
  /** Millisecond offset where displayed text begins in the audio (after spoken transition) */
  displayStartMs: number;
}

export interface LessonNarration {
  lessonId: string;
  segments: NarrationSegment[];
  totalDurationMs: number;
}

/**
 * Keyed by lessonId. Populated by the generation script.
 */
export const NARRATION_MANIFEST: Record<string, LessonNarration> = {
${entries},
};
`;

  const outPath = path.join(DATA_DIR, 'narrationManifest.ts');
  fs.writeFileSync(outPath, content, 'utf-8');
  console.log(`  narrationManifest.ts written to ${outPath}`);
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('Error: OPENAI_API_KEY environment variable is required.');
    console.error(
      'Usage: OPENAI_API_KEY=sk-... npx tsx scripts/generate-lesson-narration.ts',
    );
    process.exit(1);
  }

  const openai = new OpenAI({ apiKey });
  const allSegments: Record<string, GeneratedSegment[]> = {};
  const allNarrations: Record<string, { lessonId: string; segments: GeneratedSegment[]; totalDurationMs: number }> = {};

  for (const lessonId of TARGET_LESSON_IDS) {
    // Find the lesson and its parent study
    let lesson: StudyLesson | undefined;
    let studyTitle = '';
    for (const study of GUIDED_STUDIES) {
      lesson = study.lessons.find((l) => l.id === lessonId);
      if (lesson) {
        studyTitle = study.title;
        break;
      }
    }

    if (!lesson) {
      console.error(`Lesson ${lessonId} not found in GUIDED_STUDIES.`);
      continue;
    }

    const outputDir = path.join(ASSETS_BASE, lessonId);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log(`\n  Generating narration for "${lesson.title}" (${lessonId})`);

    const segmentDefs = buildSegments(lesson, studyTitle);
    console.log(`  Total segments: ${segmentDefs.length}\n`);

    const manifestSegments: GeneratedSegment[] = [];
    let generated = 0;
    let skipped = 0;

    // Phase 1: Generate TTS audio for each segment
    for (const seg of segmentDefs) {
      const outputPath = path.join(outputDir, seg.filename);

      // Resumability: skip if file already exists
      if (fs.existsSync(outputPath)) {
        console.log(`  ✓ ${seg.filename} — already exists, skipping`);
        skipped++;
        continue;
      }

      console.log(`  ⏳ ${seg.filename} — generating TTS...`);

      try {
        const response = await openai.audio.speech.create({
          model: MODEL,
          voice: VOICE,
          input: seg.text,
          speed: SPEED,
          response_format: 'mp3',
        });

        const buffer = Buffer.from(await response.arrayBuffer());
        fs.writeFileSync(outputPath, buffer);
        generated++;
        console.log(`  ✓ ${seg.filename} — saved (${(buffer.length / 1024).toFixed(1)} KB)`);

        await sleep(DELAY_MS);
      } catch (err: any) {
        console.error(`  ✗ ${seg.filename} — error: ${err.message ?? err}`);
      }
    }

    // Phase 2: Run Whisper on all segment MP3s for word timestamps
    console.log(`\n  Running Whisper for word timestamps...`);
    for (const seg of segmentDefs) {
      const outputPath = path.join(outputDir, seg.filename);
      if (!fs.existsSync(outputPath)) {
        console.error(`  ✗ ${seg.filename} — MP3 missing, skipping Whisper`);
        continue;
      }

      const durationMs = estimateMp3DurationMs(outputPath);

      try {
        const { words, displayStartMs } = await getWordTimestamps(
          openai,
          outputPath,
          seg.transitionWordCount,
        );

        manifestSegments.push({
          type: seg.type,
          index: seg.index,
          filename: seg.filename,
          durationMs,
          words,
          displayStartMs,
        });

        await sleep(DELAY_MS);
      } catch (err: any) {
        console.error(`  ✗ Whisper error for ${seg.filename}: ${err.message ?? err}`);
        // Still add segment without word data
        manifestSegments.push({
          type: seg.type,
          index: seg.index,
          filename: seg.filename,
          durationMs,
          words: [],
          displayStartMs: 0,
        });
      }
    }

    const totalDurationMs = manifestSegments.reduce((sum, s) => sum + s.durationMs, 0);
    allSegments[lessonId] = manifestSegments;
    allNarrations[lessonId] = {
      lessonId,
      segments: manifestSegments,
      totalDurationMs,
    };

    console.log(
      `\n  ${lessonId}: Generated ${generated}, Skipped ${skipped}, Total ${segmentDefs.length}`,
    );
    console.log(
      `  Estimated total duration: ${(totalDurationMs / 1000 / 60).toFixed(1)} min`,
    );
  }

  // Write both output files
  writeNarrationAudio(allSegments);
  writeManifest(allNarrations);
  console.log('\nDone!');
}

main();
