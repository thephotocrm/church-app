// ── Types ─────────────────────────────────────────────────
export interface WordStudy {
  original: string;
  transliteration: string;
  pronunciation: string;
  language: 'Greek' | 'Hebrew';
  meaning: string;
  explanation: string;
}

export interface ScripturePassage {
  reference: string;
  text: string;
  isPrimary: boolean;
}

export interface ReflectionQuestion {
  number: number;
  question: string;
}

export interface StudyLesson {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  openingThought: string;
  scriptures: ScripturePassage[];
  content: string[];
  wordStudies: WordStudy[];
  keyInsight: string;
  reflectionQuestions: ReflectionQuestion[];
}

export interface GuidedStudy {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  lessonCount: number;
  gradient: [string, string];
  accent: string;
  lessons: StudyLesson[];
}

export interface StudyProgress {
  studyId: string;
  completedLessons: string[];
  lastAccessedLessonId: string | null;
}

// ── Study: The One True God ───────────────────────────────
const THE_ONE_TRUE_GOD: GuidedStudy = {
  id: 'one-true-god',
  title: 'The One True God',
  subtitle: 'Jesus is God manifested in the flesh',
  description:
    'A deep dive into the Oneness of God as revealed in Scripture. Explore the majesty of the one God who revealed Himself in flesh as Jesus Christ.',
  lessonCount: 6,
  gradient: ['#1e3a8a', '#7c3aed'],
  accent: '#a78bfa',
  lessons: [
    // ── Lesson 1 ──────────────────────────────────────────
    {
      id: 'otg-1',
      number: 1,
      title: '"Hear, O Israel"',
      subtitle: 'The Foundation of Monotheism',
      openingThought:
        'Before there was a universe, before there was time itself, there was One — not three, not many, but One. Every breath of Scripture begins and ends with this singular truth: "The LORD our God is one LORD."',
      scriptures: [
        {
          reference: 'Deuteronomy 6:4',
          text: 'Hear, O Israel: The LORD our God is one LORD.',
          isPrimary: true,
        },
        {
          reference: 'Mark 12:29',
          text: 'And Jesus answered him, The first of all the commandments is, Hear, O Israel; The Lord our God is one Lord.',
          isPrimary: false,
        },
        {
          reference: 'Isaiah 44:6',
          text: 'Thus saith the LORD the King of Israel, and his redeemer the LORD of hosts; I am the first, and I am the last; and beside me there is no God.',
          isPrimary: false,
        },
      ],
      content: [
        'The Shema of Deuteronomy 6:4 is the cornerstone of all biblical theology. In the original Hebrew, Moses declared to Israel a truth that would echo through every generation: "Shema Yisrael, Adonai Eloheinu, Adonai Echad." This was not merely a theological proposition — it was the foundational confession of God\'s covenant people.',
        'When a scribe asked Jesus which commandment was the greatest, He did not point to a new revelation. He reached back into the heart of the Torah and quoted the Shema. Jesus Himself, standing in human flesh, affirmed absolute monotheism. The God of Abraham, Isaac, and Jacob is one Lord — not a council of divine beings, but one indivisible Spirit.',
        'Isaiah thunders this truth with breathtaking clarity. God declares that He is the first and the last, and beside Him there is no God. He does not share His throne, His glory, or His identity. He is the King of Israel and the Redeemer — both roles fulfilled in one Person.',
        'This is where our study begins: with the unshakable foundation that there is only one God. Every revelation that follows — the incarnation, the name of Jesus, the fullness of the Godhead — builds upon this bedrock. If we get this wrong, we get everything wrong. But if we anchor ourselves here, everything else falls beautifully into place.',
      ],
      wordStudies: [
        {
          original: 'אֶחָד',
          transliteration: 'echad',
          pronunciation: 'eh-KHAHD',
          language: 'Hebrew',
          meaning: 'One; united; alone; only one',
          explanation:
            'Echad is the Hebrew word for "one" used in the Shema. It is an absolute numeral meaning one in quantity. While some suggest it implies a compound unity, in this context it emphatically declares that God is numerically one — there is no other beside Him.',
        },
        {
          original: 'εἷς',
          transliteration: 'heis',
          pronunciation: 'hice',
          language: 'Greek',
          meaning: 'One; single; only',
          explanation:
            'When Jesus quoted the Shema in Mark 12:29, the Greek text uses heis — the cardinal number "one." It is the most basic, unambiguous expression of singularity in the Greek language, reinforcing the absolute oneness proclaimed in the Hebrew original.',
        },
      ],
      keyInsight:
        'Jesus Himself — standing in human form — affirmed absolute monotheism by quoting the Shema. The One who would be revealed as God in flesh first established that there is only one God. This is not a contradiction; it is a revelation.',
      reflectionQuestions: [
        { number: 1, question: 'Why is absolute monotheism the essential starting point for understanding who Jesus is?' },
        { number: 2, question: 'How does Isaiah 44:6 challenge the idea that there are multiple divine persons sharing the Godhead?' },
        { number: 3, question: 'What does it mean for your daily worship that the God you serve is not one among many, but the only God?' },
      ],
    },

    // ── Lesson 2 ──────────────────────────────────────────
    {
      id: 'otg-2',
      number: 2,
      title: '"The Word Made Flesh"',
      subtitle: 'God Enters Creation',
      openingThought:
        'The eternal, invisible God — too vast for the heavens to contain — chose to wrap Himself in flesh and dwell among His own creation. Not a second god, not an emanation, but God Himself, stepping into time.',
      scriptures: [
        {
          reference: 'John 1:1, 14',
          text: 'In the beginning was the Word, and the Word was with God, and the Word was God. And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth.',
          isPrimary: true,
        },
        {
          reference: '1 Timothy 3:16',
          text: 'And without controversy great is the mystery of godliness: God was manifest in the flesh, justified in the Spirit, seen of angels, preached unto the Gentiles, believed on in the world, received up into glory.',
          isPrimary: false,
        },
      ],
      content: [
        'John opens his gospel with one of the most profound declarations in all of Scripture. "In the beginning was the Word" — the Logos, the self-expression of God — and this Word "was God." Not a separate being alongside God, but God\'s own eternal thought, plan, and self-revelation. The Word was not a second person talking to God; the Word was God.',
        'Then comes the pivot point of human history: "The Word was made flesh." The God who spoke the universe into existence chose to speak Himself into humanity. This is the incarnation — not God sending someone else, but God Himself clothing His Spirit in human nature. The Creator entered His own creation.',
        'Paul crystallizes this in 1 Timothy 3:16 with stunning directness: "God was manifest in the flesh." The word "manifest" — phaneroō in Greek — means to make visible what was previously invisible. God did not change His nature; He revealed it in a way human eyes could see and human hands could touch.',
        'This is the great mystery of godliness. Not that a second divine person became human, but that the one indivisible God took upon Himself a genuine human nature. Jesus is not half God and half man — He is the fullness of God expressed through authentic humanity. In Him, the invisible became visible, the eternal entered time, and the Almighty was held in a mother\'s arms.',
      ],
      wordStudies: [
        {
          original: 'λόγος',
          transliteration: 'logos',
          pronunciation: 'LOH-gos',
          language: 'Greek',
          meaning: 'Word; reason; expression; plan',
          explanation:
            'Logos in John 1 refers to God\'s self-expression — His eternal thought, plan, and communication. In Greek philosophy, logos meant the rational principle governing the universe. John takes this concept and reveals its true identity: God\'s own self-expression, which was with God and was God, and which became flesh in Jesus Christ.',
        },
        {
          original: 'φανερόω',
          transliteration: 'phaneroō',
          pronunciation: 'fan-er-OH-oh',
          language: 'Greek',
          meaning: 'To make visible; to reveal; to manifest',
          explanation:
            'Used in 1 Timothy 3:16, phaneroō describes the incarnation as God making Himself visible. The invisible God did not send a representative — He Himself was manifested. The same God who is Spirit (John 4:24) took on flesh so that humanity could behold Him face to face.',
        },
      ],
      keyInsight:
        '"God was manifest in the flesh" does not mean God sent someone else to represent Him. It means the one God Himself — in all His fullness — was revealed in the human person of Jesus Christ. The incarnation is God\'s self-revelation, not a delegation.',
      reflectionQuestions: [
        { number: 1, question: 'What does it mean for your faith that God Himself — not an angel or a lesser being — became flesh for your salvation?' },
        { number: 2, question: 'How does understanding the Logos as God\'s self-expression change the way you read John 1:1?' },
        { number: 3, question: 'Why does Paul call the incarnation "the mystery of godliness" rather than simply a historical event?' },
      ],
    },

    // ── Lesson 3 ──────────────────────────────────────────
    {
      id: 'otg-3',
      number: 3,
      title: '"The Fullness of the Godhead"',
      subtitle: 'All of God in Christ',
      openingThought:
        'What if everything God is — every attribute, every perfection, every dimension of His infinite being — dwells completely in one Man? That is exactly what Scripture declares about Jesus Christ.',
      scriptures: [
        {
          reference: 'Colossians 2:9-10',
          text: 'For in him dwelleth all the fulness of the Godhead bodily. And ye are complete in him, which is the head of all principality and power.',
          isPrimary: true,
        },
        {
          reference: 'Colossians 1:15-19',
          text: 'Who is the image of the invisible God, the firstborn of every creature: For by him were all things created, that are in heaven, and that are in earth, visible and invisible, whether they be thrones, or dominions, or principalities, or powers: all things were created by him, and for him: And he is before all things, and by him all things consist. And he is the head of the body, the church: who is the beginning, the firstborn from the dead; that in all things he might have the preeminence. For it pleased the Father that in him should all fulness dwell.',
          isPrimary: false,
        },
      ],
      content: [
        'Colossians 2:9 is one of the most theologically precise verses in the New Testament. Paul writes that in Jesus dwells "all the fulness of the Godhead bodily." Every word carries immense weight. "All" — not some, not a portion. "Fulness" — not a representation or reflection, but the complete totality. "Godhead" — the very essence and nature of deity. "Bodily" — in a physical, human body.',
        'This is not figurative language. Paul uses the Greek word theotēs, which means the very essence of deity — not merely divine qualities or attributes, but deity itself in its absolute fullness. Jesus is not merely godly or god-like. He is God — completely, fully, and without remainder.',
        'In Colossians 1:15-19, Paul builds this argument with breathtaking scope. Jesus is the image of the invisible God. He is the Creator of all things — visible and invisible, thrones and dominions. He is before all things. All things consist — hold together — in Him. And it pleased the Father that in Him all fullness should dwell.',
        'The practical implication is staggering: "Ye are complete in Him." If all the fullness of God dwells in Christ, then when you have Christ, you have everything. You do not need to seek God anywhere else. You do not need an additional mediator, an additional revelation, or an additional source of divine power. Jesus is the full and final expression of everything God is.',
      ],
      wordStudies: [
        {
          original: 'θεότης',
          transliteration: 'theotēs',
          pronunciation: 'theh-OH-tace',
          language: 'Greek',
          meaning: 'Deity; the state of being God; divine essence',
          explanation:
            'Theotēs in Colossians 2:9 is distinct from theiotēs (divine quality or attribute). Theotēs means deity itself — the absolute, unqualified essence of God. Paul is not saying Jesus has divine qualities; he is saying the full being of God resides in Christ bodily.',
        },
        {
          original: 'εἰκών',
          transliteration: 'eikōn',
          pronunciation: 'eye-KONE',
          language: 'Greek',
          meaning: 'Image; exact representation; visible expression',
          explanation:
            'Used in Colossians 1:15, eikōn means far more than a mere likeness or shadow. It refers to an exact, visible representation of an invisible reality. Jesus is not a partial reflection of God — He is the precise, tangible, full-color portrait of the invisible God.',
        },
      ],
      keyInsight:
        'The word Paul uses is theotēs — not "divine quality" but "deity itself." This is not poetry. It is a doctrinal declaration: everything that makes God God is fully present in the bodily person of Jesus Christ.',
      reflectionQuestions: [
        { number: 1, question: 'If all the fullness of God dwells in Jesus, what does that say about looking for God outside of Christ?' },
        { number: 2, question: 'How does the truth that "ye are complete in Him" affect the way you approach your relationship with God?' },
        { number: 3, question: 'Why is it significant that Paul says the fullness dwells in Christ "bodily" — in a physical human body?' },
      ],
    },

    // ── Lesson 4 ──────────────────────────────────────────
    {
      id: 'otg-4',
      number: 4,
      title: '"The Name Above Every Name"',
      subtitle: 'The Authority of Jesus',
      openingThought:
        'A name in Scripture is far more than a label — it carries the identity, authority, and character of the one who bears it. When God chose a name for His revelation in flesh, He chose the name that would be above every other name.',
      scriptures: [
        {
          reference: 'Philippians 2:9-11',
          text: 'Wherefore God also hath highly exalted him, and given him a name which is above every name: That at the name of Jesus every knee should bow, of things in heaven, and things in earth, and things under the earth; And that every tongue should confess that Jesus Christ is Lord, to the glory of God the Father.',
          isPrimary: true,
        },
        {
          reference: 'Acts 2:38',
          text: 'Then Peter said unto them, Repent, and be baptized every one of you in the name of Jesus Christ for the remission of sins, and ye shall receive the gift of the Holy Ghost.',
          isPrimary: false,
        },
        {
          reference: 'Acts 4:12',
          text: 'Neither is there salvation in any other: for there is none other name under heaven given among men, whereby we must be saved.',
          isPrimary: false,
        },
      ],
      content: [
        'In Philippians 2, Paul describes the ultimate exaltation. After Jesus humbled Himself to the point of death on a cross, God "highly exalted Him" and gave Him the name above every name. This name — the name of Jesus — now carries supreme authority over heaven, earth, and everything beneath.',
        'But consider: if Jesus is merely a created being or a secondary divine person, why would His name be above every name? Why would every knee bow and every tongue confess at this name? In the Old Testament, Isaiah 45:23 declares that every knee will bow to Yahweh alone. Paul applies this very prophecy to Jesus — because Jesus is the name that the one God has chosen for His full revelation.',
        'On the Day of Pentecost, when the church was born, Peter did not command baptism in the name of a doctrine or a formula of multiple persons. He said, "Be baptized every one of you in the name of Jesus Christ." This name carries the full authority and identity of God Himself. When we invoke the name of Jesus, we invoke the one true God.',
        'Acts 4:12 seals this truth: "There is none other name under heaven given among men, whereby we must be saved." Not another name alongside it. Not a name that is one of three. The name of Jesus is the singular, exclusive, all-sufficient name of salvation because it is the human name of the one true God.',
      ],
      wordStudies: [
        {
          original: 'ὄνομα',
          transliteration: 'onoma',
          pronunciation: 'OH-no-mah',
          language: 'Greek',
          meaning: 'Name; title; authority; reputation; identity',
          explanation:
            'In the biblical world, onoma carries the full weight of a person\'s authority and identity. When Philippians 2:9 says God gave Jesus "a name above every name," it declares that the identity and authority wrapped up in the name of Jesus surpasses all other authority in the universe.',
        },
        {
          original: 'κύριος',
          transliteration: 'kyrios',
          pronunciation: 'KOO-ree-os',
          language: 'Greek',
          meaning: 'Lord; master; supreme authority; Yahweh',
          explanation:
            'Kyrios is the word used in the Greek Old Testament (Septuagint) to translate the divine name Yahweh. When Philippians 2:11 says every tongue will confess that "Jesus Christ is Lord (Kyrios)," it is identifying Jesus with the Yahweh of the Old Testament.',
        },
      ],
      keyInsight:
        'Kyrios — the Greek word for "Lord" applied to Jesus in Philippians 2:11 — is the same word used in the Septuagint to translate Yahweh. To confess that Jesus is Lord is to confess that He is Yahweh in flesh.',
      reflectionQuestions: [
        { number: 1, question: 'Why is the name of Jesus — not a title or formula — the name given supreme authority over all creation?' },
        { number: 2, question: 'How does the connection between kyrios (Lord) and Yahweh deepen your understanding of who Jesus is?' },
        { number: 3, question: 'What does it mean for your prayer life and daily walk that there is "none other name" given for salvation?' },
      ],
    },

    // ── Lesson 5 ──────────────────────────────────────────
    {
      id: 'otg-5',
      number: 5,
      title: '"If You Have Seen Me"',
      subtitle: 'Father and Son Revealed',
      openingThought:
        'Philip asked the question that lives in every human heart: "Show us the Father." The answer Jesus gave was not a theology lesson — it was a revelation that redefined everything.',
      scriptures: [
        {
          reference: 'John 14:7-11',
          text: 'If ye had known me, ye should have known my Father also: and from henceforth ye know him, and have seen him. Philip saith unto him, Lord, shew us the Father, and it sufficeth us. Jesus saith unto him, Have I been so long time with you, and yet hast thou not known me, Philip? he that hath seen me hath seen the Father; and how sayest thou then, Shew us the Father? Believest thou not that I am in the Father, and the Father in me? the words that I speak unto you I speak not of myself: but the Father that dwelleth in me, he doeth the works. Believe me that I am in the Father, and the Father in me: or else believe me for the very works\' sake.',
          isPrimary: true,
        },
        {
          reference: 'Isaiah 9:6',
          text: 'For unto us a child is born, unto us a son is given: and the government shall be upon his shoulder: and his name shall be called Wonderful, Counsellor, The mighty God, The everlasting Father, The Prince of Peace.',
          isPrimary: false,
        },
        {
          reference: 'John 10:30',
          text: 'I and my Father are one.',
          isPrimary: false,
        },
      ],
      content: [
        'Jesus\'s words in John 14:9 are among the most astonishing claims ever uttered: "He that hath seen me hath seen the Father." Not "He that hath seen me hath seen someone like the Father" or "He that hath seen me hath seen a representative of the Father." Jesus said that to look at Him was to look at the Father Himself.',
        'The relationship between Father and Son in Scripture is not a relationship between two separate divine persons. It is the relationship between the one God and His human manifestation. The "Father" refers to the eternal, invisible Spirit of God — the transcendent deity. The "Son" refers to that same God expressed in genuine humanity — born of a virgin, walking in flesh, and giving His life on the cross.',
        'Isaiah 9:6 prophesied this very reality centuries before Bethlehem. The child born, the son given, would be called "The mighty God, The everlasting Father." The Son is the everlasting Father revealed in flesh. These are not two separate beings — they are two dimensions of the same God: His deity (Father) and His humanity (Son).',
        'When Jesus says "I and my Father are one" in John 10:30, He is not describing unity between two persons — He is declaring identity. The Greek word for "one" here is hen, a neuter form meaning "one thing," one in essence and nature. Jesus and the Father are the same God — one viewed from the perspective of transcendent deity, the other from the perspective of incarnate humanity.',
      ],
      wordStudies: [
        {
          original: 'πατήρ',
          transliteration: 'patēr',
          pronunciation: 'pah-TARE',
          language: 'Greek',
          meaning: 'Father; source; originator',
          explanation:
            'In the Oneness understanding, patēr when applied to God refers to the eternal Spirit, the transcendent deity of the one God. When Jesus speaks of the Father, He speaks of His own divine nature — the invisible Spirit that dwells within Him. "The Father that dwelleth in me, he doeth the works" (John 14:10).',
        },
        {
          original: 'ἐγώ',
          transliteration: 'egō',
          pronunciation: 'eh-GO',
          language: 'Greek',
          meaning: 'I; I myself; I am',
          explanation:
            'Jesus uses egō with startling authority throughout John\'s gospel: "Before Abraham was, I am" (8:58). "I am the way" (14:6). "I and my Father are one" (10:30). This emphatic first-person pronoun connects Jesus to the divine "I AM" of Exodus 3:14 — the one God declaring His identity through human lips.',
        },
      ],
      keyInsight:
        'Isaiah 9:6 declares that the Son shall be called "The everlasting Father." Father and Son are not two persons in conversation — they are two revelations of the one God: His eternal Spirit (Father) and His human manifestation (Son).',
      reflectionQuestions: [
        { number: 1, question: 'When Jesus said "He that hath seen me hath seen the Father," what was He revealing about His own identity?' },
        { number: 2, question: 'How does understanding Father and Son as deity and humanity of one God bring clarity to passages that seem to show Jesus praying to the Father?' },
        { number: 3, question: 'What comfort does it bring you to know that the baby born in Bethlehem was called "The mighty God, The everlasting Father"?' },
      ],
    },

    // ── Lesson 6 ──────────────────────────────────────────
    {
      id: 'otg-6',
      number: 6,
      title: '"Walking in Revelation"',
      subtitle: 'Living the Truth',
      openingThought:
        'Knowledge that remains only in the mind is incomplete. The revelation of who God is must move from our heads to our hearts to our hands — shaping how we worship, how we pray, and how we live.',
      scriptures: [
        {
          reference: 'Ephesians 4:4-6',
          text: 'There is one body, and one Spirit, even as ye are called in one hope of your calling; One Lord, one faith, one baptism, One God and Father of all, who is above all, and through all, and in you all.',
          isPrimary: true,
        },
        {
          reference: '1 John 5:20',
          text: 'And we know that the Son of God is come, and hath given us an understanding, that we may know him that is true, and we are in him that is true, even in his Son Jesus Christ. This is the true God, and eternal life.',
          isPrimary: false,
        },
        {
          reference: 'Revelation 1:8',
          text: 'I am Alpha and Omega, the beginning and the ending, saith the Lord, which is, and which was, and which is to come, the Almighty.',
          isPrimary: false,
        },
      ],
      content: [
        'Paul\'s declaration in Ephesians 4:4-6 is a symphony of oneness. One body. One Spirit. One hope. One Lord. One faith. One baptism. One God. The entire foundation of the Christian life rests on the number one. There is no room for division in the Godhead any more than there is room for division in the body of Christ.',
        'John, the beloved apostle who leaned on Jesus\'s chest, makes a declaration in his first epistle that leaves no ambiguity. He identifies Jesus Christ as "the true God, and eternal life." Not a representative of the true God. Not a secondary deity under the true God. Jesus Christ Himself — the Son of God in flesh — is the true God.',
        'And in the Revelation, the risen Christ identifies Himself as "Alpha and Omega, the beginning and the ending... the Almighty." This is the same language God uses of Himself in Isaiah. The first and the last. The Almighty. There is no higher title, no greater claim, and no clearer identification. Jesus is the Almighty God.',
        'This truth is not meant to be merely believed — it is meant to be lived. When you understand that the Jesus you worship is the one true God in flesh, it transforms your prayer life, your worship, your courage, and your identity. You are not following a secondary figure or a created being. You are walking with the Creator of the universe, the Alpha and Omega, who loved you enough to clothe Himself in your nature and die in your place.',
      ],
      wordStudies: [
        {
          original: 'ἀποκάλυψις',
          transliteration: 'apokalypsis',
          pronunciation: 'ah-poh-KAH-loop-sis',
          language: 'Greek',
          meaning: 'Revelation; unveiling; disclosure',
          explanation:
            'Apokalypsis means an uncovering — the removal of a veil. The book of Revelation is literally "The Apokalypsis of Jesus Christ." It is the final unveiling of who Jesus truly is: not merely a man, not merely a prophet, but the Almighty God — Alpha and Omega, beginning and end.',
        },
        {
          original: 'ἀλήθεια',
          transliteration: 'alētheia',
          pronunciation: 'ah-LAY-thay-ah',
          language: 'Greek',
          meaning: 'Truth; reality; genuineness',
          explanation:
            'In 1 John 5:20, we are said to be "in him that is true" (alēthinos). The word conveys not just factual accuracy but ultimate reality. Jesus Christ is the true God — the genuine, authentic, real God. All other claims to deity are shadows; He alone is the reality.',
        },
      ],
      keyInsight:
        'John writes, "This is the true God, and eternal life" — speaking of Jesus Christ. And the risen Jesus declares, "I am the Almighty." The revelation of God does not end with theology; it transforms how you live, pray, and worship every day.',
      reflectionQuestions: [
        { number: 1, question: 'How should the truth that Jesus is "the true God and eternal life" change the way you approach Him in prayer?' },
        { number: 2, question: 'Paul says there is "one Lord, one faith, one baptism, one God." How does this oneness shape the way you relate to fellow believers?' },
        { number: 3, question: 'As you complete this study, what is the single most transformative truth the Spirit has revealed to you about the identity of God?' },
      ],
    },
  ],
};

// ── Study: Adorned in Holiness ────────────────────────────
const ADORNED_IN_HOLINESS: GuidedStudy = {
  id: 'adorned-in-holiness',
  title: 'Adorned in Holiness',
  subtitle: 'The biblical call to modest, distinctive dress',
  description:
    'A 6-lesson study exploring why Apostolic Pentecostal women dress distinctly — rooted not in tradition alone, but in the deep biblical principles of holiness, reverence, and identity in Christ.',
  lessonCount: 6,
  gradient: ['#6b2142', '#d4577b'],
  accent: '#d4577b',
  lessons: [
    // ── Lesson 1 ──────────────────────────────────────────
    {
      id: 'aih-1',
      number: 1,
      title: '"A Temple, Not a Trophy"',
      subtitle: 'The Foundation of Holy Distinction',
      openingThought:
        'Before we talk about what a woman of God wears, we must understand why it matters at all. The answer is not found in a dress code — it is found in a dwelling place. Paul tells us that our bodies are the naos — the Holy of Holies — of the living God. Every standard of holiness that follows in this study flows from one breathtaking truth: the Creator of the universe chose your body as His home.',
      scriptures: [
        {
          reference: '1 Corinthians 6:19-20',
          text: 'What? know ye not that your body is the temple of the Holy Ghost which is in you, which ye have of God, and ye are not your own? For ye are bought with a price: therefore glorify God in your body, and in your spirit, which are God\'s.',
          isPrimary: true,
        },
        {
          reference: 'Romans 12:1-2',
          text: 'I beseech you therefore, brethren, by the mercies of God, that ye present your bodies a living sacrifice, holy, acceptable unto God, which is your reasonable service. And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God.',
          isPrimary: false,
        },
        {
          reference: '1 Peter 2:9',
          text: 'But ye are a chosen generation, a royal priesthood, an holy nation, a peculiar people; that ye should shew forth the praises of him who hath called you out of darkness into his marvellous light.',
          isPrimary: false,
        },
      ],
      content: [
        'When Paul declares that your body is the "temple" of the Holy Ghost, the word he chooses is not hieron — the word for the general temple complex, the outer courts where anyone could walk. He uses naos — the inner sanctuary, the Holy of Holies, the most sacred space in all of Israel where the very presence of God dwelt. Your body is not the parking lot of God\'s presence. It is the Holy of Holies.',
        'The Old Testament priests understood this distinction deeply. They could not enter the naos in casual or common garments. God prescribed specific priestly attire — "holy garments... for glory and for beauty" (Exodus 28:2). The covering was intentional, thorough, and reverent. If the priests of the old covenant clothed themselves with such care to serve in a building made with hands, how much more should we — who carry the living God within us — present our bodies with reverence?',
        '"Ye are not your own. For ye are bought with a price." This single sentence dismantles the world\'s central anthem: "My body, my choice." For the believer, the body has been purchased by the blood of Jesus Christ. It is not ours to display, market, or expose according to cultural trends. It is consecrated ground — belonging entirely to God.',
        'The command that follows is direct: "Glorify God in your body." The word "glorify" — doxazō — means to make God\'s worthiness visible. Every standard of holiness is a daily act of priestly worship — making the glory of God\'s indwelling visible to a watching world.',
        '"Be not conformed to this world" — the Greek syschēmatizō means "stop being continually pressed into the world\'s mold." The culture has a shape, a pattern, a value system — and it exerts constant pressure. Holiness is the deliberate refusal to be shaped by anything other than God. Every specific standard we will study — modest dress, uncut hair, natural beauty, surrendered ornaments — flows from this one foundation: the body is sacred because of who lives within it.',
      ],
      wordStudies: [
        {
          original: 'ναός',
          transliteration: 'naos',
          pronunciation: 'nah-OS',
          language: 'Greek',
          meaning: 'Inner sanctuary; the Holy of Holies; the dwelling place of God',
          explanation:
            'Paul deliberately chose naos over hieron in 1 Corinthians 6:19. Hieron refers to the entire temple complex — the courts, porches, and public areas. Naos refers specifically to the innermost sanctuary where God\'s presence dwelt. Your body is not the outer court. It is the most sacred space — the very dwelling place of the Holy Spirit.',
        },
        {
          original: 'ἅγιος',
          transliteration: 'hagios',
          pronunciation: 'HAH-gee-os',
          language: 'Greek',
          meaning: 'Holy; set apart for sacred use; consecrated',
          explanation:
            'Hagios does not mean "restricted" or "burdened." It means set apart for sacred use — elevated, reserved for the highest purpose. A holy vessel in the temple was not inferior to common vessels; it was dignified by its purpose. When God calls His people holy, He is not limiting them — He is declaring their worth.',
        },
      ],
      keyInsight:
        'Paul uses naos — the Holy of Holies — not hieron. Your body is the most sacred space in the universe. Every standard of holiness that follows flows from this: God dwells in you, and the temple must reflect the glory of its Resident.',
      reflectionQuestions: [
        { number: 1, question: 'How does understanding your body as the naos — the Holy of Holies — change the way you think about how you present yourself?' },
        { number: 2, question: 'What does it mean practically that you are "not your own" and have been "bought with a price" when it comes to daily choices about appearance?' },
        { number: 3, question: 'How does the priestly garments parallel (Exodus 28:2 — "for glory and for beauty") reshape the way you see holiness standards — as burden or as honor?' },
      ],
    },

    // ── Lesson 2 ──────────────────────────────────────────
    {
      id: 'aih-2',
      number: 2,
      title: '"Adorned with Godliness"',
      subtitle: 'Modest Dress and Gender Distinction',
      openingThought:
        'Now that the foundation is laid — your body is God\'s temple — the first specific standard comes into focus. Paul chose a word that appears nowhere else in the New Testament to describe how women should dress: katastolē, a long flowing garment. Moses used equally specific language to protect the Creator\'s design of gender distinction. Together, they paint an unmistakable picture.',
      scriptures: [
        {
          reference: '1 Timothy 2:9-10',
          text: 'In like manner also, that women adorn themselves in modest apparel, with shamefacedness and sobriety; not with broided hair, or gold, or pearls, or costly array; But (which becometh women professing godliness) with good works.',
          isPrimary: true,
        },
        {
          reference: 'Deuteronomy 22:5',
          text: 'The woman shall not wear that which pertaineth unto a man, neither shall a man put on a woman\'s garment: for all that do so are abomination unto the LORD thy God.',
          isPrimary: false,
        },
        {
          reference: 'Genesis 1:27',
          text: 'So God created man in his own image, in the image of God created he him; male and female created he them.',
          isPrimary: false,
        },
      ],
      content: [
        'Paul\'s instruction in 1 Timothy 2:9 is far more specific than modern translations often convey. The word translated "modest" is kosmios — meaning well-ordered, properly arranged, reflecting the divine order. It describes a woman whose outward appearance demonstrates the orderliness of her inner life.',
        'The word translated "apparel" is katastolē — and this is remarkable. Katastolē specifically refers to a long, flowing garment that falls down upon the body. This is the only time this word appears in the New Testament. Paul did not use a generic word for clothing; he chose a term that inherently implies length and coverage. The very vocabulary of the Holy Spirit points toward modesty as something visible and measurable. Katastolē — a garment that falls downward upon the body — naturally describes a dress or skirt. When our women choose skirts and dresses, they are aligning with the very word the Holy Spirit selected to define modest apparel.',
        'Deuteronomy 22:5 strengthens this with one of the strongest moral statements in the Torah. God declares that the blurring of male-female distinction through clothing is toevah — "abomination." The Hebrew word translated "that which pertaineth" is keli — far more than a garment. Keli refers to any article, instrument, or accessory associated with a particular gender. The word for the outer garment is simlah — the visible garment that identifies a person. God is saying what people see on the outside should reflect the distinction He created on the inside.',
        'This principle goes back to creation itself. "Male and female created he them" (Genesis 1:27). God deliberately, intentionally, and beautifully created two distinct expressions of humanity. This distinction is not a social construct — it is a divine architecture woven into the fabric of creation.',
        '"Shamefacedness" — the Greek word aidōs — is an innate sense of reverence, an internal compass that instinctively avoids what is unseemly. "Sobriety" — sōphrosynē — describes a Spirit-governed mind that produces self-control in every area of life. Together, these words paint a portrait of a woman whose dress flows from a heart anchored in reverence for God. And the adornment that becomes women "professing godliness" is good works — not gold, not pearls, not costly array, but a life of service and devotion.',
      ],
      wordStudies: [
        {
          original: 'καταστολή',
          transliteration: 'katastolē',
          pronunciation: 'kah-tah-stoh-LAY',
          language: 'Greek',
          meaning: 'A long flowing garment; dress that falls down upon the body',
          explanation:
            'Katastolē appears only here in the New Testament — 1 Timothy 2:9. It comes from katastellō, meaning "to send down" or "to let down." The word inherently describes a garment that falls downward upon the body, implying length and coverage. Paul\'s choice of this specific word is not accidental; it defines the kind of garment that reflects modest apparel.',
        },
        {
          original: 'כְּלִי',
          transliteration: 'keli',
          pronunciation: 'keh-LEE',
          language: 'Hebrew',
          meaning: 'Article; instrument; anything associated with a gender',
          explanation:
            'Keli is broader than just clothing. It encompasses any article, tool, or accessory distinctively associated with one gender. In Deuteronomy 22:5, God\'s prohibition extends beyond a specific garment to the principle of gender distinction itself — men and women should not adopt the articles, implements, or attire that belong distinctively to the other.',
        },
      ],
      keyInsight:
        'Paul chose katastolē — a word appearing nowhere else in the NT — meaning a long flowing garment. Moses used keli — any article associated with a gender. Together: modest dress means specific, visible covering that honors both the body and the Creator\'s design.',
      reflectionQuestions: [
        { number: 1, question: 'Why do you think Paul specifically chose the word katastolē — a long flowing garment — rather than a more generic term for clothing?' },
        { number: 2, question: 'How does understanding keli as broader than just clothing deepen your understanding of God\'s concern for gender distinction?' },
        { number: 3, question: 'What does it look like practically to "adorn yourself with good works" as your primary beauty statement?' },
      ],
    },

    // ── Lesson 3 ──────────────────────────────────────────
    {
      id: 'aih-3',
      number: 3,
      title: '"Her Crowning Glory"',
      subtitle: 'Uncut Hair as Covering and Consecration',
      openingThought:
        'In 1 Corinthians 11, Paul constructs his most carefully developed theological argument about the appearance of men and women. He appeals to the creation order, to nature as a teacher, to the witness of angels, and to the universal practice of every church. At the center of it all stands a single, stunning truth: the woman\'s uncut hair is her God-given glory, her covering, and her visible crown of consecration.',
      scriptures: [
        {
          reference: '1 Corinthians 11:13-15',
          text: 'Judge in yourselves: is it comely that a woman pray unto God uncovered? Doth not even nature itself teach you, that, if a man have long hair, it is a shame unto him? But if a woman have long hair, it is a glory to her: for her hair is given her for a covering.',
          isPrimary: true,
        },
        {
          reference: '1 Corinthians 11:3-10',
          text: 'But I would have you know, that the head of every man is Christ; and the head of the woman is the man; and the head of Christ is God... For this cause ought the woman to have power on her head because of the angels.',
          isPrimary: false,
        },
        {
          reference: 'Numbers 6:5',
          text: 'All the days of the vow of his separation there shall no razor come upon his head: until the days be fulfilled, in the which he separateth himself unto the LORD, he shall be holy, and shall let the locks of the hair of his head grow.',
          isPrimary: false,
        },
      ],
      content: [
        'Paul\'s argument in 1 Corinthians 11 is built with extraordinary theological precision. He begins with the creation order (v.3): the head of every man is Christ, the head of the woman is the man, the head of Christ is God. This is not about inferiority — Christ is not inferior to the Father — but about divine order and role. From this order flows a visible expression: the woman\'s uncut hair.',
        'The key verse is 1 Corinthians 11:15: her hair is given her anti peribolaiou — "in place of" a covering. The Greek preposition anti means "instead of," not "in addition to." The hair itself IS the covering. Peribolaion means "something thrown around," a mantle or wrap. Paul is saying that the woman\'s hair serves as her God-given covering — there is no need for an additional cloth veil, because the hair fulfills that role. But this only works if the hair remains uncut.',
        'The word for "long hair" is komē (κόμη), and the verb komao means to let the hair grow continuously without cutting. This is not merely "long" in the modern casual sense — it describes the habitual practice of uncut growth. Paul\'s logic in verse 6 is devastating: "For if the woman be not covered, let her also be shorn: but if it be a shame for a woman to be shorn or shaven, let her be covered." In other words: if she will not keep the covering (uncut hair), let her shave it all off — but since shaving is shameful, she should keep the covering. The logic only works if "covered" means uncut hair.',
        'Paul calls the woman\'s hair her doxa — her glory (v.15). He also says she ought to have exousia ("authority" or "power") on her head because of the angels (v.10). The uncut hair is not merely decorative; it is a sign of spiritual authority, a visible emblem of the divine order she honors. Angels — who themselves veil their faces before God (Isaiah 6:2) — witness and honor this act of consecration.',
        'The Old Testament confirms this pattern. Under the Nazarite vow — the highest consecration a person could make — no razor was to touch the head (Numbers 6:5). Uncut hair was the visible mark of total dedication to God. Samson\'s strength was not in his hair but in the vow his hair represented (Judges 16:17). When the vow was broken, the power departed. And the sinful woman in Luke 7:38 — who washed Jesus\' feet with her tears and wiped them with her hair — demonstrated the glory and intimacy that uncut hair represents: it was long enough to serve, to worship, to pour out devotion at the feet of the Savior.',
      ],
      wordStudies: [
        {
          original: 'κόμη',
          transliteration: 'komē',
          pronunciation: 'KOH-may',
          language: 'Greek',
          meaning: 'Hair allowed to grow continuously without cutting; uncut hair',
          explanation:
            'Komē and its verb form komao describe the practice of letting the hair grow without cutting it. This is not merely "long hair" in a casual sense — it refers to hair that is habitually, continuously uncut. Paul uses this word to describe the woman\'s glory: hair that has been allowed to grow as God designed, never diminished by a blade.',
        },
        {
          original: 'περιβόλαιον',
          transliteration: 'peribolaion',
          pronunciation: 'peh-ree-BOH-lye-on',
          language: 'Greek',
          meaning: 'Covering; mantle; something thrown around the body',
          explanation:
            'Paul says the woman\'s hair is given her anti peribolaiou — "in place of" a covering. The preposition anti means "instead of," not "in addition to." The hair itself IS the covering God gave her. It serves as her mantle, her wrap, her God-given veil — but only when it remains uncut and in its full, continuous growth.',
        },
      ],
      keyInsight:
        'Paul says the woman\'s hair is given her anti peribolaiou — "in place of" a covering. Anti means "instead of," not "in addition to." Komē — uncut, continuously growing hair — is the woman\'s doxa, her glory, her visible crown of consecration. To cut it is to remove the very covering and glory God gave her.',
      reflectionQuestions: [
        { number: 1, question: 'How does understanding anti as "instead of" change the common idea that Paul is talking about an additional cloth covering rather than the hair itself?' },
        { number: 2, question: 'Paul calls the woman\'s hair her "glory" (doxa). What does it mean to you that God gave you something He Himself calls glorious?' },
        { number: 3, question: 'How does the Nazarite vow parallel — where uncut hair represented the highest consecration — deepen your understanding of this standard?' },
      ],
    },

    // ── Lesson 4 ──────────────────────────────────────────
    {
      id: 'aih-4',
      number: 4,
      title: '"The Beauty God Gave You"',
      subtitle: 'Why Cosmetics and Jewelry Are Set Aside',
      openingThought:
        'God is not against beauty — He authored it. He painted the sunset, designed the rose, and declared His own creation "very good." But there is a vast difference between the beauty God gave you and the beauty the world sells you. Peter uses the Greek word kosmos — the very root of "cosmetics" — when he tells us to let our adorning NOT be the outward. Every biblical reference to face painting is in a context of rebellion. Every command to remove jewelry comes before an encounter with God\'s presence.',
      scriptures: [
        {
          reference: '1 Peter 3:3-4',
          text: 'Whose adorning let it not be that outward adorning of plaiting the hair, and of wearing of gold, or of putting on of apparel; But let it be the hidden man of the heart, in that which is not corruptible, even the ornament of a meek and quiet spirit, which is in the sight of God of great price.',
          isPrimary: true,
        },
        {
          reference: '2 Kings 9:30',
          text: 'And when Jehu was come to Jezreel, Jezebel heard of it; and she painted her face, and tired her head, and looked out at a window.',
          isPrimary: false,
        },
        {
          reference: 'Isaiah 3:16-18, 23',
          text: 'Moreover the LORD saith, Because the daughters of Zion are haughty, and walk with stretched forth necks and wanton eyes, walking and mincing as they go, and making a tinkling with their feet: Therefore the Lord will smite with a scab the crown of the head of the daughters of Zion... In that day the Lord will take away the bravery of their tinkling ornaments... The glasses, and the fine linen, and the hoods, and the vails.',
          isPrimary: false,
        },
      ],
      content: [
        'Peter\'s instruction in 1 Peter 3:3-4 is built around a word that should arrest every reader: kosmos. "Let your adorning not be that outward kosmos..." This is the Greek word from which we get the English word "cosmetics." Peter is not speaking in vague generalities — his vocabulary targets the very concept of artificial adornment. Instead, he points to the "hidden man of the heart" and the ornament that God values: aphthartos — incorruptible, imperishable. A meek and quiet spirit does not wrinkle, fade, or wash off at the end of the day.',
        'The biblical record on face painting is remarkably consistent — and remarkably negative. Jezebel "painted her face" (2 Kings 9:30) using puk, a Hebrew word for antimony-based black mineral cosmetic used to darken the eyes. This was not neutral beauty care; it was a deliberate act of defiance and seduction just before her judgment. Jeremiah 4:30 describes apostate Israel: "Though thou rentest thy face with painting, in vain shalt thou make thyself fair" — face painting as a symbol of spiritual adultery. Ezekiel 23:40 repeats the pattern: painting the face in the context of unfaithfulness to God. There is not a single positive reference to face painting in all of Scripture.',
        'The pattern with jewelry is equally clear. When God was about to descend on Mount Sinai, He commanded Israel to remove their ornaments: "Therefore now put off thy ornaments from thee, that I may know what to do unto thee. And the children of Israel stripped themselves of their ornaments by the mount Horeb" (Exodus 33:5-6). When Jacob prepared his household to meet God at Bethel, the family surrendered their earrings alongside their idols and buried them together (Genesis 35:2-4) — the earrings were categorized with the foreign gods. Isaiah 3:16-23 contains a prophetic condemnation of ornaments — chains, bracelets, earrings, nose jewels, rings — listed as evidence of haughtiness. Hosea 2:13 describes Israel decking herself with earrings and jewels in pursuit of false lovers — jewelry as the uniform of spiritual adultery.',
        '"I will praise thee; for I am fearfully and wonderfully made" (Psalm 139:14). This is the counter-narrative to every cosmetics advertisement that tells a woman she is not enough. God did not make a rough draft that needs the world\'s correction. He made a masterpiece. The natural face, free of artificial paint, declares trust in the Creator\'s design. The absence of ornament says, "I do not need the world\'s decoration to be beautiful — my beauty comes from the One who made me and the Spirit who dwells within me."',
      ],
      wordStudies: [
        {
          original: 'κόσμος',
          transliteration: 'kosmos',
          pronunciation: 'KOS-mos',
          language: 'Greek',
          meaning: 'Adornment; decoration; artificial arrangement of beauty',
          explanation:
            'Kosmos — the root of the English word "cosmetics" — is the exact word Peter uses when he says "let your adorning NOT be the outward." The word encompasses the whole concept of artificial external beautification. Peter does not forbid beauty — he redirects it inward, to the incorruptible ornament of a meek and quiet spirit that is of great price in God\'s sight.',
        },
        {
          original: 'פּוּךְ',
          transliteration: 'puk',
          pronunciation: 'POOK',
          language: 'Hebrew',
          meaning: 'Antimony; black mineral face paint; eye cosmetic',
          explanation:
            'Puk refers to the black mineral-based paint used to darken and enlarge the appearance of the eyes. Every biblical reference to puk or face painting appears in a context of rebellion, idolatry, or seduction — Jezebel (2 Kings 9:30), apostate Israel (Jeremiah 4:30), and spiritual unfaithfulness (Ezekiel 23:40). There is no positive reference to face painting in all of Scripture.',
        },
      ],
      keyInsight:
        'The Greek word kosmos — the root of "cosmetics" — is the exact word Peter uses when he says "let your adorning NOT be the outward." Every biblical reference to face painting (puk) is in a context of rebellion. God is not against beauty — He authored it. He is against replacing the beauty He gave you with a beauty the world sells you.',
      reflectionQuestions: [
        { number: 1, question: 'How does knowing that kosmos — the root of "cosmetics" — is the word Peter chose change the way you read 1 Peter 3:3-4?' },
        { number: 2, question: 'Why do you think every biblical reference to face painting appears in a negative context? What pattern does this reveal about God\'s perspective?' },
        { number: 3, question: 'How does Psalm 139:14 — "fearfully and wonderfully made" — speak to the pressure women feel to alter their appearance with cosmetics and jewelry?' },
      ],
    },

    // ── Lesson 5 ──────────────────────────────────────────
    {
      id: 'aih-5',
      number: 5,
      title: '"A Living Epistle"',
      subtitle: 'Holiness Standards as a Unified Witness',
      openingThought:
        'Long before you open your mouth to share the gospel, you are already being read. Your appearance, your countenance, your presentation — all of it speaks. Paul says believers are "living epistles, known and read of all men." The modest skirt, the uncut hair, the natural face, the absence of ornament — these are not isolated rules. They are sentences in a single letter that the world reads before you ever speak a word.',
      scriptures: [
        {
          reference: '2 Corinthians 3:2-3',
          text: 'Ye are our epistle written in our hearts, known and read of all men: Forasmuch as ye are manifestly declared to be the epistle of Christ ministered by us, written not with ink, but with the Spirit of the living God; not in tables of stone, but in fleshy tables of the heart.',
          isPrimary: true,
        },
        {
          reference: 'Matthew 5:14-16',
          text: 'Ye are the light of the world. A city that is set on an hill cannot be hid. Neither do men light a candle, and put it under a bushel, but on a candlestick; and it giveth light unto all that are in the house. Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven.',
          isPrimary: false,
        },
        {
          reference: '1 Peter 2:12',
          text: 'Having your conversation honest among the Gentiles: that, whereas they speak against you as evildoers, they may by your good works, which they shall behold, glorify God in the day of visitation.',
          isPrimary: false,
        },
      ],
      content: [
        'Paul tells the Corinthian church that they are "living epistles, known and read of all men." An epistle is a letter — and a letter is read before the author is ever heard. People read you before they hear you. Your appearance is the first paragraph of your testimony. Before a single word of doctrine leaves your lips, your presentation has already communicated something about the God you serve.',
        'Now consider how all the standards we have studied work together as one unified message. The modest dress (katastolē) declares that this body is a temple, not a trophy. The uncut hair (komē) proclaims consecration and glory — a visible crown that says, "I honor the divine order." The face free of cosmetics (kosmos) announces contentment with the Creator\'s design. The absence of jewelry declares, "I have stripped away the world\'s ornaments to stand before my God unadorned by anything but His Spirit." Together, they compose a single letter that the watching world reads: "I belong to God."',
        'This is why holiness standards are not secondary to the gospel — they are pre-evangelism. They open doors of curiosity. When a woman walks into a room dressed distinctly, modestly, and naturally in a culture that celebrates exposure and artificial enhancement, people notice. They may not understand why, but they recognize that something is different. That "something different" is the first seed of a conversation about the God who makes His people different.',
        'The Greek word sōphrosynē — "sound-mindedness" or "Spirit-governed thinking" — is the internal engine that makes the external witness authentic. When standards flow from sōphrosynē, they are not performed but lived. Anastrophē — "manner of life" or "total conduct" — encompasses everything: appearance, behavior, attitude. Holiness is not a checklist of isolated rules; it is a whole way of life. Peter promises that even those who mock now will "glorify God in the day of visitation." The living epistle is never wasted — even when it is rejected today, it plants a seed for tomorrow.',
      ],
      wordStudies: [
        {
          original: 'σωφροσύνη',
          transliteration: 'sōphrosynē',
          pronunciation: 'so-fro-SOO-nay',
          language: 'Greek',
          meaning: 'Sound-mindedness; Spirit-governed thinking; self-control',
          explanation:
            'Sōphrosynē describes a mind that is sound, balanced, and governed by the Spirit. When holiness standards flow from sōphrosynē, they are not external compulsion but internal conviction made visible. The witness is authentic because it originates in a Spirit-renewed mind, not mere tradition or rule-following.',
        },
        {
          original: 'ἀναστροφή',
          transliteration: 'anastrophē',
          pronunciation: 'ah-nah-stro-FAY',
          language: 'Greek',
          meaning: 'Manner of life; total conduct; way of living',
          explanation:
            'Anastrophē encompasses the entirety of a person\'s visible life — appearance, behavior, speech, and attitude. Peter uses this word to describe the kind of life that causes even hostile unbelievers to glorify God. Holiness is not compartmentalized; it is a complete manner of life where every detail communicates the same message.',
        },
      ],
      keyInsight:
        'You are being read before you ever speak. The modest dress, the uncut hair, the natural face, the absence of ornament — these are not isolated rules. They are sentences in a living epistle that opens doors no sermon could unlock: "What makes you different?"',
      reflectionQuestions: [
        { number: 1, question: 'If people are "reading" your life as a letter, what does the totality of your appearance communicate about the God you serve?' },
        { number: 2, question: 'How do the standards — modest dress, uncut hair, no cosmetics, no jewelry — work together as one unified message rather than separate rules?' },
        { number: 3, question: 'Have you ever experienced someone asking about your faith because of your distinctive appearance? How did that conversation unfold?' },
      ],
    },

    // ── Lesson 6 ──────────────────────────────────────────
    {
      id: 'aih-6',
      number: 6,
      title: '"The Beauty of Devotion"',
      subtitle: 'The Heart Behind the Standard',
      openingThought:
        'Every outward standard has an inward root. If holiness is only a rule, it becomes a burden. But when it flows from a heart captivated by the beauty of Jesus, it becomes something else entirely — not a chain, but a crown. Not a cage, but a consecration. The Psalmist did not say "worship the LORD in the burden of holiness." He said, "Worship the LORD in the beauty of holiness." Hadrat-qodesh — the beauty of holiness. Holiness IS beauty in its highest form.',
      scriptures: [
        {
          reference: 'Psalm 29:2',
          text: 'Give unto the LORD the glory due unto his name; worship the LORD in the beauty of holiness.',
          isPrimary: true,
        },
        {
          reference: '1 Peter 3:3-5',
          text: 'Whose adorning let it not be that outward adorning of plaiting the hair, and of wearing of gold, or of putting on of apparel; But let it be the hidden man of the heart, in that which is not corruptible, even the ornament of a meek and quiet spirit, which is in the sight of God of great price. For after this manner in the old time the holy women also, who trusted in God, adorned themselves, being in subjection unto their own husbands.',
          isPrimary: false,
        },
        {
          reference: 'Galatians 5:22-23',
          text: 'But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, Meekness, temperance: against such there is no law.',
          isPrimary: false,
        },
      ],
      content: [
        'The Hebrew phrase hadrat-qodesh in Psalm 29:2 is breathtaking: "the beauty of holiness" — or more literally, "the splendor of sacredness." Holiness is not the absence of beauty. It is beauty in its highest, most radiant form. The world defines beauty by what is added — cosmetics, jewelry, fashion. God defines beauty by what is consecrated — a life set apart, a heart surrendered, a body presented as a living sacrifice. Every standard we have studied in this series — modest dress, uncut hair, the natural face, the absence of ornament — is not a subtraction from beauty. It is beauty as God defines it.',
        'Peter identifies the adornment that God values most: "the hidden man of the heart... the ornament of a meek and quiet spirit." The Greek word for "meek" — praütes — is one of the most misunderstood words in Scripture. Meekness is not weakness. In the ancient world, praütes described a wild horse that had been tamed — not stripped of its strength, but trained to channel it under a master\'s direction. A meek woman is not a passive woman. She is a powerful woman whose strength is governed by the Spirit. The word "quiet" — hēsychios — does not mean silent. It means tranquil, settled, at rest from within. Together: immense power, perfectly submitted, producing a deep inner calm.',
        'Peter then offers the decisive example: "For after this manner in the old time the holy women also, who trusted in God, adorned themselves." The key word is trusted. Trust is the bridge between the heart and the standard. A woman who trusts God with her eternal salvation trusts Him with her appearance. A woman who trusts God to know what is best for her soul trusts Him to know what is best for her body. These holy women of old did not adorn themselves with outward kosmos because their trust was in someone greater than fashion, culture, or the approval of the world.',
        'This is the difference between legalism and love. Legalism says, "You must do this or God will reject you." Love says, "I do this because I have been captivated by the beauty of holiness and I want every part of my life to reflect the One who saved me." The fruit of the Spirit — love, joy, peace, longsuffering, gentleness, goodness, faith, meekness, temperance — "against such there is no law." When these qualities govern your heart, every standard becomes a love letter written back to God. Not law, but love. Not a chain — a crown. Not a cage — a consecration.',
      ],
      wordStudies: [
        {
          original: 'πραΰτης',
          transliteration: 'praütes',
          pronunciation: 'prah-OO-tace',
          language: 'Greek',
          meaning: 'Meekness; gentleness; power under control',
          explanation:
            'Praütes described a wild horse that had been tamed — not stripped of its strength, but trained to channel it under a master\'s direction. A meek spirit is not a weak spirit. It is immense strength — passion, conviction, capability — submitted to God\'s control. The meek woman is not powerless; she is the most powerful kind of woman, because her strength serves a purpose higher than herself.',
        },
        {
          original: 'הַדְרַת־קֹדֶשׁ',
          transliteration: 'hadrat-qodesh',
          pronunciation: 'had-RAHT KOH-desh',
          language: 'Hebrew',
          meaning: 'The beauty of holiness; the splendor of sacredness',
          explanation:
            'Hadrat means "beauty, splendor, majesty" and qodesh means "holiness, sacredness." Together, they declare that holiness is not the opposite of beauty — it IS beauty in its highest form. When the Psalmist calls us to "worship the LORD in the beauty of holiness," he reveals that true beauty is not found in outward adornment but in the radiance of a life consecrated to God.',
        },
      ],
      keyInsight:
        'Hadrat-qodesh — the beauty of holiness. When every standard — modest dress, uncut hair, natural face, surrendered ornaments — flows from a heart captivated by Jesus, it is not a chain. It is a crown. Not law, but love.',
      reflectionQuestions: [
        { number: 1, question: 'How does understanding meekness (praütes) as "power under control" change the way you see the call to a meek and quiet spirit?' },
        { number: 2, question: 'Peter says the holy women of old "trusted in God." How is trust the key that transforms every holiness standard from burden to beauty?' },
        { number: 3, question: 'As you complete this study, how has your understanding of holiness as beauty — not the absence of it — changed the way you see these standards?' },
      ],
    },
  ],
};

// ── Study: Free from the Law ──────────────────────────────
const FREE_FROM_THE_LAW: GuidedStudy = {
  id: 'free-from-the-law',
  title: 'Free from the Law',
  subtitle: 'Why the New Covenant replaces the Old',
  description:
    'A 6-lesson study answering Messianic Judaism and the Hebrew Roots movement from Scripture. Discover why Apostolic Pentecostals are not under the Law of Moses — and why the Holy Ghost is the fulfillment of everything the Law pointed toward.',
  lessonCount: 6,
  gradient: ['#7f1d1d', '#b45309'],
  accent: '#f59e0b',
  lessons: [
    // ── Lesson 1 ──────────────────────────────────────────
    {
      id: 'ftl-1',
      number: 1,
      title: '"The Glory of the Old"',
      subtitle: 'Understanding What Torah Was — and What It Was For',
      openingThought:
        'Before we can understand why the New Covenant replaced the Old, we must first understand what made the Old Covenant glorious. The Law was not a mistake. It was not evil. It was God\'s gift to Israel — and even the apostle Paul called it "holy, and just, and good." We begin this study not by tearing down the Law, but by honoring it — because only when you see its beauty can you understand why something even greater had to come.',
      scriptures: [
        {
          reference: 'Psalm 19:7-11',
          text: 'The law of the LORD is perfect, converting the soul: the testimony of the LORD is sure, making wise the simple. The statutes of the LORD are right, rejoicing the heart: the commandment of the LORD is pure, enlightening the eyes. The fear of the LORD is clean, enduring for ever: the judgments of the LORD are true and righteous altogether. More to be desired are they than gold, yea, than much fine gold: sweeter also than honey and the honeycomb. Moreover by them is thy servant warned: and in keeping of them there is great reward.',
          isPrimary: true,
        },
        {
          reference: 'Romans 7:12',
          text: 'Wherefore the law is holy, and the commandment holy, and just, and good.',
          isPrimary: false,
        },
        {
          reference: 'Deuteronomy 4:5-8',
          text: 'Behold, I have taught you statutes and judgments, even as the LORD my God commanded me, that ye should do so in the land whither ye go to possess it. Keep therefore and do them; for this is your wisdom and your understanding in the sight of the nations, which shall hear all these statutes, and say, Surely this great nation is a wise and understanding people. For what nation is there so great, who hath God so nigh unto them, as the LORD our God is in all things that we call upon him for? And what nation is there so great, that hath statutes and judgments so righteous as all this law, which I set before you this day?',
          isPrimary: false,
        },
      ],
      content: [
        'Psalm 19 is a love letter to the Law of God. David praises it with every word he can find: the Law is perfect, sure, right, pure, true, righteous. It converts the soul. It makes the simple wise. It rejoices the heart. It enlightens the eyes. David says the Law is more desirable than gold and sweeter than honey. This is not the language of a man burdened by a legal code — this is the language of a man who has encountered God\'s character written in commandments.',
        'Paul himself — the apostle of grace, the man who would write Galatians and Romans — declares in Romans 7:12 that "the law is holy, and the commandment holy, and just, and good." Paul never denigrates the Law. He honors it. He simply insists that it was never designed to be the final chapter of God\'s plan. But before we get there, we must start where David started: with awe.',
        'Deuteronomy 4 reveals something stunning about how the surrounding nations viewed Israel\'s Law. Moses tells Israel that when the nations heard their statutes, they would say, "What great nation has statutes and judgments so righteous as all this law?" Torah was God\'s gift to Israel: it revealed His character, defined His covenant people, and created a moral framework unlike anything the ancient world had seen. In a world of arbitrary pagan gods, Israel had a God who told them what was right and why.',
        'This is important because today, movements like Messianic Judaism and the Hebrew Roots movement appeal to Christians by emphasizing this beauty. They teach Sabbath-keeping, dietary kashrut, feast day observance, sometimes circumcision, and the use of Hebrew names for God. And some of those instincts are genuinely good — Christians should know their Old Testament. The beauty of Torah is real. But the critical question this study will answer is: was the Mosaic covenant designed to be permanent, or was it designed to point forward to something greater? The Law itself will give us the answer.',
      ],
      wordStudies: [
        {
          original: 'תּוֹרָה',
          transliteration: 'torah',
          pronunciation: 'toh-RAH',
          language: 'Hebrew',
          meaning: 'Instruction; direction; teaching; law',
          explanation:
            'Torah is far richer than the English word "law." It comes from the root yarah, meaning "to throw" or "to direct" — like an arrow aimed at a target. Torah is God\'s instruction, His direction for life. Understanding this enriches our appreciation of what God gave Israel — not merely a legal code, but loving instruction from a Father to His children.',
        },
        {
          original: 'ἅγιος',
          transliteration: 'hagios',
          pronunciation: 'HAH-gee-os',
          language: 'Greek',
          meaning: 'Holy; set apart; sacred; consecrated',
          explanation:
            'In Romans 7:12, Paul uses hagios to describe the Law itself — "the law is holy." This is the same word used for the Holy Spirit and for the saints. Paul does not treat the Law as an enemy to be despised. He treats it as something sacred that served God\'s purpose in its time. We dishonor the Law not by moving beyond it, but by failing to understand what it was always pointing toward.',
        },
      ],
      keyInsight:
        'We do not dishonor the Old Testament — we honor it by recognizing what it always pointed toward. The Law was glorious. But even within its own pages, it hinted that its glory was not the final chapter.',
      reflectionQuestions: [
        { number: 1, question: 'Why is it important to begin a study about freedom from the Law by first honoring what the Law was?' },
        { number: 2, question: 'Paul calls the Law "holy, just, and good" in Romans 7:12. How does this shape the way we should talk about the Old Testament with those in the Hebrew Roots movement?' },
        { number: 3, question: 'What aspects of the Hebrew Roots movement\'s emphasis on the Old Testament are genuinely good instincts? Where does the movement go wrong?' },
      ],
    },

    // ── Lesson 2 ──────────────────────────────────────────
    {
      id: 'ftl-2',
      number: 2,
      title: '"A Shadow of Good Things"',
      subtitle: 'The Law Was Temporary by Design',
      openingThought:
        'Having honored the beauty of the Law, we now ask the question the Law itself forces us to ask: Was it designed to be permanent? The answer — from Paul, from the writer of Hebrews, and from the Old Testament prophet Jeremiah — is a resounding no. The Law was glorious, but its glory had an expiration date built in from the beginning.',
      scriptures: [
        {
          reference: 'Galatians 3:19-25',
          text: 'Wherefore then serveth the law? It was added because of transgressions, till the seed should come to whom the promise was made; and it was ordained by angels in the hand of a mediator. Is the law then against the promises of God? God forbid: for if there had been a law given which could have given life, verily righteousness should have been by the law. But the scripture hath concluded all under sin, that the promise by faith of Jesus Christ might be given to them that believe. But before faith came, we were kept under the law, shut up unto the faith which should afterwards be revealed. Wherefore the law was our schoolmaster to bring us unto Christ, that we might be justified by faith. But after that faith is come, we are no longer under a schoolmaster.',
          isPrimary: true,
        },
        {
          reference: 'Hebrews 10:1',
          text: 'For the law having a shadow of good things to come, and not the very image of the things, can never with those sacrifices which they offered year by year continually make the comers thereunto perfect.',
          isPrimary: false,
        },
        {
          reference: 'Colossians 2:16-17',
          text: 'Let no man therefore judge you in meat, or in drink, or in respect of an holyday, or of the new moon, or of the sabbath days: Which are a shadow of things to come; but the body is of Christ.',
          isPrimary: false,
        },
        {
          reference: 'Jeremiah 31:31-34',
          text: 'Behold, the days come, saith the LORD, that I will make a new covenant with the house of Israel, and with the house of Judah: Not according to the covenant that I made with their fathers in the day that I took them by the hand to bring them out of the land of Egypt; which my covenant they brake, although I was an husband unto them, saith the LORD: But this shall be the covenant that I will make with the house of Israel; After those days, saith the LORD, I will put my law in their inward parts, and write it in their hearts; and will be their God, and they shall be my people.',
          isPrimary: false,
        },
      ],
      content: [
        'Paul explains the Law\'s purpose with surgical precision in Galatians 3:19. The Law was "added because of transgressions, TILL the seed should come." That word "till" is everything. The Law had an expiration date built into its design. It was not the original plan — it was a temporary measure added 430 years after God\'s promise to Abraham, and it was always destined to give way when the Seed — Christ — arrived.',
        'Paul then uses one of the most powerful illustrations in all of Scripture. The Law was a paidagogos — a schoolmaster or guardian. In the ancient world, a paidagogos was not a professor or a permanent teacher. He was a household slave assigned to walk a child to school, supervise his conduct, and discipline him — but only until the child reached maturity. Once the child grew up, the paidagogos had no further authority. "After that faith is come, we are no longer under a schoolmaster" (3:25). The Law supervised God\'s people until Christ came. Now that faith has arrived, the guardian\'s role is over.',
        'Hebrews 10:1 calls the Law "a shadow of good things to come, and not the very image." Colossians 2:16-17 lists dietary laws, feast days, new moons, and Sabbath days as "a shadow of things to come; but the body is of Christ." A shadow proves that something real is approaching — but once the reality arrives, you don\'t worship the shadow. You turn to face what cast it.',
        'Most powerfully of all: Jeremiah 31:31-34 — written WITHIN the Old Testament — prophesies a new covenant "NOT according to" the one made at Sinai. The Old Testament itself predicted its own replacement. If Torah was the permanent, final plan, why does Jeremiah say God will make something fundamentally different? The very Scriptures the Hebrew Roots movement claims to champion contain the prophecy of their replacement.',
      ],
      wordStudies: [
        {
          original: 'παιδαγωγός',
          transliteration: 'paidagogos',
          pronunciation: 'pai-dah-go-GOS',
          language: 'Greek',
          meaning: 'Schoolmaster; guardian; a household slave who supervised children until maturity',
          explanation:
            'The paidagogos in the ancient world was not a professor or permanent teacher. He was a slave in the household assigned to walk the child to school, supervise his conduct, and discipline him — but only until the child came of age. Once the child matured, the paidagogos had no further authority. Paul uses this image to describe the Law: it supervised God\'s people until Christ came. Now that faith has arrived, the guardian\'s role is over.',
        },
        {
          original: 'σκιά',
          transliteration: 'skia',
          pronunciation: 'SKEE-ah',
          language: 'Greek',
          meaning: 'Shadow; foreshadowing; an outline cast by a coming reality',
          explanation:
            'In Colossians 2:17, skia is contrasted with soma — the body or substance. Dietary laws, feast days, and Sabbaths were shadows cast by the approaching reality of Christ. A shadow proves that something real is coming, but once the reality arrives, clinging to the shadow is not devotion — it is confusion. Christ is the soma; Torah observances were the skia.',
        },
      ],
      keyInsight:
        'A shadow proves that something real is coming — but once the reality arrives, you don\'t worship the shadow. The Law was the shadow. Christ is the substance. And even Jeremiah knew the old covenant wasn\'t the last word.',
      reflectionQuestions: [
        { number: 1, question: 'What does the word "till" in Galatians 3:19 tell us about God\'s original design for the Law\'s duration?' },
        { number: 2, question: 'The paidagogos was a temporary guardian whose authority ended when the child matured. What does this say about the Law\'s ongoing role after Christ?' },
        { number: 3, question: 'Why is it significant that Jeremiah 31 — written within the Old Testament — prophesies a covenant "NOT according to" the one at Sinai?' },
      ],
    },

    // ── Lesson 3 ──────────────────────────────────────────
    {
      id: 'ftl-3',
      number: 3,
      title: '"It Is Finished"',
      subtitle: 'What the Cross Accomplished Regarding the Law',
      openingThought:
        'The Law was glorious. It was temporary by design. And now we come to the moment everything changed. On the cross, Jesus did not merely pay for sin — He dismantled the entire legal system that stood against us. The certificate of debt was blotted out. The shadows were rendered obsolete by the arrival of the One who cast them. What happened at Calvary was not a modification of the old system — it was its completion and cancellation.',
      scriptures: [
        {
          reference: 'Colossians 2:14-17',
          text: 'Blotting out the handwriting of ordinances that was against us, which was contrary to us, and took it out of the way, nailing it to his cross; And having spoiled principalities and powers, he made a shew of them openly, triumphing over them in it. Let no man therefore judge you in meat, or in drink, or in respect of an holyday, or of the new moon, or of the sabbath days: Which are a shadow of things to come; but the body is of Christ.',
          isPrimary: true,
        },
        {
          reference: 'Hebrews 8:6-13',
          text: 'But now hath he obtained a more excellent ministry, by how much also he is the mediator of a better covenant, which was established upon better promises. For if that first covenant had been faultless, then should no place have been sought for the second. For finding fault with them, he saith, Behold, the days come, saith the Lord, when I will make a new covenant with the house of Israel and with the house of Judah: Not according to the covenant that I made with their fathers in the day when I took them by the hand to lead them out of the land of Egypt; because they continued not in my covenant, and I regarded them not, saith the Lord. For this is the covenant that I will make with the house of Israel after those days, saith the Lord; I will put my laws into their mind, and write them in their hearts: and I will be to them a God, and they shall be to me a people. In that he saith, A new covenant, he hath made the first old. Now that which decayeth and waxeth old is ready to vanish away.',
          isPrimary: false,
        },
        {
          reference: 'Ephesians 2:14-15',
          text: 'For he is our peace, who hath made both one, and hath broken down the middle wall of partition between us; Having abolished in his flesh the enmity, even the law of commandments contained in ordinances; for to make in himself of twain one new man, so making peace.',
          isPrimary: false,
        },
        {
          reference: 'Romans 7:1-6',
          text: 'Know ye not, brethren, (for I speak to them that know the law,) how that the law hath dominion over a man as long as he liveth? For the woman which hath an husband is bound by the law to her husband so long as he liveth; but if the husband be dead, she is loosed from the law of her husband. So then if, while her husband liveth, she be married to another man, she shall be called an adulteress: but if her husband be dead, she is free from that law; so that she is no adulteress, though she be married to another man. Wherefore, my brethren, ye also are become dead to the law by the body of Christ; that ye should be married to another, even to him who is raised from the dead, that we should bring forth fruit unto God. For when we were in the flesh, the motions of sins, which were by the law, did work in our members to bring forth fruit unto death. But now we are delivered from the law, that being dead wherein we were held; that we should serve in newness of spirit, and not in the oldness of the letter.',
          isPrimary: false,
        },
      ],
      content: [
        'Colossians 2:14 uses one of the most powerful images in the New Testament. The "handwriting of ordinances" — cheirographon — was a legal term for a certificate of debt, an IOU written in one\'s own hand. The Mosaic Law functioned as humanity\'s debt certificate: it cataloged every obligation and every failure to meet it. On the cross, Jesus did not merely forgive the debt — He blotted out the document itself and nailed it to His cross. The legal system that condemned us was publicly canceled.',
        'Hebrews 8:6-13 declares Jesus the mediator of a "better covenant, established upon better promises," using the word kainos — qualitatively new, not merely renewed or refreshed. This is not Torah 2.0. Hebrews 8:13 seals the argument: "In that he saith, A new covenant, he hath made the first old. Now that which decayeth and waxeth old is ready to vanish away." God Himself declared the Sinai covenant obsolete. Hebrews 7:12 adds a critical detail: a changed priesthood necessitates a changed law. The entire covenantal structure has shifted.',
        'Ephesians 2:14-15 adds another dimension. Christ "abolished in his flesh the enmity, even the law of commandments contained in ordinances." The Law of Moses, with its commandments and ordinances, was the "middle wall of partition" separating Jew from Gentile. Christ broke it down to create "one new man" — a unified body where the distinction is no longer Torah-keeper or non-Torah-keeper, but simply those who are in Christ.',
        'Romans 7:1-6 seals the argument with a marriage analogy. A wife is bound to her husband while he lives, but death frees her. Paul applies this directly: "Ye also are become dead to the law by the body of Christ; that ye should be married to another, even to him who is raised from the dead." The believer\'s old relationship to Torah has been terminated by death — Christ\'s death — and we are now free to be joined to Christ. Paul\'s devastating summary from Galatians 2:21 says it all: "If righteousness come by the law, then Christ is dead in vain." To go back to Torah is to un-nail what Christ nailed.',
      ],
      wordStudies: [
        {
          original: 'χειρόγραφον',
          transliteration: 'cheirographon',
          pronunciation: 'khy-ROG-ra-fon',
          language: 'Greek',
          meaning: 'Handwriting; a certificate of debt; an IOU written by one\'s own hand',
          explanation:
            'Cheirographon in Colossians 2:14 was a legal term in the ancient world for a document of indebtedness written in the debtor\'s own hand. The Law of Moses served as humanity\'s IOU before God — cataloging every requirement and every transgression. Christ did not merely pay the debt; He destroyed the document itself, nailing it to the cross as a public declaration that the legal system no longer stands.',
        },
        {
          original: 'καινός',
          transliteration: 'kainos',
          pronunciation: 'kai-NOS',
          language: 'Greek',
          meaning: 'New; qualitatively new; fresh in kind; unprecedented',
          explanation:
            'Kainos in Hebrews 8:8 does not mean "renewed" or "refreshed" (that would be neos). Kainos means qualitatively new — something of a different kind than what preceded it. God did not promise a polished version of Sinai. He promised something unprecedented, a covenant unlike anything that came before.',
        },
      ],
      keyInsight:
        'On the cross, Jesus did not merely forgive the debt — He destroyed the document. The certificate of indebtedness was nailed to the cross and canceled. To go back to Torah is to un-nail what Christ nailed.',
      reflectionQuestions: [
        { number: 1, question: 'What does it mean that the "handwriting of ordinances" was not merely forgiven but blotted out and nailed to the cross?' },
        { number: 2, question: 'Hebrews 8:13 says God made the first covenant "old" and "ready to vanish away." How does this challenge the claim that Torah is still in effect?' },
        { number: 3, question: 'In Romans 7, Paul compares returning to Torah to a widow going back to a dead husband. What does this analogy reveal about the believer\'s new relationship to the Law?' },
      ],
    },

    // ── Lesson 4 ──────────────────────────────────────────
    {
      id: 'ftl-4',
      number: 4,
      title: '"The Council Has Spoken"',
      subtitle: 'How the Apostles Settled This Question',
      openingThought:
        'The question of whether Christians must keep the Law of Moses is not a modern debate. It erupted in the earliest days of the church — and the apostles who walked with Jesus, guided by the Holy Ghost Himself, gave a definitive answer.',
      scriptures: [
        {
          reference: 'Acts 15:1-29',
          text: 'And certain men which came down from Judaea taught the brethren, and said, Except ye be circumcised after the manner of Moses, ye cannot be saved. When therefore Paul and Barnabas had no small dissension and disputation with them, they determined that Paul and Barnabas, and certain other of them, should go up to Jerusalem unto the apostles and elders about this question. And the apostles and elders came together for to consider of this matter. And when there had been much disputing, Peter rose up, and said unto them, Men and brethren, ye know how that a good while ago God made choice among us, that the Gentiles by my mouth should hear the word of the gospel, and believe. Now therefore why tempt ye God, to put a yoke upon the neck of the disciples, which neither our fathers nor we were able to bear? Wherefore my sentence is, that we trouble not them, which from among the Gentiles are turned to God. For it seemed good to the Holy Ghost, and to us, to lay upon you no greater burden than these necessary things.',
          isPrimary: true,
        },
        {
          reference: 'Acts 10:9-16, 34-35',
          text: 'Peter went up upon the housetop to pray about the sixth hour: And he became very hungry, and would have eaten: and while they made ready, he fell into a trance, And saw heaven opened, and a certain vessel descending unto him, as it had been a great sheet knit at the four corners, and let down to the earth: Wherein were all manner of fourfooted beasts of the earth, and wild beasts, and creeping things, and fowls of the air. And there came a voice to him, Rise, Peter; kill, and eat. But Peter said, Not so, Lord; for I have never eaten any thing that is common or unclean. And the voice spake unto him again the second time, What God hath cleansed, that call not thou common. Then Peter opened his mouth, and said, Of a truth I perceive that God is no respecter of persons: But in every nation he that feareth him, and worketh righteousness, is accepted with him.',
          isPrimary: false,
        },
        {
          reference: 'Mark 7:14-19',
          text: 'And when he had called all the people unto him, he said unto them, Hearken unto me every one of you, and understand: There is nothing from without a man, that entering into him can defile him: but the things which come out of him, those are they that defile the man. Because it entereth not into his heart, but into the belly, and goeth out into the draught, purging all meats.',
          isPrimary: false,
        },
      ],
      content: [
        'Around 50 AD, the church in Jerusalem convened what is often called the first church council. The question was explicit: "Must Gentile believers be circumcised and keep the Law of Moses to be saved?" This is the exact question the Hebrew Roots movement raises today. And the apostles — men who walked with Jesus, witnessed His resurrection, and were filled with the Holy Ghost — gave a clear, authoritative answer.',
        'Peter stood and called the Mosaic Law "a yoke upon the neck of the disciples, which neither our fathers nor we were able to bear" (Acts 15:10). The word zugon — yoke — describes a heavy wooden frame used to bind animals for labor. Peter says Torah was a burden that Israel itself could never fully carry. Why would we impose it on believers who have been set free by grace? James then issued the ruling: Gentile believers should NOT be troubled with Torah observance. Only four practical guidelines were given — and circumcision, Sabbath-keeping, feast days, and dietary kashrut were conspicuously absent from the list.',
        'The most stunning phrase in Acts 15 is verse 28: "For it seemed good to the Holy Ghost, and to us." The Holy Ghost Himself endorsed this decision. This was not mere human opinion — it was a Spirit-directed apostolic ruling. If the Holy Ghost, working through the apostles who walked with Jesus, decided that believers do not need to keep the Mosaic Law, on what authority does any modern movement reverse that decision?',
        'The dietary question deserves special attention because it is a major emphasis of the Hebrew Roots movement. Jesus Himself declared all foods clean in Mark 7:19. God showed Peter a vision of unclean animals and said, "What God hath cleansed, that call not thou common" (Acts 10:15). Paul writes, "I know, and am persuaded by the Lord Jesus, that there is nothing unclean of itself" (Romans 14:14). And in 1 Timothy 4:1-5, Paul warns that in the last days, people will teach doctrines of devils, "commanding to abstain from meats, which God hath created to be received with thanksgiving." The insistence on kosher dietary laws is not deeper spirituality — Paul calls it a departure from the faith.',
      ],
      wordStudies: [
        {
          original: 'ζυγός',
          transliteration: 'zugon',
          pronunciation: 'zoo-GON',
          language: 'Greek',
          meaning: 'Yoke; a heavy wooden frame for binding; a burden of servitude',
          explanation:
            'Peter uses zugon in Acts 15:10 to describe the Mosaic Law as a heavy yoke that no generation of Israel was ever able to bear. The image is of an ox bound under a wooden frame for labor. Peter\'s argument is devastating: if the nation of Israel — God\'s chosen people, raised under the Law from birth — could not carry this yoke, why would we bind it on believers who have been freed by grace?',
        },
        {
          original: 'καθαρίζω',
          transliteration: 'katharizo',
          pronunciation: 'kah-thah-REE-zoh',
          language: 'Greek',
          meaning: 'To cleanse; to declare clean; to purify',
          explanation:
            'In Mark 7:19, the text says Jesus was "purging all meats" — katharizo — meaning He was declaring all foods clean. This is not a suggestion or a cultural accommodation. It is a divine declaration that the dietary distinctions of the Mosaic Law have been abolished. What God has cleansed, no movement has the authority to call unclean again.',
        },
      ],
      keyInsight:
        'If the apostles who walked with Jesus — led by the Holy Ghost — decided that believers do not need to keep the Mosaic Law, on what authority does any modern movement reverse that decision?',
      reflectionQuestions: [
        { number: 1, question: 'Peter called Torah a yoke that no generation of Israel could bear. How does this challenge the Hebrew Roots claim that Torah-keeping is a blessing and a delight?' },
        { number: 2, question: 'Acts 15:28 says the decision "seemed good to the Holy Ghost." What does this tell us about the authority behind the Jerusalem Council\'s ruling?' },
        { number: 3, question: 'Paul calls the insistence on dietary restrictions a "doctrine of devils" in 1 Timothy 4. Why do you think he uses such strong language?' },
      ],
    },

    // ── Lesson 5 ──────────────────────────────────────────
    {
      id: 'ftl-5',
      number: 5,
      title: '"From Sinai to Pentecost"',
      subtitle: 'The Holy Ghost Replaces What the Law Could Not Do',
      openingThought:
        'On Mount Sinai, God gave the Law on tablets of stone. Centuries later, on the Day of Pentecost — the very feast that commemorated the giving of the Law — God gave the Holy Ghost. The external law written on stone was replaced by the internal Spirit written on hearts. This is not coincidence. This is fulfillment.',
      scriptures: [
        {
          reference: 'Romans 8:1-4',
          text: 'There is therefore now no condemnation to them which are in Christ Jesus, who walk not after the flesh, but after the Spirit. For the law of the Spirit of life in Christ Jesus hath made me free from the law of sin and death. For what the law could not do, in that it was weak through the flesh, God sending his own Son in the likeness of sinful flesh, and for sin, condemned sin in the flesh: That the righteousness of the law might be fulfilled in us, who walk not after the flesh, but after the Spirit.',
          isPrimary: true,
        },
        {
          reference: 'Acts 2:1-4, 38',
          text: 'And when the day of Pentecost was fully come, they were all with one accord in one place. And suddenly there came a sound from heaven as of a rushing mighty wind, and it filled all the house where they were sitting. And there appeared unto them cloven tongues like as of fire, and it sat upon each of them. And they were all filled with the Holy Ghost, and began to speak with other tongues, as the Spirit gave them utterance. Then Peter said unto them, Repent, and be baptized every one of you in the name of Jesus Christ for the remission of sins, and ye shall receive the gift of the Holy Ghost.',
          isPrimary: false,
        },
        {
          reference: 'Ezekiel 36:26-27',
          text: 'A new heart also will I give you, and a new spirit will I put within you: and I will take away the stony heart out of your flesh, and I will give you an heart of flesh. And I will put my spirit within you, and cause you to walk in my statutes, and ye shall keep my judgments, and do them.',
          isPrimary: false,
        },
        {
          reference: 'Galatians 5:16-18',
          text: 'This I say then, Walk in the Spirit, and ye shall not fulfil the lust of the flesh. For the flesh lusteth against the Spirit, and the Spirit against the flesh: and these are contrary the one to the other: so that ye cannot do the things that ye would. But if ye be led of the Spirit, ye are not under the law.',
          isPrimary: false,
        },
      ],
      content: [
        'Romans 8:3-4 contains the Apostolic Pentecostal distinctive. Paul writes that the Law was "weak through the flesh" — not because the Law was defective, but because human nature could never fulfill its demands. The Law could command righteousness but never produce it. So God sent His Son to condemn sin in the flesh, "that the righteousness of the law might be FULFILLED IN US, who walk not after the flesh but after the Spirit." The Holy Spirit accomplishes from within what the external Law could never accomplish from without.',
        'The timing of Pentecost was not an accident of the calendar. The Day of Pentecost — Shavuot — was the feast that commemorated God\'s giving of the Torah at Mount Sinai. On that exact anniversary, God poured out His Spirit. At Sinai, the Law was written on tablets of stone. At Pentecost, the Spirit was written on tablets of the heart. Ezekiel 36:26-27 prophesied this very transition: "I will put my spirit within you, and cause you to walk in my statutes." The Holy Ghost does not add to the Law; He replaces what the Law could never do — actually transform the human heart.',
        'This addresses one of the most commonly misused verses in the Torah debate: Matthew 5:17. Jesus said, "Think not that I am come to destroy the law, or the prophets: I am not come to destroy, but to fulfil." The Greek word pleroo means "to bring to full completion" — like a bud brought to full bloom. Jesus did not preserve the Law in its Mosaic form; He fulfilled it and transcended it. That is why He immediately followed with a series of statements that went beyond Torah: "You have heard it said... but I say unto you." Jesus was not continuing Moses — He was surpassing him.',
        'Galatians 5:16-18 makes the point with stunning clarity: "If ye be led of the Spirit, ye are not under the law." The Holy Ghost fell at Pentecost on Jew and Gentile alike with the same evidence — speaking in tongues. No cultural conversion was required. No Torah observance was demanded. Cornelius and his household received the same Spirit with the same evidence, and Peter said, "Can any man forbid water, that these should not be baptized, which have received the Holy Ghost as well as we?" (Acts 10:47). The baptism of the Holy Ghost with the evidence of speaking in tongues IS the fulfillment of what Torah pointed toward — God\'s law written not on stone but on the human heart.',
      ],
      wordStudies: [
        {
          original: 'πληρόω',
          transliteration: 'pleroo',
          pronunciation: 'play-ROH-oh',
          language: 'Greek',
          meaning: 'To fulfill; to bring to full completion; to fill to the brim',
          explanation:
            'Pleroo in Matthew 5:17 does not mean "to continue indefinitely" or "to uphold without change." It means to bring something to its intended completion — like filling a cup to the brim or bringing a prophecy to its realization. Jesus fulfilled the Law by completing everything it pointed toward. A fulfilled prophecy is not one you keep waiting for — it is one that has arrived.',
        },
        {
          original: 'πνεῦμα',
          transliteration: 'pneuma',
          pronunciation: 'PNYOO-mah',
          language: 'Greek',
          meaning: 'Spirit; breath; wind; the Holy Ghost',
          explanation:
            'Pneuma — Spirit — is what now does what the Law (nomos) could never do. Romans 8:2 speaks of "the law of the Spirit of life" replacing "the law of sin and death." The indwelling Holy Ghost produces actual righteousness from within, not merely external compliance. This is the New Covenant promise: God\'s Spirit within us, causing us to walk in His ways.',
        },
      ],
      keyInsight:
        'The baptism of the Holy Ghost with the evidence of speaking in tongues IS the fulfillment of what Torah pointed toward. To go back to Sinai after experiencing Pentecost is to trade the substance for the shadow.',
      reflectionQuestions: [
        { number: 1, question: 'Why is it significant that Pentecost — the outpouring of the Spirit — occurred on the exact feast day that commemorated the giving of the Law at Sinai?' },
        { number: 2, question: 'Romans 8:3 says the Law was "weak through the flesh." What can the Holy Spirit do that the Law could not?' },
        { number: 3, question: 'How does understanding pleroo as "bring to full completion" change the way you read Matthew 5:17? What does it mean that Jesus fulfilled the Law?' },
      ],
    },

    // ── Lesson 6 ──────────────────────────────────────────
    {
      id: 'ftl-6',
      number: 6,
      title: '"Stand Fast in Liberty"',
      subtitle: 'Recognizing and Resisting the Hebrew Roots Movement',
      openingThought:
        'Paul fought this battle two thousand years ago. The names have changed, the social media platforms are new, but the heresy is ancient: the claim that faith in Christ is not enough — that you must add Torah observance to the finished work of the cross. Paul had a single word for it, and he fought it as a gospel-level threat.',
      scriptures: [
        {
          reference: 'Galatians 5:1',
          text: 'Stand fast therefore in the liberty wherewith Christ hath made us free, and be not entangled again with the yoke of bondage.',
          isPrimary: true,
        },
        {
          reference: 'Galatians 1:6-9',
          text: 'I marvel that ye are so soon removed from him that called you into the grace of Christ unto another gospel: Which is not another; but there be some that trouble you, and would pervert the gospel of Christ. But though we, or an angel from heaven, preach any other gospel unto you than that which we have preached unto you, let him be accursed. As we said before, so say I now again, If any man preach any other gospel unto you than that ye have received, let him be accursed.',
          isPrimary: false,
        },
        {
          reference: 'Galatians 4:9-11, 5:2-4',
          text: 'But now, after that ye have known God, or rather are known of God, how turn ye again to the weak and beggarly elements, whereunto ye desire again to be in bondage? Ye observe days, and months, and times, and years. I am afraid of you, lest I have bestowed upon you labour in vain. Behold, I Paul say unto you, that if ye be circumcised, Christ shall profit you nothing. For I testify again to every man that is circumcised, that he is a debtor to do the whole law. Christ is become of no effect unto you, whosoever of you are justified by the law; ye are fallen from grace.',
          isPrimary: false,
        },
        {
          reference: 'Colossians 2:8-10',
          text: 'Beware lest any man spoil you through philosophy and vain deceit, after the tradition of men, after the rudiments of the world, and not after Christ. For in him dwelleth all the fulness of the Godhead bodily. And ye are complete in him, which is the head of all principality and power.',
          isPrimary: false,
        },
      ],
      content: [
        'Galatians 5:1 is the rallying cry of the New Covenant believer: "Stand fast therefore in the liberty wherewith Christ hath made us free, and be not entangled again with the yoke of bondage." Liberty — eleutheria — is not lawlessness. It is freedom from the condemnation and ceremonial demands of the Mosaic system, and freedom to live by the Spirit. Christians are not without law — they are under the "law of Christ" (Galatians 6:2), the "law of the Spirit of life" (Romans 8:2), and the "perfect law of liberty" (James 1:25). These are not Torah repackaged; they are the Spirit-empowered life that Torah could only foreshadow.',
        'Paul called Torah-plus-gospel "another gospel" and pronounced a curse on its teachers (Galatians 1:6-9). He did not treat this as a minor disagreement or a secondary issue — he treated it as a gospel-level threat. Anyone who submits to circumcision as covenant obligation is "fallen from grace" (5:4) and obligated to keep the ENTIRE law (5:3) — all 613 commands, including temple sacrifices and Levitical purification rites. No Messianic Jew actually keeps the whole law — there is no temple, no functioning priesthood, and no sacrificial system. They cherry-pick the commands that appeal to them while ignoring the ones that are impossible to keep. Paul says this selective Torah-keeping is not holiness — it is a fall from grace.',
        'Paul uses a devastating word in Galatians 2:14 to describe what the Hebrew Roots movement asks Christians to do: ioudaizo — "to Judaize," to compel Gentiles to live as Jews. This is the exact word the apostle chose for the very practice the modern movement promotes. The Hebrew Roots movement follows a recognizable pattern: it often begins with insisting on Hebrew names for God and Jesus, then introduces questions about the "pagan origins" of Sunday worship, Christmas, and Easter. It escalates to dietary laws, Sabbath-keeping, and feast day observance. Throughout, it presents Torah-keeping as a deeper, more authentic spirituality — a kind of "secret knowledge" that mainstream Christians have missed. Paul warned about exactly this in Colossians 2:8: "Beware lest any man spoil you through philosophy and vain deceit."',
        'This study is not about disrespecting the Old Testament. We began in Lesson 1 by honoring the Law — it was holy, just, and good. But its glory was designed to fade before the surpassing glory of the New (2 Corinthians 3:10). We honor the Old Testament by recognizing what it always pointed toward: Christ, the Holy Ghost, and the New Covenant. Colossians 2:10 declares the believer\'s position: "Ye are complete in Him." We have the Holy Ghost. We are baptized in Jesus\' name. We stand in the liberty Christ purchased. We are not under the Law — we are under grace, empowered by the Spirit, and complete in Christ.',
      ],
      wordStudies: [
        {
          original: 'ἐλευθερία',
          transliteration: 'eleutheria',
          pronunciation: 'el-yoo-theh-REE-ah',
          language: 'Greek',
          meaning: 'Liberty; freedom; the state of being free from bondage',
          explanation:
            'Eleutheria in Galatians 5:1 is the freedom Christ purchased — not freedom to sin, but freedom from the condemnation and ceremonial demands of the Mosaic system. It is freedom to live by the Spirit rather than by external ordinances. This liberty is not lawlessness; it is Spirit-led living under the law of Christ, which fulfills everything Torah pointed toward.',
        },
        {
          original: 'ἰουδαΐζω',
          transliteration: 'ioudaizo',
          pronunciation: 'ee-oo-dah-EE-zoh',
          language: 'Greek',
          meaning: 'To Judaize; to compel Gentiles to live according to Jewish customs',
          explanation:
            'Paul uses ioudaizo in Galatians 2:14 — the exact word for what the modern Hebrew Roots movement promotes. It means to require non-Jewish believers to adopt Jewish customs, calendar, dietary laws, and ceremonial practices as conditions of spiritual maturity or faithfulness. Paul fought this as a gospel-level threat in the first century; the same fight continues today.',
        },
      ],
      keyInsight:
        'Paul had a single word for what Messianic Judaism asks Christians to do: ioudaizo — to Judaize. He fought it as a gospel-level threat. We must do the same — with truth, with love, and with the power of the Holy Ghost.',
      reflectionQuestions: [
        { number: 1, question: 'What is the difference between the "law of Christ" (Galatians 6:2) and the Law of Moses? How does the Spirit-empowered life fulfill what Torah could not?' },
        { number: 2, question: 'Have you encountered the tactics described in this lesson — Hebrew name insistence, "pagan origins" claims, or Torah-keeping presented as deeper spirituality? How should you respond?' },
        { number: 3, question: 'Colossians 2:10 says "ye are complete in Him." What does this completeness mean for your identity and your confidence as a New Covenant believer?' },
      ],
    },
  ],
};

// ── Study: Born of Water and Spirit ──────────────────────
const THE_PLAN_OF_SALVATION: GuidedStudy = {
  id: 'plan-of-salvation',
  title: 'Born of Water and Spirit',
  subtitle: 'The apostolic plan of salvation',
  description:
    'A 6-lesson study tracing the plan of salvation from the types and shadows of the Old Testament, through the prophecies, the teaching of Jesus, the Day of Pentecost, and every conversion in the book of Acts — revealing a gospel that has never changed and is for everyone today.',
  lessonCount: 6,
  gradient: ['#312e81', '#9f1239'],
  accent: '#f43f5e',
  lessons: [
    // ── Lesson 1 ──────────────────────────────────────────
    {
      id: 'pos-1',
      number: 1,
      title: '"Written in Water and Fire"',
      subtitle: 'Types and Shadows of the New Birth',
      openingThought:
        'Before God ever spoke the plan of salvation through a prophet or an apostle, He wrote it into the fabric of creation itself. Water and Spirit appear together on the first page of the Bible — and they never stop appearing. The Old Testament is not silent about baptism. It is shouting.',
      scriptures: [
        {
          reference: 'Genesis 1:1-2',
          text: 'In the beginning God created the heaven and the earth. And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.',
          isPrimary: true,
        },
        {
          reference: '1 Peter 3:20-21',
          text: 'Which sometime were disobedient, when once the longsuffering of God waited in the days of Noah, while the ark was a preparing, wherein few, that is, eight souls were saved by water. The like figure whereunto even baptism doth also now save us (not the putting away of the filth of the flesh, but the answer of a good conscience toward God,) by the resurrection of Jesus Christ.',
          isPrimary: false,
        },
        {
          reference: '1 Corinthians 10:1-2',
          text: 'Moreover, brethren, I would not that ye should be ignorant, how that all our fathers were under the cloud, and all passed through the sea; And were all baptized unto Moses in the cloud and in the sea.',
          isPrimary: false,
        },
      ],
      content: [
        'The very first act of creation establishes the pattern. Genesis 1:2 tells us the Spirit of God moved — merachepheth in Hebrew, meaning to hover, brood, or flutter — upon the face of the waters. Water and Spirit together, and from that union came life. This is the prototype of the new birth. Before there was a command, before there was a covenant, God embedded the blueprint into the opening lines of His Word: water and Spirit are His prescription for life.',
        'Peter reaches back to Noah\'s flood and calls it antitupon — the antitype, the prefiguring reality — of baptism. "Baptism doth also now save us," he writes in 1 Peter 3:21, not as an outward washing of the flesh but as the answer of a good conscience toward God. The flood destroyed the old world and carried the ark to safety through water. The parallel is unmistakable: baptism buries the old life and carries the believer into newness of life.',
        'Paul draws the same connection from the Red Sea. "All baptized unto Moses in the cloud and in the sea" (1 Corinthians 10:1-2). Water stood on both sides, the cloud of God\'s presence hovered above, and Egypt — bondage — was buried behind them forever. They went in as slaves and came out as God\'s free people. The cloud and the sea — Spirit and water — were the instruments of their deliverance.',
        'Naaman the Syrian was told to dip seven times in the Jordan — not the rivers of Damascus, not a river of his choosing, but the one God specified. His leprosy, a picture of sin throughout Scripture, required specific obedience. The Hebrew word tabal means to immerse, to plunge. When he obeyed, his flesh became like that of a "little child" — the language of new birth. Partial obedience would have left him a leper. God\'s method is not negotiable.',
        'Between the brazen altar and the tabernacle of God\'s presence stood the brazen laver — a vessel of washing. Every priest had to wash there before entering God\'s presence. The altar represented repentance; the tabernacle represented fellowship with God. The laver stood between them. Remarkably, no dimensions are given for the laver — it is the one piece of furniture without measurements, suggesting unlimited cleansing. The command was absolute: "Wash with water, that they die not." The pattern has been there since page one.',
      ],
      wordStudies: [
        {
          original: 'מְרַחֶפֶת',
          transliteration: 'merachepheth',
          pronunciation: 'meh-rah-KHEH-feth',
          language: 'Hebrew',
          meaning: 'Hovering; brooding; fluttering over',
          explanation:
            'Merachepheth describes the Spirit\'s action over the waters in Genesis 1:2 — a hovering or brooding, like a bird over its nest. It conveys intimate, life-giving presence. The Spirit did not merely observe the waters; He moved upon them, and from that union of Spirit and water, creation burst forth. This is the original pattern of the new birth: water and Spirit together producing life.',
        },
        {
          original: 'ἀντίτυπον',
          transliteration: 'antitupon',
          pronunciation: 'an-TEE-too-pon',
          language: 'Greek',
          meaning: 'Antitype; corresponding reality; the fulfillment that a type foreshadows',
          explanation:
            'Peter uses antitupon in 1 Peter 3:21 to describe baptism as the reality that Noah\'s flood foreshadowed. The flood was the type; baptism is the antitype — not a lesser copy, but the greater reality the shadow pointed toward. Peter is declaring that baptism is not symbolic ritual but the actual means of salvation, the fulfillment of what the flood prefigured.',
        },
      ],
      keyInsight:
        'The Old Testament is not silent about baptism — it is shouting. From the Spirit hovering over creation\'s waters to the laver between altar and God\'s presence, the pattern was there from page one: water and Spirit are God\'s prescription for new life.',
      reflectionQuestions: [
        { number: 1, question: 'Why is it significant that the very first act of creation involves the Spirit of God moving upon water? What does this tell us about God\'s design for the new birth?' },
        { number: 2, question: 'Peter calls baptism the antitype of Noah\'s flood. How does understanding the flood as a type of baptism strengthen your view of baptism\'s necessity?' },
        { number: 3, question: 'Naaman had to obey God\'s specific instructions — dipping in the Jordan, not the rivers of Damascus. What does this say about the importance of obeying God\'s plan of salvation exactly as He prescribed it?' },
      ],
    },

    // ── Lesson 2 ──────────────────────────────────────────
    {
      id: 'pos-2',
      number: 2,
      title: '"The Prophets Saw It Coming"',
      subtitle: 'Old Testament Prophecies of the New Birth',
      openingThought:
        'The prophets did not guess about the future. They saw it. Centuries before Pentecost, Ezekiel described clean water, a new heart, and God\'s Spirit within — all three elements of Acts 2:38 in a single prophecy. Joel saw the Spirit poured on all flesh. Isaiah heard stammering lips and another tongue. The plan of salvation was written in advance.',
      scriptures: [
        {
          reference: 'Ezekiel 36:25-27',
          text: 'Then will I sprinkle clean water upon you, and ye shall be clean: from all your filthiness, and from all your idols, will I cleanse you. A new heart also will I give you, and a new spirit will I put within you: and I will take away the stony heart out of your flesh, and I will give you an heart of flesh. And I will put my spirit within you, and cause you to walk in my statutes, and ye shall keep my judgments, and do them.',
          isPrimary: true,
        },
        {
          reference: 'Joel 2:28-29',
          text: 'And it shall come to pass afterward, that I will pour out my spirit upon all flesh; and your sons and your daughters shall prophesy, your old men shall dream dreams, your young men shall see visions: And also upon the servants and upon the handmaids in those days will I pour out my spirit.',
          isPrimary: false,
        },
        {
          reference: 'Isaiah 28:11-12',
          text: 'For with stammering lips and another tongue will he speak to this people. To whom he said, This is the rest wherewith ye may cause the weary to rest; and this is the refreshing: yet they would not hear.',
          isPrimary: false,
        },
      ],
      content: [
        'Ezekiel 36:25-27 is one of the most remarkable prophecies in the Old Testament because it contains all three elements of the new birth plan in a single passage. God says, "I will sprinkle clean water upon you, and ye shall be clean" — water baptism. "A new heart also will I give you" — repentance. "I will put my spirit within you" — the Holy Ghost. Six centuries before Peter stood on the day of Pentecost and commanded, "Repent, and be baptized... and ye shall receive the gift of the Holy Ghost," Ezekiel saw it. Acts 2:38 was not an invention of the early church — it was the fulfillment of ancient prophecy.',
        'Joel 2:28-29 declares the outpouring of the Spirit upon ALL flesh — not just prophets, not just priests, not just men. Sons and daughters, old and young, servants and handmaids. When Peter stood on Pentecost and heard the crowd\'s amazement at tongues, his interpretation was immediate and authoritative: "This is THAT which was spoken by the prophet Joel" (Acts 2:16). Joel saw the Spirit crossing every barrier — gender, age, social status. The promise was universal from the moment it was prophesied.',
        'Isaiah prophesied with stunning specificity. In Isaiah 28:11-12, he declared, "With stammering lips and another tongue will he speak to this people." Paul quotes this passage in 1 Corinthians 14:21, identifying it as a prophecy of speaking in tongues. Isaiah called the experience "the rest" and "the refreshing." In Isaiah 44:3, God pairs water and Spirit in Hebrew parallelism: "I will pour water upon him that is thirsty, and floods upon the dry ground: I will pour my spirit upon thy seed." Water and Spirit, side by side, as they always are in God\'s plan.',
        'Jeremiah 31:31-34 announces the New Covenant — God\'s law written on hearts by the Spirit, not on stone by a chisel. And Zechariah provides a breathtaking sequence: after "they shall look upon me whom they have pierced" (12:10) comes "a fountain opened... for sin and for uncleanness" (13:1). The pierced Savior opens the fountain. The cross precedes the cleansing. Zechariah saw Calvary and baptism in the same vision.',
        'The convergence of prophetic testimony is overwhelming. Proverbs 1:23 pleads, "Turn you at my reproof: behold, I will pour out my spirit unto you." Ezekiel 37 depicts dry bones receiving ruach — the same Hebrew word used for the "rushing mighty wind" of Acts 2:2. And Isaiah 12:3 declares, "Therefore with joy shall ye draw water out of the wells of yeshuah" — and yeshuah is not only the Hebrew word for salvation, it is the root of Jesus\' name. Draw water from the wells of Jesus. The prophets were not speaking in abstractions. They were seeing the plan.',
      ],
      wordStudies: [
        {
          original: 'רוּחַ',
          transliteration: 'ruach',
          pronunciation: 'ROO-akh',
          language: 'Hebrew',
          meaning: 'Spirit; wind; breath',
          explanation:
            'Ruach carries a triple meaning — spirit, wind, and breath — that connects the Old Testament directly to the New. In Ezekiel 37, ruach is the breath that raises dry bones to life. In Acts 2:2, the Holy Ghost arrives as a "rushing mighty wind." The same word, the same power, the same God. The ruach that hovered over creation\'s waters (Genesis 1:2) is the ruach that filled the upper room.',
        },
        {
          original: 'יְשׁוּעָה',
          transliteration: 'yeshuah',
          pronunciation: 'yeh-SHOO-ah',
          language: 'Hebrew',
          meaning: 'Salvation; deliverance; rescue',
          explanation:
            'Yeshuah is the Hebrew word for salvation and is the root of the name Jesus (Yeshua). When Isaiah 12:3 says "draw water out of the wells of yeshuah," it is a prophecy layered with meaning: salvation is found in the waters that bear Jesus\' name. The very language of the Old Testament encoded the name of Jesus into the promise of salvation.',
        },
      ],
      keyInsight:
        'Ezekiel saw clean water, a new heart, and God\'s Spirit within — all three elements of Acts 2:38 — in a single prophecy, six centuries before Pentecost. The prophets were not guessing. They were seeing the plan written in advance.',
      reflectionQuestions: [
        { number: 1, question: 'Ezekiel 36:25-27 mentions clean water, a new heart, and God\'s Spirit. How do these three elements correspond to Acts 2:38?' },
        { number: 2, question: 'Isaiah called speaking in tongues "the rest" and "the refreshing." How does this change the way you view the experience of receiving the Holy Ghost?' },
        { number: 3, question: 'Isaiah 12:3 says to "draw water out of the wells of yeshuah" — salvation, the root of Jesus\' name. What does this tell us about baptism in Jesus\' name?' },
      ],
    },

    // ── Lesson 3 ──────────────────────────────────────────
    {
      id: 'pos-3',
      number: 3,
      title: '"Born of Water and Spirit"',
      subtitle: 'Jesus Prescribes the Plan',
      openingThought:
        'Jesus did not leave the plan of salvation to human interpretation. In the strongest possible language — "Verily, verily" — He declared that entrance into the kingdom of God requires birth of water and of the Spirit. He prescribed the plan in John 3, commissioned it in Luke 24, and His apostles obeyed it to the letter.',
      scriptures: [
        {
          reference: 'John 3:3-5',
          text: 'Jesus answered and said unto him, Verily, verily, I say unto thee, Except a man be born again, he cannot see the kingdom of God. Nicodemus saith unto him, How can a man be born when he is old? can he enter the second time into his mother\'s womb, and be born? Jesus answered, Verily, verily, I say unto thee, Except a man be born of water and of the Spirit, he cannot enter into the kingdom of God.',
          isPrimary: true,
        },
        {
          reference: 'Luke 24:46-49',
          text: 'And said unto them, Thus it is written, and thus it behoved Christ to suffer, and to rise from the dead the third day: And that repentance and remission of sins should be preached in his name among all nations, beginning at Jerusalem. And ye are witnesses of these things. And, behold, I send the promise of my Father upon you: but tarry ye in the city of Jerusalem, until ye be endued with power from on high.',
          isPrimary: false,
        },
        {
          reference: 'Mark 16:16-17',
          text: 'He that believeth and is baptized shall be saved; but he that believeth not shall be damned. And these signs shall follow them that believe; In my name shall they cast out devils; they shall speak with new tongues.',
          isPrimary: false,
        },
      ],
      content: [
        'Jesus introduces His declaration to Nicodemus with "Verily, verily" — amen, amen in Greek — the strongest possible affirmation in Jewish discourse. He then uses the phrase ean me, meaning "unless" or "except," followed by ou dunatai — "cannot." This is not a suggestion or an invitation to consider. It is an absolute impossibility without compliance. A single preposition, ex, governs both "water" and "Spirit," binding them as two elements of one birth, not two separate experiences. Jesus prescribed the new birth as non-negotiable.',
        'The Greek word anothen, typically translated "again" in John 3:3, means "from above" in every other occurrence in John\'s Gospel — John 3:31 ("he that cometh from above"), John 19:11 ("given thee from above"), John 19:23 ("woven from the top"). Nicodemus misunderstood because he heard "again" when Jesus meant "from above." This birth is not a second attempt at natural life. It is a supernatural birth, originating from heaven, accomplished through water and the Spirit of God.',
        'Luke 24:46-49 is the interpretive key that unlocks the Great Commission. In His final instructions, Jesus prescribed three things: repentance, remission of sins preached in His name, and power from on high. He specified that this would begin at Jerusalem. When Pentecost arrived, Peter preached exactly this: "Repent, and be baptized every one of you in the name of Jesus Christ for the remission of sins, and ye shall receive the gift of the Holy Ghost" (Acts 2:38). Jesus prescribed what Peter preached. There is no contradiction — there is fulfillment.',
        'Matthew 28:19 commands baptism "in the name of the Father, and of the Son, and of the Holy Ghost." The word "name" — onoma in Greek — is singular, not plural. Father, Son, and Holy Ghost are titles describing roles, not names identifying persons. Jesus said, "I am come in my Father\'s name" (John 5:43). The angel told Mary, "Thou shalt call his name JESUS" (Matthew 1:21). The Holy Ghost comes "in my name" (John 14:26). The singular name of the Father, Son, and Holy Ghost is Jesus. Every baptism recorded in Acts was performed in the name of Jesus — because the apostles understood the command.',
        'At the Feast of Tabernacles, during the water-pouring ceremony, Jesus stood and cried, "If any man thirst, let him come unto me, and drink. He that believeth on me, as the scripture hath said, out of his belly shall flow rivers of living water" (John 7:37-38). John then interprets: "This spake he of the Spirit, which they that believe on him should receive: for the Holy Ghost was not yet given" (v.39). The living water is the Holy Ghost, and it awaited Pentecost. Jesus stood in the middle of a water ceremony and pointed forward to the outpouring of the Spirit.',
      ],
      wordStudies: [
        {
          original: 'ἄνωθεν',
          transliteration: 'anothen',
          pronunciation: 'AH-noh-then',
          language: 'Greek',
          meaning: 'From above; from a higher place; from heaven',
          explanation:
            'Anothen is consistently translated "from above" in every other usage in John\'s Gospel (3:31, 19:11, 19:23). Nicodemus misunderstood Jesus because he interpreted the word as "again" rather than "from above." The new birth is not a second attempt at natural life — it is a supernatural birth originating from heaven, accomplished through water and the Spirit of God.',
        },
        {
          original: 'ὄνομα',
          transliteration: 'onoma',
          pronunciation: 'OH-noh-mah',
          language: 'Greek',
          meaning: 'Name; authority; the character and identity represented by a name',
          explanation:
            'Onoma appears in singular form in Matthew 28:19 — "in the name," not "in the names." Father, Son, and Holy Ghost are titles describing roles, not names identifying separate persons. The apostles understood that the one name encompassing all three titles is Jesus (John 5:43, Matthew 1:21, John 14:26), which is why every baptism in Acts was performed in the name of Jesus Christ.',
        },
      ],
      keyInsight:
        'Jesus prescribed the new birth in John 3:5, binding water and Spirit as two elements of one birth. He commissioned repentance, remission of sins in His name, and power from on high in Luke 24:47-49. He left nothing to speculation. The apostles simply obeyed.',
      reflectionQuestions: [
        { number: 1, question: 'In John 3:5, Jesus uses the strongest possible language — "Verily, verily... except... cannot." Why is it important to take this statement at full force rather than treating the new birth as optional?' },
        { number: 2, question: 'If "name" in Matthew 28:19 is singular, and the apostles always baptized in Jesus\' name, what does that tell us about how they understood the Great Commission?' },
        { number: 3, question: 'Luke 24:47-49 prescribes repentance, remission of sins in His name, and power from on high. How does Acts 2:38 fulfill each of these three elements?' },
      ],
    },

    // ── Lesson 4 ──────────────────────────────────────────
    {
      id: 'pos-4',
      number: 4,
      title: '"This Is That"',
      subtitle: 'The Day of Pentecost and the Birth of the Church',
      openingThought:
        'Everything before this moment was preparation. The types foreshadowed it, the prophets foresaw it, and Jesus prescribed it. Now, on the day of Pentecost, the plan of salvation moves from promise to reality. One hundred and twenty believers, one upper room, one outpouring, and one answer for all of humanity: "Repent, and be baptized every one of you in the name of Jesus Christ."',
      scriptures: [
        {
          reference: 'Acts 2:38-39',
          text: 'Then Peter said unto them, Repent, and be baptized every one of you in the name of Jesus Christ for the remission of sins, and ye shall receive the gift of the Holy Ghost. For the promise is unto you, and to your children, and to all that are afar off, even as many as the Lord our God shall call.',
          isPrimary: true,
        },
        {
          reference: 'Acts 2:1-4',
          text: 'And when the day of Pentecost was fully come, they were all with one accord in one place. And suddenly there came a sound from heaven as of a rushing mighty wind, and it filled all the house where they were sitting. And there appeared unto them cloven tongues like as of fire, and it sat upon each of them. And they were all filled with the Holy Ghost, and began to speak with other tongues, as the Spirit gave them utterance.',
          isPrimary: false,
        },
        {
          reference: 'Acts 2:36-37',
          text: 'Therefore let all the house of Israel know assuredly, that God hath made that same Jesus, whom ye have crucified, both Lord and Christ. Now when they heard this, they were pricked in their heart, and said unto Peter and to the rest of the apostles, Men and brethren, what shall we do?',
          isPrimary: false,
        },
      ],
      content: [
        'The divine architecture is staggering. Pentecost — Shavuot — is the same feast that commemorated the giving of the Law at Sinai. At Sinai: fire came down, God spoke, the Law was written on stone, and three thousand people died for worshipping the golden calf. At Pentecost: fire came down, the Spirit spoke through human vessels, the law was written on hearts, and three thousand people were saved and baptized. Sinai brought the letter that kills; Pentecost brought the Spirit that gives life. God chose the exact same feast day to replace the old with the new.',
        'Acts 2:1-4 records that ALL one hundred and twenty were filled with the Holy Ghost and ALL began to speak with other tongues — heterais glossais, languages of a different kind. These were recognizable languages (vv.8-11), not ecstatic utterance. The crowd heard their own languages being spoken by Galilean believers. This was the initial evidence of the Holy Ghost baptism, and it was universal — every person who was filled spoke in tongues. The pattern was established at the very birth of the church.',
        'Peter\'s sermon was a masterwork of apostolic preaching. He began with "This is THAT which was spoken by the prophet Joel" (v.16) — prophecy fulfilled. He preached the death, burial, and resurrection of Jesus Christ. He declared Jesus to be "both Lord and Christ" (v.36) — the one God revealed in flesh. The crowd was katanusso — pierced, stabbed with conviction (v.37). The word implies a deep, painful penetration of the conscience. They did not casually inquire; they cried out, "What shall we do?"',
        'Acts 2:38 is the complete plan of salvation in one verse. "Repent" — metanoeo, a total change of mind and direction. "Be baptized every one of you in the name of Jesus Christ" — not in titles, but in the name the apostles understood from Jesus\' own commission. "For the remission of sins" — the preposition eis means "for the purpose of," the same word used in Matthew 26:28 where Jesus\' blood was shed eis the remission of sins. It cannot mean "because of" there, and it does not mean "because of" here. "And ye shall receive the gift of the Holy Ghost" — the promise, the power, the evidence. Three commands, three experiences, one salvation.',
        'The scope of the promise is breathtaking. "For the promise is unto you, and to your children, and to all that are afar off, even as many as the Lord our God shall call" (Acts 2:39). No expiration date. No geographic limitation. No ethnic restriction. Three thousand were baptized that day, and the church was born — not with a creed, not with a council, but with an outpouring of water and Spirit. The pattern was set for every generation that would follow.',
      ],
      wordStudies: [
        {
          original: 'κατανύσσω',
          transliteration: 'katanusso',
          pronunciation: 'kah-tah-NOOS-soh',
          language: 'Greek',
          meaning: 'To pierce; to stab; to be pierced with deep conviction',
          explanation:
            'Katanusso in Acts 2:37 describes the crowd\'s response to Peter\'s sermon — they were pierced to the heart. The word implies a violent, deep penetration of the conscience, not a casual emotional response. It is the same intensity that demands an answer. Their cry — "What shall we do?" — was the cry of people whose entire worldview had been shattered by the revelation that the Jesus they crucified was Lord and Christ.',
        },
        {
          original: 'εἰς',
          transliteration: 'eis',
          pronunciation: 'ice',
          language: 'Greek',
          meaning: 'Into; for the purpose of; toward the goal of',
          explanation:
            'Eis in Acts 2:38 — "for the remission of sins" — means "for the purpose of," indicating baptism\'s role in the remission of sins. The same preposition appears in Matthew 26:28, where Jesus\' blood was shed eis the remission of sins. If eis means "for the purpose of" when applied to Christ\'s blood, it carries the same meaning when applied to baptism. Baptism in Jesus\' name is not a symbol after the fact — it is the instrument of remission.',
        },
      ],
      keyInsight:
        'Acts 2:38 is not one interpretation among many — it is the apostolic answer to the universal question, "What shall we do?" The complete new birth in one verse, and the promise extends to everyone God will ever call.',
      reflectionQuestions: [
        { number: 1, question: 'Sinai brought fire, the Law on stone, and 3,000 deaths. Pentecost brought fire, the Spirit on hearts, and 3,000 saved. What does this parallel reveal about God\'s plan?' },
        { number: 2, question: 'The preposition eis in Acts 2:38 means "for the purpose of." How does this affect the argument that baptism is merely symbolic or optional?' },
        { number: 3, question: 'Acts 2:39 says the promise is to "all that are afar off, even as many as the Lord our God shall call." What does this mean for people today who hear the gospel?' },
      ],
    },

    // ── Lesson 5 ──────────────────────────────────────────
    {
      id: 'pos-5',
      number: 5,
      title: '"The Unchanging Gospel"',
      subtitle: 'Every Conversion in Acts Proves the Pattern',
      openingThought:
        'If Acts 2:38 were an isolated event, skeptics might dismiss it as situational. But Acts does not give them that luxury. Across every barrier — Jewish, Samaritan, Ethiopian, Roman, Greek — the pattern repeats without variation: repentance, baptism by immersion in Jesus\' name, and the Holy Ghost with the evidence of speaking in tongues. This is the biblical record.',
      scriptures: [
        {
          reference: 'Acts 19:1-6',
          text: 'And it came to pass, that, while Apollos was at Corinth, Paul having passed through the upper coasts came to Ephesus: and finding certain disciples, He said unto them, Have ye received the Holy Ghost since ye believed? And they said unto him, We have not so much as heard whether there be any Holy Ghost. And he said unto them, Unto what then were ye baptized? And they said, Unto John\'s baptism. Then said Paul, John verily baptized with the baptism of repentance, saying unto the people, that they should believe on him which should come after him, that is, on Christ Jesus. When they heard this, they were baptized in the name of the Lord Jesus. And when Paul had laid his hands upon them, the Holy Ghost came on them; and they spake with tongues, and prophesied.',
          isPrimary: true,
        },
        {
          reference: 'Acts 10:44-48',
          text: 'While Peter yet spake these words, the Holy Ghost fell on all them which heard the word. And they of the circumcision which believed were astonished, as many as came with Peter, because that on the Gentiles also was poured out the gift of the Holy Ghost. For they heard them speak with tongues, and magnify God. Then answered Peter, Can any man forbid water, that these should not be baptized, which have received the Holy Ghost as well as we? And he commanded them to be baptized in the name of the Lord.',
          isPrimary: false,
        },
        {
          reference: 'Acts 22:16',
          text: 'And now why tarriest thou? arise, and be baptized, and wash away thy sins, calling on the name of the Lord.',
          isPrimary: false,
        },
      ],
      content: [
        'In Samaria (Acts 8:12-17), the people believed Philip\'s preaching and were baptized in the name of Jesus Christ. But they had not yet received the Holy Ghost. The apostles in Jerusalem sent Peter and John, who laid hands on the Samaritan believers, and they received the Holy Ghost. Simon the sorcerer saw something so dramatic that he offered money for the power to impart it. Whatever happened was visible, observable, and unmistakable. Belief and baptism alone were not the complete experience — the Holy Ghost was essential.',
        'At Cornelius\'s house (Acts 10:44-48), the Holy Ghost fell on the Gentile listeners before they were baptized. How did the Jewish believers know the Gentiles had received the Holy Ghost? "For they heard them speak with tongues" — the Greek conjunction gar means "for" in the sense of proof or evidence. Tongues was the unmistakable sign that convinced Jewish believers the Gentiles had received the same Spirit. And Peter did not consider the experience complete — he immediately commanded water baptism in the name of the Lord. The Holy Ghost and baptism are not alternatives; they are both necessary.',
        'Paul — Saul of Tarsus — had a direct, personal encounter with the risen Jesus Christ on the Damascus road. If any conversion could have stopped at "just believe," it was his. Yet Ananias came to him and said, "Arise, and be baptized, and wash away thy sins, calling on the name of the Lord" (Acts 22:16). Paul also received the Holy Ghost (Acts 9:17). Even a direct encounter with Jesus on the road to Damascus did not exempt him from the plan of salvation. Baptism in Jesus\' name was not optional for the apostle to the Gentiles, and it is not optional for anyone.',
        'At Ephesus (Acts 19:1-6), Paul found believers who had received John\'s baptism. His first question was diagnostic: "Have ye received the Holy Ghost since ye believed?" Their answer revealed the problem: they had not even heard of the Holy Ghost. Paul re-baptized them in the name of the Lord Jesus — proving that any baptism other than in Jesus\' name is insufficient. The Holy Ghost came upon them, and they spoke with tongues and prophesied. This was more than twenty years after Pentecost, and the pattern had not changed. This single passage demolishes both "just believe" theology and the idea that any baptismal formula is acceptable.',
        'The Philippian jailer cried, "What must I do to be saved?" — and was baptized the same hour of the night (Acts 16:30-33). The urgency was remarkable: he did not wait for morning, did not schedule a class, did not delay. The Ethiopian eunuch, upon hearing the gospel, immediately asked, "See, here is water; what doth hinder me to be baptized?" (Acts 8:36). Philip and the eunuch went down into the water — the Greek katabainō eis describes descent into, not sprinkling beside. Every detailed conversion in Acts includes baptism. There are no exceptions in the biblical record.',
      ],
      wordStudies: [
        {
          original: 'βαπτίζω',
          transliteration: 'baptizo',
          pronunciation: 'bap-TID-zoh',
          language: 'Greek',
          meaning: 'To immerse; to submerge; to plunge beneath',
          explanation:
            'Baptizo is the intensive form of bapto (to dip). It never means to sprinkle (rhantizo) or to pour (cheo). Greek had perfectly good words for sprinkling and pouring, but the New Testament never uses them for baptism. Baptizo means immersion — going completely under the water. When Philip and the Ethiopian went "down into the water," the language confirms what the word itself demands: baptism is full immersion.',
        },
        {
          original: 'γλῶσσα',
          transliteration: 'glossa',
          pronunciation: 'GLOHS-sah',
          language: 'Greek',
          meaning: 'Tongue; language; a supernaturally spoken language',
          explanation:
            'Glossa appears in the phrase heterais glossais — "other tongues" or "languages of a different kind" — at every detailed Holy Ghost outpouring in Acts. At Pentecost, they were recognizable languages (Acts 2:8-11). At Cornelius\'s house, tongues was the evidence that convinced Jewish believers (Acts 10:46). At Ephesus, tongues accompanied the Holy Ghost (Acts 19:6). Tongues is the consistent, biblical, initial evidence of the baptism of the Holy Ghost.',
        },
      ],
      keyInsight:
        'Acts records conversions across every barrier — Jewish, Samaritan, Ethiopian, Roman, Greek — and in every case the pattern is the same: repentance, baptism by immersion in Jesus\' name, and the Holy Ghost with tongues. This is the biblical record.',
      reflectionQuestions: [
        { number: 1, question: 'In Acts 8, the Samaritans believed and were baptized but had not received the Holy Ghost. What does this tell us about the relationship between belief, baptism, and the Holy Ghost?' },
        { number: 2, question: 'Paul re-baptized the Ephesian believers because they had only received John\'s baptism. What does this say about the importance of being baptized specifically in Jesus\' name?' },
        { number: 3, question: 'Even Paul, who met the risen Jesus on the Damascus road, still needed to be baptized and receive the Holy Ghost. What does this tell us about the universality of the plan of salvation?' },
      ],
    },

    // ── Lesson 6 ──────────────────────────────────────────
    {
      id: 'pos-6',
      number: 6,
      title: '"The Promise Is Unto You"',
      subtitle: 'The Gospel That Never Changes, For Everyone Today',
      openingThought:
        'If Jesus Christ is the same yesterday, today, and forever, then His gospel is the same yesterday, today, and forever. The washing of regeneration and renewing of the Holy Ghost that Paul described to Titus is the same plan Jesus prescribed to Nicodemus, Peter preached at Pentecost, and that extends to everyone God will ever call. The question is not whether the gospel still works. The question is whether we will obey it.',
      scriptures: [
        {
          reference: 'Hebrews 13:8',
          text: 'Jesus Christ the same yesterday, and to day, and for ever.',
          isPrimary: true,
        },
        {
          reference: 'Titus 3:5',
          text: 'Not by works of righteousness which we have done, but according to his mercy he saved us, by the washing of regeneration, and renewing of the Holy Ghost.',
          isPrimary: false,
        },
        {
          reference: 'Romans 6:3-5',
          text: 'Know ye not, that so many of us as were baptized into Jesus Christ were baptized into his death? Therefore we are buried with him by baptism into death: that like as Christ was raised up from the dead by the glory of the Father, even so we also should walk in newness of life. For if we have been planted together in the likeness of his death, we shall be also in the likeness of his resurrection.',
          isPrimary: false,
        },
      ],
      content: [
        'Hebrews 13:8 is not a greeting card verse — it is a theological absolute. If Jesus Christ does not change, then His gospel does not change. If Acts 2:38 was the answer for the three thousand on the day of Pentecost, it is the answer today. A gospel that evolves with culture, that softens its demands to suit modern sensibilities, that removes baptism or explains away tongues, is not the apostolic gospel. It is another gospel. The Christ who never changes delivered a plan that never changes.',
        'Paul writes to Titus that God "saved us, by the washing of regeneration, and renewing of the Holy Ghost" (Titus 3:5). The word "washing" is loutron — a laver, a bath, a washing vessel. "Regeneration" is palingenesia — palin (again) + genesis (birth) — literally, rebirth. Baptism IS the washing that produces new birth. And it is paired with "renewing of the Holy Ghost" — the same two elements Jesus prescribed in John 3:5. Water and Spirit. John 3:5, Acts 2:38, Titus 3:5 — the testimony is consistent across the New Testament.',
        'Romans 6:3-5 reveals what happens in baptism: we are buried with Christ into His death and raised to walk in newness of life. The word sumphutos in verse 5 means "grown together" or "organically fused" — not merely associated with, but biologically united to Christ\'s death and resurrection. Galatians 3:27 adds, "As many of you as have been baptized into Christ have put on Christ" — enduo, to clothe oneself with, to be enveloped by. Baptism is not a ritual gesture. It is the mechanism of union with Christ. It is how we enter into His death and emerge in His resurrection.',
        'The evidence of the Holy Ghost has never ceased. Acts 2:39 extends the promise perpetually — to "all that are afar off, even as many as the Lord our God shall call." Paul testified, "I thank my God, I speak with tongues more than ye all" (1 Corinthians 14:18). He commanded, "Forbid not to speak with tongues" (14:39). Ephesians 4:5 declares "one Lord, one faith, one baptism" — not many baptisms for different eras, but one baptism for all time. If the apostles spoke in tongues, if the early church spoke in tongues, and if the promise extends to everyone God will ever call, then tongues has not ceased and the baptism of the Holy Ghost is for today.',
        'Peter\'s promise on the day of Pentecost reaches across two thousand years and speaks directly to you: "The promise is unto you, and to your children, and to all that are afar off, even as many as the Lord our God shall call." The same God who poured out His Spirit in the upper room pours it out today — the same way, with the same evidence, all over the world. People are being baptized in Jesus\' name. People are being filled with the Holy Ghost and speaking in tongues. The gospel has not lost its power. The question has never been whether the plan still works. The question is whether you will answer as the three thousand did — with repentance, with obedience, and with faith that what God promised, He is able to perform.',
      ],
      wordStudies: [
        {
          original: 'παλιγγενεσία',
          transliteration: 'palingenesia',
          pronunciation: 'pah-lin-geh-neh-SEE-ah',
          language: 'Greek',
          meaning: 'Rebirth; regeneration; new genesis',
          explanation:
            'Palingenesia is a compound of palin (again) and genesis (birth/origin) — literally, "new birth" or "rebirth." In Titus 3:5, Paul calls baptism the "washing of regeneration" — the loutron (laver/washing) of palingenesia (rebirth). This is the apostolic declaration that baptism is not symbolic but is the actual washing that produces new birth, exactly as Jesus prescribed in John 3:5.',
        },
        {
          original: 'σύμφυτος',
          transliteration: 'sumphutos',
          pronunciation: 'SOOM-foo-tos',
          language: 'Greek',
          meaning: 'Grown together; organically fused; planted together',
          explanation:
            'Sumphutos in Romans 6:5 describes the believer\'s union with Christ in baptism — not a loose association, but an organic fusion, like a graft that becomes one with the tree. When we are buried with Christ in baptism, we are not performing a metaphor. We are being fused to His death so that we may be fused to His resurrection. Baptism is the mechanism of this union.',
        },
      ],
      keyInsight:
        'Jesus Christ is the same yesterday, today, and forever — and so is His gospel. The washing of regeneration and renewing of the Holy Ghost (Titus 3:5) is the same plan Jesus prescribed (John 3:5), Peter preached (Acts 2:38), and that extends to everyone God will ever call.',
      reflectionQuestions: [
        { number: 1, question: 'If Jesus Christ is the same yesterday, today, and forever (Hebrews 13:8), what does that mean for the plan of salvation He prescribed? Can the gospel change with time or culture?' },
        { number: 2, question: 'Paul calls baptism the "washing of regeneration" (Titus 3:5). How does this description affirm that baptism is not merely symbolic but essential to the new birth?' },
        { number: 3, question: 'Acts 2:39 says the promise extends to "all that are afar off, even as many as the Lord our God shall call." How does this promise apply to your life today?' },
      ],
    },
  ],
};

// ── Exports ───────────────────────────────────────────────
export const GUIDED_STUDIES: GuidedStudy[] = [THE_ONE_TRUE_GOD, ADORNED_IN_HOLINESS, FREE_FROM_THE_LAW, THE_PLAN_OF_SALVATION];