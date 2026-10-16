import { CbtQuestion } from '../cbtExamData';

export const ADDITIONAL_BIOLOGY_QUESTIONS: CbtQuestion[] = [
  {
    id: 316,
    subject: "Biology",
    question: "Which organelle in plant cells is responsible for the photolysis of water during photosynthesis?",
    options: [
      { key: "A", text: "Stroma of the chloroplast" },
      { key: "B", text: "Thylakoid / Grana of the chloroplast" },
      { key: "C", text: "Mitochondria" },
      { key: "D", text: "Ribosome" }
    ],
    correct: "B",
    explanation: "Photolysis of water occurs during the light-dependent stage of photosynthesis, which takes place specifically in the thylakoid membranes (grana) of the chloroplast.",
    trapWarning: "Do not choose Stroma. The dark stage (Calvin cycle / carbon fixation) occurs in the stroma; light photolysis occurs in the grana/thylakoid.",
    hint: "Light reactions happen in grana/thylakoids; dark reactions in stroma.",
    year: "JAMB 2024 Past Question",
    topic: "Plant Physiology & Photosynthesis"
  },
  {
    id: 317,
    subject: "Biology",
    question: "A man with blood group A (heterozygous AO) marries a woman with blood group B (heterozygous BO). What are the possible blood groups of their children?",
    options: [
      { key: "A", text: "Only AB" },
      { key: "B", text: "A, B, AB, and O with equal 25% probability each" },
      { key: "C", text: "Only A and B" },
      { key: "D", text: "75% AB and 25% O" }
    ],
    correct: "B",
    explanation: "Cross: AO x BO.\nGametes: (A, O) and (B, O).\nOffspring: AB (Blood group AB), AO (Blood group A), BO (Blood group B), OO (Blood group O).\nEach has a 1 in 4 (25%) probability.",
    trapWarning: "Because both parents are heterozygous carrying the recessive O allele, all four ABO blood groups are possible.",
    hint: "Punnett square with A, O on one side and B, O on the other gives all 4 phenotypes.",
    year: "JAMB 2024 Past Question",
    topic: "Genetics & Blood Groups"
  },
  {
    id: 318,
    subject: "Biology",
    question: "The structural and functional unit of the human kidney responsible for filtration and urine formation is the:",
    options: [
      { key: "A", text: "Nephron" },
      { key: "B", text: "Neuron" },
      { key: "C", text: "Glomerulus only" },
      { key: "D", text: "Ureter" }
    ],
    correct: "A",
    explanation: "The nephron is the complete functional unit of the kidney, consisting of the Bowman's capsule, glomerulus, proximal convoluted tubule, Loop of Henle, and distal convoluted tubule.",
    trapWarning: "Do not confuse Nephron (kidney excretory unit) with Neuron (nervous system unit).",
    hint: "Kidney = Nephron. Brain/Nerves = Neuron.",
    year: "JAMB 2023 Past Question",
    topic: "Excretion & Homeostasis"
  },
  {
    id: 319,
    subject: "Biology",
    question: "In an ecosystem, which of the following organisms represents a primary consumer?",
    options: [
      { key: "A", text: "Green algae" },
      { key: "B", text: "Herbivorous grasshopper" },
      { key: "C", text: "Carnivorous lizard" },
      { key: "D", text: "Decomposing fungi" }
    ],
    correct: "B",
    explanation: "Primary consumers are herbivores that feed directly on primary producers (plants/algae). Grasshoppers feed on green plants.",
    trapWarning: "Green algae is a producer (Trophic level 1). Primary consumers are at Trophic level 2.",
    hint: "Primary consumer = herbivore eating producers.",
    year: "JAMB 2023 Past Question",
    topic: "Ecology & Trophic Levels"
  },
  {
    id: 320,
    subject: "Biology",
    question: "Which hormone is responsible for lowering elevated glucose levels in the human bloodstream?",
    options: [
      { key: "A", text: "Glucagon" },
      { key: "B", text: "Insulin" },
      { key: "C", text: "Adrenaline" },
      { key: "D", text: "Thyroxine" }
    ],
    correct: "B",
    explanation: "Insulin, secreted by the beta cells of the Islets of Langerhans in the pancreas, promotes the uptake and conversion of excess blood glucose into glycogen in the liver.",
    trapWarning: "Glucagon raises blood glucose by converting glycogen to glucose. Insulin lowers it.",
    hint: "Insulin stores glucose; glucagon releases glucose.",
    year: "JAMB 2022 Past Question",
    topic: "Endocrine System & Hormones"
  }
];

export const ADDITIONAL_CHEMISTRY_QUESTIONS: CbtQuestion[] = [
  {
    id: 414,
    subject: "Chemistry",
    question: "Calculate the volume of oxygen gas at s.t.p. required to completely burn 2.0 moles of methane (CH₄): [Molar volume of gas at s.t.p. = 22.4 dm³]",
    options: [
      { key: "A", text: "44.8 dm³" },
      { key: "B", text: "89.6 dm³" },
      { key: "C", text: "22.4 dm³" },
      { key: "D", text: "11.2 dm³" }
    ],
    correct: "B",
    explanation: "Balanced equation: CH₄ + 2O₂ -> CO₂ + 2H₂O.\n1 mole of CH₄ requires 2 moles of O₂.\nTherefore, 2.0 moles of CH₄ require 2 * 2.0 = 4.0 moles of O₂.\nVolume at s.t.p. = 4.0 moles * 22.4 dm³/mole = 89.6 dm³.",
    trapWarning: "Candidates often forget the stoichiometric coefficient 2 for O₂ in the combustion equation.",
    hint: "Balance the combustion reaction first: 1 CH₄ needs 2 O₂.",
    year: "JAMB 2024 Past Question",
    topic: "Stoichiometry & Gas Laws"
  },
  {
    id: 415,
    subject: "Chemistry",
    question: "Which of the following organic compounds will decolorize acidified potassium tetraoxomanganate(VII) (KMnO₄) and bromine water?",
    options: [
      { key: "A", text: "Ethane (C₂H₆)" },
      { key: "B", text: "Ethene (C₂H₄)" },
      { key: "C", text: "Ethanol (C₂H₅OH)" },
      { key: "D", text: "Ethanoic acid (CH₃COOH)" }
    ],
    correct: "B",
    explanation: "Ethene is an unsaturated alkene with a carbon-carbon double bond (C=C). It readily undergoes electrophilic addition reactions, decolorizing bromine water and alkaline/acidified KMnO₄.",
    trapWarning: "Ethane is a saturated alkane and does NOT decolorize bromine water in the absence of UV light.",
    hint: "Look for unsaturated hydrocarbons (alkenes with double bonds).",
    year: "JAMB 2024 Past Question",
    topic: "Organic Chemistry (Alkenes)"
  },
  {
    id: 416,
    subject: "Chemistry",
    question: "What is the oxidation number of sulfur in the tetraoxosulfate(VI) ion (SO₄²⁻)?",
    options: [
      { key: "A", text: "+4" },
      { key: "B", text: "+6" },
      { key: "C", text: "-2" },
      { key: "D", text: "+8" }
    ],
    correct: "B",
    explanation: "Let oxidation state of S be x.\nOxygen has oxidation state of -2.\nx + 4(-2) = -2 (overall charge of ion)\nx - 8 = -2\nx = +6.",
    trapWarning: "Set the sum equal to the ion charge (-2), not zero.",
    hint: "x + 4(-2) = -2 => x = 6.",
    year: "JAMB 2023 Past Question",
    topic: "Redox & Oxidation Numbers"
  },
  {
    id: 417,
    subject: "Chemistry",
    question: "According to Le Chatelier's principle, what will happen to the equilibrium 2SO₂(g) + O₂(g) ⇌ 2SO₃(g) [ΔH = -197 kJ/mol] if the temperature is increased?",
    options: [
      { key: "A", text: "Equilibrium shifts to the right (more SO₃ produced)" },
      { key: "B", text: "Equilibrium shifts to the left (more SO₂ and O₂ formed)" },
      { key: "C", text: "No change occurs" },
      { key: "D", text: "Pressure decreases" }
    ],
    correct: "B",
    explanation: "The forward reaction is exothermic (ΔH is negative). By Le Chatelier's principle, increasing temperature favors the endothermic backward reaction, shifting equilibrium to the left.",
    trapWarning: "Exothermic reactions produce heat; adding heat shifts equilibrium in the reverse direction to absorb the excess heat.",
    hint: "Exothermic forward -> increasing temperature shifts equilibrium to the left.",
    year: "JAMB 2023 Past Question",
    topic: "Chemical Equilibrium"
  },
  {
    id: 418,
    subject: "Chemistry",
    question: "During the electrolysis of dilute copper(II) sulfate solution using platinum inert electrodes, the product liberated at the anode is:",
    options: [
      { key: "A", text: "Copper metal" },
      { key: "B", text: "Oxygen gas" },
      { key: "C", text: "Hydrogen gas" },
      { key: "D", text: "Sulfur dioxide" }
    ],
    correct: "B",
    explanation: "Anode attracts anions (SO₄²⁻ and OH⁻). OH⁻ ions are discharged preferentially over SO₄²⁻ because OH⁻ is lower in the electrochemical series: 4OH⁻ -> 2H₂O + O₂ + 4e⁻. Thus, oxygen gas is discharged.",
    trapWarning: "Copper metal deposits at the cathode (reduction), while oxygen gas evolves at the anode (oxidation).",
    hint: "OH⁻ discharge produces Oxygen gas at the positive anode.",
    year: "JAMB 2022 Past Question",
    topic: "Electrochemistry & Electrolysis"
  }
];

export const ADDITIONAL_PHYSICS_QUESTIONS: CbtQuestion[] = [
  {
    id: 514,
    subject: "Physics",
    question: "A car accelerating uniformly from rest reaches a velocity of 20 m/s in 5 seconds. Calculate the total distance covered during this period:",
    options: [
      { key: "A", text: "50 m" },
      { key: "B", text: "100 m" },
      { key: "C", text: "25 m" },
      { key: "D", text: "40 m" }
    ],
    correct: "A",
    explanation: "Acceleration a = (v - u)/t = (20 - 0)/5 = 4 m/s².\nDistance s = ut + (1/2)at² = 0 + (1/2)(4)(5)² = 2 * 25 = 50 m.\nAlternatively: s = ((u + v)/2) * t = ((0 + 20)/2) * 5 = 10 * 5 = 50 m.",
    trapWarning: "Do not forget the factor of 1/2 in the equation (1/2)at².",
    hint: "Average velocity is 10 m/s; multiplied by 5 seconds = 50 m.",
    year: "JAMB 2024 Past Question",
    topic: "Linear Motion & Mechanics"
  },
  {
    id: 515,
    subject: "Physics",
    question: "A transformer has 500 turns in its primary coil and 2500 turns in its secondary coil. If an alternating voltage of 220V is applied across the primary coil, calculate the secondary voltage:",
    options: [
      { key: "A", text: "44 V" },
      { key: "B", text: "1100 V" },
      { key: "C", text: "550 V" },
      { key: "D", text: "2200 V" }
    ],
    correct: "B",
    explanation: "Transformer formula: Vs / Vp = Ns / Np.\nVs = Vp * (Ns / Np) = 220 * (2500 / 500) = 220 * 5 = 1100 V.",
    trapWarning: "This is a step-up transformer (Ns > Np), so secondary voltage must be GREATER than primary voltage.",
    hint: "Secondary turns are 5 times primary turns, so voltage is multiplied by 5.",
    year: "JAMB 2024 Past Question",
    topic: "Electromagnetism & Transformers"
  },
  {
    id: 516,
    subject: "Physics",
    question: "The half-life of a radioactive isotope is 4 days. If the initial mass of the sample is 64g, what mass will remain after 16 days?",
    options: [
      { key: "A", text: "16 g" },
      { key: "B", text: "8 g" },
      { key: "C", text: "4 g" },
      { key: "D", text: "2 g" }
    ],
    correct: "C",
    explanation: "Number of half-lives n = Total time / Half-life = 16 days / 4 days = 4.\nRemaining mass = Initial mass / 2ⁿ = 64 / 2⁴ = 64 / 16 = 4 g.",
    trapWarning: "Count half-lives carefully: 0d (64g) -> 4d (32g) -> 8d (16g) -> 12d (8g) -> 16d (4g).",
    hint: "Halve 64 four times: 32 -> 16 -> 8 -> 4.",
    year: "JAMB 2023 Past Question",
    topic: "Radioactivity & Modern Physics"
  },
  {
    id: 517,
    subject: "Physics",
    question: "An object is placed 15 cm in front of a concave mirror of focal length 10 cm. Find the image distance and nature of the image:",
    options: [
      { key: "A", text: "30 cm, Real and inverted" },
      { key: "B", text: "6 cm, Virtual and erect" },
      { key: "C", text: "30 cm, Virtual and erect" },
      { key: "D", text: "25 cm, Real and inverted" }
    ],
    correct: "A",
    explanation: "Mirror formula: 1/f = 1/u + 1/v.\nFor concave mirror, f = +10 cm, u = +15 cm.\n1/10 = 1/15 + 1/v => 1/v = 1/10 - 1/15 = (3 - 2)/30 = 1/30.\nSo v = +30 cm. A positive image distance in front of the mirror denotes a real, inverted image.",
    trapWarning: "Object is between focus (10 cm) and center of curvature (20 cm), so image forms beyond 2C (real and enlarged).",
    hint: "1/v = 1/10 - 1/15 = 1/30 => v = 30 cm.",
    year: "JAMB 2023 Past Question",
    topic: "Optics & Curved Mirrors"
  },
  {
    id: 518,
    subject: "Physics",
    question: "Calculate the electrical energy consumed by a 2 kW electric heater when used for 3 hours daily over a 30-day month in kilowatt-hours (kWh):",
    options: [
      { key: "A", text: "60 kWh" },
      { key: "B", text: "180 kWh" },
      { key: "C", text: "90 kWh" },
      { key: "D", text: "360 kWh" }
    ],
    correct: "B",
    explanation: "Daily energy = Power (kW) * Time (hours) = 2 kW * 3 h = 6 kWh.\nMonthly energy (30 days) = 6 kWh/day * 30 days = 180 kWh.",
    trapWarning: "Check that power is in kW (2 kW) and time is in hours (3 h * 30 = 90 hours).",
    hint: "2 kW * 90 hours = 180 kWh.",
    year: "JAMB 2022 Past Question",
    topic: "Current Electricity & Power"
  }
];
