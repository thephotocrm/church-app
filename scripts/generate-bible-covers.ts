/**
 * generate-bible-covers.ts
 *
 * One-time script to generate AI-themed cover images for all 66 Bible books
 * using DALL-E 3 via the OpenAI API.
 *
 * Usage:
 *   OPENAI_API_KEY=sk-... npx ts-node scripts/generate-bible-covers.ts
 *
 * Images are saved to apps/mobile/assets/bible-covers/{BOOK_ID}.png
 * Already-generated images are skipped, so the script is resumable.
 */

import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import * as http from 'http';

const OUTPUT_DIR = path.resolve(__dirname, '../apps/mobile/assets/bible-covers');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const BOOK_PROMPTS: { id: string; name: string; prompt: string }[] = [
  // ── Old Testament: Law ──
  { id: 'GEN', name: 'Genesis', prompt: 'the creation of light bursting through primordial darkness, divine rays illuminating a newly formed earth with lush gardens and flowing rivers' },
  { id: 'EXO', name: 'Exodus', prompt: 'the parting of the Red Sea with towering walls of water on each side, a multitude of people walking through on dry ground under a dramatic sky' },
  { id: 'LEV', name: 'Leviticus', prompt: 'a sacred golden altar with incense smoke rising in a grand tabernacle interior, holy fire burning, draped curtains of blue and purple' },
  { id: 'NUM', name: 'Numbers', prompt: 'a vast encampment of ancient tents in the desert wilderness, twelve tribal banners waving, with a pillar of cloud above the central tabernacle' },
  { id: 'DEU', name: 'Deuteronomy', prompt: 'Moses standing atop Mount Nebo overlooking the promised land, a vast green valley stretching to the horizon under golden light' },

  // ── Old Testament: History ──
  { id: 'JOS', name: 'Joshua', prompt: 'the walls of Jericho crumbling and falling as trumpets sound, dust clouds rising, ancient stone city collapsing under divine power' },
  { id: 'JDG', name: 'Judges', prompt: 'Samson pushing apart two massive stone pillars of a Philistine temple, muscles straining, dramatic lighting from above' },
  { id: 'RUT', name: 'Ruth', prompt: 'a young woman gleaning wheat in golden harvest fields at sunset, sheaves of grain, a peaceful rural landscape in ancient Israel' },
  { id: '1SA', name: '1 Samuel', prompt: 'a young shepherd boy with a simple sling standing courageously in a wide valley, dramatic clouds overhead, ancient hills in the distance, faith and courage' },
  { id: '2SA', name: '2 Samuel', prompt: 'King David playing a golden harp on a palace rooftop overlooking ancient Jerusalem at twilight, the city glowing in warm light' },
  { id: '1KI', name: '1 Kings', prompt: 'the magnificent Temple of Solomon gleaming in gold and white stone, grand entrance pillars, priests in white robes, Jerusalem in the background' },
  { id: '2KI', name: '2 Kings', prompt: 'the prophet Elijah ascending to heaven in a chariot of fire with horses of flame, a whirlwind of light, his mantle falling to earth' },
  { id: '1CH', name: '1 Chronicles', prompt: 'a grand throne room with King David presenting architectural scrolls for the temple, golden vessels and sacred artifacts around him' },
  { id: '2CH', name: '2 Chronicles', prompt: 'the dedication of Solomon\'s temple with the glory cloud filling the interior, priests in awe, golden lampstands and sacred furnishings' },
  { id: 'EZR', name: 'Ezra', prompt: 'a caravan of exiles returning to Jerusalem across a desert landscape, carrying sacred vessels, the ruins of the temple visible on the distant hill' },
  { id: 'NEH', name: 'Nehemiah', prompt: 'workers rebuilding the ancient walls of Jerusalem, some with tools and some standing guard with swords, a half-built stone wall at sunrise' },
  { id: 'EST', name: 'Esther', prompt: 'a beautiful queen in royal robes and crown standing courageously before a golden throne in an opulent Persian palace hall' },

  // ── Old Testament: Poetry & Wisdom ──
  { id: 'JOB', name: 'Job', prompt: 'a lone man sitting among ashes and ruins under a stormy dramatic sky, a whirlwind forming in the clouds with divine light breaking through' },
  { id: 'PSA', name: 'Psalms', prompt: 'a golden harp resting on ancient stone beside still waters, a starry night sky reflected in the water, peaceful shepherd\'s landscape' },
  { id: 'PRO', name: 'Proverbs', prompt: 'an ancient scroll unfurling on a wooden desk surrounded by oil lamps, golden coins, and a balance scale, warm candlelight in a study' },
  { id: 'ECC', name: 'Ecclesiastes', prompt: 'a sundial casting long shadows in a fading garden, autumn leaves falling, an hourglass with sand nearly run out, contemplative twilight' },
  { id: 'SNG', name: 'Song of Solomon', prompt: 'a lush garden of roses, lilies, and pomegranates in full bloom, a vineyard on rolling hills, morning dew glistening, spring romance' },

  // ── Old Testament: Major Prophets ──
  { id: 'ISA', name: 'Isaiah', prompt: 'a majestic throne room vision with six-winged seraphim surrounding a throne of light, smoke filling the temple, holy and awe-inspiring' },
  { id: 'JER', name: 'Jeremiah', prompt: 'a weeping prophet standing before the burning city of Jerusalem, flames and smoke rising from the temple, tears on his face, sorrowful scene' },
  { id: 'LAM', name: 'Lamentations', prompt: 'the ruins of ancient Jerusalem smoldering at dawn, broken walls and scattered stones, a single figure mourning among the rubble' },
  { id: 'EZK', name: 'Ezekiel', prompt: 'a mystical vision of four living creatures with wings — lion, ox, eagle, and man — surrounded by spinning wheels of fire and eyes, heavenly light' },
  { id: 'DAN', name: 'Daniel', prompt: 'Daniel standing calmly in a den of lions that are peaceful around him, a shaft of divine light coming from above, ancient stone chamber' },

  // ── Old Testament: Minor Prophets ──
  { id: 'HOS', name: 'Hosea', prompt: 'a faithful husband reaching out his hand toward a distant figure in a field of wildflowers, symbolizing steadfast love, warm golden light' },
  { id: 'JOL', name: 'Joel', prompt: 'a dramatic sky with the sun turning dark and the moon blood red, a vast valley below, the spirit of God pouring out like rain from heaven' },
  { id: 'AMO', name: 'Amos', prompt: 'a humble shepherd with a staff standing before a grand palace, a plumb line hanging from heaven, justice scales in the sky, contrast of simple and grand' },
  { id: 'OBA', name: 'Obadiah', prompt: 'an eagle\'s nest perched on towering red rock cliffs being struck by lightning, a fortified mountain city crumbling, dramatic judgment scene' },
  { id: 'JON', name: 'Jonah', prompt: 'a man being cast from a ship into a stormy sea with a massive whale emerging from the deep waters, dramatic waves and lightning' },
  { id: 'MIC', name: 'Micah', prompt: 'a peaceful village of Bethlehem on a gentle hill at golden hour, farmers tending fertile fields with plows, olive trees and vineyards, warm hopeful light' },
  { id: 'NAM', name: 'Nahum', prompt: 'the mighty walls of ancient Nineveh being overwhelmed by a great flood, river waters breaking through gates, a falling empire' },
  { id: 'HAB', name: 'Habakkuk', prompt: 'a watchman standing on a stone watchtower at dawn, looking out over a troubled land, the first rays of sun breaking through storm clouds' },
  { id: 'ZEP', name: 'Zephaniah', prompt: 'a great day of reckoning — dark clouds covering the land, but a remnant of people gathered in a circle of protective light, contrast of judgment and hope' },
  { id: 'HAG', name: 'Haggai', prompt: 'workers laying foundation stones of a new temple, scaffolding and construction, the glory of the future temple shown as a golden vision above' },
  { id: 'ZEC', name: 'Zechariah', prompt: 'a golden lampstand with seven lamps flanked by two olive trees, angelic horsemen riding through misty mountains in the background' },
  { id: 'MAL', name: 'Malachi', prompt: 'a refiner\'s fire burning in a crucible of molten gold, a messenger figure approaching from the sunrise, the sun of righteousness rising with healing wings' },

  // ── New Testament: Gospels ──
  { id: 'MAT', name: 'Matthew', prompt: 'Jesus delivering the Sermon on the Mount to a crowd on a green hillside, arms outstretched, warm golden light, peaceful multitude listening' },
  { id: 'MRK', name: 'Mark', prompt: 'Jesus walking on water during a violent storm at night, reaching toward a sinking disciple, lightning illuminating turbulent waves, a boat tossed by wind' },
  { id: 'LUK', name: 'Luke', prompt: 'the nativity scene — a humble manger with a radiant baby, shepherds kneeling, a brilliant star shining above a simple stable in Bethlehem' },
  { id: 'JHN', name: 'John', prompt: 'a brilliant light shining in complete darkness, the Word made flesh, a divine luminous figure emerging from pure radiant light, cosmic and intimate' },

  // ── New Testament: History ──
  { id: 'ACT', name: 'Acts', prompt: 'tongues of fire descending on a group gathered in an upper room at Pentecost, wind swirling, faces filled with wonder, the Holy Spirit arriving' },

  // ── New Testament: Paul\'s Letters ──
  { id: 'ROM', name: 'Romans', prompt: 'an ancient Roman road stretching toward a distant cross on a hill, the road paved with golden stones, light breaking through clouds, themes of grace' },
  { id: '1CO', name: '1 Corinthians', prompt: 'a mosaic of diverse people forming one body, different hands and faces joined together like a living temple, unity in diversity, warm tones' },
  { id: '2CO', name: '2 Corinthians', prompt: 'a cracked clay jar with brilliant golden light pouring out through the cracks, treasure in earthen vessels, dark background, radiant hope' },
  { id: 'GAL', name: 'Galatians', prompt: 'broken chains falling from wrists into a field of freedom, a bird soaring upward into open sky, liberation from bondage, bright hopeful light' },
  { id: 'EPH', name: 'Ephesians', prompt: 'a warrior putting on gleaming spiritual armor — breastplate, shield, helmet, sword — standing firm on a rocky battlefield, divine light behind' },
  { id: 'PHP', name: 'Philippians', prompt: 'a joyful scene of a prisoner writing letters by candlelight in a Roman cell, chains on wrists but a radiant smile, joy despite circumstances' },
  { id: 'COL', name: 'Colossians', prompt: 'a majestic cosmic Christ figure — all creation held together, galaxies and stars swirling around a central figure of light, supremacy over all' },
  { id: '1TH', name: '1 Thessalonians', prompt: 'clouds parting with a trumpet sounding from heaven, believers rising upward toward brilliant light, the return of Christ, hope and anticipation' },
  { id: '2TH', name: '2 Thessalonians', prompt: 'a watchful community standing firm with lamps lit in the night, looking toward the eastern horizon at dawn, patient endurance, flickering flames' },
  { id: '1TI', name: '1 Timothy', prompt: 'a young pastor receiving a torch of flame from an elder\'s hand, a congregation gathered in an early church setting, passing the faith' },
  { id: '2TI', name: '2 Timothy', prompt: 'an aging apostle writing his final letter by lamplight in a cold Roman dungeon, scrolls and parchments around him, determined and faithful' },
  { id: 'TIT', name: 'Titus', prompt: 'a Mediterranean island coastline with a young church leader organizing communities, whitewashed buildings, blue sea, orderly and beautiful' },
  { id: 'PHM', name: 'Philemon', prompt: 'two men embracing in reconciliation — a master and a returning servant — in the doorway of a Roman house, warm light, forgiveness and brotherhood' },

  // ── New Testament: General Letters ──
  { id: 'HEB', name: 'Hebrews', prompt: 'the heavenly tabernacle — a grand celestial temple beyond the veil, golden and ethereal, the ultimate high priest entering the holy of holies in glory' },
  { id: 'JAS', name: 'James', prompt: 'a pair of working hands — one holding a hammer and one reaching to help someone up — faith and works together, earthy and practical, warm tones' },
  { id: '1PE', name: '1 Peter', prompt: 'a cornerstone being laid with living stones building upward into a spiritual house, scattered believers gathering like precious gems, hope amid trial' },
  { id: '2PE', name: '2 Peter', prompt: 'a mountain peak at the moment of transfiguration — blinding white light, a divine voice from a luminous cloud, awe-struck witnesses falling to their knees' },
  { id: '1JN', name: '1 John', prompt: 'pure warm light flooding through darkness, a heart glowing with love, simple and profound, the message that God is light and God is love' },
  { id: '2JN', name: '2 John', prompt: 'a sealed letter with a wax stamp being carried along an ancient path between two small churches, truth and love, intimate and personal' },
  { id: '3JN', name: '3 John', prompt: 'a traveler being welcomed at the door of a home with open arms and a set table, hospitality and generosity, warm inviting lamplight' },
  { id: 'JUD', name: 'Jude', prompt: 'the archangel Michael contending in dramatic spiritual battle, fierce winds and heavenly fire, defending the faith, powerful and urgent' },

  // ── New Testament: Prophecy ──
  { id: 'REV', name: 'Revelation', prompt: 'the heavenly throne room — a glorious throne with a rainbow like an emerald, four living creatures, twenty-four elders in white, seven blazing torches, a crystal sea, the Lamb standing as if slain' },
];

const STYLE_SUFFIX = '. Oil painting style with rich warm tones, dramatic lighting, highly detailed, cinematic composition. No text, no words, no letters, no writing of any kind in the image.';

const DELAY_MS = 2000; // Delay between API calls to respect rate limits

async function downloadImage(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const get = url.startsWith('https') ? https.get : http.get;
    get(url, (response) => {
      // Follow redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          downloadImage(redirectUrl, dest).then(resolve).catch(reject);
          return;
        }
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {}); // Clean up partial file
      reject(err);
    });
  });
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('Error: OPENAI_API_KEY environment variable is required.');
    console.error('Usage: OPENAI_API_KEY=sk-... npx ts-node scripts/generate-bible-covers.ts');
    process.exit(1);
  }

  const openai = new OpenAI({ apiKey });

  console.log(`Generating Bible book covers...`);
  console.log(`Output directory: ${OUTPUT_DIR}`);
  console.log(`Total books: ${BOOK_PROMPTS.length}\n`);

  let generated = 0;
  let skipped = 0;

  for (const book of BOOK_PROMPTS) {
    const outputPath = path.join(OUTPUT_DIR, `${book.id}.png`);

    // Skip if already generated
    if (fs.existsSync(outputPath)) {
      console.log(`  ✓ ${book.id} (${book.name}) — already exists, skipping`);
      skipped++;
      continue;
    }

    const fullPrompt = `A biblical scene depicting ${book.prompt}${STYLE_SUFFIX}`;

    console.log(`  ⏳ ${book.id} (${book.name}) — generating...`);

    try {
      const response = await openai.images.generate({
        model: 'dall-e-3',
        prompt: fullPrompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard',
        response_format: 'url',
      });

      const imageUrl = response.data[0]?.url;
      if (!imageUrl) {
        console.error(`  ✗ ${book.id} — no image URL in response`);
        continue;
      }

      await downloadImage(imageUrl, outputPath);
      generated++;
      console.log(`  ✓ ${book.id} (${book.name}) — saved`);

      // Rate limit delay
      await sleep(DELAY_MS);
    } catch (err: any) {
      console.error(`  ✗ ${book.id} (${book.name}) — error: ${err.message ?? err}`);
      // Continue with next book
    }
  }

  console.log(`\nDone! Generated: ${generated}, Skipped: ${skipped}, Total: ${BOOK_PROMPTS.length}`);
}

main();
