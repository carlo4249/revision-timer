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
// No em dashes used anywhere. Use colons, commas, or plain hyphens instead.

const SPEC = {
  'Maths':{
    examBoard:'Edexcel GCSE Mathematics (1MA1)',
    sections:[
      {name:'Number',points:[
        'N7: Laws of indices including fractional indices (x^(1/3)) and negative indices (x^(-n))',
        'N8: Calculate with surds, simplify surd expressions, rationalise denominators (multiply by conjugate)',
        'N10: Convert between recurring decimals and fractions; prove the conversion using algebra',
        'N16: Upper and lower bounds in calculations; write error intervals using inequality notation'
      ]},
      {name:'Algebra',points:[
        'A4: Factorise ax^2 + bx + c fully; difference of two squares; factorising by grouping',
        'A6: Algebraic proof: show expressions are equivalent, or always odd, even, or a multiple',
        'A11: Complete the square to find turning points; write in the form a(x + p)^2 + q',
        'A12: Sketch exponential functions y = k^x and trigonometric functions sin x, cos x, tan x',
        'A13: Sketch graph transformations: f(x + a), f(ax), af(x), f(x) + a and describe each',
        'A15: Estimate the gradient of a curve at a point using a tangent; interpret area under a graph',
        'A16: Equation of a circle x^2 + y^2 = r^2; find the equation of a tangent at a given point',
        'A18: Solve quadratics by factorising, completing the square, and the quadratic formula',
        'A19: Solve linear and quadratic simultaneous equations algebraically and graphically',
        'A20: Use iteration with a given formula to find approximate solutions to equations',
        'A22: Solve quadratic inequalities; represent the solution set on a number line or graph',
        'A25: Find the nth term of a quadratic sequence'
      ]},
      {name:'Ratio, Proportion and Rates of Change',points:[
        'R15: Gradient at a point on a curve represents the instantaneous rate of change',
        'R16: Set up and solve growth and decay problems using compound interest and iteration'
      ]},
      {name:'Geometry and Measures',points:[
        'G7: Enlargements with negative and fractional scale factors; identify the centre of enlargement',
        'G8: Describe combined transformations; identify invariant points under a transformation',
        'G10: Circle theorems: angle at centre, angles in same segment, cyclic quadrilateral, tangent-radius perpendicularity, alternate segment theorem',
        'G19: Similarity: ratio of lengths, areas (squared ratio), and volumes (cubed ratio)',
        'G22: Sine rule and cosine rule to find unknown sides and angles in any triangle',
        'G23: Area of a triangle using the formula: Area = (1/2) x ab x sin C',
        'G25: Vectors: column notation, magnitude, geometric proofs using vector methods'
      ]},
      {name:'Statistics and Probability',points:[
        'P9: Conditional probability using two-way tables, tree diagrams, and Venn diagrams',
        'S3: Histograms with unequal class widths; frequency density = frequency / class width',
        'S4: Box plots; quartiles and interquartile range; compare distributions using median and IQR'
      ]}
    ]
  },

  'English Lit':{
    examBoard:'AQA GCSE English Literature (8702) -- Closed Book',
    sections:[
      {name:'Paper 1: Shakespeare and 19th Century Novel (40%)',points:[
        'Section A: One question on your Shakespeare play; extract-based then whole-text response',
        'Macbeth key scenes: Act 1 Sc 7 (ambition and guilt), Act 2 Sc 1-2 (dagger / murder), Act 3 Sc 4 (Banquo\'s ghost), Act 5 Sc 1 (sleepwalking)',
        'Macbeth themes: ambition, power, guilt, gender roles, appearance vs reality, fate vs free will',
        'Macbeth context: Jacobean society, divine right of kings, witchcraft beliefs, patriarchy, James I',
        'Section B: One question on your 19th century novel',
        'A Christmas Carol: Scrooge\'s transformation across all five Staves; key symbols (chains, candle, fire)',
        'A Christmas Carol themes: redemption, poverty, social responsibility, family, the spirit of Christmas',
        'A Christmas Carol context: Victorian England, Industrial Revolution, New Poor Law (1834), workhouses and debtors\' prisons'
      ]},
      {name:'Paper 2: Modern Texts and Poetry (60%)',points:[
        'Section A: One essay from two choices on your modern text',
        'An Inspector Calls: themes of responsibility, social class, age, gender inequality',
        'An Inspector Calls context: set in 1912 but written in 1945; Priestley\'s socialist message about collective moral responsibility',
        'Section B: Compare a named poem to one poem of your choice from the anthology cluster',
        'Power and Conflict cluster: all 15 poems; be prepared to write on any of them as either named or chosen',
        'Section C: Analyse one unseen poem, then compare it with a second unseen poem',
        'AO1: Critical personal response supported with precise quotation; avoid plot summary',
        'AO2: Analyse language, form, and structure using correct subject terminology',
        'AO3: Context linked to meaning and effect; one reference per paragraph is sufficient',
        'AO4: Vocabulary, spelling, and punctuation accuracy (worth 5% of total marks)'
      ]}
    ]
  },

  'English Lang':{
    examBoard:'AQA GCSE English Language (8700) -- Unseen Texts',
    sections:[
      {name:'Paper 1: Explorations in Creative Reading and Writing (50%)',points:[
        'Source: one literature fiction text from the 20th or 21st century',
        'Q1 (4 marks): list 4 true statements from a specified section of the source',
        'Q2 (8 marks): comment on language using PETL: Point, Evidence, Technique, effect Link',
        'Q3 (8 marks): comment on structural features at whole-text level, not just sentence level',
        'Q4 (20 marks): critically evaluate a given statement about the text with evidence; use agree/disagree/both',
        'Q5 (40 marks): descriptive or narrative writing; plan for 5 min before writing; AO5 and AO6 equally weighted'
      ]},
      {name:'Paper 2: Writers\' Viewpoints and Perspectives (50%)',points:[
        'Sources: one non-fiction and one literary non-fiction from different time periods',
        'Q1 (4 marks): identify 4 true statements across both sources',
        'Q2 (8 marks): summarise and synthesise differences between both sources',
        'Q3 (12 marks): analyse language in one named source',
        'Q4 (16 marks): compare writers\' perspectives and methods across both sources; the main mark separator',
        'Q5 (40 marks): writing to present a viewpoint; specify your audience, purpose, and form clearly',
        'AO5 (30% of marks): communicate clearly; adapt tone, style, and register for purpose and audience',
        'AO6 (20% of total GCSE marks): vocabulary range, sentence variety, spelling, punctuation accuracy'
      ]}
    ]
  },

  'Biology':{
    examBoard:'Edexcel GCSE Biology (1BI0)',
    sections:[
      {name:'Topic 1: Key Concepts in Biology',points:[
        'Cell structure: nucleus (contains DNA), cytoplasm (site of reactions), cell membrane (controls entry/exit), mitochondria (aerobic respiration), ribosomes (protein synthesis)',
        'Plant cells additionally have: cell wall (cellulose, provides support), chloroplasts (photosynthesis), permanent vacuole (maintains turgor pressure)',
        'Prokaryotic cells: no membrane-bound nucleus; DNA is circular and in cytoplasm; smaller than eukaryotic cells; may have plasmids and flagella',
        'Microscopy: magnification = image size / actual size; light microscopy for cells; electron microscopy for organelles',
        'Mitosis: produces 2 genetically identical diploid daughter cells; used for growth, repair, and asexual reproduction',
        'Diffusion: net movement of particles from high to low concentration; no energy required',
        'Osmosis: diffusion of water molecules across a partially permeable membrane from high to low water potential',
        'Active transport: movement against the concentration gradient; requires ATP energy and carrier proteins',
        'Enzyme lock-and-key model: substrate fits the specific active site; enzyme is not consumed in the reaction',
        'Effect of temperature on enzymes: increasing temperature raises rate until the optimum; beyond this the enzyme denatures',
        'Effect of pH on enzymes: changes ionisation of the active site; each enzyme has an optimum pH range'
      ]},
      {name:'Topic 2: Cells and Control',points:[
        'Mitosis stages: Prophase (chromosomes condense), Metaphase (line up at equator), Anaphase (chromatids separate), Telophase (two nuclei form)',
        'Cancer: uncontrolled mitosis caused by mutations; tumours may be benign (localised) or malignant (spread via blood)',
        'Nervous system: receptor detects stimulus; sensory neurone sends impulse to CNS; motor neurone sends impulse to effector',
        'Reflex arc: faster than conscious response because it bypasses the brain; spinal cord coordinates the reflex',
        'Synapses: electrical impulse converted to chemical signal (neurotransmitter) which diffuses across the gap'
      ]},
      {name:'Topic 3: Genetics',points:[
        'DNA: double helix; complementary base pairs A-T and C-G; gene = section of DNA coding for a protein',
        'Chromosomes: humans have 23 pairs (46 total); sex chromosomes XX (female) and XY (male)',
        'Meiosis: produces 4 genetically different haploid gametes; two divisions; introduces variation through independent assortment and crossing over',
        'Punnett squares: monohybrid crosses with dominant (capital letter) and recessive (lowercase) alleles',
        'Sex-linked inheritance: gene carried on the X chromosome; males (XY) more likely to show recessive conditions',
        'Mutation: a change in the DNA base sequence; can be caused by radiation or mutagenic chemicals'
      ]},
      {name:'Topic 4: Natural Selection and Genetic Modification',points:[
        'Natural selection: variation exists in a population; competition for resources; best adapted individuals survive and reproduce; favourable alleles become more common over generations',
        'Speciation: populations become reproductively isolated; different selection pressures cause different adaptations; eventually cannot interbreed',
        'Genetic engineering: a useful gene is cut from one organism\'s DNA using restriction enzymes and inserted into another organism\'s DNA using ligase enzymes',
        'GM crops: can be made resistant to herbicides or pests; increases yield; ethical concerns about biodiversity and safety'
      ]},
      {name:'Topic 5: Health, Disease and the Immune System',points:[
        'Pathogens: bacteria (produce toxins), viruses (replicate inside host cells), fungi, protists',
        'Body defences: skin (physical barrier), mucus and cilia (trap and remove pathogens from airways), white blood cells',
        'Phagocytosis: white blood cells engulf and digest pathogens',
        'Antibodies: specific to a particular antigen; produced by lymphocytes; lock-and-key model; memory cells remain for future infection',
        'Vaccines: introduce dead, weakened, or antigen fragments of a pathogen; stimulate antibody production and memory cell formation; herd immunity',
        'Antibiotics: target bacterial cell walls or metabolism; cannot treat viral infections; antibiotic resistance develops through natural selection'
      ]},
      {name:'Topic 6: Plant Structures and Functions',points:[
        'Photosynthesis equation: 6CO2 + 6H2O + light energy --> C6H12O6 + 6O2 (in chloroplasts)',
        'Limiting factors for photosynthesis: light intensity, carbon dioxide concentration, temperature; any one can limit rate even if others are high',
        'Leaf structure: waxy cuticle (reduces water loss), palisade mesophyll (maximum light absorption), spongy mesophyll (gas exchange), guard cells (control stomatal opening)',
        'Transpiration: evaporation and diffusion of water vapour from leaves through stomata; increased by high temperature, low humidity, high wind',
        'Translocation: movement of sugars (sucrose) in phloem from leaves (source) to roots and other sinks'
      ]},
      {name:'Topic 7: Animal Coordination and Homeostasis',points:[
        'Homeostasis: maintaining a stable internal environment despite external changes',
        'Blood glucose regulation: rises after eating; insulin released by beta cells in pancreas; glucose taken up by cells and stored as glycogen in liver',
        'Blood glucose too low: glucagon released by alpha cells; glycogen broken down to glucose (glycogenolysis)',
        'Type 1 diabetes: autoimmune destruction of beta cells; no insulin produced; treated with insulin injections',
        'Type 2 diabetes: body cells become resistant to insulin; linked to obesity; treated with diet, exercise, and medication',
        'Thermoregulation: hypothalamus detects core temperature change; vasodilation and sweating to cool; vasoconstriction and shivering to warm',
        'Hormonal system: slower than nervous system; uses hormones in blood; effects are longer lasting'
      ]},
      {name:'Topic 8: Exchange and Transport',points:[
        'Alveoli adaptations: large surface area, moist lining, rich blood supply, one-cell-thick walls; maximise gas exchange efficiency',
        'Heart structure: 4 chambers; right side pumps deoxygenated blood to lungs; left side pumps oxygenated blood to body',
        'Blood vessels: arteries (thick muscular walls, high pressure), veins (large lumen, valves prevent backflow), capillaries (one-cell-thick wall, exchange site)',
        'Blood components: red blood cells (haemoglobin, no nucleus, biconcave disc), white blood cells (immune response), platelets (clotting), plasma (transports dissolved substances)',
        'Coronary heart disease: fatty deposits (plaques) in coronary arteries; reduces blood flow; treated with statins or stents'
      ]},
      {name:'Topic 9: Ecosystems and Material Cycles',points:[
        'Food chains and webs: energy flows from producers to consumers; only about 10% transferred between trophic levels',
        'Carbon cycle: photosynthesis removes CO2; respiration, decomposition, and combustion release CO2',
        'Nitrogen cycle: nitrogen fixation by bacteria; nitrification; denitrification; decomposition releases ammonium ions',
        'Biodiversity: variety of species in an ecosystem; high biodiversity increases stability and resilience',
        'Human impacts: deforestation reduces carbon sinks and biodiversity; overfishing disrupts food webs; pollution harms organisms'
      ]}
    ]
  },

  'Chemistry':{
    examBoard:'Edexcel GCSE Chemistry (1CH0)',
    sections:[
      {name:'Topic 1: Key Concepts in Chemistry',points:[
        'Atomic structure: protons (positive, in nucleus), neutrons (neutral, in nucleus), electrons (negative, in shells around nucleus)',
        'Atomic number = number of protons; mass number = protons + neutrons; electron configuration fills shells 2, 8, 8',
        'Isotopes: same number of protons, different number of neutrons; same chemical properties; relative atomic mass accounts for isotope abundance',
        'Ions: atoms that have lost or gained electrons; metal ions are positive (cations), non-metal ions are negative (anions)',
        'Ionic bonding: metal loses electrons to non-metal; forms giant ionic lattice; high melting point, conducts electricity when molten or dissolved',
        'Covalent bonding: sharing of electron pairs between non-metal atoms; simple molecular (low melting point) or giant covalent (very high melting point)',
        'Metallic bonding: positive metal ions in a sea of delocalised electrons; explains electrical conductivity, malleability, and high melting point',
        'Relative formula mass (Mr): sum of all relative atomic masses in the formula'
      ]},
      {name:'Topic 2: States of Matter and Mixtures',points:[
        'States of matter: solid (fixed shape and volume), liquid (fixed volume, takes shape of container), gas (fills all available space)',
        'Separating mixtures: filtration (insoluble solid from liquid), evaporation (soluble solid from solution), distillation (liquids with different boiling points), chromatography (dissolved substances)',
        'Chromatography: Rf value = distance travelled by substance / distance travelled by solvent front',
        'Purity: a pure substance has a sharp melting/boiling point; impurities broaden the melting point range'
      ]},
      {name:'Topic 3: Chemical Changes',points:[
        'Reactivity series (most to least reactive): K, Na, Ca, Mg, Al, Zn, Fe, Sn, Pb, Cu',
        'Displacement reactions: a more reactive metal displaces a less reactive metal from its salt solution',
        'Acids and alkalis: pH scale 0-14; acids below 7, alkalis above 7; neutralisation: acid + base --> salt + water',
        'Salt names: hydrochloric acid (HCl) makes chlorides; sulfuric acid (H2SO4) makes sulfates; nitric acid (HNO3) makes nitrates',
        'Electrolysis: ionic compound split by direct electrical current; cathode is negative (reduction occurs); anode is positive (oxidation occurs)',
        'Electrolysis of aqueous solutions: hydrogen produced at cathode if the metal is more reactive than hydrogen; oxygen produced at anode unless halide ions are present'
      ]},
      {name:'Topic 4: Extracting Metals and Equilibria',points:[
        'Metal extraction: metals below carbon in the reactivity series are extracted by reduction with carbon (e.g. iron from iron ore in a blast furnace)',
        'Electrolysis is used to extract metals more reactive than carbon (e.g. aluminium from aluminium oxide)',
        'Dynamic equilibrium: in a closed system, forward and reverse reaction rates are equal; concentrations remain constant',
        'Le Chatelier\'s principle: if conditions change, the equilibrium shifts to oppose the change',
        'Haber process: N2 + 3H2 = 2NH3 (reversible); conditions: 450 degrees C, 200 atm, iron catalyst; compromise between rate and yield'
      ]},
      {name:'Topic 5: Separate Chemistry 1 (Chemistry only)',points:[
        'Transition metals: d-block elements; form coloured compounds; can act as catalysts; variable oxidation states',
        'Flame tests: Li (red), Na (yellow/orange), K (lilac), Ca (orange-red), Cu (green)',
        'Precipitation reactions: mixing two solutions to form an insoluble precipitate; used to identify metal ions',
        'Test for gases: hydrogen (burning splint - squeaky pop), oxygen (glowing splint relights), CO2 (limewater turns cloudy), chlorine (bleaches damp litmus paper)'
      ]},
      {name:'Topic 6: Groups in the Periodic Table',points:[
        'Group 1 (alkali metals): react vigorously with water producing hydrogen gas and a metal hydroxide; reactivity increases down the group',
        'Group 7 (halogens): diatomic molecules; react with metals and non-metals; more reactive halogens displace less reactive ones from their salts',
        'Group 0 (noble gases): full outer electron shells; unreactive; used in lighting and as inert atmospheres'
      ]},
      {name:'Topic 7: Rates of Reaction and Energy Changes',points:[
        'Rate-increasing factors: higher temperature (more particles with activation energy), higher concentration (more frequent collisions), larger surface area, catalyst (provides alternative lower-energy pathway), higher pressure (gases only)',
        'Collision theory: particles must collide with sufficient energy (at least the activation energy) in the correct orientation to react',
        'Exothermic reactions: energy released to surroundings; temperature rises; examples include combustion, neutralisation, and oxidation',
        'Endothermic reactions: energy absorbed from surroundings; temperature falls; examples include thermal decomposition and dissolving ammonium nitrate',
        'Bond energies: energy must be supplied to break bonds (endothermic); energy is released when bonds form (exothermic)',
        'Overall energy change = energy to break bonds in reactants - energy released making bonds in products'
      ]},
      {name:'Topic 8: Fuels and Earth Science',points:[
        'Crude oil: mixture of hydrocarbons separated by fractional distillation based on boiling point differences',
        'Alkanes: CnH(2n+2); saturated (single bonds only); complete combustion gives CO2 and H2O; incomplete gives CO or carbon (soot)',
        'Alkenes: CnH2n; unsaturated (contain one C=C double bond); addition reactions with bromine water (decolourises) - test for C=C',
        'Cracking: breaking long-chain alkanes into shorter alkanes and alkenes using high temperature and a catalyst',
        'Atmosphere: early atmosphere was mainly CO2 and water vapour; nitrogen built up over time; oxygen increased due to photosynthesis',
        'Greenhouse gases: CO2, methane, and water vapour trap infrared radiation re-emitted from Earth\'s surface; enhanced greenhouse effect causes global warming'
      ]},
      {name:'Topic 9: Separate Chemistry 2 (Chemistry only)',points:[
        'Quantitative analysis: moles = mass / Mr; use mole ratios from balanced equations to find reacting masses',
        'Percentage yield = (actual yield / theoretical yield) x 100',
        'Atom economy = (Mr of desired product / sum of Mr of all products) x 100',
        'Concentration (mol/dm3) = moles / volume in dm3; convert cm3 to dm3 by dividing by 1000',
        'Titration: use known concentration of acid/alkali to find unknown concentration; calculate using n = c x v'
      ]}
    ]
  },

  'Physics':{
    examBoard:'Edexcel GCSE Physics (1PH0)',
    sections:[
      {name:'Topic 1: Key Concepts in Physics',points:[
        'SI units: length (m), mass (kg), time (s), current (A), temperature (K), amount of substance (mol)',
        'Scalars have magnitude only (e.g. speed, mass, energy); vectors have magnitude and direction (e.g. velocity, force, acceleration)',
        'Significant figures: give answers to an appropriate number of significant figures matching the data provided'
      ]},
      {name:'Topic 2: Motion and Forces',points:[
        'Speed = distance / time; acceleration = change in velocity / time taken (a = delta v / t)',
        'Distance-time graphs: gradient = speed; velocity-time graphs: gradient = acceleration; area under graph = distance',
        'Newton\'s First Law: an object remains at rest or constant velocity unless a resultant force acts on it',
        'Newton\'s Second Law: F = ma; resultant force (N) = mass (kg) x acceleration (m/s^2)',
        'Newton\'s Third Law: every action force has an equal and opposite reaction force on a different object',
        'Momentum: p = mv (kg m/s); conservation of momentum applies in all closed system collisions',
        'Stopping distance = thinking distance (reaction time) + braking distance; affected by speed, road conditions, tyre condition, reaction time',
        'Hooke\'s Law: F = ke; extension is proportional to force up to the elastic limit; k is the spring constant (N/m)'
      ]},
      {name:'Topic 3: Conservation of Energy',points:[
        'Energy stores: kinetic (Ek = 1/2 mv^2), gravitational PE (Ep = mgh), elastic PE (Ee = 1/2 ke^2), thermal, chemical, nuclear',
        'Conservation of energy: energy cannot be created or destroyed, only transferred between stores or dissipated',
        'Efficiency = useful output energy / total input energy; express as a decimal or percentage; always less than or equal to 1',
        'Power = energy transferred / time (P = E/t); unit is watts (W)'
      ]},
      {name:'Topic 4: Waves',points:[
        'Wave equation: v = f x lambda (wave speed = frequency x wavelength)',
        'Transverse waves: oscillation is perpendicular to the direction of energy transfer (e.g. light, water waves)',
        'Longitudinal waves: oscillation is parallel to the direction of energy transfer (e.g. sound, ultrasound)',
        'Electromagnetic spectrum (lowest to highest frequency): radio, microwave, infrared, visible light, ultraviolet, X-rays, gamma rays',
        'All EM waves travel at 3 x 10^8 m/s in a vacuum; know uses and hazards of each type',
        'Sound: produced by vibrations; cannot travel through a vacuum; travels faster in solids than liquids than gases',
        'Reflection: angle of incidence = angle of reflection; both measured from the normal'
      ]},
      {name:'Topic 5: Light and the Electromagnetic Spectrum',points:[
        'Refraction: change in wave speed when passing between media; bends towards normal when slowing down',
        'Total internal reflection: occurs when angle of incidence exceeds the critical angle; used in optical fibres',
        'Lenses: convex lens converges light; concave lens diverges light; real images can be projected; virtual images cannot',
        'Visible light spectrum: red (longest wavelength) to violet (shortest wavelength); prism disperses white light'
      ]},
      {name:'Topic 6: Radioactivity',points:[
        'Nuclear radiation types: alpha (2 protons + 2 neutrons, stopped by paper or few cm of air), beta (fast electron, stopped by aluminium), gamma (EM radiation, reduced by thick lead)',
        'Half-life: time taken for the activity (or number of unstable nuclei) to halve; use to calculate remaining mass or activity',
        'Nuclear fission: large nucleus absorbs a neutron and splits into two smaller nuclei plus neutrons and energy; chain reaction in reactors',
        'Nuclear fusion: two small nuclei combine to form a larger nucleus releasing energy; occurs in stars; not yet used for power generation'
      ]},
      {name:'Topic 7: Astronomy',points:[
        'Life cycle of stars: nebula --> protostar --> main sequence star --> red giant (small stars) or red supergiant (large stars)',
        'Small stars end as a white dwarf then black dwarf; large stars end in a supernova then neutron star or black hole',
        'Evidence for Big Bang: red-shift of light from distant galaxies (universe is expanding); cosmic microwave background radiation',
        'Red-shift: light from galaxies moving away appears shifted towards longer wavelengths; more distant galaxies show greater red-shift'
      ]},
      {name:'Topic 8: Energy - Forces Doing Work',points:[
        'Work done: W = F x d (joules); work done against friction is transferred to thermal energy stores',
        'Gravitational PE: Ep = mgh; kinetic energy: Ek = 1/2 mv^2; these interconvert in free fall (assuming no air resistance)'
      ]},
      {name:'Topic 9: Forces and their Effects',points:[
        'Resultant force: vector sum of all forces acting on an object; find by scale drawing or calculation',
        'Turning moments: moment (Nm) = force (N) x perpendicular distance from pivot (m)',
        'Principle of moments: for equilibrium, sum of clockwise moments = sum of anticlockwise moments',
        'Pressure: P = F/A (Pa or N/m^2); pressure in fluids acts equally in all directions at a given depth'
      ]},
      {name:'Topic 10: Electricity and Circuits',points:[
        'Ohm\'s Law: V = IR; current (A), voltage (V), resistance (ohms)',
        'Series circuits: same current everywhere; voltages add up; total resistance = sum of individual resistances',
        'Parallel circuits: same voltage across each branch; currents add up; total resistance is less than smallest individual resistance',
        'Power: P = IV = I^2 x R = V^2 / R; energy transferred: E = P x t',
        'Mains electricity: 230 V AC at 50 Hz in UK; live wire (brown), neutral wire (blue), earth wire (green-yellow)',
        'Fuses and circuit breakers: protect circuits from excess current; fuse melts when current exceeds rating'
      ]},
      {name:'Topic 11: Magnetism and the Motor Effect',points:[
        'Magnetic field lines: run from north to south pole outside the magnet; current-carrying wire has circular field lines',
        'Motor effect: a current-carrying conductor in a magnetic field experiences a force; F = BIL',
        'Fleming\'s left-hand rule: thuMb = Motion, First finger = Field, seCond finger = Current',
        'Electromagnetic induction: a changing magnetic field induces an EMF in a conductor; Faraday\'s law',
        'Transformers: Vp/Vs = Np/Ns; step-up increases voltage and decreases current; step-down does the reverse; used in National Grid to reduce energy loss'
      ]}
    ]
  },

  'Computer Science':{
    examBoard:'OCR GCSE Computer Science (J277)',
    sections:[
      {name:'1.1 Systems Architecture',points:[
        'Von Neumann architecture: CPU contains ALU (arithmetic and logic operations), control unit (directs data flow), and registers',
        'Key registers: Program Counter (address of next instruction), Memory Address Register (address being accessed), Memory Data Register (data being transferred), Accumulator (stores results)',
        'Fetch-decode-execute cycle: PC sends address to MAR; instruction fetched into MDR; decoded by control unit; executed by ALU; PC incremented',
        'CPU performance factors: clock speed (Hz, more cycles per second = faster), number of cores (parallel processing), cache size (L1 fastest but smallest, L3 largest but slowest)',
        'Embedded systems: computers built into other devices for a specific purpose (e.g. washing machines, car engines)'
      ]},
      {name:'1.2 Memory and Storage',points:[
        'Primary storage: RAM (volatile, read/write, stores OS and running programs), ROM (non-volatile, stores boot instructions/BIOS)',
        'Virtual memory: section of secondary storage used as overflow when RAM is full; much slower than RAM',
        'Secondary storage types: HDD (magnetic, moving parts, cheap, slow, high capacity), SSD (flash memory, no moving parts, fast, more expensive)',
        'Optical storage: CD/DVD/Blu-ray; portable but low capacity; used for media distribution',
        'Units: 8 bits = 1 byte; 1 KB = 1024 bytes; 1 MB = 1024 KB; 1 GB = 1024 MB; 1 TB = 1024 GB'
      ]},
      {name:'1.3 Computer Networks',points:[
        'LAN (Local Area Network): covers a small geographic area; devices connected by cables or Wi-Fi; owned by one organisation',
        'WAN (Wide Area Network): covers large geographic areas; uses leased infrastructure (e.g. internet)',
        'Network topologies: star (all connected to central switch; failure of one node does not affect others), bus (shared backbone cable; single point of failure), mesh (every device connected to every other; high redundancy)',
        'Network hardware: router (connects different networks and directs packets), switch (connects devices within a LAN), NIC (allows device to connect to a network)',
        'Protocols: TCP/IP suite; TCP ensures reliable delivery; IP handles addressing and routing; HTTP/HTTPS for web; FTP for file transfer',
        'Packet switching: data split into packets; each packet may take a different route; reassembled at destination'
      ]},
      {name:'1.4 Network Security',points:[
        'Threats: malware (viruses replicate and attach to files; worms self-replicate through networks; trojans disguise as legitimate software; ransomware encrypts files for payment)',
        'Social engineering: phishing emails trick users into revealing credentials; pretexting creates false scenarios; shoulder surfing',
        'Brute force attacks: systematically try all possible passwords; mitigated by account lockouts and strong passwords',
        'SQL injection: malicious SQL code inserted through input fields to manipulate a database',
        'DDoS (Distributed Denial of Service): overwhelm a server with traffic from many sources to make it unavailable',
        'Security measures: firewalls (filter incoming and outgoing traffic), encryption (scrambles data so only authorised parties can read it), two-factor authentication, strong password policies, regular software updates'
      ]},
      {name:'1.5 Systems Software',points:[
        'Operating system functions: memory management (allocates RAM to programs), process scheduling (decides which process runs when), file management (organises and controls access to files), device management (communicates with hardware via drivers)',
        'Utility software: antivirus (detects and removes malware), disk defragmenter (reorganises fragmented files), compression (reduces file size)',
        'High-level languages: human-readable; portable; need to be translated; examples include Python, Java, C++',
        'Low-level languages: assembly language (uses mnemonics for machine code instructions); machine code (binary; directly executed by CPU)',
        'Compilers: translate entire program before execution; faster execution; errors reported after full translation',
        'Interpreters: translate and execute line by line; easier to debug; slower execution'
      ]},
      {name:'2.1 Algorithms',points:[
        'Decomposition: breaking a problem into smaller sub-problems that are easier to solve individually',
        'Abstraction: removing unnecessary detail to focus on the essential features of a problem',
        'Flowcharts: use standard symbols (oval for start/end, parallelogram for input/output, rectangle for process, diamond for decision)',
        'Trace tables: track the value of each variable after every line or iteration of an algorithm; essential for Paper 2',
        'Bubble sort: compare adjacent pairs; swap if in wrong order; repeat passes until no swaps needed; O(n^2) worst case',
        'Merge sort: recursively divide array in half; merge sorted halves back together; O(n log n) in all cases',
        'Linear search: check each element in turn from start; O(n) worst case; works on unsorted data',
        'Binary search: sorted list only; compare with midpoint; discard the half that cannot contain the target; repeat; O(log n)',
        'Write pseudocode and actual code for sorting and searching algorithms from memory without reference materials'
      ]},
      {name:'2.2 Programming Fundamentals',points:[
        'Variables and constants: variables can change during execution; constants remain fixed; use meaningful names',
        'Data types: integer (whole numbers), real/float (decimal numbers), Boolean (True/False), string (text), character (single character)',
        'Sequence: instructions execute one after another in order',
        'Selection: if/elif/else statements; choose which block of code to execute based on a condition',
        'Iteration: for loops (fixed number of repetitions); while loops (repeat while condition is True)',
        'Functions: named reusable blocks of code that return a value; procedures do not return a value',
        'Parameters and return values: data passed into functions; return passes data back to the calling code',
        'Local vs global scope: local variables exist only within the function; global variables can be accessed anywhere'
      ]},
      {name:'2.3 Producing Robust Programs',points:[
        'Input validation: check data is the correct type, in range, and in the correct format before processing',
        'Authentication: verify user identity using username/password or other methods before granting access',
        'Testing: normal data (expected values), boundary data (at the edge of valid range), erroneous data (invalid input that should be rejected)',
        'Syntax errors: break the rules of the programming language; prevent the program from running',
        'Logic errors: program runs but produces incorrect output; harder to detect; use trace tables and debugging'
      ]},
      {name:'2.4 Boolean Logic',points:[
        'Logic gates: AND (output is 1 only if both inputs are 1), OR (output is 1 if at least one input is 1), NOT (inverts the input)',
        'NAND gate = NOT AND; NOR gate = NOT OR; XOR gate = output is 1 only if inputs are different',
        'Truth tables: construct a complete truth table for any combination of gates; one row per possible combination of inputs',
        'Boolean algebra: simplify expressions using identities; De Morgan\'s Law: NOT(A AND B) = NOT A OR NOT B',
        'Draw a logic circuit from a Boolean expression and write an expression from a given circuit diagram'
      ]},
      {name:'2.5 Programming Languages and IDEs',points:[
        'String operations: length (len), substring/slicing [start:end], concatenation (+), upper()/lower(), find/index',
        'File handling: open() with mode \'r\' (read), \'w\' (write, overwrites), \'a\' (append); always close files after use',
        '1D arrays/lists: zero-indexed; traverse with a for loop; common operations include append, remove, and sort',
        '2D arrays: lists of lists; access element with array[row][col]; use nested loops to traverse',
        'IDE features: editor (write code), run environment (execute code), debugger (step through code line by line), error messages'
      ]},
      {name:'2.6 Data Representation',points:[
        'Binary to denary: place values 128, 64, 32, 16, 8, 4, 2, 1; add values where bit is 1',
        'Denary to binary: repeatedly divide by 2 and record remainders from bottom to top',
        'Binary to hexadecimal: split into nibbles (groups of 4 bits); convert each nibble; hex digits 0-9 and A(10)-F(15)',
        'Binary addition: column addition; 0+0=0, 0+1=1, 1+1=10 (carry 1); overflow error when result exceeds available bits',
        'Two\'s complement: flip all bits then add 1 to represent negative numbers in binary',
        'ASCII: 7-bit encoding; 65 = A, 97 = a; Unicode uses more bits and covers all languages and symbols',
        'Images: made of pixels; bit depth determines colours per pixel (2^n colours); file size = width x height x bit depth (in bits)',
        'Sound: sample rate (samples per second) x bit depth x duration in seconds = file size in bits',
        'Compression: lossy removes data permanently (smaller file, quality loss, e.g. MP3, JPEG); lossless is fully reversible (e.g. PNG, FLAC); run-length encoding and Huffman coding are lossless methods'
      ]}
    ]
  },

  'Geography':{
    examBoard:'Edexcel B GCSE Geography (1GB0)',
    sections:[
      {name:'Topic 1: Hazardous Earth',points:[
        'Global atmospheric circulation: Hadley cell (0-30 degrees), Ferrel cell (30-60 degrees), Polar cell (60-90 degrees); creates trade winds, westerlies, and polar easterlies',
        'Natural climate change causes: Milankovitch cycles (changes in Earth\'s orbit and axial tilt), volcanic eruptions (ash and SO2 block sunlight), changes in solar output',
        'Evidence for past climate change: ice cores (trapped air bubbles preserve ancient atmosphere), tree rings (width indicates growing conditions), pollen records, historical accounts',
        'Human causes of current climate change: burning fossil fuels releases CO2; deforestation reduces carbon sinks; livestock farming produces methane; enhanced greenhouse effect',
        'Tropical cyclones: form over warm ocean water (above 26 degrees C); spin due to Coriolis effect; bring strong winds, heavy rainfall, and storm surges; lose strength over land',
        'Tectonic plates: constructive boundaries (plates move apart; new crust forms; mid-ocean ridges and shield volcanoes), destructive boundaries (plates move together; subduction creates explosive volcanoes and deep earthquakes), conservative boundaries (plates slide past each other; friction causes earthquakes)',
        'Comparing hazard impacts: HICs have better prediction, preparation, infrastructure, and emergency response than LICs; primary and secondary impacts differ significantly'
      ]},
      {name:'Topic 2: Development Dynamics',points:[
        'Measuring development: GDP per capita (income per person), HDI (composite index combining income, health, and education), Gini coefficient (measures income inequality)',
        'Causes of uneven development: colonial history, landlocked location, political instability, debt burden, unfair trade rules, natural hazards',
        'Emerging country case study: economic growth since 1990, expanding middle class, foreign direct investment, persistent inequality (e.g. India or China)',
        'Role of TNCs: bring investment, employment, and technology transfer; but profits leave the country, wages may be low, and supply chains exploit LIC workers',
        'Top-down development: large infrastructure projects (dams, roads) funded by governments or international organisations; may not meet local needs',
        'Bottom-up development: microfinance schemes, community water projects; small-scale but directly improves quality of life'
      ]},
      {name:'Topic 3: Challenges of an Urbanising World',points:[
        'Global urbanisation: over 50% of world population is urban since 2007; fastest growth in sub-Saharan Africa and South Asia',
        'Push and pull factors: push factors drive people out of rural areas (lack of jobs, poor services); pull factors attract people to cities (employment, education, healthcare)',
        'Megacity case study: site (physical location), situation (regional connections), connectivity (global links); challenges of size and rapid growth',
        'Informal settlements: lack legal tenure, piped water, sanitation, electricity; fire risk; poor access to healthcare and education',
        'Sustainable urban strategies: green infrastructure, upgrading squatter settlements (site and service schemes), mixed-use zoning, improving public transport'
      ]},
      {name:'Topic 4: UK Physical Landscapes',points:[
        'Geology: upland north and west (resistant igneous and metamorphic rock forms mountains); lowland south and east (softer sedimentary rock forms plains)',
        'Coastal erosion processes: hydraulic action (wave pressure), corrasion/abrasion (rocks scraping cliff), attrition (rocks wearing each other down), solution (dissolving rock)',
        'Coastal erosion landforms: headlands and bays, cliffs, wave-cut platforms, caves, arches, stacks, stumps',
        'Coastal management: hard engineering (seawalls, groynes, rock armour - expensive, effective, may cause problems elsewhere); soft engineering (beach nourishment, managed retreat - cheaper, more sustainable)',
        'River processes: erosion (hydraulic action, corrasion, attrition, solution), transportation (traction, saltation, suspension, solution), deposition (when energy decreases)',
        'River landforms: V-shaped valleys and interlocking spurs (upper course), waterfalls and gorges (middle course), meanders and ox-bow lakes, flood plains, levees (lower course)',
        'Flood management: hard engineering (dams, flood relief channels, concrete embankments); soft engineering (afforestation, floodplain zoning, flood warning systems)'
      ]},
      {name:'Topic 5: UK Human Landscapes',points:[
        'Urban growth: industrialisation attracted workers to cities in the 19th and 20th centuries; cities expanded outwards through suburbanisation',
        'Counter-urbanisation: people leave cities for rural areas; driven by higher house prices in cities, improved transport links, and desire for quality of life; raises house prices in rural areas',
        'Economic change: decline of manufacturing industry (deindustrialisation); growth of service sector; rise of quaternary industries (research, technology, finance)',
        'Regeneration: physical regeneration (new buildings and infrastructure), economic regeneration (attracting businesses and investment), social regeneration (improving housing and community facilities)',
        'Rural change: farming employs fewer people; tourism brings income but also pressure; second homes and commuters inflate house prices and reduce community cohesion'
      ]},
      {name:'Topic 6: Geographical Investigations (Fieldwork)',points:[
        'Fieldwork: you must know the data you collected, the methods you used, and how to evaluate their strengths and limitations',
        'Primary data: collected first-hand by you (e.g. questionnaires, beach profiles, river measurements)',
        'Secondary data: collected by others (e.g. census data, OS maps, published statistics)',
        'Evaluating methods: consider sample size, sampling strategy (systematic, random, stratified), potential for bias, and reliability'
      ]},
      {name:'Topic 7: People and the Biosphere',points:[
        'Global biomes: tropical rainforest, tropical grassland (savanna), hot desert, temperate deciduous forest, boreal forest (taiga), tundra; know their global distribution',
        'Biosphere services: climate regulation (carbon storage), water cycling (transpiration), soil formation (nutrient cycling), food and medicinal resources',
        'Tropical rainforest: hot and wet all year; high biodiversity; buttress roots, drip tips, epiphytes are adaptations to the environment',
        'Causes of deforestation: commercial farming (cattle ranching, soya), logging (timber and paper), HEP dam construction, road building and settlement'
      ]},
      {name:'Topic 8: Forests Under Threat',points:[
        'Deforestation impacts: loss of biodiversity, disruption of water cycle (less transpiration), increased carbon emissions, soil erosion',
        'Sustainable management: selective logging, replanting programmes, ecotourism, REDD+ schemes (paying countries to keep forests standing)',
        'Temperate forests: deciduous trees shed leaves in winter as an adaptation; face threats from acid rain, urbanisation, and agriculture'
      ]},
      {name:'Topic 9: Consuming Energy Resources',points:[
        'Energy mix: non-renewable sources (coal, oil, natural gas, nuclear) provide reliable baseload; renewable sources (solar, wind, HEP, tidal, geothermal) are sustainable but often intermittent',
        'Energy security: a country is energy secure if it has reliable access to affordable energy; import dependency creates vulnerability to price shocks and political instability',
        'Factors affecting energy mix: physical geography (availability of sun, wind, rivers), level of economic development, political decisions and international agreements',
        'Sustainable energy: reducing demand through efficiency measures, switching to renewables, carbon capture and storage; key to meeting Paris Agreement targets'
      ]}
    ]
  },

  'Business':{
    examBoard:'Edexcel GCSE Business (1BS0)',
    sections:[
      {name:'Theme 1: Investigating Small Business',points:[
        'Entrepreneurs: take calculated risks in exchange for potential profit; opportunity cost is the value of the next best alternative foregone',
        'Business aims and objectives: survival, profit, growth, social aims; objectives should be SMART',
        'Revenue = selling price x quantity sold',
        'Fixed costs: do not change with output (e.g. rent, salaries, insurance)',
        'Variable costs: change directly with output (e.g. raw materials, packaging, piece-rate wages)',
        'Total costs = fixed costs + variable costs',
        'Profit = total revenue - total costs; gross profit = revenue - cost of sales; net profit = gross profit - overheads',
        'Break-even output = fixed costs / (selling price - variable cost per unit); use break-even charts to read off margin of safety',
        'Cash flow: timing difference between money coming in and going out; a business can be profitable but have poor cash flow',
        'Sources of finance: internal (owner\'s savings, retained profit) and external (bank loan, overdraft, share issue, crowdfunding, trade credit)',
        'Market research: primary research (surveys, focus groups, observation) is up to date but expensive; secondary research (government data, reports) is cheap but may be outdated',
        'Market segmentation: dividing the market into groups by age, income, location, lifestyle; allows targeted marketing',
        'Marketing mix (4 Ps): Product (design, USP, product lifecycle), Price (penetration, skimming, competitive, cost-plus), Place (distribution channels), Promotion (advertising, social media, sales promotions)'
      ]},
      {name:'Theme 2: Building a Business',points:[
        'Business growth: organic growth (internal expansion - new products, new markets, increased sales); inorganic growth (mergers and takeovers)',
        'Economies of scale: as output increases, average cost per unit falls; bulk buying, specialist staff, spreading fixed costs',
        'Globalisation: trading internationally opens up larger markets but introduces risks (exchange rate fluctuations, different legal systems, cultural differences)',
        'Location decisions: factors include proximity to market, labour supply, raw materials, transport links, and government incentives',
        'Ethics and CSR: businesses face pressure to act responsibly towards employees, communities, and the environment; may conflict with short-term profit maximisation',
        'Production methods: job production (one-off, high quality, high cost), batch production (groups of similar items), flow/mass production (continuous, low unit cost, capital intensive)',
        'Lean production: just-in-time manufacturing (minimise stock holding); kaizen (continuous improvement through employee suggestions); reduces waste',
        'Motivation theories: Taylor (scientific management; workers motivated mainly by financial reward); Maslow (hierarchy of needs from physiological to self-actualisation)',
        'Human resources: recruitment process (job description, person specification, shortlisting, interview); training types (induction, on-the-job, off-the-job)',
        'ARR (%) = (average annual profit / initial investment) x 100',
        'Payback period: number of years to recover the initial investment; simpler to calculate but ignores long-term profitability',
        'Organisational structure: hierarchy shows chain of command; span of control is the number of subordinates a manager is directly responsible for; delayering reduces layers of management'
      ]}
    ]
  },

  'French':{
    examBoard:'Edexcel GCSE French (1FR0)',
    sections:[
      {name:'Theme 1: Identity and Culture',points:[
        'Me, my family and friends: describe yourself and others; relationships, qualities, role models',
        'Technology in everyday life: social media use, advantages and disadvantages, screen time, online safety',
        'Free time activities: sports, music, hobbies; give and justify opinions using because and although',
        'Customs and festivals in French-speaking countries: compare with UK traditions'
      ]},
      {name:'Theme 2: Local, National, International and Global Areas of Interest',points:[
        'Home, town, neighbourhood and region: describe where you live; local facilities and transport',
        'Social issues: poverty, homelessness, volunteer work, charity; use modal verbs to express obligation',
        'Global issues: environment, climate change, pollution, recycling; use il faut que + subjunctive',
        'Travel and tourism: holidays, means of transport, accommodation; past and future tenses are essential'
      ]},
      {name:'Theme 3: Current and Future Study and Employment',points:[
        'Studies and school: subjects, school rules, describe your school day; give opinions with reasons',
        'Life at school: compare school in France and the UK; school events, trips, exchanges',
        'Education post-16: further study options; use conditional to say what you would like to do',
        'Career plans and ambitions: future jobs; use future simple and conditional tenses'
      ]},
      {name:'Core Grammar',points:[
        'Present tense: regular -er/-ir/-re endings; key irregulars: aller (je vais), avoir (j\'ai), etre (je suis), faire (je fais), pouvoir (je peux), vouloir (je veux), prendre (je prends)',
        'Perfect tense (passe compose): avoir + past participle for most verbs; etre + past participle for DR MRS VANDERTRAMP verbs and all reflexive verbs; past participle agrees with subject when using etre',
        'Imperfect tense (imparfait): stem from nous form of present tense minus -ons + endings (-ais, -ais, -ait, -ions, -iez, -aient); used for habitual past actions and descriptions',
        'Near future (futur proche): conjugated aller + infinitive (e.g. je vais jouer = I am going to play)',
        'Future simple (futur simple): infinitive (or irregular stem) + endings (-ai, -as, -a, -ons, -ez, -ont); key irregulars: aller (ir-), avoir (aur-), etre (ser-), faire (fer-), pouvoir (pourr-), vouloir (voudr-)',
        'Conditional (conditionnel): same stem as future simple + imperfect endings; je voudrais, ce serait, on pourrait',
        'Negation: ne...pas (not), ne...jamais (never), ne...rien (nothing), ne...plus (no longer), ne...personne (nobody), ne...que (only)',
        'Subjunctive: used after il faut que, bien que, pour que, vouloir que; learn common present subjunctive forms',
        'Reflexive verbs: se lever (to get up), se laver (to wash), s\'appeler (to be called); use reflexive pronoun before verb'
      ]},
      {name:'Exam Skills',points:[
        'Reading (25%): read questions carefully before the text; identify gist first then specific details; watch for negatives and tense changes that affect meaning',
        'Listening (25%): read questions before the audio plays; listen for the overall meaning first; predict vocabulary from context; beware of distractors',
        'Writing (25%): include at least 3 different tenses in every extended piece; justify all opinions; use connectives (cependant, par contre, bien que) and a variety of structures',
        'Speaking (25%): prepare opinions on all core topics and themes in advance; extend answers with reasons and examples; recover from mistakes confidently and continue',
        'Translation into French: accuracy is more important than length; know high-frequency vocabulary off by heart; check verb endings, gender agreements, and accents'
      ]}
    ]
  }
};
