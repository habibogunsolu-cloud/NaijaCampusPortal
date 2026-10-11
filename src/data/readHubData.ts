export interface NovelChapter {
  chapter: number;
  title: string;
  summary: string;
  keyEvents: string[];
  keyQuotes: string[];
  examTips: string;
}

export interface NovelCharacter {
  name: string;
  role: string;
  description: string;
  significance: string;
}

export interface NovelData {
  id: string;
  title: string;
  author: string;
  genre: string;
  prescribedFor: string;
  sessionTag?: string;
  synopsis: string;
  themes: { title: string; description: string }[];
  characters: NovelCharacter[];
  chapters: NovelChapter[];
}

export interface QuestionItem {
  id: number;
  question: string;
  options: { key: string; text: string }[];
  correct: string;
  explanation: string;
  trapWarning: string;
  hint: string;
  year?: string;
  topic?: string;
}

export interface TheoryItem {
  id: number;
  title: string;
  question: string;
  totalMarks: string;
  topic: string;
  year?: string;
  markingScheme: { step: string; marks: string }[];
  modelAnswer: string;
  examinerAdvice: string;
}

// ==========================================
// OFFICIAL JAMB PRESCRIBED NOVEL: THE LIFE CHANGER
// ==========================================
export const THE_LIFE_CHANGER: NovelData = {
  id: 'the-life-changer',
  title: 'The Life Changer',
  author: 'Khadija Abubakar Jalli',
  genre: 'Campus Drama / Educational Fiction',
  prescribedFor: 'JAMB UTME (Use of English - 10 to 15 Compulsory Questions)',
  sessionTag: 'Current 2026/2027 Official JAMB Text',
  synopsis:
    'The Life Changer chronicles the university life of Salma and her peers at Lafayette University. Narrated primarily through Ummi (a mother sharing her campus memories with her children Omar, Teemah, Jamila, and Bint), the novel explores the temptations, peer pressures, academic integrity, and moral choices that confront young Nigerian youths entering tertiary institutions.',
  themes: [
    {
      title: 'Peer Pressure & campus vanity',
      description:
        'Salma is swayed by superficial university glamour and sophisticated friends, leading her into false illusions before reality strikes.',
    },
    {
      title: 'Parental Guidance & unconditional love',
      description:
        'Ummi and her husband continually guide Omar and his sisters about morals, preparing Omar for the freedom and pitfalls of university life.',
    },
    {
      title: 'Academic Integrity & Examination Malpractice',
      description:
        'Salma faces the dreaded Examination Malpractice Committee (EMC) after cheating in Moral Philosophy (a great irony) and relying on a mercenary ring involving Kabir and Kolawole Abdul.',
    },
    {
      title: 'The Deception of Appearance',
      description:
        'Habib, Labaran, and Kabir project wealth and power but operate behind masks of corruption, bribery, and exploitation.',
    },
    {
      title: 'Redemption & Forgiveness',
      description:
        'Despite betrayals and expulsion risks, forgiveness, reconciliation with roommates (Tomiwa, Ngozi, Ada), and personal repentance restore peace.',
    },
  ],
  characters: [
    {
      name: 'Ummi (The Mother / Narrator)',
      role: 'Omar’s mother and storyteller',
      description:
        'A warm, wise, and observant mother who uses bedtime storytelling to instill discipline and real-world campus wisdom in her children before Omar leaves for Lafayette University.',
      significance: 'Serves as the moral anchor of the narrative and bridges family life with university realities.',
    },
    {
      name: 'Omar',
      role: 'Ummi’s firstborn son',
      description:
        'Just passed his JAMB with an exceptional score of 230 points and gained admission into Lafayette University to study Law. He is proud and eager to experience university freedom.',
      significance: 'His admission is the catalyst that prompts Ummi’s deep reflections on campus life.',
    },
    {
      name: 'Salma',
      role: 'The Central Protagonist of the University plot',
      description:
        'A proud, attractive, and haughty girl from a wealthy background who looks down on university registration rules and hostel life. She struggles with vanity, falls victim to deception, and is caught cheating in exams.',
      significance: 'Embodies the perils of arrogance, campus lifestyle illusions, and the path to genuine remorse.',
    },
    {
      name: 'Tomiwa, Ngozi, and Ada',
      role: 'Salma’s Roommates in Queen Amina Hall',
      description:
        'A culturally diverse trio: Tomiwa (Yoruba, Muslim, generous, skilled cook), Ngozi (Igbo, quiet, reserved, Christian), and Ada (Middle Belt). Despite initial tensions, they form an inseparable bond of sisterhood.',
      significance: 'Demonstrates national unity and mutual support among Nigerian tertiary students regardless of tribe or faith.',
    },
    {
      name: 'Dr. Samuel Johnson',
      role: 'The HOD of Accounting / Lecturer',
      description:
        'A friendly, accommodating lecturer whom Ummi originally mistook for an aggressive staff during her own university registration days.',
      significance: 'Teaches that first impressions can often be misleading.',
    },
    {
      name: 'Habib & Labaran',
      role: 'Politician and his driver / aide',
      description:
        'Habib is a wealthy politician who gives money and rides to girls; Labaran is his loyal driver and fixer who executes shady dealings.',
      significance: 'Represent external corrupting influences that prey upon university undergraduates.',
    },
    {
      name: 'Kabir',
      role: 'The fraudulent University clerk / gambler',
      description:
        'A cunning laboratory attendant masquerading as an EMC member who extorts huge bribes from Salma under the pretext of clearing her examination malpractice charge, only to gamble it away at poker.',
      significance: 'Highlights the scourge of extortion and fraudulent middlemen on campus.',
    },
    {
      name: 'Kolawole Abdul',
      role: 'The candidate sitting beside Salma in the exam hall',
      description:
        'He assisted Salma with cheat notes in Moral Philosophy and was caught red-handed alongside her by the female invigilator.',
      significance: 'Represents the danger of collusion during semester examinations.',
    },
    {
      name: 'Bint, Teemah, Jamila',
      role: 'Omar’s inquisitive younger sisters',
      description:
        'Bint is the witty 5-year-old primary school pupil who outsmarts her French teacher; Teemah and Jamila engage their mother with witty arguments.',
      significance: 'Provide humor, domestic warmth, and conversational dialogue.',
    },
  ],
  chapters: [
    {
      chapter: 1,
      title: 'Family Celebration, Omar’s Admission & Bint’s French Class',
      summary:
        'Omar bursts into the family living room rejoicing over his stellar JAMB score of 230 and admission into Lafayette University to read Law. His younger sister Bint recounts how she cleverly asked her primary school French teacher the French translation for "That’s right" (Au revoir / Oui c’est ça), prompting laughter. Ummi begins preparing Omar for the stark contrast between home comfort and university autonomy.',
      keyEvents: [
        'Omar scores 230 in JAMB and gets admitted into Law.',
        'Bint shares her classroom experience outsmarting her teacher.',
        'Ummi cautions Omar that university life gives complete freedom, but freedom requires self-restraint.',
      ],
      keyQuotes: [
        '"In the university, no one rings a bell for lectures or wake-up."',
        '"Freedom without boundaries is the swiftest recipe for self-destruction."',
      ],
      examTips: 'JAMB tests Omar’s exact score (230), his proposed course (Law), and Bint’s classroom interaction.',
    },
    {
      chapter: 2,
      title: 'Ummi’s Matriculation & The Misunderstood Lecturer (Dr. Johnson)',
      summary:
        'Ummi flashes back twenty years to her own registration at Lafayette University. A naive freshman in her modest hijab, she was terrified by campus rumors about ruthless lecturers. When directed to the HOD’s office, she found Dr. Samuel Johnson reading files. She initially misjudged his stern look, but he treated her with exceptional fatherly care, even praising her modesty. She learned that appearances often deceive.',
      keyEvents: [
        'Ummi describes the strict dress code and cultural adjustment at Lafayette.',
        'Her encounter with Dr. Samuel Johnson in the Accounting department.',
        'Dr. Johnson demonstrates that decent behavior attracts respect anywhere in academia.',
      ],
      keyQuotes: [
        '"Do not judge a book by its cover, nor a lecturer by common campus gossip."',
      ],
      examTips: 'Remember Dr. Johnson’s relationship with Ummi and his position as HOD of Accounting.',
    },
    {
      chapter: 3,
      title: 'The Legend of the Quiet Village & The Mysterious Hakimi',
      summary:
        'Ummi shares a folklore tale from her ancestral village about Hakimi and the boy who was born with physical defects. The village learned never to stigmatize anyone based on physical birth or misfortune. The community unity illustrated how societal safety depends on protecting the vulnerable.',
      keyEvents: [
        'Story of Hakimi and traditional conflict resolution.',
        'Moral lesson on empathy and community responsibility.',
      ],
      keyQuotes: [
        '"A village that mocks the unfortunate summons tragedy upon its own household."',
      ],
      examTips: 'Focus on the moral lessons of empathy and traditional African communal ethics.',
    },
    {
      chapter: 4,
      title: 'Salma’s Arrival & The Arrogant Queue at Registration',
      summary:
        'The story shifts to Salma, an exceptionally pretty undergraduate arriving at Lafayette University. She despises queuing under the scorching sun for screening. She encounters an undergraduate named Dabo in the queue and tries to mock the university administrative process. However, Dabo refuses to be provoked. Salma is eventually allocated a room in Queen Amina Hall, which she initially considers beneath her standards.',
      keyEvents: [
        'Salma’s boastful arrival and refusal to queue patiently.',
        'Her dialogue with Dabo, who cautions her against pride.',
        'Allocation to Queen Amina Hall alongside Tomiwa, Ngozi, and Ada.',
      ],
      keyQuotes: [
        '"Patience in an admission line is a test of university readiness."',
      ],
      examTips: 'Note the name of Salma’s hostel: Queen Amina Hall, and Dabo’s role during the screening queue.',
    },
    {
      chapter: 5,
      title: 'Queen Amina Hall: The Four Roommates & The Mercedes Benz Ride',
      summary:
        'Salma moves into Queen Amina Hall. Her roommates—Tomiwa (from Oyo State), Ngozi (from Abia State), and Ada (from Benue State)—form a multicultural alliance. One evening, Salma is invited for an outing in a shiny Mercedes Benz driven by Habib, a wealthy politician, and Labaran. Misunderstandings ensue when Habib is actually attracted to Tomiwa’s wit rather than Salma, sparking jealousy and vanity conflicts.',
      keyEvents: [
        'The peaceful coexistence of the four culturally diverse roommates.',
        'Tomiwa’s delicious meals and communal sharing in Queen Amina Hall.',
        'The ride with Honorable Habib and the politician’s deceptive generosity.',
      ],
      keyQuotes: [
        '"Tribal and religious differences melt away when genuine student fellowship begins."',
      ],
      examTips: 'Know the states of origin of all four roommates: Salma (Northern), Tomiwa (Oyo/Yoruba), Ngozi (Abia/Igbo), Ada (Benue).',
    },
    {
      chapter: 6,
      title: 'Moral Philosophy Examination & The Malpractice Trap',
      summary:
        'Salma is in her final year and unprepared for her Moral Philosophy paper. Despite having studied morals, she resorts to cheating by exchanging handwritten answers with Kolawole Abdul, the boy seated next to her. A sharp-eyed female invigilator catches them red-handed. Both candidates are handed the Malpractice Form and summoned to appear before the dreaded Examination Malpractice Committee (EMC).',
      keyEvents: [
        'The irony of cheating in a "Moral Philosophy" exam.',
        'The female invigilator spots Kolawole Abdul and Salma exchanging notes.',
        'Confiscation of answer booklets and issuance of the EMC summons.',
      ],
      keyQuotes: [
        '"How tragic that the examination you chose to cheat in was titled Moral Philosophy!"',
      ],
      examTips: 'JAMB frequently tests the name of the paper: Moral Philosophy, and the name of the male collaborator: Kolawole Abdul.',
    },
    {
      chapter: 7,
      title: 'Kabir the Middleman, The Fake EMC Bribe & The Gambling Den',
      summary:
        'Desperate to avoid expulsion, Salma confides in Labaran, who links her to Kabir, supposedly a connected staff who can bribe the EMC chairman. Salma hands over a huge sum of money (N100,000) to Kabir. Instead of intervening, Kabir heads straight to a local gambling parlor to wager the entire sum on a poker game and loses everything to card sharks.',
      keyEvents: [
        'Salma seeks an illicit shortcut through Kabir to escape punishment.',
        'Kabir swindles Salma and squanders the bribe at a gambling spot.',
        'Salma realizes she has been defrauded and left with zero protection.',
      ],
      keyQuotes: [
        '"Bribing an extortionist only deepens the pit beneath your feet."',
      ],
      examTips: 'Remember Kabir’s true identity (laboratory attendant/gambler, NOT an EMC board member) and his fate at the gambling den.',
    },
    {
      chapter: 8,
      title: 'The Trial before the EMC & The Verdict of Expulsion',
      summary:
        'Salma and Kolawole Abdul face the official Examination Malpractice Committee (EMC). Without Kabir’s promised intervention, the facts are laid bare. Kolawole confesses while Salma breaks down in tears. The committee recommends immediate expulsion for both candidates, upholding Lafayette University’s zero-tolerance policy against exam fraud.',
      keyEvents: [
        'The formal grilling before the university disciplinary panel.',
        'The conclusive evidence from the female invigilator.',
        'The devastating verdict of expulsion handed to Salma.',
      ],
      keyQuotes: [
        '"University degrees are awarded in character and in learning, never in fraud."',
      ],
      examTips: 'Questions often test the motto/principles of degree awards: "In Character and in Learning".',
    },
    {
      chapter: 9,
      title: 'Salma’s Repentance, Reconciliation & Omar’s Departure',
      summary:
        'Devastated by expulsion, Salma returns to Queen Amina Hall to pack her belongings. Her roommates Tomiwa, Ngozi, and Ada show profound compassion instead of mockery. Salma repents genuinely, shedding her arrogance. Back in the living room, Ummi finishes the story. Omar is visibly sobered and promises never to take university freedom or moral boundaries for granted as he packs his bags for campus.',
      keyEvents: [
        'Roommates forgive and embrace Salma, displaying true friendship.',
        'Salma acknowledges her pride as her greatest undoing.',
        'Omar steps out with renewed maturity, determined to succeed with honor.',
      ],
      keyQuotes: [
        '"Life is indeed a changer; what matters is whether it changes you for better or worse."',
      ],
      examTips: 'The core takeaway of the entire novel: Self-discipline, humility, and academic honesty.',
    },
  ],
};

// ==========================================
// PRESCRIBED NOVEL 2: SWEET SIXTEEN (BOLAJI ABDULLAHI)
// ==========================================
export const SWEET_SIXTEEN: NovelData = {
  id: 'sweet-sixteen',
  title: 'Sweet Sixteen',
  author: 'Bolaji Abdullahi',
  genre: 'Adolescent Guidance / Coming-of-Age Fiction',
  prescribedFor: 'JAMB UTME (Use of English - Compulsory Questions)',
  sessionTag: 'JAMB Prescribed Text Series',
  synopsis:
    'Written by Bolaji Abdullahi, Sweet Sixteen centers around Aliya, a precocious 16-year-old girl, and her journalist father, Mr. Bello. On her sixteenth birthday, instead of just an ordinary gift, her father presents her with a deeply personal letter titled "Letter to My Daughter" containing seven insightful chapters discussing teenagers, identity, boys, relationships, drive, work, stereotypes, and moral decisions.',
  themes: [
    {
      title: 'Paternal Guidance & Dialogue',
      description: 'Mr. Bello uses open, non-judgmental discussions to prepare Aliya for womanhood and self-worth.',
    },
    {
      title: 'Identity & Self-Esteem',
      description: 'Addressing skin bleach, body image, and peer-driven vanity among teenagers.',
    },
    {
      title: 'Stereotypes & Tribal Prejudice',
      description: 'Challenging generalized biases across Nigerian ethnic lines (Hausa, Yoruba, Igbo).',
    },
    {
      title: 'Drive & True Meaning of Work',
      description: 'Distinguishing between empty desire for wealth and the rigorous dedication to excellence.',
    },
  ],
  characters: [
    {
      name: 'Aliya Bello',
      role: 'Protagonist / 16-year-old high school student',
      description: 'Intelligent, inquisitive, sometimes rebellious teenager navigating the threshold of adulthood.',
      significance: 'Represents contemporary Nigerian teenage students facing peer and emotional dilemmas.',
    },
    {
      name: 'Mr. Bello',
      role: 'Aliya’s Father / Columnist & Intellectual',
      description: 'Thoughtful, compassionate father who answers complex adolescent questions with patience and humor.',
      significance: 'The guiding moral compass of the narrative.',
    },
    {
      name: 'Mrs. Bello',
      role: 'Aliya’s Mother',
      description: 'Pragmatic and loving mother who provides domestic stability and emotional warmth.',
      significance: 'Complements Mr. Bello’s philosophical advice with daily grounded wisdom.',
    },
    {
      name: 'Bobo & Akin',
      role: 'Schoolmates & Admirers',
      description: 'Boys in Aliya’s circle who trigger her father’s discussions on infatuation vs true commitment.',
      significance: 'Illustrates high school romance dynamics and the dangers of early distractions.',
    },
  ],
  chapters: [
    {
      chapter: 1,
      title: 'The Letter to My Daughter',
      summary:
        'Aliya turns sixteen and receives an unexpected gift from her father: a thick envelope filled with personalized letters advising her on the crucial transition from childhood to womanhood.',
      keyEvents: ['Aliya’s 16th birthday celebration', 'Presentation of the customized life guide letter by Mr. Bello'],
      keyQuotes: ['"To be sixteen is to stand on the edge of the world and wonder where you fit in."'],
      examTips: 'Exam questions often ask about the specific birthday gift Aliya received from her father.',
    },
    {
      chapter: 2,
      title: 'The Drive',
      summary:
        'Mr. Bello takes Aliya on an evening drive, discussing ambition, personal motivation, and how purpose distinguishes successful youths from aimless wanderers.',
      keyEvents: ['Father-daughter car ride conversation', 'Discussion on genuine passion versus peer imitation'],
      keyQuotes: ['"Drive is what pushes you forward when everyone else has chosen to sit down."'],
      examTips: 'Remember the metaphor of driving used by Mr. Bello to explain self-determination.',
    },
    {
      chapter: 3,
      title: 'Work and Excellence',
      summary:
        'A discourse on the dignity of labor, rejecting entitlement, and understanding that lasting wealth and scholarship are built through persistent sweat and study.',
      keyEvents: ['Critique of shortcut mentalities', 'Examination of hard work and self-reliance'],
      keyQuotes: ['"There are no elevators to genuine greatness; you must take the stairs."'],
      examTips: 'Focus on Mr. Bello’s views on sudden wealth syndrome among youth.',
    },
    {
      chapter: 4,
      title: 'The Dumbest Reason to Fall in Love',
      summary:
        'Aliya questions her father about boys, relationships, and romance. Mr. Bello humorously explains infatuation, warning against dating someone purely for physical looks or peer status.',
      keyEvents: ['Discussion about Bobo and high school crushes', 'Analysis of emotional maturity and true affection'],
      keyQuotes: ['"Loving someone because of how they look is like buying a book purely for its cover."'],
      examTips: 'Frequent JAMB question: What did Mr. Bello call the "dumbest reason" to fall in love?',
    },
    {
      chapter: 5,
      title: 'Beauty and Self-Worth',
      summary:
        'Mr. Bello addresses cosmetic insecurity, skin bleaching, and social media validation, urging Aliya to anchor her dignity in intellect, empathy, and virtue.',
      keyEvents: ['Critique of false cosmetic standards', 'Affirmation of natural African beauty and intelligence'],
      keyQuotes: ['"True beauty does not wash off in the rain or fade with evening shadows."'],
      examTips: 'Examine Mr. Bello’s arguments against artificial cosmetic alterations and bleaching.',
    },
  ],
};

// ==========================================
// PRESCRIBED NOVEL 3: IN DEPENDENCE (SARAH LADIPO MANYIKA)
// ==========================================
export const IN_DEPENDENCE: NovelData = {
  id: 'in-dependence',
  title: 'In Dependence',
  author: 'Sarah Ladipo Manyika',
  genre: 'Historical Romance / Sociopolitical Fiction',
  prescribedFor: 'JAMB UTME (Use of English - Compulsory Questions)',
  sessionTag: 'JAMB Prescribed Classic Text',
  synopsis:
    'Set against the euphoria of Nigeria’s 1960 independence and spanning over thirty years between Oxford, England and Ibadan/Lagos, Nigeria. It tells the epic love story of Tayo Ajayi, a brilliant Nigerian scholarship student at Balliol College, Oxford, and Vanessa Richardson, the daughter of a retired British colonial officer in Nigeria.',
  themes: [
    {
      title: 'Independence & Neocolonialism',
      description: 'Parallels personal emotional independence with Nigeria’s turbulent post-independence political journey.',
    },
    {
      title: 'Interracial Love & Cultural Barriers',
      description: 'The triumph and heartbreak of romance bridging racial, historical, and family divides.',
    },
    {
      title: 'Brain Drain & Nigerian Intellectual Diaspora',
      description: 'The choice between staying abroad in Western comfort or returning to build post-colonial Nigeria.',
    },
  ],
  characters: [
    {
      name: 'Tayo Ajayi',
      role: 'Protagonist / Nigerian Oxford Scholar',
      description: 'Gifted, patriotic Nigerian student whose life mirrors Nigeria’s hopes, struggles, and military coups.',
      significance: 'Embodies the Nigerian intellectual class of the 1960s independence era.',
    },
    {
      name: 'Vanessa Richardson',
      role: 'Tayo’s English Lover / Journalist & Author',
      description: 'Passionate British woman fascinated by African literature and culture despite her father’s colonial biases.',
      significance: 'Represents empathy, cross-cultural bridging, and resilient love.',
    },
    {
      name: 'Mr. Richardson',
      role: 'Vanessa’s Father / Ex-Colonial Officer',
      description: 'Paternalistic colonial administrator who served in Nigeria and opposes Vanessa’s romance with Tayo.',
      significance: 'Represents fading British colonial hegemony and racial prejudice.',
    },
    {
      name: 'Uncle Kayode',
      role: 'Tayo’s Mentor in London',
      description: 'Bon-vivant relative living in London who exposes Tayo to cosmopolitan British lifestyle and jazz.',
      significance: 'Illustrates the early Nigerian migrant experience in the United Kingdom.',
    },
  ],
  chapters: [
    {
      chapter: 1,
      title: 'Arrival in Oxford (1960)',
      summary:
        'Tayo Ajayi arrives in Oxford on a prestigious Nigerian government scholarship as Nigeria approaches national independence. He marvels at the architecture of Balliol College and navigates British weather, bicycles, and intellectual debates.',
      keyEvents: ['Tayo’s arrival at Oxford University', 'Celebration of Nigeria’s October 1, 1960 Independence at Oxford'],
      keyQuotes: ['"Nigeria is the giant of Africa; our future is limitless."'],
      examTips: 'Remember the college Tayo attended (Balliol College, Oxford) and the scholarship year (1960).',
    },
    {
      chapter: 2,
      title: 'Encounter with Vanessa Richardson',
      summary:
        'Tayo meets Vanessa at a student gathering. Drawn together by mutual intellectual curiosity, love for literature, and African politics, an intense relationship begins to blossom despite subtle racial friction.',
      keyEvents: ['First meeting at Oxford party', 'Conversations regarding African literature and colonial history'],
      keyQuotes: ['"We are all in dependence on one another, whether nations or lovers."'],
      examTips: 'Focus on the wordplay of the title: "In Dependence" vs "Independence".',
    },
    {
      chapter: 3,
      title: 'Family Resistance and Racial Tensions',
      summary:
        'Vanessa introduces Tayo to her background. Her father, having served as a colonial district officer in Nigeria, cannot accept an African son-in-law, creating emotional rifts.',
      keyEvents: ['Mr. Richardson’s disapproving reaction', 'Tayo confronts subtle and overt racism in 1960s England'],
      keyQuotes: ['"Colonialism did not just conquer lands; it poisoned imaginations."'],
      examTips: 'Questions often test the role of Vanessa’s father as a retired colonial administrator.',
    },
    {
      chapter: 4,
      title: 'Return to Nigeria and Separation',
      summary:
        'Tayo returns to Nigeria to lecture at the University of Ibadan, expecting Vanessa to join him. Political unrest, military coups, and miscommunication strain their bond, leading to a painful estrangement.',
      keyEvents: ['Tayo takes up lecturing at University of Ibadan', 'Civil war shadows and military coup turmoil'],
      keyQuotes: ['"When nations crumble, personal promises get swept away in the dust."'],
      examTips: 'Identify the institution Tayo worked for upon return (University of Ibadan).',
    },
    {
      chapter: 5,
      title: 'Reunion and Maturity',
      summary:
        'Decades later, after aging through hardship, marriages, and parenthood, Tayo and Vanessa reunite with renewed wisdom, proving that enduring love transcends temporal separation.',
      keyEvents: ['Mature reunion in later years', 'Reconciliation with past decisions and mutual peace'],
      keyQuotes: ['"Time has a way of returning what was truly meant to be, stripped of youthful vanity."'],
      examTips: 'Note the themes of endurance and forgiveness in the concluding chapters.',
    },
  ],
};

// ==========================================
// PRESCRIBED NOVEL 4: THE LAST DAYS AT FORCADOS HIGH SCHOOL (A.H. MOHAMMED)
// ==========================================
export const THE_LAST_DAYS_AT_FORCADOS: NovelData = {
  id: 'forcados-high-school',
  title: 'The Last Days at Forcados High School',
  author: 'A.H. Mohammed',
  genre: 'Campus & School Drama / Moral Fiction',
  prescribedFor: 'JAMB UTME (Use of English - Compulsory Questions)',
  sessionTag: 'JAMB Prescribed Classic Text',
  synopsis:
    'Chronicles the final SS3 year of Jimi Solade, a charismatic, handsome, and athletic student at Forcados High School in Lagos. Jimi is idolized by peers but burdened by family troubles: an unyielding father, an estranged rebellious elder brother Wole, and the illness of his beloved mother. The arrival of Efua, a secretive transfer student, tests Jimi’s integrity and loyalty.',
  themes: [
    {
      title: 'Brotherhood, Loyalty & Sacrifice',
      description: 'Jimi repeatedly covers for his troubled brother Wole, even taking the fall for theft.',
    },
    {
      title: 'Bullying, Rumors & Unfair Judgment',
      description: 'Efua Coker is falsely maligned by rumors before the truth about her past is understood.',
    },
    {
      title: 'Resilience and Moral Redemption',
      description: 'Standing for truth in the face of expulsion and societal pressure.',
    },
  ],
  characters: [
    {
      name: 'Jimi Solade',
      role: 'Protagonist / SS3 High School Star',
      description: 'Top student, football star, and head-boy material facing overwhelming family expectations.',
      significance: 'Exemplifies the pressures placed on talented Nigerian youths.',
    },
    {
      name: 'Wole Solade',
      role: 'Jimi’s troubled older brother',
      description: 'College dropout entangled in street crime, drug experiments, and theft.',
      significance: 'Represents the destructive trap of peer pressure and filial rebellion.',
    },
    {
      name: 'Efua Coker',
      role: 'Mysterious Transfer Student',
      description: 'Brilliant but withdrawn girl transferred from another school amidst malicious gossip.',
      significance: 'Highlights the cruelty of school gossip and the beauty of quiet dignity.',
    },
    {
      name: 'Mr. Mallum',
      role: 'Principal of Forcados High School',
      description: 'Strict, fair-minded disciplinarian who seeks to uphold the school’s high reputation.',
      significance: 'The institutional arbiter of justice and discipline.',
    },
  ],
  chapters: [
    {
      chapter: 1,
      title: 'Resumption at Forcados',
      summary:
        'Jimi resumes his final secondary school year at Forcados High School. Welcomed enthusiastically by friends Anse and Nene, he is the undisputed campus idol, but home worries linger.',
      keyEvents: ['SS3 resumption buzz', 'Introduction of Jimi’s athletic and academic prowess'],
      keyQuotes: ['"Final year was the summit, and everyone wanted to reach the peak."'],
      examTips: 'Exam questions often ask about the name of the school and Jimi’s best friends (Nene and Anse).',
    },
    {
      chapter: 2,
      title: 'The Arrival of Efua',
      summary:
        'A quiet new girl named Efua Coker joins the class. She resists social cliques and gossip, attracting both admiration and hostile rumors from classmates like Caro.',
      keyEvents: ['Efua’s mysterious entrance', 'Initial friction with popular school cliques'],
      keyQuotes: ['"Silence is often mistaken for arrogance by those who speak without thinking."'],
      examTips: 'Note Efua’s personality and her relationship with Jimi and the principal.',
    },
    {
      chapter: 3,
      title: 'Wole’s Trouble and the Laboratory Break-In',
      summary:
        'Jimi’s brother Wole breaks into the school chemistry laboratory at night to steal valuable equipment to pay debts. Jimi discovers him and shields his brother, endangering his own graduation.',
      keyEvents: ['The chemistry lab burglary', 'Jimi makes the difficult choice to protect his brother'],
      keyQuotes: ['"A brother is a brother, even when he carries fire in his hands."'],
      examTips: 'Key plot point: Who broke into the school laboratory and who took the blame?',
    },
    {
      chapter: 4,
      title: 'The Stolen Diary and False Accusations',
      summary:
        'A private letter/diary belonging to Efua is stolen and read aloud, causing immense distress and scandal. Jimi stands by her against the malicious mob mentality of the school.',
      keyEvents: ['The theft of Efua’s private notes', 'Jimi defends Efua against classroom bullying'],
      keyQuotes: ['"Cruelty in numbers is the coward’s weapon."'],
      examTips: 'Remember how the diary incident highlighted student prejudice.',
    },
    {
      chapter: 5,
      title: 'Vindication and Graduation',
      summary:
        'Wole eventually confesses to his crimes, clearing Jimi’s name with Mr. Mallum. The students take their WAEC examinations, reconcile with their pasts, and step out into tertiary adulthood with dignity.',
      keyEvents: ['Wole’s confession and redemption', 'Successful completion of SSCE examinations'],
      keyQuotes: ['"The storm does not last forever; truth outlives every whisper."'],
      examTips: 'Focus on the resolution of the lab theft conflict and Jimi’s academic triumph.',
    },
  ],
};

// ==========================================
// PRESCRIBED NOVELS CATALOG & DYNAMIC MANAGEMENT
// ==========================================
export const PRESCRIBED_NOVELS_CATALOG: NovelData[] = [
  THE_LIFE_CHANGER,
  SWEET_SIXTEEN,
  IN_DEPENDENCE,
  THE_LAST_DAYS_AT_FORCADOS,
];

export const NOVEL_CBT_QUESTIONS_BY_ID: Record<string, QuestionItem[]> = {
  'sweet-sixteen': [
    {
      id: 201,
      question: 'In "Sweet Sixteen" by Bolaji Abdullahi, what special gift did Mr. Bello give to Aliya on her 16th birthday?',
      options: [
        { key: 'A', text: 'A brand-new iPhone' },
        { key: 'B', text: 'A customized letter titled "Letter to My Daughter"' },
        { key: 'C', text: 'A flight ticket to London' },
        { key: 'D', text: 'A diamond necklace' },
      ],
      correct: 'B',
      explanation: 'Mr. Bello gave Aliya a heartfelt letter titled "Letter to My Daughter" containing advice on growing into womanhood.',
      trapWarning: 'Aliya did not receive a luxury gadget; her father gave her an intellectual and moral guide.',
      hint: 'It was a thick envelope with 7 guiding lessons.',
      year: 'JAMB Past Question',
      topic: 'Chapter 1 Plot',
    },
    {
      id: 202,
      question: 'According to Mr. Bello in Sweet Sixteen, what is described as "the dumbest reason to fall in love"?',
      options: [
        { key: 'A', text: 'Falling in love because of someone’s wealth' },
        { key: 'B', text: 'Falling in love purely because of physical good looks' },
        { key: 'C', text: 'Falling in love due to family pressure' },
        { key: 'D', text: 'Falling in love through social media' },
      ],
      correct: 'B',
      explanation: 'Mr. Bello emphasized that physical looks fade and change, making superficial attraction the dumbest reason to fall in love.',
      trapWarning: 'Do not confuse wealth with physical appearance in Chapter 4.',
      hint: 'Recall his comparison between a handsome face and an unreadable book cover.',
      year: 'JAMB Official',
      topic: 'Chapter 4 Romance',
    },
    {
      id: 203,
      question: 'What profession does Aliya’s father, Mr. Bello, practice in Sweet Sixteen?',
      options: [
        { key: 'A', text: 'Medical Doctor' },
        { key: 'B', text: 'Journalist / Columnist' },
        { key: 'C', text: 'Chartered Accountant' },
        { key: 'D', text: 'High Court Judge' },
      ],
      correct: 'B',
      explanation: 'Mr. Bello is a renowned journalist and newspaper columnist, which explains his eloquence and reflective writing.',
      trapWarning: 'He wrote articles and columns; he was not a lawyer or banker.',
      hint: 'He works with newspapers and editorial columns.',
      year: 'JAMB Official',
      topic: 'Character Profile',
    },
    {
      id: 204,
      question: 'In Sweet Sixteen, what did Mr. Bello argue is the danger of skin bleaching and excessive cosmetics?',
      options: [
        { key: 'A', text: 'It shows deep-seated insecurity and rejection of one’s natural identity' },
        { key: 'B', text: 'It costs too much pocket money' },
        { key: 'C', text: 'It prevents students from passing WAEC' },
        { key: 'D', text: 'It is forbidden by secondary school dress codes' },
      ],
      correct: 'A',
      explanation: 'He explained that changing skin color signals low self-esteem and a belief that natural African beauty is inferior.',
      trapWarning: 'Focus on the psychological and moral lesson rather than mere financial cost.',
      hint: 'Think about self-worth and pride in natural heritage.',
      year: 'JAMB Official',
      topic: 'Chapter 5 Beauty',
    },
  ],
  'in-dependence': [
    {
      id: 301,
      question: 'In "In Dependence" by Sarah Ladipo Manyika, which prestigious British university and college did Tayo Ajayi attend?',
      options: [
        { key: 'A', text: 'Trinity College, Cambridge' },
        { key: 'B', text: 'Balliol College, Oxford' },
        { key: 'C', text: 'King’s College London' },
        { key: 'D', text: 'Imperial College London' },
      ],
      correct: 'B',
      explanation: 'Tayo won a scholarship to Balliol College at the University of Oxford in 1960.',
      trapWarning: 'Cambridge is frequently picked by mistake; Tayo studied at Oxford (Balliol College).',
      hint: 'Balliol is one of Oxford’s most historic constituent colleges.',
      year: 'JAMB Past Question',
      topic: 'Oxford Setting',
    },
    {
      id: 302,
      question: 'What was the profession of Vanessa Richardson’s father before his retirement in "In Dependence"?',
      options: [
        { key: 'A', text: 'A British Colonial District Officer in Nigeria' },
        { key: 'B', text: 'An Anglican Missionary in Calabar' },
        { key: 'C', text: 'A petroleum engineer in Port Harcourt' },
        { key: 'D', text: 'A professor of African history' },
      ],
      correct: 'A',
      explanation: 'Vanessa’s father was an ex-colonial service officer who worked under British administrative rule in Nigeria.',
      trapWarning: 'He served the colonial government, not an oil firm or missionary society.',
      hint: 'Colonial administration in Northern and Southern Nigeria.',
      year: 'JAMB Official',
      topic: 'Character Background',
    },
    {
      id: 303,
      question: 'What major historical milestone in Nigeria coincided with Tayo Ajayi’s arrival at Oxford in "In Dependence"?',
      options: [
        { key: 'A', text: 'The 1966 Military Coup' },
        { key: 'B', text: 'Nigeria’s 1960 National Independence' },
        { key: 'C', text: 'The discovery of crude oil at Oloibiri' },
        { key: 'D', text: 'The 1973 All-Africa Games' },
      ],
      correct: 'B',
      explanation: 'Tayo arrived in 1960, the exact year of Nigeria’s independence from British colonial rule.',
      trapWarning: 'The novel is titled "In Dependence" to play on Nigeria’s 1960 political Independence.',
      hint: 'October 1, 1960.',
      year: 'JAMB Official',
      topic: 'Historical Setting',
    },
  ],
  'forcados-high-school': [
    {
      id: 401,
      question: 'In "The Last Days at Forcados High School", what major sport was Jimi Solade famous for leading the school team in?',
      options: [
        { key: 'A', text: 'Basketball' },
        { key: 'B', text: 'Football (Soccer)' },
        { key: 'C', text: 'Athletics (100m Sprint)' },
        { key: 'D', text: 'Table Tennis' },
      ],
      correct: 'B',
      explanation: 'Jimi was the star football striker and captain of Forcados High School.',
      trapWarning: 'Although athletic, football was his primary signature sport on campus.',
      hint: 'The inter-house and inter-school football matches.',
      year: 'JAMB Past Question',
      topic: 'Character Profile',
    },
    {
      id: 402,
      question: 'Who broke into the school chemistry laboratory at night in Forcados High School, forcing Jimi to take the blame?',
      options: [
        { key: 'A', text: 'Anse' },
        { key: 'B', text: 'His older brother Wole' },
        { key: 'C', text: 'Jimi’s best friend Nene' },
        { key: 'D', text: 'Seymour' },
      ],
      correct: 'B',
      explanation: 'Wole Solade, Jimi’s delinquent older brother, broke in to steal laboratory microscopes to settle street debts.',
      trapWarning: 'Jimi was accused, but the actual burglar was his brother Wole.',
      hint: 'Jimi’s college dropout brother.',
      year: 'JAMB Official',
      topic: 'Major Conflict',
    },
  ],
};

// Helper: Get active novel with localStorage persistence
export function getActiveNovel(): NovelData {
  if (typeof window === 'undefined') return THE_LIFE_CHANGER;
  try {
    // 1. Check custom novel first
    const customJson = localStorage.getItem('jamb_custom_novel_data');
    const activeId = localStorage.getItem('jamb_active_novel_id') || 'the-life-changer';
    
    if (activeId === 'custom' && customJson) {
      const parsed = JSON.parse(customJson);
      if (parsed && parsed.title) return parsed;
    }

    const found = PRESCRIBED_NOVELS_CATALOG.find((n) => n.id === activeId);
    return found || THE_LIFE_CHANGER;
  } catch {
    return THE_LIFE_CHANGER;
  }
}

export function setActiveNovelId(id: string): void {
  try {
    localStorage.setItem('jamb_active_novel_id', id);
    window.dispatchEvent(new Event('jamb_novel_changed'));
  } catch (err) {
    console.error('Failed to set active novel:', err);
  }
}

export function saveCustomNovel(novel: NovelData): void {
  try {
    localStorage.setItem('jamb_custom_novel_data', JSON.stringify(novel));
    localStorage.setItem('jamb_active_novel_id', 'custom');
    window.dispatchEvent(new Event('jamb_novel_changed'));
  } catch (err) {
    console.error('Failed to save custom novel:', err);
  }
}

export function getAllAvailableNovels(): NovelData[] {
  const list = [...PRESCRIBED_NOVELS_CATALOG];
  try {
    const customJson = localStorage.getItem('jamb_custom_novel_data');
    if (customJson) {
      const parsed = JSON.parse(customJson);
      if (parsed && parsed.title) {
        list.push({ ...parsed, id: 'custom' });
      }
    }
  } catch {
    // ignore
  }
  return list;
}

// Get CBT questions for the active novel
export function getQuestionsForNovel(novelId: string, defaultQuestions: QuestionItem[]): QuestionItem[] {
  if (novelId === 'the-life-changer' || !novelId) {
    return defaultQuestions;
  }
  const specific = NOVEL_CBT_QUESTIONS_BY_ID[novelId];
  if (specific && specific.length > 0) {
    return specific;
  }
  return defaultQuestions;
}

// ==========================================
// EXPANDED OBJECTIVE / CBT QUESTIONS (10-15+ PER SUBJECT)
// ==========================================
export const EXPANDED_OBJ_QUESTIONS: Record<string, QuestionItem[]> = {
  Novel: [
    {
      id: 101,
      question: 'In "The Life Changer", what was Omar’s JAMB score that prompted the family celebration?',
      options: [
        { key: 'A', text: '180' },
        { key: 'B', text: '210' },
        { key: 'C', text: '230' },
        { key: 'D', text: '275' },
      ],
      correct: 'C',
      explanation: 'Omar scored 230 points in his JAMB UTME, which earned him admission to study Law at Lafayette University.',
      trapWarning: 'Many students guess 250 or 200. The exact score stated in Chapter 1 is 230.',
      hint: 'Recall the opening chapter when Omar arrives home waving his printed JAMB result slip.',
      year: 'JAMB Official',
      topic: 'Chapter 1 Plot',
    },
    {
      id: 102,
      question: 'What course did Omar gain admission to study at Lafayette University?',
      options: [
        { key: 'A', text: 'Medicine' },
        { key: 'B', text: 'Law' },
        { key: 'C', text: 'Accounting' },
        { key: 'D', text: 'Mass Communication' },
      ],
      correct: 'B',
      explanation: 'Omar was admitted into Lafayette University to read Law (LL.B).',
      trapWarning: 'Accounting was Ummi’s department under Dr. Samuel Johnson; Omar’s course is Law.',
      hint: 'He is fascinated by legal debate and courtroom defense.',
      year: 'JAMB Official',
      topic: 'Character Profile',
    },
    {
      id: 103,
      question: 'What is the deep irony in the examination for which Salma was apprehended for malpractice?',
      options: [
        { key: 'A', text: 'It was her simplest elective' },
        { key: 'B', text: 'The course was titled "Moral Philosophy"' },
        { key: 'C', text: 'Her father was the dean of the faculty' },
        { key: 'D', text: 'She had already scored 100% in the continuous assessment' },
      ],
      correct: 'B',
      explanation: 'The irony lies in the fact that Salma committed an immoral and dishonest act (exam cheating) in a course titled "Moral Philosophy".',
      trapWarning: 'Ensure you identify the theme of irony rather than simple carelessness.',
      hint: 'Think about the name of the paper: Morals vs Cheating.',
      year: 'JAMB Official',
      topic: 'Literary Devices & Themes',
    },
    {
      id: 104,
      question: 'Who was the male candidate caught exchanging cheat notes with Salma in the examination hall?',
      options: [
        { key: 'A', text: 'Dabo' },
        { key: 'B', text: 'Kolawole Abdul' },
        { key: 'C', text: 'Labaran' },
        { key: 'D', text: 'Habib' },
      ],
      correct: 'B',
      explanation: 'Kolawole Abdul was seated next to Salma and was caught passing notes to her during the Moral Philosophy exam.',
      trapWarning: 'Dabo was the student from the registration line; Kabir was the middleman; Kolawole was the exam accomplice.',
      hint: 'His first name is Kolawole.',
      year: 'JAMB Official',
      topic: 'Chapter 6 Characters',
    },
    {
      id: 105,
      question: 'What did Kabir do with the money Salma handed him to bribe the Examination Malpractice Committee?',
      options: [
        { key: 'A', text: 'He paid it to the committee secretary' },
        { key: 'B', text: 'He bought a new car' },
        { key: 'C', text: 'He lost it at a gambling house playing cards' },
        { key: 'D', text: 'He deposited it in a fixed bank account' },
      ],
      correct: 'C',
      explanation: 'Kabir took the bribe money directly to a local gambling joint and gambled it away on cards.',
      trapWarning: 'Kabir never had any influence with the EMC; he was an extortionist and gambler.',
      hint: 'He was addicted to betting and poker.',
      year: 'JAMB Official',
      topic: 'Chapter 7 Plot',
    },
    {
      id: 106,
      question: 'Which hostel was allocated to Salma and her three roommates in Lafayette University?',
      options: [
        { key: 'A', text: 'Queen Amina Hall' },
        { key: 'B', text: 'Moremi Hall' },
        { key: 'C', text: 'Mary Slessor Hall' },
        { key: 'D', text: 'Flora Nwapa Hall' },
      ],
      correct: 'A',
      explanation: 'Salma, Tomiwa, Ngozi, and Ada lived together in Queen Amina Hall.',
      trapWarning: 'Moremi Hall is famous at UNILAG/OAU, but in the novel the hall is Queen Amina Hall.',
      hint: 'Named after the famous Zaria warrior queen.',
      year: 'JAMB Official',
      topic: 'Setting & Background',
    },
    {
      id: 107,
      question: 'Where is Salma’s roommate Tomiwa from originally?',
      options: [
        { key: 'A', text: 'Enugu State' },
        { key: 'B', text: 'Oyo State' },
        { key: 'C', text: 'Kano State' },
        { key: 'D', text: 'Benue State' },
      ],
      correct: 'B',
      explanation: 'Tomiwa hailed from Ibadan in Oyo State, known for her bright Yoruba culture and culinary skills.',
      trapWarning: 'Ngozi is from the East (Abia); Ada is from the Middle Belt (Benue); Tomiwa is from Oyo.',
      hint: 'She represents the Western/Yoruba background in the room.',
      year: 'JAMB Official',
      topic: 'Character Background',
    },
    {
      id: 108,
      question: 'In Chapter 1, what question did young Bint pose to her primary school French teacher that caused a stir?',
      options: [
        { key: 'A', text: 'How to greet in French in the evening' },
        { key: 'B', text: 'How to say "That’s very good / That’s right" in French' },
        { key: 'C', text: 'How to conjugate irregular French verbs' },
        { key: 'D', text: 'The capital city of France' },
      ],
      correct: 'B',
      explanation: 'Bint asked how to express "That’s right" in French, which tested her teacher’s classroom confidence.',
      trapWarning: 'Pay attention to Bint’s cleverness at the tender age of five.',
      hint: 'Think of "c’est ça" or affirmative praise.',
      year: 'JAMB Official',
      topic: 'Chapter 1 Plot',
    },
    {
      id: 109,
      question: 'What is the primary moral message of "The Life Changer" concerning university freedom?',
      options: [
        { key: 'A', text: 'Freedom is meant to be enjoyed without restrictions' },
        { key: 'B', text: 'Freedom without moral boundaries leads to self-destruction' },
        { key: 'C', text: 'Students should avoid making friends from other tribes' },
        { key: 'D', text: 'University degrees can be secured through influential connections' },
      ],
      correct: 'B',
      explanation: 'The overarching lesson is that university life affords young people great freedom, but without self-discipline and moral boundaries, that freedom ruins futures.',
      trapWarning: 'Avoid cynical options. The book is didactic (educational/moral).',
      hint: 'Discipline and boundary management are key.',
      year: 'JAMB Official',
      topic: 'Central Theme',
    },
  ],
  English: [
    {
      id: 1,
      question: 'Choose the word that has the SAME vowel sound as the underlined sound in "C_ou_rt":',
      options: [
        { key: 'A', text: 'Hurt' },
        { key: 'B', text: 'Port' },
        { key: 'C', text: 'Curse' },
        { key: 'D', text: 'Shut' },
      ],
      correct: 'B',
      explanation: 'Court has the long /ɔː/ sound, which matches Port /pɔːt/. Hurt and Curse have the /ɜː/ sound.',
      trapWarning: 'JAMB frequently confuses /ɔː/ with /ɜː/. Watch out for "ou" words like Court vs Scourge.',
      hint: 'Listen to how "Court" rhymes with "Sport" or "Port", rather than "Bird" or "Curse".',
      year: 'JAMB 2024',
      topic: 'Oral English (Vowels)',
    },
    {
      id: 2,
      question: 'Select the option OPPOSITE in meaning to the underlined word: "The commissioner gave an _equivocal_ response regarding the contract."',
      options: [
        { key: 'A', text: 'Ambiguous' },
        { key: 'B', text: 'Clear and unambiguous' },
        { key: 'C', text: 'Diplomatic' },
        { key: 'D', text: 'Hesitant' },
      ],
      correct: 'B',
      explanation: 'Equivocal means open to more than one interpretation (vague/ambiguous). The opposite (antonym) is clear and unambiguous.',
      trapWarning: 'Candidates often pick "Ambiguous" because they forget this is an ANTONYM section!',
      hint: 'Equivocal means cloudy/vague. The opposite means crystal clear.',
      year: 'WAEC 2024',
      topic: 'Antonyms',
    },
    {
      id: 3,
      question: 'Choose the word that is NEAREST IN MEANING to: "The judge described the young man’s conduct as _reprehensible_."',
      options: [
        { key: 'A', text: 'Commendable' },
        { key: 'B', text: 'Blameworthy' },
        { key: 'C', text: 'Mysterious' },
        { key: 'D', text: 'Excusable' },
      ],
      correct: 'B',
      explanation: 'Reprehensible means deserving censure or condemnation (blameworthy/disgraceful).',
      trapWarning: 'Do not confuse reprehensible with responsible.',
      hint: 'Reprehensible means bad and deserving of serious blame.',
      year: 'JAMB 2023',
      topic: 'Synonyms',
    },
    {
      id: 4,
      question: 'Identify the word with the primary stress on the SECOND syllable:',
      options: [
        { key: 'A', text: 'PHOTOGRAPH' },
        { key: 'B', text: 'PHOTOGRAPHY' },
        { key: 'C', text: 'PHOTOGRAPHIC' },
        { key: 'D', text: 'PHOTO' },
      ],
      correct: 'B',
      explanation: 'pho-TOG-ra-phy has stress on the second syllable. PHO-to-graph has stress on the first, pho-to-GRAPH-ic on the third.',
      trapWarning: 'Words ending in -graphy almost always have stress on the syllable immediately preceding -graphy.',
      hint: 'Count syllables: pho-TOG-ra-phy.',
      year: 'JAMB 2023',
      topic: 'Oral English (Stress)',
    },
    {
      id: 5,
      question: 'Complete the sentence with the correct option: "Neither the principal nor the teachers _______ present at the meeting."',
      options: [
        { key: 'A', text: 'was' },
        { key: 'B', text: 'were' },
        { key: 'C', text: 'is' },
        { key: 'D', text: 'has been' },
      ],
      correct: 'B',
      explanation: 'In the "neither...nor" construction, the verb agrees with the closer subject. Since "teachers" is plural, the plural verb "were" is required (Rule of Proximity).',
      trapWarning: 'Do not agree with "principal". The rule of proximity dictates agreement with the second/closer subject.',
      hint: 'Look at the subject right next to the blank: "teachers" (plural).',
      year: 'WAEC 2023',
      topic: 'Concord / Grammar',
    },
    {
      id: 6,
      question: 'Choose the correct preposition: "The candidate was absolved _______ all charges of examination misconduct."',
      options: [
        { key: 'A', text: 'from' },
        { key: 'B', text: 'of' },
        { key: 'C', text: 'with' },
        { key: 'D', text: 'against' },
      ],
      correct: 'A',
      explanation: 'Standard English usage takes "absolved from" (or "absolved of" guilt, but "absolved from charges/blame"). In WAEC standard, "absolved from" is preferred.',
      trapWarning: 'Watch out for "absolved against", which is incorrect Nigerian English.',
      hint: 'Think "freed from" -> "absolved from".',
      year: 'JAMB 2022',
      topic: 'Prepositions',
    },
    {
      id: 7,
      question: 'Identify the grammatical name of the underlined clause: "What the university senate decided _astonished all the students_."',
      options: [
        { key: 'A', text: 'Adverbial clause of reason' },
        { key: 'B', text: 'Noun clause, subject of the verb "astonished"' },
        { key: 'C', text: 'Adjectival clause qualifying "senate"' },
        { key: 'D', text: 'Prepositional phrase' },
      ],
      correct: 'B',
      explanation: '"What the university senate decided" functions as the subject of the finite verb "astonished", making it a Noun Clause.',
      trapWarning: 'It can be replaced by "The decision" (a noun). If it replaces a noun, it is a Noun Clause.',
      hint: 'Ask: WHAT astonished all the students? The whole clause did!',
      year: 'WAEC 2024',
      topic: 'Grammatical Functions',
    },
    {
      id: 8,
      question: 'Choose the option that correctly conveys the meaning: "The project manager had to _throw in the towel_."',
      options: [
        { key: 'A', text: 'Wash the dirty clothing' },
        { key: 'B', text: 'Admit defeat and give up' },
        { key: 'C', text: 'Call for emergency sanitation' },
        { key: 'D', text: 'Celebrate a hard-earned victory' },
      ],
      correct: 'B',
      explanation: 'The idiom "throw in the towel" originates from boxing and means to acknowledge defeat or surrender.',
      trapWarning: 'Never take idiomatic expressions literally!',
      hint: 'Think of boxing when a coach surrenders on behalf of his fighter.',
      year: 'JAMB 2024',
      topic: 'Idioms',
    },
  ],
  Mathematics: [
    {
      id: 1,
      question: 'If log₁₀(x) + log₁₀(x - 3) = 1, find the positive value of x:',
      options: [
        { key: 'A', text: '2' },
        { key: 'B', text: '5' },
        { key: 'C', text: '-2' },
        { key: 'D', text: '10' },
      ],
      correct: 'B',
      explanation: 'log₁₀(x(x - 3)) = 1 => x² - 3x = 10 => x² - 3x - 10 = 0 => (x - 5)(x + 2) = 0. Since log of a negative number is undefined, x = 5.',
      trapWarning: 'Always discard negative roots in logarithms! An option (-2) is specifically planted to trap hasty students.',
      hint: 'Use the product law: log(A) + log(B) = log(A × B), then solve the quadratic equation.',
      year: 'JAMB 2024',
      topic: 'Logarithms',
    },
    {
      id: 2,
      question: 'Find the derivative of y = (3x² - 5)⁴ with respect to x:',
      options: [
        { key: 'A', text: '12x(3x² - 5)³' },
        { key: 'B', text: '24x(3x² - 5)³' },
        { key: 'C', text: '4(3x² - 5)³' },
        { key: 'D', text: '6x(3x² - 5)⁴' },
      ],
      correct: 'B',
      explanation: 'Using Chain Rule: dy/dx = 4(3x² - 5)³ × d/dx(3x² - 5) = 4(3x² - 5)³ × 6x = 24x(3x² - 5)³.',
      trapWarning: 'Candidates often forget to multiply by the derivative of the inner bracket (6x). Option C is the classic trap!',
      hint: 'Differentiate outer power, then multiply by inner derivative.',
      year: 'WAEC 2024',
      topic: 'Calculus',
    },
    {
      id: 3,
      question: 'The mean of 5 numbers is 12. If a sixth number is added, the new mean becomes 14. What is the sixth number?',
      options: [
        { key: 'A', text: '20' },
        { key: 'B', text: '24' },
        { key: 'C', text: '26' },
        { key: 'D', text: '22' },
      ],
      correct: 'B',
      explanation: 'Total of 5 numbers = 5 × 12 = 60. Total of 6 numbers = 6 × 14 = 84. Sixth number = 84 - 60 = 24.',
      trapWarning: 'Calculate total sums first; do not try to average the means directly!',
      hint: 'Find Sum1 (60) and Sum2 (84), then find the difference.',
      year: 'JAMB 2023',
      topic: 'Statistics',
    },
    {
      id: 4,
      question: 'Evaluate ∫ (3x² - 4x + 5) dx from x = 0 to x = 2:',
      options: [
        { key: 'A', text: '10' },
        { key: 'B', text: '14' },
        { key: 'C', text: '18' },
        { key: 'D', text: '8' },
      ],
      correct: 'A',
      explanation: '∫ (3x² - 4x + 5) dx = [x³ - 2x² + 5x] from 0 to 2 = (2³ - 2(2²) + 5(2)) - 0 = (8 - 8 + 10) = 10.',
      trapWarning: 'Check signs when substituting limits.',
      hint: 'Integrate term by term: 3x³/3 - 4x²/2 + 5x.',
      year: 'JAMB 2023',
      topic: 'Integration',
    },
    {
      id: 5,
      question: 'If tan θ = 3/4 and θ is an acute angle, find the value of (sin θ + cos θ):',
      options: [
        { key: 'A', text: '7/5' },
        { key: 'B', text: '1/5' },
        { key: 'C', text: '5/7' },
        { key: 'D', text: '4/3' },
      ],
      correct: 'A',
      explanation: 'Using right triangle: Opp = 3, Adj = 4, Hyp = √(3² + 4²) = 5. sin θ = 3/5, cos θ = 4/5. sin θ + cos θ = 3/5 + 4/5 = 7/5.',
      trapWarning: 'Remember Pythagoras triplet 3-4-5.',
      hint: 'Find Hypotenuse first (5), then calculate sin and cos.',
      year: 'WAEC 2023',
      topic: 'Trigonometry',
    },
    {
      id: 6,
      question: 'Solve for x in the equation 3^(2x - 1) = 81:',
      options: [
        { key: 'A', text: '2.5' },
        { key: 'B', text: '3' },
        { key: 'C', text: '2' },
        { key: 'D', text: '1.5' },
      ],
      correct: 'A',
      explanation: '81 = 3⁴. Therefore 3^(2x - 1) = 3⁴ => 2x - 1 = 4 => 2x = 5 => x = 5/2 = 2.5.',
      trapWarning: 'Do not forget to add 1 before dividing by 2.',
      hint: 'Express 81 as base 3 (3⁴).',
      year: 'NECO 2024',
      topic: 'Indices',
    },
  ],
  Biology: [
    {
      id: 1,
      question: 'Which of the following blood groups is known as the Universal Recipient?',
      options: [
        { key: 'A', text: 'Group O' },
        { key: 'B', text: 'Group A' },
        { key: 'C', text: 'Group B' },
        { key: 'D', text: 'Group AB' },
      ],
      correct: 'D',
      explanation: 'Group AB has both A and B antigens on red blood cells and neither anti-A nor anti-B antibodies in plasma, making it the universal recipient.',
      trapWarning: 'Group O is Universal DONOR. Group AB is Universal RECIPIENT. Do not invert them!',
      hint: 'AB has both antigens, so it can accept blood from any group.',
      year: 'JAMB 2024',
      topic: 'Circulation & Genetics',
    },
    {
      id: 2,
      question: 'The organelle primarily responsible for cellular respiration and ATP generation is the:',
      options: [
        { key: 'A', text: 'Ribosome' },
        { key: 'B', text: 'Golgi body' },
        { key: 'C', text: 'Mitochondrion' },
        { key: 'D', text: 'Endoplasmic reticulum' },
      ],
      correct: 'C',
      explanation: 'Mitochondria are the powerhouses of the cell where the Krebs cycle and oxidative phosphorylation yield ATP.',
      trapWarning: 'Ribosomes synthesize proteins; Mitochondria generate ATP energy.',
      hint: 'Think "powerhouse of the cell".',
      year: 'WAEC 2024',
      topic: 'Cell Biology',
    },
    {
      id: 3,
      question: 'In a monohybrid cross between two heterozygous tall pea plants (Tt × Tt), what is the phenotypic ratio of Tall to Dwarf offspring?',
      options: [
        { key: 'A', text: '1 : 2 : 1' },
        { key: 'B', text: '3 : 1' },
        { key: 'C', text: '9 : 3 : 3 : 1' },
        { key: 'D', text: '2 : 1' },
      ],
      correct: 'B',
      explanation: 'The phenotypic ratio is 3 Tall (TT, Tt, Tt) : 1 Dwarf (tt). Note: 1:2:1 is the GENOTYPIC ratio!',
      trapWarning: 'Read the question carefully: PHENOTYPIC ratio is 3:1; GENOTYPIC ratio is 1:2:1.',
      hint: 'Phenotype refers to physical appearance (Tall vs Dwarf).',
      year: 'JAMB 2023',
      topic: 'Genetics',
    },
    {
      id: 4,
      question: 'Which of the following organisms exhibits Holozoic nutrition?',
      options: [
        { key: 'A', text: 'Mucor (Bread mould)' },
        { key: 'B', text: 'Amoeba' },
        { key: 'C', text: 'Tapeworm' },
        { key: 'D', text: 'Spirogyra' },
      ],
      correct: 'B',
      explanation: 'Amoeba feeds holozoically by ingesting solid food particles using pseudopodia, followed by internal digestion.',
      trapWarning: 'Mucor is saprophytic; Tapeworm is parasitic; Spirogyra is autotrophic.',
      hint: 'Holozoic involves ingestion, digestion, and egestion.',
      year: 'NECO 2023',
      topic: 'Nutrition',
    },
  ],
  Chemistry: [
    {
      id: 1,
      question: 'In the Haber process: N₂(g) + 3H₂(g) ⇌ 2NH₃(g) (ΔH = -92 kJ/mol), what condition maximizes the yield of ammonia?',
      options: [
        { key: 'A', text: 'Low pressure and high temperature' },
        { key: 'B', text: 'High pressure and moderate/low temperature' },
        { key: 'C', text: 'Low pressure and low temperature' },
        { key: 'D', text: 'High pressure and high temperature' },
      ],
      correct: 'B',
      explanation: 'High pressure favors the side with fewer gas moles (4 moles -> 2 moles). Since the reaction is exothermic, lower temperature shifts equilibrium forward according to Le Chatelier’s principle.',
      trapWarning: 'Remember: 4 moles on left, 2 moles on right.',
      hint: 'Apply Le Chatelier’s principle: count moles of gas on both sides.',
      year: 'JAMB 2024',
      topic: 'Chemical Equilibrium',
    },
    {
      id: 2,
      question: 'Calculate the percentage by mass of Nitrogen in Ammonium Trioxonitrate(V), NH₄NO₃. (N=14, H=1, O=16):',
      options: [
        { key: 'A', text: '17.5%' },
        { key: 'B', text: '35.0%' },
        { key: 'C', text: '28.0%' },
        { key: 'D', text: '42.5%' },
      ],
      correct: 'B',
      explanation: 'Molar mass of NH₄NO₃ = (14×2) + (1×4) + (16×3) = 28 + 4 + 48 = 80 g/mol. Mass of Nitrogen = 28 g. % N = (28 / 80) × 100% = 35.0%.',
      trapWarning: 'Many students count only ONE Nitrogen atom (14) instead of TWO (28) in NH₄NO₃!',
      hint: 'Notice there are TWO nitrogen atoms in the formula.',
      year: 'WAEC 2024',
      topic: 'Stoichiometry',
    },
    {
      id: 3,
      question: 'What is the oxidation number of Chromium in Potassium Dichromate, K₂Cr₂O₇?',
      options: [
        { key: 'A', text: '+3' },
        { key: 'B', text: '+6' },
        { key: 'C', text: '+7' },
        { key: 'D', text: '+4' },
      ],
      correct: 'B',
      explanation: '2(+1) + 2(Cr) + 7(-2) = 0 => 2 + 2Cr - 14 = 0 => 2Cr = +12 => Cr = +6.',
      trapWarning: 'Do not forget to divide +12 by 2 because there are two Chromium atoms.',
      hint: 'K is +1, O is -2, total sum is 0.',
      year: 'JAMB 2023',
      topic: 'Redox Reactions',
    },
  ],
  Physics: [
    {
      id: 1,
      question: 'A projectile is launched with velocity 40 m/s at an angle of 30° to the horizontal. Calculate its time of flight. (Take g = 10 m/s²):',
      options: [
        { key: 'A', text: '2.0 s' },
        { key: 'B', text: '4.0 s' },
        { key: 'C', text: '8.0 s' },
        { key: 'D', text: '1.5 s' },
      ],
      correct: 'B',
      explanation: 'Time of flight T = (2u sin θ) / g = (2 × 40 × sin 30°) / 10 = (80 × 0.5) / 10 = 4.0 seconds.',
      trapWarning: 'Do not confuse time of flight T = (2u sin θ)/g with time to reach maximum height t = (u sin θ)/g (which is 2.0 s).',
      hint: 'Total time of flight is twice the time to reach maximum height.',
      year: 'JAMB 2024',
      topic: 'Mechanics (Projectiles)',
    },
    {
      id: 2,
      question: 'The electric power consumed by an electrical appliance of resistance 50 Ω connected to a 200 V mains supply is:',
      options: [
        { key: 'A', text: '4 W' },
        { key: 'B', text: '800 W' },
        { key: 'C', text: '400 W' },
        { key: 'D', text: '1000 W' },
      ],
      correct: 'B',
      explanation: 'Power P = V² / R = (200)² / 50 = 40,000 / 50 = 800 Watts.',
      trapWarning: 'Remember P = V²/R, not V/R (which gives Current I = 4 A).',
      hint: 'Use the formula P = V² / R.',
      year: 'WAEC 2024',
      topic: 'Current Electricity',
    },
    {
      id: 3,
      question: 'Which of the following electromagnetic waves has the SHORTEST wavelength?',
      options: [
        { key: 'A', text: 'Radio waves' },
        { key: 'B', text: 'Visible light' },
        { key: 'C', text: 'Gamma rays' },
        { key: 'D', text: 'Infra-red rays' },
      ],
      correct: 'C',
      explanation: 'Gamma rays possess the highest frequency and therefore the shortest wavelength in the electromagnetic spectrum.',
      trapWarning: 'Shortest wavelength corresponds to HIGHEST frequency and energy.',
      hint: 'Gamma rays are at the extreme high-energy end of the spectrum.',
      year: 'NECO 2023',
      topic: 'Waves & Optics',
    },
  ],
  Government: [
    {
      id: 1,
      question: 'Which constitution introduced the elective principle into Nigerian colonial politics for the first time in 1922?',
      options: [
        { key: 'A', text: 'Richards Constitution' },
        { key: 'B', text: 'Clifford Constitution' },
        { key: 'C', text: 'Macpherson Constitution' },
        { key: 'D', text: 'Lyttelton Constitution' },
      ],
      correct: 'B',
      explanation: 'Sir Hugh Clifford’s 1922 Constitution introduced the elective principle, creating four elected legislative seats (3 for Lagos, 1 for Calabar).',
      trapWarning: 'Richards Constitution (1946) introduced regionalism, NOT the elective principle.',
      hint: 'Named after Governor Hugh Clifford (1922).',
      year: 'JAMB 2024',
      topic: 'Constitutional Development',
    },
    {
      id: 2,
      question: 'The fundamental doctrine of Separation of Powers was famously propounded by:',
      options: [
        { key: 'A', text: 'John Locke' },
        { key: 'B', text: 'Baron de Montesquieu' },
        { key: 'C', text: 'Thomas Hobbes' },
        { key: 'D', text: 'A.V. Dicey' },
      ],
      correct: 'B',
      explanation: 'French political philosopher Baron de Montesquieu articulated the Separation of Powers into Executive, Legislature, and Judiciary in his 1748 treatise "The Spirit of the Laws".',
      trapWarning: 'A.V. Dicey is associated with Rule of Law, Montesquieu with Separation of Powers.',
      hint: 'Think of Montesquieu in France.',
      year: 'WAEC 2024',
      topic: 'Political Theories',
    },
  ],
  Economics: [
    {
      id: 1,
      question: 'When the percentage change in quantity demanded is GREATER than the percentage change in price, demand is described as:',
      options: [
        { key: 'A', text: 'Inelastic' },
        { key: 'B', text: 'Elastic' },
        { key: 'C', text: 'Unitary' },
        { key: 'D', text: 'Perfectively Inelastic' },
      ],
      correct: 'B',
      explanation: 'When elasticity coefficient is greater than 1 (%ΔQd > %ΔP), demand is price elastic.',
      trapWarning: 'Inelastic means %ΔQd < %ΔP.',
      hint: 'Elastic demand reacts strongly to small price shifts.',
      year: 'JAMB 2024',
      topic: 'Elasticity of Demand',
    },
    {
      id: 2,
      question: 'Which of the following is a direct tax in Nigeria?',
      options: [
        { key: 'A', text: 'Value Added Tax (VAT)' },
        { key: 'B', text: 'Personal Income Tax (PAYE)' },
        { key: 'C', text: 'Customs Duty' },
        { key: 'D', text: 'Excise Duty' },
      ],
      correct: 'B',
      explanation: 'Personal Income Tax (PAYE) is levied directly on an individual’s earnings and cannot be shifted to another party.',
      trapWarning: 'VAT and Excise duties are indirect taxes.',
      hint: 'A direct tax is paid directly by the person upon whom it is levied.',
      year: 'WAEC 2024',
      topic: 'Public Finance',
    },
  ],
  Literature: [
    {
      id: 1,
      question: 'A speech delivered by a character alone on stage revealing their innermost thoughts to the audience is a:',
      options: [
        { key: 'A', text: 'Dialogue' },
        { key: 'B', text: 'Soliloquy' },
        { key: 'C', text: 'Prologue' },
        { key: 'D', text: 'Monologue' },
      ],
      correct: 'B',
      explanation: 'A soliloquy is delivered when an actor is ALONE on stage, speaking their private thoughts directly to themselves and the audience.',
      trapWarning: 'A monologue can be spoken in the presence of other silent actors; a soliloquy is strictly delivered alone.',
      hint: 'Think "solo" -> soliloquy.',
      year: 'JAMB 2024',
      topic: 'Literary Devices',
    },
  ],
};

// ==========================================
// EXPANDED THEORY / ESSAY QUESTIONS WITH STEP-MARKING
// ==========================================
export const EXPANDED_THEORY_QUESTIONS: Record<string, TheoryItem[]> = {
  English: [
    {
      id: 1,
      title: 'WAEC Summary Writing (30 Marks)',
      topic: 'Summary & Précis Writing',
      year: 'WAEC Standard',
      totalMarks: '30 Marks',
      question:
        'Read the scenario below and answer the question in two grammatically distinct sentences:\n\n"The proliferation of unsupervised smartphones among secondary school candidates in Nigeria has led to an alarming rise in nocturnal sleep deprivation and a catastrophic decline in sustained reading habits. Candidates spend upwards of seven hours scrolling social media reels rather than revising syllabus past papers."\n\nQuestion: In two sentences, one for each, state the two major consequences of smartphone addiction highlighted in the passage.',
      markingScheme: [
        {
          step: 'Sentence 1 (Content): Clear statement of physiological harm (sleep deprivation/fatigue)',
          marks: '12 Marks',
        },
        {
          step: 'Sentence 2 (Content): Clear statement of academic/study displacement (abandoning past papers)',
          marks: '12 Marks',
        },
        {
          step: 'Grammatical Accuracy & Mechanical Accuracy (Zero preamble, complete sentences)',
          marks: '6 Marks',
        },
      ],
      modelAnswer:
        '1. Unsupervised smartphone usage severely deprives secondary school candidates of necessary nocturnal sleep.\n2. It drastically displaces the essential time students ought to dedicate to textbook revision and past question practice.',
      examinerAdvice:
        'CRITICAL RULE: Never include preambles like "The first consequence is that..." or "According to the passage...". In WAEC summary, preambles lose you half marks immediately! State your point directly in one standalone sentence.',
    },
    {
      id: 2,
      title: 'Formal Letter Writing (50 Marks)',
      topic: 'Continuous Writing / Composition',
      year: 'WAEC / NECO',
      totalMarks: '50 Marks',
      question:
        'Write a letter to the Honorable Minister of Education in Nigeria suggesting three practical reforms to curb examination malpractice during the national JAMB UTME and WAEC examinations.',
      markingScheme: [
        {
          step: 'Format (Sender Address, Date, Recipient Designation & Address, Salutation, Title):',
          marks: '10 Marks',
        },
        {
          step: 'Content (3 distinct, actionable reforms explained in depth):',
          marks: '20 Marks',
        },
        {
          step: 'Organization (Logical flow, coherence, introductory & concluding paragraphs):',
          marks: '10 Marks',
        },
        {
          step: 'Expression & Mechanical Accuracy (Varied sentence structures, correct punctuation, zero spelling errors):',
          marks: '10 Marks',
        },
      ],
      modelAnswer:
        'Key structural plan:\n- Proper Two Addresses format.\n- Title: "RECOMMENDATIONS FOR ERADICATING EXAMINATION MALPRACTICE IN NIGERIAN NATIONAL EXAMINATIONS"\n- Point 1: Biometric and CCTV surveillance integration across all accredited centers.\n- Point 2: Stricter criminal sanctions and blacklisting of corrupt mercenary syndicates.\n- Point 3: Continuous digital teacher re-training and candidate ethical awareness.\n- Polite subscription: "Yours faithfully," followed by signature and full name.',
      examinerAdvice:
        'In formal letters, avoid slang, contractions (don’t, won’t), and colloquialisms. Ensure your title is capitalized or underlined.',
    },
    {
      id: 3,
      title: 'Novel Essay: The Life Changer (25 Marks)',
      topic: 'Prescribed Text Character Analysis',
      year: 'JAMB / University Screening',
      totalMarks: '25 Marks',
      question:
        'Examine Salma’s character arc in Khadija Abubakar Jalli’s "The Life Changer". How did her vanity and arrogance lead to her downfall, and what lessons does her eventual repentance offer to new university entrants?',
      markingScheme: [
        {
          step: 'Introduction: Identification of Salma, her background, and arrival at Lafayette University:',
          marks: '5 Marks',
        },
        {
          step: 'Body Paragraph 1: The registration queue, disdain for rules, and roommate dynamics in Queen Amina Hall:',
          marks: '7 Marks',
        },
        {
          step: 'Body Paragraph 2: The Moral Philosophy exam fraud with Kolawole Abdul and extortion by Kabir:',
          marks: '7 Marks',
        },
        {
          step: 'Conclusion & Lessons: Expulsion verdict, reconciliation with roommates, and moral growth:',
          marks: '6 Marks',
        },
      ],
      modelAnswer:
        'Salma represents the archetype of a talented yet proud freshman whose pursuit of campus glamour blinds her to university regulations. Her refusal to queue patiently and her association with Honorable Habib showcase her superficiality. Her fatal blunder occurs when she attempts examination malpractice in Moral Philosophy with Kolawole Abdul, believing her wealth can bribe the disciplinary committee through Kabir. Her subsequent expulsion serves as a cathartic turning point, prompting genuine remorse and humility.',
      examinerAdvice:
        'Support every assertion with specific textual evidence (mention Queen Amina Hall, Kolawole Abdul, Kabir, and Lafayette University).',
    },
  ],
  Mathematics: [
    {
      id: 1,
      title: 'Mensuration: Total Surface Area & Volume of a Cone (12 Marks)',
      topic: 'Geometry & Mensuration',
      year: 'WAEC Standard',
      totalMarks: '12 Marks',
      question:
        'A solid conical monument has a base radius of 7 cm and a vertical height of 24 cm. (Take π = 22/7).\n(a) Calculate the slant height (l) of the cone.\n(b) Calculate the total surface area of the cone.\n(c) Find the volume of the cone.',
      markingScheme: [
        {
          step: 'Part (a): Pythagoras theorem formula for slant height l² = r² + h²',
          marks: '1 Mark (M1)',
        },
        {
          step: 'Substitution: l = √(7² + 24²) = √(49 + 576) = √625 = 25 cm',
          marks: '2 Marks (A1)',
        },
        {
          step: 'Part (b): Formula for Total Surface Area: A = πr(r + l)',
          marks: '1 Mark (M1)',
        },
        {
          step: 'Substitution & Evaluation: (22/7) × 7 × (7 + 25) = 22 × 32 = 704 cm²',
          marks: '3 Marks (M1, A1)',
        },
        {
          step: 'Part (c): Volume Formula: V = (1/3)πr²h',
          marks: '1 Mark (M1)',
        },
        {
          step: 'Volume Evaluation: (1/3) × (22/7) × 49 × 24 = (1/3) × 22 × 7 × 24 = 22 × 7 × 8 = 1,232 cm³',
          marks: '4 Marks (M2, A2)',
        },
      ],
      modelAnswer:
        '(a) Slant height l = 25 cm\n(b) Total Surface Area = 704 cm²\n(c) Volume = 1,232 cm³',
      examinerAdvice:
        'Never omit units (cm, cm², cm³)! A correct numerical figure without the correct unit loses 1 accuracy mark (A1) on each sub-part.',
    },
    {
      id: 2,
      title: 'Calculus: Turning Points & Curve Sketching (15 Marks)',
      topic: 'Differentiation & Stationary Points',
      year: 'WAEC / Further Maths',
      totalMarks: '15 Marks',
      question:
        'Given the cubic curve y = 2x³ - 9x² + 12x + 1:\n(a) Find dy/dx.\n(b) Determine the coordinates of the two stationary points.\n(c) Using the second derivative d²y/dx², classify each turning point as a maximum or minimum.',
      markingScheme: [
        {
          step: 'Part (a): Differentiate term by term: dy/dx = 6x² - 18x + 12',
          marks: '3 Marks (M1, A2)',
        },
        {
          step: 'Part (b): Set dy/dx = 0 => 6(x² - 3x + 2) = 0 => (x - 1)(x - 2) = 0 => x = 1, x = 2',
          marks: '3 Marks (M1, A2)',
        },
        {
          step: 'Find y-coordinates: when x=1, y = 2(1) - 9(1) + 12(1) + 1 = 6; when x=2, y = 2(8) - 9(4) + 12(2) + 1 = 5',
          marks: '4 Marks (M2, A2)',
        },
        {
          step: 'Part (c): d²y/dx² = 12x - 18. At x=1, d²y/dx² = -6 (<0, Maximum at (1, 6)). At x=2, d²y/dx² = +6 (>0, Minimum at (2, 5))',
          marks: '5 Marks (M2, A3)',
        },
      ],
      modelAnswer:
        'Stationary Points:\n• Maximum point at (1, 6) because d²y/dx² = -6 < 0.\n• Minimum point at (2, 5) because d²y/dx² = +6 > 0.',
      examinerAdvice:
        'Remember the rule: Second derivative NEGATIVE means MAXIMUM; POSITIVE means MINIMUM.',
    },
  ],
  Biology: [
    {
      id: 1,
      title: 'Circulatory System: Blood Clotting Cascade (10 Marks)',
      topic: 'Human Physiology',
      year: 'WAEC 2024',
      totalMarks: '10 Marks',
      question:
        'Explain the step-by-step mechanism of blood clotting in humans when an open cut occurs. Mention the roles of platelets, thromboplastin, calcium ions, prothrombin, thrombin, and fibrinogen.',
      markingScheme: [
        {
          step: 'Platelets disintegrate at damaged tissue and release thromboplastin enzyme',
          marks: '2 Marks',
        },
        {
          step: 'Thromboplastin in the presence of Calcium ions (Ca²⁺) and Vitamin K converts prothrombin to thrombin',
          marks: '3 Marks',
        },
        {
          step: 'Thrombin catalyzes the conversion of soluble fibrinogen into insoluble fibrin threads',
          marks: '3 Marks',
        },
        {
          step: 'Fibrin meshwork entangles red blood cells to form a clot, sealing the wound',
          marks: '2 Marks',
        },
      ],
      modelAnswer:
        '1. When a blood vessel is damaged, exposed platelets disintegrate and release the enzyme thromboplastin.\n2. In the presence of ionic calcium (Ca²⁺) and Vitamin K, thromboplastin converts inactive plasma prothrombin into active thrombin.\n3. Active thrombin converts soluble blood protein fibrinogen into insoluble, thread-like fibrin polymers.\n4. The fibrin meshwork traps erythrocytes and leukocytes, creating a stable clot that arrests hemorrhage.',
      examinerAdvice:
        'Underline key biochemical terms (thromboplastin, prothrombin, thrombin, fibrinogen, fibrin). Examiners scan for these exact keywords.',
    },
  ],
  Chemistry: [
    {
      id: 1,
      title: 'Electrolysis & Faraday’s Laws (12 Marks)',
      topic: 'Electrochemistry',
      year: 'WAEC Standard',
      totalMarks: '12 Marks',
      question:
        'A steady electric current of 5.0 Amperes is passed through an aqueous solution of Copper(II) Tetraoxosulphate(VI) (CuSO₄) for 32 minutes and 10 seconds.\n(a) State Faraday’s First Law of Electrolysis.\n(b) Calculate the mass of Copper deposited at the cathode. (Cu = 64, 1 Faraday = 96,500 Coulombs).',
      markingScheme: [
        {
          step: 'Part (a): Correct statement of Faraday’s 1st Law (Mass is directly proportional to quantity of electricity)',
          marks: '2 Marks',
        },
        {
          step: 'Part (b): Convert time to seconds: t = (32 × 60) + 10 = 1920 + 10 = 1930 seconds',
          marks: '2 Marks',
        },
        {
          step: 'Calculate charge Q = I × t = 5.0 × 1930 = 9650 Coulombs',
          marks: '2 Marks',
        },
        {
          step: 'Cathode equation: Cu²⁺ + 2e⁻ → Cu(s). 2 Faradays (2 × 96,500 C) deposits 64 g of Cu',
          marks: '3 Marks',
        },
        {
          step: 'Mass calculation: m = (64 × 9650) / (2 × 96,500) = (64 × 1) / 20 = 3.20 grams',
          marks: '3 Marks',
        },
      ],
      modelAnswer:
        '(a) Faraday’s First Law states that the mass of a substance liberated or deposited at an electrode during electrolysis is directly proportional to the quantity of electricity passed through the electrolyte.\n(b) Mass of Copper deposited = 3.20 g',
      examinerAdvice:
        'Students frequently forget to convert minutes to seconds! Always convert time to seconds before calculating Q = It.',
    },
  ],
  Physics: [
    {
      id: 1,
      title: 'Current Electricity: Internal Resistance & Kirchhoff’s Laws (15 Marks)',
      topic: 'DC Circuits & Potential Dividers',
      year: 'WAEC / NECO',
      totalMarks: '15 Marks',
      question:
        'A battery of EMF (E) and internal resistance (r) supplies a current of 0.8 A when connected to an external resistor of 4.0 Ω. When connected to a 9.0 Ω resistor, the current drops to 0.4 A.\n(a) Define the electromotive force (EMF) of a cell.\n(b) Formulate the two circuit equations.\n(c) Calculate the internal resistance (r) and the EMF (E) of the battery.',
      markingScheme: [
        {
          step: 'Part (a): Definition of EMF: Total work done per unit charge in driving electricity around a complete circuit',
          marks: '2 Marks',
        },
        {
          step: 'Part (b): Circuit Formula E = I(R + r). Equation 1: E = 0.8(4 + r) = 3.2 + 0.8r',
          marks: '3 Marks',
        },
        {
          step: 'Equation 2: E = 0.4(9 + r) = 3.6 + 0.4r',
          marks: '3 Marks',
        },
        {
          step: 'Part (c): Equating: 3.2 + 0.8r = 3.6 + 0.4r => 0.4r = 0.4 => r = 1.0 Ω',
          marks: '4 Marks',
        },
        {
          step: 'Calculate EMF: E = 0.8(4 + 1.0) = 0.8 × 5 = 4.0 Volts',
          marks: '3 Marks',
        },
      ],
      modelAnswer:
        '(a) EMF is the total energy supplied by a source per coulomb of electric charge that flows through the complete circuit including the internal cell.\n(b) Internal Resistance r = 1.0 Ω\n(c) Battery EMF E = 4.0 V',
      examinerAdvice:
        'Units must be clearly stated: Ω for resistance and V for EMF.',
    },
  ],
  Government: [
    {
      id: 1,
      title: 'Constitutional History: Clifford vs Richards Constitution (15 Marks)',
      topic: 'Colonial Constitutional Evolution',
      year: 'WAEC Standard',
      totalMarks: '15 Marks',
      question:
        'Critically examine three major features of the 1922 Clifford Constitution and explain why Nigerian nationalists like Herbert Macaulay opposed its limitations.',
      markingScheme: [
        {
          step: 'Feature 1: Introduction of the Elective Principle (4 elected seats)',
          marks: '3 Marks',
        },
        {
          step: 'Feature 2: Formation of the first political party (NNDP by Herbert Macaulay)',
          marks: '3 Marks',
        },
        {
          step: 'Feature 3: Establishment of the Legislative Council for the Southern Colony',
          marks: '3 Marks',
        },
        {
          step: 'Nationalist Grievances: Franchise restricted by high income property qualifications (£100 per annum) and complete exclusion of Northern Nigeria',
          marks: '6 Marks',
        },
      ],
      modelAnswer:
        'Features:\n1. Introduced the elective principle allowing democratic voting for the first time.\n2. Stimulated early political consciousness and parties (e.g., NNDP in 1923).\n3. Replaced Lugard’s advisory Nigerian Council with a formal Legislative Council.\nNationalist Grievances:\nNationalists protested because voting was restricted only to men earning a steep property qualification of £100 per annum in Lagos and Calabar, while the Northern Region was completely excluded from legislative representation.',
      examinerAdvice:
        'Mention the specific voting qualification (£100 per annum) to earn full analysis marks.',
    },
  ],
  Economics: [
    {
      id: 1,
      title: 'National Income Accounting & GDP Deflator (15 Marks)',
      topic: 'Macroeconomics',
      year: 'WAEC / NECO',
      totalMarks: '15 Marks',
      question:
        'Distinguish clearly between Nominal Gross Domestic Product (GDP) and Real GDP. Explain why Real GDP is a superior metric for measuring economic growth in developing countries experiencing inflation.',
      markingScheme: [
        {
          step: 'Definition of Nominal GDP (measured at current market prices)',
          marks: '3 Marks',
        },
        {
          step: 'Definition of Real GDP (adjusted for inflation using constant base year prices)',
          marks: '3 Marks',
        },
        {
          step: 'The distortion of inflation on Nominal GDP explained with examples',
          marks: '5 Marks',
        },
        {
          step: 'Superiority of Real GDP in measuring genuine physical output expansions',
          marks: '4 Marks',
        },
      ],
      modelAnswer:
        'Nominal GDP measures the total monetary value of final goods and services produced within an economy evaluated at current prevailing market prices. Real GDP, by contrast, evaluates that same output using constant base-year prices, stripping out inflationary distortions.\nIn countries experiencing severe inflation, Nominal GDP can double purely due to price increases while actual output remains stagnant or falls. Real GDP is superior because it reflects true growth in physical goods and living standards.',
      examinerAdvice:
        'Always contrast current year prices vs constant base year prices.',
    },
  ],
  Literature: [
    {
      id: 1,
      title: 'Literary Devices & Dramatic Irony (15 Marks)',
      topic: 'Drama & Poetic Techniques',
      year: 'WAEC Standard',
      totalMarks: '15 Marks',
      question:
        'Define Dramatic Irony and demonstrate its usage in African dramatic texts or novels with specific examples.',
      markingScheme: [
        {
          step: 'Definition: When the audience or reader knows crucial truths that characters on stage are ignorant of',
          marks: '4 Marks',
        },
        {
          step: 'Textual Example (e.g., Ola Rotimi’s "The Gods Are Not To Blame" or "The Life Changer")',
          marks: '6 Marks',
        },
        {
          step: 'Impact on audience tension, suspense, and thematic development',
          marks: '5 Marks',
        },
      ],
      modelAnswer:
        'Dramatic irony occurs when the audience possesses vital knowledge about a situation that the characters remain unaware of, creating suspense and emotional tension.\nExample: In Ola Rotimi’s "The Gods Are Not To Blame", King Odewale curses the murderer of King Adetusa, swearing to avenge his death, oblivious to the fact that he himself is the culprit he seeks.',
      examinerAdvice:
        'Clearly identify the difference between verbal irony, situational irony, and dramatic irony.',
    },
  ],
};
