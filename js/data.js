// js/data.js -- All static data constants for Solus

const CIRC = 2 * Math.PI * 122;

const NOTION_PAGES = [
  {title:'Homepage',icon:'🏠',url:'https://notion.so/2d08392dca1880c88e6de03886c260c3',sub:'Main workspace hub'},
  {title:'Subjects',icon:'📚',url:'https://notion.so/2e68392dca1880aab770dbd20d6d654c',sub:'All subject pages'},
  {title:'Revision Error Log',icon:'📋',url:'https://notion.so/2d18392dca188004bd18cffe0b427785',sub:'Log errors after every session'},
  {title:'Weekly Session Log',icon:'📅',url:'https://notion.so/3278392dca1881a68cd7edbd6e147e50',sub:'Track sessions completed'},
  {title:'Weekly Revision Structure',icon:'🗓️',url:'https://notion.so/2d08392dca18800fb3dcf93f3968ece4',sub:'Timetable and structure'},
  {title:'How to Revise: Subject Guide',icon:'📖',url:'https://notion.so/3398392dca18816ab2f8f2311969fe54',sub:'Detailed method guides per subject'},
  {title:'Maths Subject',icon:'➗',url:'https://notion.so/3278392dca1881348f5ac299431b980a',sub:'Past paper tracker and notes'},
  {title:'Biology Subject',icon:'🧬',url:'https://notion.so/3278392dca1881d29d5aff2740a18254',sub:'Notes and revision'}
];

const TIMETABLE = {
  0:{s1:{subj:'Computer Science',mins:60},s2:{subj:'Biology',mins:60},s3:{subj:'Weekly Review',mins:20}},
  1:{s1:{subj:'Maths',mins:60},s2:{subj:'English Literature',mins:60},s3:{subj:'Rotation',mins:30},s3detail:'English: Quote blurting | French: Flashcards 20-30 vocab'},
  2:{s1:{subj:'Chemistry',mins:60},s2:{subj:'Biology',mins:60},s3:{subj:'Rotation',mins:30},s3detail:'French: Flashcards | Business: 2 high-mark questions, timed'},
  3:{s1:{subj:'Computer Science',mins:60},s2:{subj:'Maths',mins:60},s3:{subj:'Rotation',mins:30},s3detail:'English: Quote blurting + context | French: weakest flashcards only'},
  4:{s1:{subj:'Physics',mins:60},s2:{subj:'Geography',mins:60},s3:{subj:'Business',mins:30},s3detail:'French: Flashcards | Business: 2 questions on core concepts'},
  5:{s1:{subj:'Maths',mins:60},s2:{subj:'English Language',mins:60},s3:{subj:'Rotation',mins:30},s3detail:'English: Timed paragraph 12-15 min | French: Mixed review'},
  6:{s1:{subj:'Maths',mins:60},s2:{subj:'Weakest Science',mins:60},s3:{subj:'English / Geography',mins:40},s3detail:'English: Timed paragraph | French: Flashcards + short translation'}
};

const SUBJECTS = [
  {name:'Maths',          grade:'8', gradeNote:'unsure',     examDates:'Jun 10, 18, 22', weeklyMins:220},
  {name:'English Lit',    grade:'9', gradeNote:'unsure',     examDates:'Jun 11',         weeklyMins:90},
  {name:'English Lang',   grade:'9', gradeNote:'unsure',     examDates:'Jun 16',         weeklyMins:60},
  {name:'Biology',        grade:'9', gradeNote:'confirmed',  examDates:'Jun 18',         weeklyMins:110},
  {name:'Chemistry',      grade:'9', gradeNote:'unsure',     examDates:'Jun 19',         weeklyMins:100},
  {name:'Physics',        grade:'9', gradeNote:'unsure',     examDates:'Jun 23',         weeklyMins:90},
  {name:'Geography',      grade:'8', gradeNote:'unsure',     examDates:'Jun 17, 19',     weeklyMins:55},
  {name:'Computer Science',grade:'7',gradeNote:'unsure',     examDates:'Jun 23, 25',     weeklyMins:110},
  {name:'Business',       grade:'7', gradeNote:'unsure',     examDates:'Jun 24',         weeklyMins:25},
  {name:'French',         grade:'Pass',gradeNote:'unsure',   examDates:'Jun 17, 22, 23', weeklyMins:30}
];

const SUBJ_MAP = {
  'maths':'Maths','math':'Maths','mathematics':'Maths',
  'bio':'Biology','biology':'Biology',
  'chem':'Chemistry','chemistry':'Chemistry',
  'phys':'Physics','physics':'Physics',
  'cs':'Computer Science','computer science':'Computer Science','comp sci':'Computer Science',
  'english lit':'English Lit','english literature':'English Lit','lit':'English Lit',
  'english lang':'English Lang','english language':'English Lang','lang':'English Lang','english':'English Lit',
  'geo':'Geography','geography':'Geography',
  'business':'Business','biz':'Business',
  'french':'French','fr':'French'
};

const EXAMS = [
  {date:'2026-06-10',subj:'Maths',           paper:'Paper 1 (Non-calculator)'},
  {date:'2026-06-11',subj:'English Lit',     paper:'Component 2'},
  {date:'2026-06-16',subj:'English Lang',    paper:'Paper 1'},
  {date:'2026-06-17',subj:'French',          paper:'Reading'},
  {date:'2026-06-17',subj:'Geography',       paper:'Paper 1'},
  {date:'2026-06-18',subj:'Maths',           paper:'Paper 2 (Calculator)'},
  {date:'2026-06-18',subj:'Biology',         paper:'Paper 1 + 2'},
  {date:'2026-06-19',subj:'Geography',       paper:'Paper 2'},
  {date:'2026-06-19',subj:'Chemistry',       paper:'Paper 1 + 2'},
  {date:'2026-06-22',subj:'Maths',           paper:'Paper 3 (Calculator)'},
  {date:'2026-06-22',subj:'French',          paper:'Writing'},
  {date:'2026-06-23',subj:'Physics',         paper:'Paper 1 + 2'},
  {date:'2026-06-23',subj:'French',          paper:'Listening'},
  {date:'2026-06-23',subj:'Computer Science',paper:'Paper 1 (Computer Systems)'},
  {date:'2026-06-24',subj:'Business',        paper:'Paper 1'},
  {date:'2026-06-25',subj:'Computer Science',paper:'Paper 2 (Computational Thinking)'}
];

const METHODS = {
  blurt:{name:'Blurting',icon:'✏️',desc:'Write everything you know without notes. Open notes, circle the gaps. Repeat missed points 3 times.',
    phases:[{t:'focus',d:25*60,l:'Blurting',s:'Write from memory, then check'},{t:'log',d:0}]},
  paper:{name:'Past Paper',icon:'📄',desc:'Strict timed conditions, no notes. Mark against the scheme immediately after.',
    phases:[{t:'focus',d:50*60,l:'Past Paper',s:'Timed, no notes'},{t:'brk',d:5*60,l:'Break',s:'5 min step away'},{t:'log',d:0}]},
  flash:{name:'Flashcards',icon:'🃏',desc:'20 to 30 cards per session. Mark weak cards. Return to weak cards only at the end.',
    phases:[{t:'focus',d:30*60,l:'Flashcards',s:'Active recall, weak cards only'},{t:'log',d:0}]},
  teach:{name:'Teach It',icon:'🗣️',desc:'Explain the topic aloud as if teaching from scratch. Every stumble is a gap.',
    phases:[{t:'focus',d:35*60,l:'Teach It',s:'Explain aloud, note gaps'},{t:'log',d:0}]},
  practise:{name:'Practice Qs',icon:'📝',desc:'Topic questions from Save My Exams or PMT. Show all working. Self-mark immediately.',
    phases:[{t:'focus',d:50*60,l:'Practice Questions',s:'Topic Qs with mark scheme'},{t:'brk',d:5*60,l:'Break',s:'5 min'},{t:'log',d:0}]},
  custom:{name:'Custom',icon:'⏱️',desc:'Set your own focus duration and optional break.',
    phases:null}
};

const HOW_TO = {
  'Maths':[
    '<strong>Daily Corbett 5-a-day</strong>: non-negotiable. Keeps every topic warm.',
    '<strong>Higher tier priorities</strong>: circle theorems, vectors, algebraic proof, iteration, completing the square. Do not avoid them.',
    '<strong>Full past papers on PMT</strong>: show every step, never skip lines.',
    '<strong>After marking</strong>: write down the exact step you missed, not just the topic.'
  ],
  'Biology':[
    '<strong>Blurting for every subtopic</strong>: write from memory, open notes, circle gaps. Repeat missed points 3 times.',
    '<strong>End every session with one 6-mark question</strong> marked against the scheme.',
    '<strong>Flashcard every bold term</strong>: you need precise definitions, not vague recall.',
    '<strong>Paper 1 vs Paper 2</strong>: calculations dominate P1; evaluate and explain dominate P2.'
  ],
  'Chemistry':[
    '<strong>Calculations are non-negotiable</strong>: moles, concentration, percentage yield, atom economy. Drill until automatic.',
    '<strong>No equation sheet</strong>: learn all equations from memory for Edexcel.',
    '<strong>6-mark evaluate question per session</strong>, marked against the scheme immediately.',
    '<strong>Spaced repetition</strong>: atmosphere, rate of reaction, quantitative chemistry need multiple revisits.'
  ],
  'Physics':[
    '<strong>Write all equations from memory to start every session.</strong> Anything you hesitate on goes into flashcards.',
    '<strong>Calculation layout</strong>: equation first, substitute, rearrange, calculate. Skipping steps loses method marks.',
    '<strong>Graphs</strong>: practise drawing and interpreting distance-time, velocity-time, and wave diagrams.',
    '<strong>Space physics</strong>: smaller topic but consistently examinable.'
  ],
  'Computer Science':[
    '<strong>Grade gap subject</strong>: needs more active recall than subjects predicted at 9.',
    '<strong>Trace tables under timed conditions</strong> every session. This is the separator on Paper 2.',
    '<strong>Pseudocode algorithms from scratch</strong>: bubble sort, binary search, linear search. Time yourself.',
    '<strong>Logic gates and Boolean algebra</strong>: draw all gates from memory. Appears in most papers.'
  ],
  'English Lit':[
    '<strong>AQA 8702: closed book.</strong> Learn key quotes by theme, not chapter. Write from memory, check, repeat gaps 3 times.',
    '<strong>Essay plan before you write</strong>: 3 to 4 min planning produces a better essay than starting cold.',
    '<strong>AO2 is the highest weighted objective</strong>: language analysis, form, and structure with subject terminology.',
    '<strong>AO3 context</strong>: one reference per paragraph is enough. Link it to effect, do not just state it.'
  ],
  'English Lang':[
    '<strong>AQA 8700: all unseen texts.</strong> Paper 1 is fiction, Paper 2 is non-fiction across time periods.',
    '<strong>Q4 Paper 1 (20 marks)</strong>: evaluate with specific textual evidence. This is the mark separator.',
    '<strong>Writing is 50% of each paper</strong>: plan for 5 minutes before you write anything.',
    '<strong>AO6 is 20% of total marks</strong>: sentence structures, vocabulary range, spelling, and punctuation all count.'
  ],
  'Geography':[
    '<strong>Case studies need 3 specific facts</strong>: place name, at least one statistic, and a date or outcome.',
    '<strong>8-mark structure</strong>: Point, explain mechanism, case study evidence, further consequence.',
    '<strong>Get extended answers marked by your teacher.</strong> Level-based marking is easy to overestimate.',
    '<strong>Fieldwork questions</strong>: know your own data, methods, and how to evaluate them.'
  ],
  'Business':[
    '<strong>Apply everything to the given context</strong>: a generic answer scores 1 mark at most.',
    '<strong>Consequence chains</strong>: X leads to Y, because of Z. Answers that stop at X are incomplete.',
    '<strong>Key calculations</strong>: revenue, profit margin, break-even, ARR. Always show working.',
    '<strong>Theme 2 is under-revised by most students</strong>: check your confidence on globalisation, production, and HR.'
  ],
  'French':[
    '<strong>20 to 30 flashcards every session without exception.</strong> Mark weak cards and return to them at the end.',
    '<strong>Tense range in writing</strong>: include at least 3 tenses. Passive voice and conditional push marks higher.',
    '<strong>Translation practice</strong>: short paragraphs English to French and back. Forces vocabulary in context.',
    '<strong>Listening</strong>: past paper audio only, no looking at text first.'
  ]
};

// ===================== SPEC DATA =====================
// Each subject has: examBoard, sections[{name, points[]}]

const SPEC = {
  'Maths':{
    examBoard:'Edexcel GCSE Mathematics (1MA1)',
    sections:[
      {name:'Number',points:[
        'N7: Laws of indices including fractional indices (x to the power 1/3) and negative indices',
        'N8: Calculate with surds, simplify surd expressions, rationalise denominators',
        'N10: Convert between recurring decimals and fractions; prove using algebra',
        'N16: Upper and lower bounds in calculations; error intervals'
      ]},
      {name:'Algebra',points:[
        'A4: Factorise ax\u00b2 + bx + c; difference of two squares; grouping',
        'A6: Algebraic proof -- show expressions are equivalent or always odd/even/multiple',
        'A11: Complete the square to find turning points; form a(x + p)\u00b2 + q',
        'A12: Sketch exponential functions and trigonometric functions sin x, cos x, tan x',
        'A13: Sketch transformations: f(x + a), f(ax), af(x), f(x) + a',
        'A15: Estimate gradient of curve at a point using tangent; area under a graph',
        'A16: Equation of a circle x\u00b2 + y\u00b2 = r\u00b2; find equation of tangent at a given point',
        'A18: Solve quadratics by factorising, completing the square, and quadratic formula',
        'A19: Solve linear and quadratic simultaneous equations algebraically and graphically',
        'A20: Use iteration to find approximate solutions to equations',
        'A22: Quadratic inequalities; represent solution set on number line or graph',
        'A25: nth term of quadratic sequences'
      ]},
      {name:'Ratio and Proportion',points:[
        'R15: Gradient at a point on a curve represents instantaneous rate of change',
        'R16: Set up and solve growth and decay equations using compound interest and iteration'
      ]},
      {name:'Geometry and Measures',points:[
        'G7: Negative and fractional scale factor enlargements; centre of enlargement',
        'G8: Describe combined transformations; identify invariant points',
        'G10: Circle theorems: angle at centre, angles in same segment, cyclic quadrilateral, tangent-radius, alternate segment',
        'G19: Similarity: ratio of lengths, areas (squared), and volumes (cubed)',
        'G22: Sine rule and cosine rule to find unknown sides and angles in any triangle',
        'G23: Area = (1/2)ab sin C for any triangle',
        'G25: Vectors: column notation, magnitude, geometric proofs using vectors'
      ]},
      {name:'Statistics and Probability',points:[
        'P9: Conditional probability using two-way tables, tree diagrams, Venn diagrams',
        'S3: Histograms with unequal class widths; frequency density = frequency / class width',
        'S4: Box plots; quartiles and interquartile range; compare distributions'
      ]}
    ]
  },

  'English Lit':{
    examBoard:'AQA GCSE English Literature (8702) -- Closed Book',
    sections:[
      {name:'Paper 1: Shakespeare and 19th Century Novel (40%)',points:[
        'Section A: One question on Shakespeare play -- extract then whole text response',
        'Macbeth: Act 1 Sc 7 (ambition and guilt), Act 2 Sc 1-2 (dagger / murder), Act 3 Sc 4 (Banquo\'s ghost), Act 5 Sc 1 (sleepwalking)',
        'Macbeth themes: ambition, power, guilt, gender, appearance vs reality, fate',
        'Macbeth context: Jacobean society, divine right of kings, witchcraft, patriarchy, James I',
        'Section B: One question on 19th century novel',
        'A Christmas Carol: Scrooge transformation across all 5 staves',
        'A Christmas Carol themes: redemption, poverty, social responsibility, family, Christmas',
        'A Christmas Carol context: Victorian England, Industrial Revolution, New Poor Law (1834), workhouses'
      ]},
      {name:'Paper 2: Modern Texts and Poetry (60%)',points:[
        'Section A: One essay from two choices on modern text',
        'An Inspector Calls: themes of responsibility, social class, age, gender',
        'An Inspector Calls context: 1912 setting written 1945; Priestley\'s socialist message about collective responsibility',
        'Section B: Compare a named poem to one poem of your own choice from the cluster',
        'Power and Conflict cluster: all 15 poems -- be ready to write on any of them',
        'Section C: Analyse one unseen poem, then compare with a second unseen poem',
        'AO1: Critical style, informed personal response, supported with textual quotation',
        'AO2: Analyse language, form, and structure using correct subject terminology',
        'AO3: Context linked to effect -- one reference per paragraph is sufficient',
        'AO4: Vocabulary, spelling, and punctuation (5% of total marks)'
      ]}
    ]
  },

  'English Lang':{
    examBoard:'AQA GCSE English Language (8700) -- Unseen Texts',
    sections:[
      {name:'Paper 1: Explorations in Creative Reading and Writing (50%)',points:[
        'Source: one literature fiction text (20th or 21st century)',
        'Q1 (4 marks): list 4 true statements from a section of the source',
        'Q2 (8 marks): comment on language using PETL -- Point, Evidence, Technique, effect Link',
        'Q3 (8 marks): comment on structural features at whole-text level, not just sentence level',
        'Q4 (20 marks): critically evaluate a given statement about the text with evidence',
        'Q5 (40 marks): descriptive or narrative writing -- plan 5 min before writing; AO5 and AO6'
      ]},
      {name:'Paper 2: Writers\' Viewpoints and Perspectives (50%)',points:[
        'Sources: one non-fiction and one literary non-fiction from different time periods',
        'Q1 (4 marks): identify 4 true statements across both sources',
        'Q2 (8 marks): summarise and synthesise differences between sources',
        'Q3 (12 marks): analyse language in one source',
        'Q4 (16 marks): compare writers\' perspectives across both sources -- the mark separator',
        'Q5 (40 marks): writing to present a viewpoint; specify audience, purpose, form',
        'AO5 (30%): communicate clearly; adapt tone, style, and register for purpose and audience',
        'AO6 (20% of total GCSE): vocabulary range, sentence structures, spelling, punctuation'
      ]}
    ]
  },

  'Biology':{
    examBoard:'AQA GCSE Biology (8461) / Combined Science Trilogy (8464)',
    sections:[
      {name:'Cell Biology',points:[
        'Prokaryotic vs eukaryotic: size, nucleus, plasmids, cell wall material differences',
        'Animal cell organelles: nucleus (DNA/protein), cytoplasm (reactions), cell membrane (control), mitochondria (ATP), ribosomes (protein synthesis)',
        'Plant and algal cells: add cell wall (cellulose, support), chloroplasts (photosynthesis), permanent vacuole (turgor)',
        'Mitosis: Prophase, Metaphase, Anaphase, Telophase -- produces 2 identical diploid cells for growth and repair',
        'Required practical: light microscopy; magnification = image size / actual size; preparing slides',
        'Diffusion: net movement of particles from high to low concentration; no energy needed',
        'Osmosis: diffusion of water across partially permeable membrane from high to low water potential',
        'Active transport: movement against concentration gradient; requires ATP; protein carriers'
      ]},
      {name:'Organisation',points:[
        'Enzyme lock and key model: substrate fits active site; enzyme not consumed',
        'Effect of temperature: increases rate until optimum then denatures (active site changes shape)',
        'Effect of pH: changes charge on active site; each enzyme has an optimum pH',
        'Digestive system: salivary glands (amylase), stomach (protease, HCl), small intestine (absorption), liver (bile), pancreas (all enzymes)',
        'Heart: 4 chambers; right side pumps to lungs (pulmonary); left side pumps to body (systemic); valves prevent backflow',
        'Blood vessels: arteries (thick wall, high pressure), veins (valves, low pressure), capillaries (one cell thick, exchange)',
        'Blood: red cells (haemoglobin, no nucleus, biconcave), white cells (phagocytosis, antibodies), platelets (clotting), plasma (transport)',
        'Lungs: alveoli (large surface area, moist, good blood supply, thin walls) for gas exchange'
      ]},
      {name:'Infection and Response',points:[
        'Pathogens: bacteria (produce toxins), viruses (replicate inside cells), fungi, protists',
        'Body defences: skin (barrier), mucus/cilia (trap pathogens), white blood cells (phagocytose or produce antibodies)',
        'Antibodies: specific to antigen; lock-and-key; memory cells remain for future infection',
        'Vaccines: introduce dead or weakened pathogen; stimulate antibody production; herd immunity',
        'Antibiotics: kill bacteria by disrupting cell wall or metabolism; cannot kill viruses; antibiotic resistance'
      ]},
      {name:'Bioenergetics',points:[
        'Photosynthesis: 6CO\u2082 + 6H\u2082O + light energy \u2192 C\u2086H\u2081\u2082O\u2086 + 6O\u2082 (in chloroplasts)',
        'Limiting factors for photosynthesis: light intensity, CO\u2082 concentration, temperature',
        'Aerobic respiration: C\u2086H\u2081\u2082O\u2086 + 6O\u2082 \u2192 6CO\u2082 + 6H\u2082O + ATP (in mitochondria)',
        'Anaerobic respiration in humans: glucose \u2192 lactic acid + ATP (small amount); causes oxygen debt',
        'Anaerobic respiration in yeast: glucose \u2192 ethanol + CO\u2082 + ATP (fermentation)'
      ]},
      {name:'Homeostasis and Response',points:[
        'Nervous system: receptor \u2192 sensory neurone \u2192 CNS \u2192 motor neurone \u2192 effector',
        'Reflex arc: faster than conscious response; synapses use neurotransmitters to pass signals',
        'Blood glucose: rises after eating \u2192 insulin released by pancreas \u2192 glucose stored as glycogen in liver',
        'Blood glucose too low: glucagon released \u2192 glycogen converted back to glucose',
        'Type 1 diabetes: pancreas does not produce insulin; treated with insulin injections',
        'Type 2 diabetes: cells stop responding to insulin; linked to obesity; treated with diet and exercise',
        'Thermoregulation: hypothalamus monitors core temperature; vasodilation/vasoconstriction, sweating, shivering'
      ]},
      {name:'Inheritance and Evolution',points:[
        'DNA: double helix; base pairs A-T and C-G; gene = section of DNA coding for a protein',
        'Chromosomes: humans have 23 pairs; sex chromosomes XX (female) XY (male)',
        'Meiosis: produces 4 genetically different haploid gametes; introduces variation',
        'Punnett squares: monohybrid cross with dominant and recessive alleles; sex-linked traits',
        'Natural selection: variation \u2192 competition \u2192 survival of best adapted \u2192 reproduction \u2192 allele frequency changes'
      ]}
    ]
  },

  'Chemistry':{
    examBoard:'AQA GCSE Chemistry (8462) / Combined Science Trilogy (8464)',
    sections:[
      {name:'Atomic Structure and the Periodic Table',points:[
        'Atomic structure: protons (positive, nucleus), neutrons (neutral, nucleus), electrons (negative, shells)',
        'Atomic number = number of protons; mass number = protons + neutrons; electron configuration',
        'Isotopes: same number of protons, different neutrons; same chemical properties; relative atomic mass uses abundance',
        'Ionic bonding: metal loses electrons, non-metal gains; forms giant ionic lattice; high melting point, conducts when molten',
        'Covalent bonding: sharing electrons between non-metals; simple molecular (low mp) vs giant covalent (very high mp)',
        'Metallic bonding: positive metal ions in sea of delocalised electrons; explains conductivity, malleability, high melting point'
      ]},
      {name:'Quantitative Chemistry',points:[
        'Relative formula mass (M\u1D63): sum of all relative atomic masses in formula',
        'Amount in moles = mass (g) / M\u1D63',
        'Using moles in equations: mole ratio from balanced equation gives reacting amounts',
        'Percentage yield = (actual yield / theoretical yield) \u00d7 100',
        'Atom economy = (M\u1D63 of desired product / total M\u1D63 of all products) \u00d7 100',
        'Concentration (mol/dm\u00b3) = moles / volume (dm\u00b3); convert cm\u00b3 by dividing by 1000',
        'Titration: use volumes and concentration of known solution to find unknown concentration'
      ]},
      {name:'Chemical Changes',points:[
        'Reactivity series (high to low): K, Na, Ca, Mg, Al, Zn, Fe, Sn, Pb, Cu',
        'Displacement reactions: more reactive metal displaces less reactive from solution',
        'Acids and bases: pH scale 1-14; neutralisation: acid + base \u2192 salt + water',
        'Salt names: HCl makes chlorides; H\u2082SO\u2084 makes sulfates; HNO\u2083 makes nitrates',
        'Electrolysis: ionic compound split by electricity; cathode (negative) -- reduction; anode (positive) -- oxidation',
        'Electrolysis of aqueous solutions: discharge of ions depends on reactivity; hydrogen at cathode if metal is reactive'
      ]},
      {name:'Energy Changes',points:[
        'Exothermic: energy released to surroundings; temperature rises; combustion, neutralisation, oxidation',
        'Endothermic: energy absorbed from surroundings; temperature falls; thermal decomposition, dissolving ammonium nitrate',
        'Bond energies: energy input to break bonds (endothermic); energy released making bonds (exothermic)',
        'Overall energy change = energy to break bonds - energy released making bonds'
      ]},
      {name:'Rates, Equilibrium and Organic Chemistry',points:[
        'Rate-increasing factors: temperature (more energy), concentration (more collisions), surface area, catalyst (lowers activation energy), pressure (gases)',
        'Collision theory: particles must collide with sufficient energy (activation energy) to react',
        'Dynamic equilibrium: forward and reverse rates equal; closed system',
        'Le Chatelier\'s principle: system opposes any change in conditions; increase temp \u2192 endothermic direction favoured',
        'Haber process: N\u2082 + 3H\u2082 \u21cc 2NH\u2083; conditions: 450\u00b0C, 200 atm, iron catalyst; compromise between rate and yield',
        'Alkanes: C\u2099H\u208a\u2082\u2099\u208a\u2082; saturated (single bonds only); combustion; substitution with halogens in UV',
        'Alkenes: C\u2099H\u2082\u2099; unsaturated (one C=C double bond); addition reactions; bromine water decolourises (test for C=C)'
      ]},
      {name:'Analysis and the Atmosphere',points:[
        'Early atmosphere: mainly CO\u2082 and water vapour; N\u2082 built up; O\u2082 from photosynthesis',
        'Greenhouse gases: CO\u2082, methane, water vapour; absorb and re-emit infrared radiation',
        'Test for hydrogen: burning splint -- squeaky pop',
        'Test for oxygen: glowing splint -- relights',
        'Test for CO\u2082: limewater turns milky/cloudy',
        'Test for chlorine: damp litmus paper -- bleaches white',
        'Flame tests: Li (red), Na (yellow/orange), K (lilac), Ca (orange-red), Cu (green)'
      ]}
    ]
  },

  'Physics':{
    examBoard:'AQA GCSE Physics (8463) / Combined Science Trilogy (8464)',
    sections:[
      {name:'Forces',points:[
        'Newton\'s 1st Law: an object stays at rest or constant velocity unless a resultant force acts on it',
        'Newton\'s 2nd Law: F = ma; resultant force (N) = mass (kg) \u00d7 acceleration (m/s\u00b2)',
        'Newton\'s 3rd Law: every action has an equal and opposite reaction on a different object',
        'Momentum: p = mv; unit kg m/s; conservation of momentum in closed systems',
        'Stopping distance = thinking distance + braking distance; affected by speed, conditions, reaction time',
        'Hooke\'s Law: F = ke; extension proportional to force up to elastic limit; spring constant k (N/m)'
      ]},
      {name:'Waves',points:[
        'Wave equation: v = f\u03bb (wave speed = frequency \u00d7 wavelength)',
        'Transverse waves: oscillation perpendicular to direction of travel (e.g. light, water)',
        'Longitudinal waves: oscillation parallel to direction of travel (e.g. sound, compression waves)',
        'Electromagnetic spectrum (low to high freq): radio, microwave, infrared, visible, UV, X-ray, gamma',
        'All EM waves travel at 3 \u00d7 10\u2078 m/s in a vacuum; uses and hazards of each type',
        'Sound: compression waves; speed in solids > liquids > gases; cannot travel through a vacuum'
      ]},
      {name:'Electricity',points:[
        'V = IR (Ohm\'s Law); resistance in ohms (\u03a9); calculate voltage, current or resistance',
        'Power: P = IV = I\u00b2R = V\u00b2/R; energy transferred E = Pt',
        'Series circuits: same current everywhere; voltages add up; total resistance = sum of resistances',
        'Parallel circuits: same voltage across each branch; currents add up; total resistance decreases',
        'Mains electricity: 230 V AC, 50 Hz; live (brown), neutral (blue), earth (green/yellow)',
        'Fuses and circuit breakers: fuse melts if current too high; protect cables from overheating'
      ]},
      {name:'Magnetism and Electromagnetism',points:[
        'Magnetic field lines: from N to S outside magnet; field around current-carrying wire is circular',
        'Motor effect: current in magnetic field experiences a force; F = BIL',
        'Fleming\'s left-hand rule: thuMb = Motion, First finger = Field, seCond finger = Current',
        'Electromagnetic induction: changing magnetic field induces an EMF; Faraday\'s law',
        'Transformers: V\u209a/V\u209b = N\u209a/N\u209b; step-up increases voltage; step-down decreases; used in National Grid'
      ]},
      {name:'Particle Model and Atomic Structure',points:[
        'Specific heat capacity: E = mc\u0394T; energy to raise 1 kg by 1\u00b0C',
        'Specific latent heat: E = mL; energy for state change at constant temperature',
        'Nuclear radiation: alpha (\u03b1, stopped by paper), beta (\u03b2, stopped by aluminium), gamma (\u03b3, reduced by lead)',
        'Half-life: time for activity or number of unstable nuclei to halve; calculate remaining mass',
        'Fission: large nucleus splits; chain reaction; releases energy in nuclear reactors'
      ]},
      {name:'Energy and Space',points:[
        'Energy stores: kinetic (1/2 mv\u00b2), gravitational PE (mgh), elastic PE (1/2 ke\u00b2), thermal, chemical',
        'Efficiency = useful output energy / total input energy; express as fraction or percentage; \u22641',
        'Renewable sources: solar, wind, hydro, tidal, geothermal; no fuel cost; variable output',
        'Life cycle of stars: nebula \u2192 protostar \u2192 main sequence \u2192 red giant \u2192 white dwarf (small stars) or supernova \u2192 neutron star / black hole (large stars)',
        'Big Bang: universe started ~14 billion years ago; evidence from red-shift and cosmic microwave background radiation'
      ]}
    ]
  },

  'Computer Science':{
    examBoard:'OCR GCSE Computer Science (J277)',
    sections:[
      {name:'Algorithms',points:[
        'Trace tables: track each variable through each iteration; show state after every line',
        'Bubble sort: compare adjacent pairs, swap if wrong order; each pass bubbles largest to end; O(n\u00b2) worst case',
        'Merge sort: divide array in half recursively; merge sorted halves; O(n log n) all cases',
        'Linear search: check each element in turn; O(n) worst case; works on unsorted data',
        'Binary search: sorted list only; check mid-point; discard half; repeat; O(log n)',
        'Write pseudocode and code algorithms from scratch without reference materials'
      ]},
      {name:'Programming Fundamentals',points:[
        'Variables and data types: integer, real/float, Boolean, string, character',
        'Sequence, selection (if / elif / else), iteration (for and while loops)',
        'Functions and procedures: parameters, return values, local vs global scope',
        'String operations: length, substring/slicing, concatenation, upper/lower, find',
        'File handling: open, read, write, close; append mode vs overwrite',
        '1D and 2D arrays/lists: zero-indexed; traverse with loops; common operations'
      ]},
      {name:'Data Representation',points:[
        'Binary to denary and back: place values 128, 64, 32, 16, 8, 4, 2, 1',
        'Binary to hex: split into nibbles (4 bits); hex digits 0-9 and A-F (10-15)',
        'Binary addition: column addition; overflow error when result needs more bits than available',
        'Two\'s complement: flip bits then add 1 to represent negative numbers',
        'ASCII: 7-bit character encoding; 65 = A, 97 = a; Unicode extends to more languages',
        'Images: pixels; bit depth determines colours per pixel (2^n); file size = width \u00d7 height \u00d7 bit depth',
        'Sound: sample rate (samples per second) \u00d7 bit depth \u00d7 duration = file size in bits',
        'Compression: lossy (removes data permanently, smaller) vs lossless (reversible, no quality loss); RLE and Huffman coding'
      ]},
      {name:'Hardware and Software',points:[
        'Von Neumann architecture: CPU, ALU (arithmetic/logic), control unit, registers (PC, MAR, MDR, accumulator), buses (data, address, control)',
        'Fetch-decode-execute cycle: PC holds address, MAR fetches from RAM, MDR holds data, decoded and executed',
        'CPU performance factors: clock speed (Hz), number of cores, cache size (L1, L2, L3)',
        'Primary storage: RAM (volatile, read/write, working memory), ROM (non-volatile, stores boot instructions)',
        'Secondary storage: HDD (magnetic, cheap, slow), SSD (flash, fast, expensive), optical (portable), flash/USB',
        'High-level vs low-level languages; compilers (whole program translated) vs interpreters (line by line)'
      ]},
      {name:'Networks and Security',points:[
        'LAN (local area network) vs WAN (wide area network); topology: star (central switch), bus (shared cable), mesh (every device connected)',
        'TCP/IP protocol stack: Application, Transport (TCP/UDP), Internet (IP), Link layers',
        'IP addressing: IPv4 (32-bit, 4 octets) vs IPv6 (128-bit); packet switching routes data independently',
        'Network threats: malware (viruses, worms, trojans), phishing (fraudulent emails), brute force (password guessing), SQL injection, DDoS',
        'Security measures: firewall (block unauthorised traffic), encryption (scramble data), strong passwords, two-factor authentication, anti-malware'
      ]},
      {name:'Boolean Logic',points:[
        'Logic gates from memory: AND (both inputs 1), OR (at least one input 1), NOT (inverts), NAND, NOR, XOR',
        'Truth tables: construct for any gate or combination; one row per possible input combination',
        'Boolean algebra: simplify expressions; De Morgan\'s Law: NOT(A AND B) = NOT A OR NOT B',
        'Draw logic circuit from Boolean expression; write expression from circuit diagram'
      ]}
    ]
  },

  'Geography':{
    examBoard:'Edexcel B GCSE Geography (1GB0)',
    sections:[
      {name:'Topic 1: Hazardous Earth',points:[
        'Global atmospheric circulation: Hadley, Ferrel, Polar cells; creates trade winds and pressure belts',
        'Ocean currents: redistribute heat; thermohaline circulation (deep ocean conveyor)',
        'Natural climate change causes: Milankovitch cycles (orbital changes), volcanic eruptions, solar output variation',
        'Evidence for climate change: ice cores (trapped air bubbles), tree rings, pollen records, historical documents',
        'Human causes: burning fossil fuels releases CO\u2082; deforestation reduces carbon sink; enhanced greenhouse effect',
        'Tropical cyclones: form over warm ocean (>26\u00b0C), spin due to Coriolis, bring extreme rainfall and storm surges',
        'Plate boundaries: destructive (subduction, volcanoes and earthquakes), constructive (mid-ocean ridge, new crust), conservative (sliding past, earthquakes)',
        'Compare earthquake/volcano impacts in high-income vs low-income countries: immediate and long-term'
      ]},
      {name:'Topic 2: Development Dynamics',points:[
        'Measuring development: GDP per capita, HDI (composite -- income, health, education), Gini coefficient (inequality)',
        'Causes of uneven development: colonial history, landlocked location, political instability, debt, trade rules',
        'Emerging country case study: economic change since 1990, growth of middle class, FDI, inequality',
        'Role of TNCs: bring investment and jobs but profits leave country; supply chains link HICs and LICs',
        'Top-down vs bottom-up development: large infrastructure projects vs local micro-finance and community schemes'
      ]},
      {name:'Topic 3: Urbanising World',points:[
        'Global urbanisation: over 50% urban since 2007; fastest growth in sub-Saharan Africa and South Asia',
        'Megacity case study: site (physical), situation (regional links), connectivity (global)',
        'Urban challenges: informal settlements (lack water, sanitation, security), traffic congestion, pollution',
        'Sustainability strategies: green infrastructure, improving squatter settlements, mixed-use zoning'
      ]},
      {name:'Topic 4: UK Physical Landscape',points:[
        'Geological foundations: upland north and west (igneous/metamorphic); lowland south and east (sedimentary)',
        'Coastal erosion landforms: headlands and bays, cliffs, wave-cut platforms, caves, arches, stacks, stumps',
        'Coastal management: hard engineering (seawalls, groynes -- expensive but effective) vs soft engineering (beach nourishment, managed retreat)',
        'River erosion: hydraulic action, corrasion, attrition, solution; landforms: V-valley, interlocking spurs, waterfalls',
        'River deposition landforms: flood plain, levees, meanders, oxbow lakes, deltas',
        'Flood management: hard (dams, concrete channels) vs soft (afforestation, floodplain zoning, warning systems)'
      ]},
      {name:'Topic 5: UK Human Landscape',points:[
        'Urban and rural differences: density, age structure, ethnicity, economic activity, services',
        'Causes of urbanisation: industrialisation (historical), rural-urban migration',
        'Counter-urbanisation: people leave cities; impacts on rural areas (house prices, commuting)',
        'Economic change: decline of manufacturing; growth of service and quaternary sectors',
        'Regeneration: physical (new buildings), economic (attracting investment), social (improving housing and services)'
      ]},
      {name:'Topic 6: Global Development and Connections',points:[
        'Global biomes: tropical rainforest, temperate deciduous forest, boreal taiga, grassland, desert, tundra -- know global distribution',
        'Biosphere services: climate regulation, water cycling, soil formation, food and medicine resources',
        'Tropical deforestation causes: commercial farming, logging, HEP projects, road building',
        'Energy mix: non-renewable (coal, oil, gas, nuclear) vs renewable (solar, wind, HEP, tidal, geothermal)',
        'Energy security: import dependency, geopolitical risk, transition to renewables'
      ]}
    ]
  },

  'Business':{
    examBoard:'Edexcel GCSE Business (1BS0)',
    sections:[
      {name:'Theme 1: Investigating Small Business',points:[
        'Entrepreneurs: take risk for profit/personal satisfaction; opportunity cost of decisions',
        'Revenue = selling price \u00d7 quantity sold',
        'Fixed costs: do not change with output (e.g. rent, salaries)',
        'Variable costs: change with output (e.g. materials, packaging)',
        'Total costs = fixed costs + variable costs',
        'Profit = total revenue - total costs; gross profit vs net profit distinction',
        'Break-even: fixed costs / (selling price - variable cost per unit); use break-even charts',
        'Sources of finance: owner\'s savings, bank loan, overdraft, share issue, crowdfunding, retained profit',
        'Marketing mix: Product (USP, lifecycle), Price (penetration, skimming, competitive), Place (channels), Promotion (above/below line)',
        'Market research: primary (surveys, focus groups -- costly but specific) vs secondary (desk research -- cheap but may be out of date)'
      ]},
      {name:'Theme 2: Building a Business',points:[
        'Business growth: organic (internal -- new products, new markets) vs inorganic (mergers and takeovers)',
        'Globalisation: trading internationally; benefits (larger market) and risks (exchange rates, legal differences)',
        'Ethics and environment: CSR, sustainable sourcing, waste reduction; balancing profit with responsibility',
        'Production methods: job (one-off, high cost), batch (groups, some flexibility), flow (continuous, low unit cost)',
        'Lean production: just-in-time (minimise stock), kaizen (continuous improvement), cell production',
        'Motivation theories: Maslow (hierarchy of needs), Taylor (scientific management -- financial reward)',
        'Human resources: recruitment (job description, person spec, interview), training (induction, on-the-job, off-the-job)',
        'ARR (%) = (average annual profit / initial investment) \u00d7 100',
        'Payback period: time to recover investment; simpler but ignores time value of money'
      ]}
    ]
  },

  'French':{
    examBoard:'AQA GCSE French (8658)',
    sections:[
      {name:'Themes and Topics',points:[
        'Identity and culture: self, family, friends, relationships, role models, social media, technology',
        'Local, national, international areas of interest: town/region, travel, global issues, environment',
        'Current and future study and employment: school, career aspirations, work experience, gap year',
        'International and global dimension: tourism, immigration, cultural diversity'
      ]},
      {name:'Core Grammar',points:[
        'Present tense: regular -er/-ir/-re verbs + key irregulars (aller, avoir, \u00eatre, faire, prendre, vouloir, pouvoir)',
        'Perfect tense (pass\u00e9 compos\u00e9): avoir + past participle (most verbs); \u00eatre + past participle (DR MRS VANDERTRAMP verbs); agreement of past participle',
        'Imperfect tense: habitual past actions and descriptions; stem from nous present - ons + endings',
        'Near future: aller (conjugated) + infinitive',
        'Future simple: infinitive (or irregular stem) + future endings (-ai, -as, -a, -ons, -ez, -ont)',
        'Conditional: infinitive (or irregular stem) + imperfect endings; je voudrais, ce serait',
        'Negation: ne...pas, ne...jamais (never), ne...rien (nothing), ne...plus (no longer), ne...que (only)',
        'Subjunctive: after il faut que, bien que, pour que -- use present subjunctive of common verbs'
      ]},
      {name:'Exam Skills',points:[
        'Reading: identify gist first, then specific details; watch for negatives and tense changes',
        'Listening: read questions before audio plays; predict vocabulary from context',
        'Writing: include 3 or more tenses in every essay; justify opinions; use a range of connectives and structures',
        'Speaking: prepare opinions on all core topics; extend with reasons; recover from mistakes confidently',
        'Translation into French: accuracy over length; know high-frequency vocabulary off by heart'
      ]}
    ]
  }
};
