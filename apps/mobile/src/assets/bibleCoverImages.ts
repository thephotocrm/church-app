/**
 * Static require() map for all 66 Bible book cover images.
 * React Native requires static require() calls — each must be written explicitly.
 */

const BIBLE_COVER_IMAGES: Record<string, ReturnType<typeof require>> = {
  // Old Testament: Law
  GEN: require('../../assets/bible-covers/GEN.png'),
  EXO: require('../../assets/bible-covers/EXO.png'),
  LEV: require('../../assets/bible-covers/LEV.png'),
  NUM: require('../../assets/bible-covers/NUM.png'),
  DEU: require('../../assets/bible-covers/DEU.png'),

  // Old Testament: History
  JOS: require('../../assets/bible-covers/JOS.png'),
  JDG: require('../../assets/bible-covers/JDG.png'),
  RUT: require('../../assets/bible-covers/RUT.png'),
  '1SA': require('../../assets/bible-covers/1SA.png'),
  '2SA': require('../../assets/bible-covers/2SA.png'),
  '1KI': require('../../assets/bible-covers/1KI.png'),
  '2KI': require('../../assets/bible-covers/2KI.png'),
  '1CH': require('../../assets/bible-covers/1CH.png'),
  '2CH': require('../../assets/bible-covers/2CH.png'),
  EZR: require('../../assets/bible-covers/EZR.png'),
  NEH: require('../../assets/bible-covers/NEH.png'),
  EST: require('../../assets/bible-covers/EST.png'),

  // Old Testament: Poetry & Wisdom
  JOB: require('../../assets/bible-covers/JOB.png'),
  PSA: require('../../assets/bible-covers/PSA.png'),
  PRO: require('../../assets/bible-covers/PRO.png'),
  ECC: require('../../assets/bible-covers/ECC.png'),
  SNG: require('../../assets/bible-covers/SNG.png'),

  // Old Testament: Major Prophets
  ISA: require('../../assets/bible-covers/ISA.png'),
  JER: require('../../assets/bible-covers/JER.png'),
  LAM: require('../../assets/bible-covers/LAM.png'),
  EZK: require('../../assets/bible-covers/EZK.png'),
  DAN: require('../../assets/bible-covers/DAN.png'),

  // Old Testament: Minor Prophets
  HOS: require('../../assets/bible-covers/HOS.png'),
  JOL: require('../../assets/bible-covers/JOL.png'),
  AMO: require('../../assets/bible-covers/AMO.png'),
  OBA: require('../../assets/bible-covers/OBA.png'),
  JON: require('../../assets/bible-covers/JON.png'),
  MIC: require('../../assets/bible-covers/MIC.png'),
  NAM: require('../../assets/bible-covers/NAM.png'),
  HAB: require('../../assets/bible-covers/HAB.png'),
  ZEP: require('../../assets/bible-covers/ZEP.png'),
  HAG: require('../../assets/bible-covers/HAG.png'),
  ZEC: require('../../assets/bible-covers/ZEC.png'),
  MAL: require('../../assets/bible-covers/MAL.png'),

  // New Testament: Gospels
  MAT: require('../../assets/bible-covers/MAT.png'),
  MRK: require('../../assets/bible-covers/MRK.png'),
  LUK: require('../../assets/bible-covers/LUK.png'),
  JHN: require('../../assets/bible-covers/JHN.png'),

  // New Testament: History
  ACT: require('../../assets/bible-covers/ACT.png'),

  // New Testament: Paul's Letters
  ROM: require('../../assets/bible-covers/ROM.png'),
  '1CO': require('../../assets/bible-covers/1CO.png'),
  '2CO': require('../../assets/bible-covers/2CO.png'),
  GAL: require('../../assets/bible-covers/GAL.png'),
  EPH: require('../../assets/bible-covers/EPH.png'),
  PHP: require('../../assets/bible-covers/PHP.png'),
  COL: require('../../assets/bible-covers/COL.png'),
  '1TH': require('../../assets/bible-covers/1TH.png'),
  '2TH': require('../../assets/bible-covers/2TH.png'),
  '1TI': require('../../assets/bible-covers/1TI.png'),
  '2TI': require('../../assets/bible-covers/2TI.png'),
  TIT: require('../../assets/bible-covers/TIT.png'),
  PHM: require('../../assets/bible-covers/PHM.png'),

  // New Testament: General Letters
  HEB: require('../../assets/bible-covers/HEB.png'),
  JAS: require('../../assets/bible-covers/JAS.png'),
  '1PE': require('../../assets/bible-covers/1PE.png'),
  '2PE': require('../../assets/bible-covers/2PE.png'),
  '1JN': require('../../assets/bible-covers/1JN.png'),
  '2JN': require('../../assets/bible-covers/2JN.png'),
  '3JN': require('../../assets/bible-covers/3JN.png'),
  JUD: require('../../assets/bible-covers/JUD.png'),

  // New Testament: Prophecy
  REV: require('../../assets/bible-covers/REV.png'),
};

export default BIBLE_COVER_IMAGES;
