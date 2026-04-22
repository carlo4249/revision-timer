// js/data.js -- All static data constants for Revision Timer

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
  {name:'Maths',grade:'8',gradeNote:'unsure',examDates:'Jun 10, 18, 22',weeklyMins:220},
  {name:'English Lit',grade:'9',gradeNote:'unsure',examDates:'Jun 11',weeklyMins:90},
  {name:'English Lang',grade:'9',gradeNote:'unsure',examDates:'Jun 16',weeklyMins:60},
  {name:'Biology',grade:'9',gradeNote:'confirmed',examDates:'Jun 18',weeklyMins:110},
  {name:'Chemistry',grade:'9',gradeNote:'unsure',examDates:'Jun 19',weeklyMins:100},
  {name:'Physics',grade:'9',gradeNote:'unsure',examDates:'Jun 23',weeklyMins:90},
  {name:'Geography',grade:'8',gradeNote:'unsure',examDates:'Jun 17, 19',weeklyMins:55},
  {name:'Computer Science',grade:'7',gradeNote:'unsure',examDates:'Jun 23, 25',weeklyMins:110},
  {name:'Business',grade:'7',gradeNote:'unsure',examDates:'Jun 24',weeklyMins:25},
  {name:'French',grade:'Pass',gradeNote:'unsure',examDates:'Jun 17, 22, 23',weeklyMins:30}
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
  {date:'2026-06-10',subj:'Maths',paper:'Paper 1'},
  {date:'2026-06-11',subj:'English Literature',paper:'Component 2'},
  {date:'2026-06-16',subj:'English Language',paper:'Paper 1'},
  {date:'2026-06-17',subj:'French',paper:'Reading'},
  {date:'2026-06-17',subj:'Geography',paper:'Paper 1'},
  {date:'2026-06-18',subj:'Maths',paper:'Paper 2'},
  {date:'2026-06-18',subj:'Biology',paper:'Paper'},
  {date:'2026-06-19',subj:'Geography',paper:'Paper 2'},
  {date:'2026-06-19',subj:'Chemistry',paper:'Paper'},
  {date:'2026-06-22',subj:'Maths',paper:'Paper 3'},
  {date:'2026-06-22',subj:'French',paper:'Writing'},
  {date:'2026-06-23',subj:'Physics',paper:'Paper'},
  {date:'2026-06-23',subj:'French',paper:'Listening'},
  {date:'2026-06-23',subj:'Computer Science',paper:'Paper 1'},
  {date:'2026-06-24',subj:'Business',paper:'Paper 1'},
  {date:'2026-06-25',subj:'Computer Science',paper:'Paper 2'}
];

const METHODS = {
  blurt:{name:'Blurting',icon:'✏️',desc:'Write everything you know without notes. Open notes, circle the gaps. Repeat missed points 3 times.',phases:[{t:'focus',d:25*60,l:'Blurting',s:'Write from memory, then check'},{t:'log',d:0}]},
  paper:{name:'Past Paper',icon:'📄',desc:'Strict timed conditions, no notes. Mark against the scheme immediately after.',phases:[{t:'focus',d:50*60,l:'Past Paper',s:'Timed, no notes'},{t:'brk',d:5*60,l:'Break',s:'5 min step away'},{t:'log',d:0}]},
  flash:{name:'Flashcards',icon:'🃏',desc:'20 to 30 cards per session. Mark weak cards. Return to weak cards only at the end.',phases:[{t:'focus',d:30*60,l:'Flashcards',s:'Active recall, weak cards only'},{t:'log',d:0}]},
  teach:{name:'Teach It',icon:'🗣️',desc:'Explain the topic aloud as if teaching from scratch. Every stumble is a gap.',phases:[{t:'focus',d:35*60,l:'Teach It',s:'Explain aloud, note gaps'},{t:'log',d:0}]},
  practise:{name:'Practice Qs',icon:'📝',desc:'Topic questions from Save My Exams or PMT. Show all working. Self-mark immediately.',phases:[{t:'focus',d:50*60,l:'Practice Questions',s:'Topic Qs with mark scheme'},{t:'brk',d:5*60,l:'Break',s:'5 min'},{t:'log',d:0}]},
  custom:{name:'Custom',icon:'⏱️',desc:'Set your own focus duration and optional break.',phases:null}
};

const HOW_TO = {
  'Maths':[
    '<strong>Daily Corbett 5-a-day</strong>: non-negotiable. Keeps every topic warm.',
    '<strong>Higher tier priorities</strong>: circle theorems, vectors, algebraic proof, iteration, completing the square. Do not avoid them.',
    '<strong>Full past papers on PMT</strong>: show every step, never skip lines.',
    '<strong>After marking</strong>: write down the exact step you missed, not just the topic.'
  ],
  'Biology':[
    '<strong>Blurting for every subtopic</strong>: write from memory, open notes, circle gaps. Repeat missed points 3x.',
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
    '<strong>AQA 8702: closed book.</strong> Learn key quotes by theme, not chapter. Write from memory, check, repeat gaps 3x.',
    '<strong>Essay plan before you write</strong>: 3-4 min planning produces a better essay than starting cold.',
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
    '<strong>20-30 flashcards every session without exception.</strong> Mark weak cards and return to them at the end.',
    '<strong>Tense range in writing</strong>: include at least 3 tenses. Passive voice and conditional push marks higher.',
    '<strong>Translation practice</strong>: short paragraphs English to French and back. Forces vocabulary in context.',
    '<strong>Listening</strong>: past paper audio only, no looking at text first.'
  ]
};

const SPEC = {
  'Maths':{sections:[
    {name:'Number',points:['N7: Fractional indices (e.g. x^(1/3)) and surds','N8: Calculate with surds, simplify and rationalise denominators','N10: Convert recurring decimals to fractions and back','N16: Upper and lower bounds in calculations']},
    {name:'Algebra',points:['A4: Factorise ax2+bx+c; difference of two squares','A6: Algebraic proof - show expressions are equivalent','A11: Turning points by completing the square','A12: Sketch exponential and trig functions sinx, cosx, tanx','A13: Sketch transformations: translations and reflections','A15: Estimate gradient at a point; area under a graph','A16: Equation of circle x2+y2=r2; tangent at a given point','A18: Solve quadratics: factorising, completing the square, formula','A19: Linear and quadratic simultaneous equations','A20: Iteration to find approximate solutions numerically','A22: Quadratic inequalities; solution set on number line or graph','A25: nth term of quadratic sequences']},
    {name:'Ratio and Proportion',points:['R15: Gradient at a point on a curve as instantaneous rate of change','R16: Growth and decay with compound interest and iterative processes']},
    {name:'Geometry',points:['G7: Negative and fractional scale factor enlargements','G8: Combined transformations - describe changes and invariance','G10: Circle theorems: prove and apply (angles, radii, tangents, chords)','G19: Similarity: relationships between lengths, areas, and volumes','G22: Sine rule and cosine rule to find unknown sides and angles','G23: Area = 0.5ab sinC for any triangle','G25: Vectors in geometric proofs and arguments']},
    {name:'Statistics and Probability',points:['P9: Conditional probability using two-way tables, tree diagrams, Venn diagrams','S3: Histograms with unequal class intervals - interpret and construct','S4: Box plots - quartiles and interquartile range']}
  ]},
  'English Lit':{sections:[
    {name:'Paper 1 (40%)',points:['Section A: One question on your Shakespeare play (extract plus whole text)','Macbeth: Act 1 Sc 7 (ambition), Act 2 Sc 1-2 (guilt), Act 3 Sc 4 (banquet), Act 5 Sc 1 (sleepwalking)','Macbeth themes: ambition, guilt, power, gender, appearance vs reality','Macbeth context: Jacobean society, divine right of kings, witchcraft, patriarchy','Section B: One question on your 19th century novel','A Christmas Carol: Scrooge transformation across all 5 staves','A Christmas Carol themes: redemption, poverty, social responsibility, family','A Christmas Carol context: Victorian England, Industrial Revolution, New Poor Law (1834)']},
    {name:'Paper 2 (60%)',points:['Section A: One essay from two choices on your modern text','An Inspector Calls: themes of responsibility, social class, age, and gender','An Inspector Calls context: 1912 setting written 1945 - Priestley socialist message','Section B: Compare a named poem to one poem of your own choice from your cluster','Power and Conflict cluster: 15 poems, be ready to write on any of them','Section C: Analyse one unseen poem, then compare with a second unseen poem','AO1: Critical style, informed personal response, quotation to support interpretations','AO2: Analyse language, form, and structure using subject terminology','AO3: Context linked to effect (one reference per paragraph is enough)','AO4: Vocabulary range, spelling, and punctuation (5% of total marks)']}
  ]},
  'English Lang':{sections:[
    {name:'Paper 1 (50%)',points:['Source: literature fiction text (20th or 21st century prose)','Q1 (4 marks): identify 4 true statements from a list about the source','Q2 (8 marks): language analysis using PETL - Point, Evidence, Technique, Link to effect','Q3 (8 marks): structure analysis at whole text level, not just sentences','Q4 (20 marks): critical evaluation of a statement about the text, with evidence','Q5 (40 marks): descriptive or narrative writing - plan for 5 min before writing']},
    {name:'Paper 2 (50%)',points:['Sources: one non-fiction and one literary non-fiction, different time periods','Q1 (4 marks): identify 4 true statements across both sources','Q2 (8 marks): summarise and synthesise from both sources','Q3 (12 marks): language analysis on one of the sources','Q4 (16 marks): compare writers perspectives across both sources - the mark separator','Q5 (40 marks): writing to present a viewpoint - specify audience, purpose, form','AO5 (30%): communicate clearly, adapt tone, style, register for purpose and audience','AO6 (20% of total GCSE): vocabulary, sentence structures, spelling, punctuation']}
  ]},
  'Biology':{sections:[
    {name:'Cell Biology',points:['Prokaryotic vs eukaryotic cells: differences and examples','Cell structures: nucleus, cytoplasm, cell membrane, mitochondria, ribosomes','Plant cells: cell wall, chloroplasts, vacuole - functions of each','Mitosis: PMAT stages, why cells divide (growth, repair, asexual reproduction)','Required practical: microscopy - calculate magnification, draw cells to scale','Diffusion, osmosis, active transport: definitions and comparisons','Required practical: osmosis in plant tissue']},
    {name:'Organisation',points:['Enzymes: lock and key model, optimum pH and temperature, denaturation','Digestive system: organs and their functions, absorption in small intestine','Heart: structure (4 chambers, valves), double circulatory system','Blood vessels: artery, vein, capillary - structure and function','Blood components: red cells (haemoglobin), white cells, platelets, plasma','Lungs: alveoli adaptations, gas exchange, breathing mechanics']},
    {name:'Infection and Response',points:['Pathogens: bacteria, viruses, fungi, protists - examples and diseases','How the body defends itself: skin, mucus, phagocytes, lymphocytes, antibodies','Vaccines: how they work, herd immunity, MMR example','Antibiotics: how they work, resistance, why they cannot kill viruses']},
    {name:'Bioenergetics',points:['Photosynthesis equation: 6CO2 + 6H2O + light energy = C6H12O6 + 6O2','Limiting factors: light intensity, CO2 concentration, temperature','Aerobic respiration: C6H12O6 + 6O2 = 6CO2 + 6H2O + energy','Anaerobic respiration in humans: glucose = lactic acid + energy','Anaerobic in yeast: glucose = ethanol + CO2 + energy']},
    {name:'Homeostasis and Response',points:['Nervous system: receptors, neurones, synapses, effectors','Reflex arcs: receptor, sensory, relay, motor neurone, effector','Blood glucose control: insulin and glucagon (type 1 and 2 diabetes)','Thermoregulation: hypothalamus, vasodilation, vasoconstriction, sweating, shivering']},
    {name:'Inheritance and Evolution',points:['DNA: double helix, base pairs (A-T, C-G), chromosomes, genes','Mitosis vs meiosis: purpose, outcome, where each occurs','Punnett squares: monohybrid crosses including sex-linked traits','Evolution: natural selection mechanism (Darwin)']}
  ]},
  'Computer Science':{sections:[
    {name:'Algorithms',points:['Trace tables: trace through code showing variable values at each step','Bubble sort: how it works, best/worst case, compare values and swap','Merge sort: divide and conquer, best/worst/average O(n log n)','Linear search: O(n), works on unsorted data','Binary search: O(log n), sorted data only, divide and check mid point','Pseudocode: write algorithms from scratch without help']},
    {name:'Programming',points:['Variables and data types: integer, real, Boolean, string, character','Sequence, selection (if/elif/else), and iteration (for/while loops)','Functions/subroutines: parameters, return values, local vs global scope','String operations: length, substring, concatenation, upper/lower','File handling: open, read, write, close','Arrays/lists: index from 0, 2D arrays, common operations']},
    {name:'Data Representation',points:['Binary: convert to and from denary and hex','Binary arithmetic: addition, overflow error',"Two's complement: represent negative numbers in binary",'Hexadecimal: used in memory addresses and colour codes','Character codes: ASCII and Unicode','Images: pixels, bit depth, resolution, file size calculation','Sound: sample rate, bit depth, file size calculation','Data compression: lossy vs lossless, run length encoding, Huffman coding']},
    {name:'Hardware and Software',points:['Von Neumann architecture: CPU, ALU, control unit, registers, buses','Fetch-decode-execute cycle: steps and what happens at each','Factors affecting CPU performance: clock speed, number of cores, cache size','Primary storage: RAM (volatile), ROM (non-volatile)','Secondary storage: HDD vs SSD vs optical vs flash - pros and cons','High vs low level languages; compilers vs interpreters']},
    {name:'Networks',points:['Network types: LAN vs WAN; topology: star, bus, mesh','TCP/IP protocol suite: layers and what each does','IP addressing: IPv4 vs IPv6; packets and packet switching','Network security threats: malware, phishing, brute force, SQL injection','Network security measures: firewall, encryption, authentication, access control']},
    {name:'Boolean Logic',points:['Logic gates: AND, OR, NOT, NAND, NOR, XOR - draw and label from memory','Truth tables: construct for any gate or combination of gates',"Boolean algebra: simplify expressions using De Morgan's theorem",'Logic diagrams: draw circuit from Boolean expression and vice versa']}
  ]},
  'Chemistry':{sections:[
    {name:'Atomic Structure and Bonding',points:['Atomic structure: protons, neutrons, electrons; atomic number and mass number','Isotopes: same element, different neutrons; relative atomic mass calculation','Ionic bonding: transfer of electrons, giant ionic lattice, high melting point','Covalent bonding: sharing electrons; simple molecular vs giant covalent','Metallic bonding: delocalised electrons, explains conductivity and malleability']},
    {name:'Quantitative Chemistry',points:['Relative formula mass (Mr): add up all atomic masses','Moles = mass / Mr; use to calculate amounts in reactions','Percentage yield = (actual/theoretical) x 100','Atom economy = (useful products Mr / all products Mr) x 100','Concentration (mol/dm3) = moles / volume','Titration calculations: find unknown concentration from volumes and known concentration']},
    {name:'Chemical Changes',points:['Reactivity series: K, Na, Ca, Mg, Al, Zn, Fe, Cu - memorise order','Acids and bases: pH scale, neutralisation, salts formed from acid + base','Electrolysis: splitting ionic compounds with electricity; cathode (reduction) and anode (oxidation)','Products of electrolysis: predict products from molten salts vs aqueous solutions']},
    {name:'Energy Changes',points:['Exothermic reactions: energy released, temperature rises','Endothermic reactions: energy absorbed, temperature falls','Bond energies: energy needed to break bonds; energy released making bonds']},
    {name:'Rates, Equilibrium and Organic',points:['Factors affecting rate: temperature, concentration, surface area, catalyst, pressure (gases)','Collision theory: explains why each factor increases rate',"Le Chatelier's principle: equilibrium shifts to oppose changes in conditions",'Haber process: N2 + 3H2 = 2NH3; conditions 450C, 200 atm, iron catalyst','Alkanes: CnH(2n+2); saturated; combustion reactions','Alkenes: CnH(2n); unsaturated (C=C double bond); addition reactions; bromine water test']},
    {name:'Analysis and the Atmosphere',points:['History of atmosphere: early atmosphere, how oxygen increased, where CO2 went','Carbon dioxide and climate change: greenhouse effect mechanism','Tests for gases: H2 (squeaky pop), O2 (glowing splint relights), CO2 (limewater), Cl2 (bleaches damp litmus)','Flame tests: Li (red), Na (yellow), K (lilac), Ca (orange-red), Cu (green)']}
  ]},
  'Physics':{sections:[
    {name:'Forces',points:["Newton's 1st law: stationary or constant velocity unless resultant force acts","Newton's 2nd law: F = ma; calculate resultant force, mass, or acceleration","Newton's 3rd law: equal and opposite forces on different objects",'Momentum = mass x velocity; p = mv; conservation of momentum in collisions','Stopping distance = thinking distance + braking distance',"Hooke's law: F = ke; spring constant k; elastic limit"]},
    {name:'Waves',points:['Wave equation: v = fl (wave speed = frequency x wavelength)','Transverse vs longitudinal waves: key differences and examples','Electromagnetic spectrum: order, properties, uses and dangers of each type','Sound waves: compression waves; speed in different media']},
    {name:'Electricity',points:["V = IR (Ohm's law); calculate resistance, voltage, or current",'P = IV = I2R = V2/R; power calculations','Series circuits: same current everywhere; voltages add up','Parallel circuits: voltages equal; currents split','Mains electricity: 230V AC, 50Hz in the UK; live, neutral, earth wires','Fuses and circuit breakers: protect against overload']},
    {name:'Magnetism and Electromagnetism',points:['Magnetic fields: shape around bar magnet and current-carrying wire',"Fleming's left-hand rule: force on current in magnetic field (motor effect)",'Transformers: step-up and step-down; Vp/Vs = Np/Ns']},
    {name:'Particle Model and Atomic Structure',points:['Specific heat capacity: E = mcDT; calculate energy for temperature change','Specific latent heat: energy for state change without temperature change','Radioactive decay: alpha, beta, gamma - properties and penetration','Half-life: time for activity to halve; calculate remaining amount']},
    {name:'Space and Energy',points:['Energy stores: kinetic, gravitational potential, elastic, thermal, chemical','Efficiency = useful output / total input; express as fraction or percentage','Renewable energy: solar, wind, hydro, tidal, geothermal','Life cycle of stars: nebula to main sequence to red giant to white dwarf or supernova','Big Bang theory: evidence from red-shift and cosmic microwave background radiation']}
  ]},
  'Geography':{sections:[
    {name:'Hazardous Earth',points:['Global atmospheric circulation and ocean currents redistributing heat energy','Natural causes of climate change: asteroid collisions, orbital changes, volcanic activity','Evidence for natural climate change: ice cores, tree rings, historical sources','Human activities produce greenhouse gases causing enhanced greenhouse effect','Tropical cyclone characteristics: pressure, rotation, structure; seasonal distribution','Three plate boundary types and hotspots: distribution and characteristics','Primary and secondary impacts of earthquakes or volcanoes in contrasting countries']},
    {name:'Development Dynamics',points:['Defining and measuring development: GDP per capita, HDI, inequality measures','Causes of global inequality: social, historical, environmental, economic and political','Emerging country case study: economic trends since 1990, GDP, FDI','Role of globalisation: TNCs, outsourcing, communications and transport technology']},
    {name:'Urbanising World',points:['Global urbanisation trends since 1980: how they vary between regions','Megacity case study: site, situation and connectivity nationally, regionally, globally','Megacity structure: CBD, inner city, suburbs, urban-rural fringe','Challenges: housing shortages, inadequate water and waste disposal','Government top-down and community bottom-up sustainability strategies']},
    {name:'UK Physical Landscape',points:['Geology and past processes: role of tectonic and glacial processes','Coastal erosional landforms: headlands and bays, caves, arches, cliffs, stacks','Hard engineering: groynes and sea walls - costs, benefits and conflicting views','Soft engineering: beach replenishment, slope stabilisation - costs and benefits','River landforms: meanders, waterfalls, flood plains, levees, oxbow lakes','River flood management: hard engineering vs soft engineering compared']},
    {name:'UK Human Landscape',points:['Urban-rural differences: population density, age structure, economic activities','National and international migration: impact on UK population geography','Decline of primary and secondary sectors and rise of tertiary and quaternary','Regeneration and rebranding: positive and negative impacts']},
    {name:'Global Issues',points:['Global biome distribution: tropical, temperate and boreal forests, deserts, tundra','Biosphere provides resources; regulates atmosphere composition and water cycle','Tropical deforestation causes: logging, agriculture, biofuels, HEP','Energy classification: non-renewable, renewable, recyclable','Global energy use per capita: causes of variation']}
  ]},
  'Business':{sections:[
    {name:'Theme 1: Investigating Small Business',points:['Entrepreneurs: role, characteristics, purpose; risks and rewards','Revenue = price x quantity sold','Costs: fixed vs variable; total costs = fixed + variable','Profit = total revenue - total costs','Break-even = fixed costs / (price - variable cost)','Sources of finance: personal savings, loans, share issue, retained profit, crowdfunding','Marketing mix: Product, Price, Place, Promotion (4Ps)']},
    {name:'Theme 2: Building a Business',points:['Business growth: organic (internal) vs inorganic (mergers, takeovers)','Globalisation: benefits and drawbacks for businesses; trading internationally','Production: job, batch, and flow production - advantages and disadvantages','Lean production: just-in-time, kaizen (continuous improvement)','Human resources: recruitment process, training, motivation theories','ARR = average annual profit / initial investment x 100']}
  ]},
  'French':{sections:[
    {name:'Core Topics',points:['Identity and culture: family, friends, relationships, role models','Technology: social media, internet, mobile phones - opinions in French','Free time: hobbies, sport, music, reading, cinema','Holidays: transport, accommodation, activities, past and future trips','School: subjects, timetable, school life, rules, future plans']},
    {name:'Grammar Essentials',points:['Present tense: all verbs including irregular (aller, avoir, etre, faire, prendre)','Perfect tense (passe compose): avoir and etre verbs, past participles','Imperfect tense: used for habitual past actions and descriptions','Future tense: aller + infinitive (near future) and future simple','Conditional tense: would - je voudrais, ce serait, j\'aimerais','Negation: ne...pas, ne...jamais, ne...rien, ne...plus']},
    {name:'Exam Skills',points:['Reading: identify gist first, then specific details; watch for negatives and tense','Listening: predict answers from questions before audio plays','Writing: include 3+ tenses, opinions with justifications, and a range of structures','Speaking: prepare opinions on all core topics; extend answers with connectives','Translation: know high frequency vocabulary; accuracy over volume']}
  ]}
};
