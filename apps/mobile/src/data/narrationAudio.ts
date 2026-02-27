/**
 * Static require() map for narration audio files.
 * React Native requires static require() calls — each must be written explicitly.
 *
 * Keyed by lessonId, then by filename.
 */

const NARRATION_AUDIO: Record<string, Record<string, number>> = {
  'aih-1': {
    '00-intro.mp3': require('../../assets/narration/aih-1/00-intro.mp3'),
    '01-opening_thought.mp3': require('../../assets/narration/aih-1/01-opening_thought.mp3'),
    '02-primary_scripture.mp3': require('../../assets/narration/aih-1/02-primary_scripture.mp3'),
    '03-supporting_scripture_0.mp3': require('../../assets/narration/aih-1/03-supporting_scripture_0.mp3'),
    '04-supporting_scripture_1.mp3': require('../../assets/narration/aih-1/04-supporting_scripture_1.mp3'),
    '05-content_0.mp3': require('../../assets/narration/aih-1/05-content_0.mp3'),
    '06-content_1.mp3': require('../../assets/narration/aih-1/06-content_1.mp3'),
    '07-content_2.mp3': require('../../assets/narration/aih-1/07-content_2.mp3'),
    '08-content_3.mp3': require('../../assets/narration/aih-1/08-content_3.mp3'),
    '09-content_4.mp3': require('../../assets/narration/aih-1/09-content_4.mp3'),
    '10-word_study_0.mp3': require('../../assets/narration/aih-1/10-word_study_0.mp3'),
    '11-word_study_1.mp3': require('../../assets/narration/aih-1/11-word_study_1.mp3'),
    '12-key_insight.mp3': require('../../assets/narration/aih-1/12-key_insight.mp3'),
    '13-reflection_question_0.mp3': require('../../assets/narration/aih-1/13-reflection_question_0.mp3'),
    '14-reflection_question_1.mp3': require('../../assets/narration/aih-1/14-reflection_question_1.mp3'),
    '15-reflection_question_2.mp3': require('../../assets/narration/aih-1/15-reflection_question_2.mp3'),
  },
};

export default NARRATION_AUDIO;
