import { CbtQuestion } from '../cbtExamData';

export const ADDITIONAL_MATH_QUESTIONS: CbtQuestion[] = [
  {
    id: 219,
    subject: "Mathematics",
    question: "Evaluate log₂ 32 + log₃ (1/81) - log₁₀ 0.01:",
    options: [
      { key: "A", text: "1" },
      { key: "B", text: "3" },
      { key: "C", text: "-1" },
      { key: "D", text: "5" }
    ],
    correct: "B",
    explanation: "log₂ 32 = log₂ 2⁵ = 5.\nlog₃ (1/81) = log₃ 3⁻⁴ = -4.\nlog₁₀ 0.01 = log₁₀ 10⁻² = -2.\nTherefore: 5 + (-4) - (-2) = 5 - 4 + 2 = 3.",
    trapWarning: "Watch the double negative: minus log₁₀ 0.01 is -(-2) = +2.",
    hint: "Convert 32 to 2⁵, 1/81 to 3⁻⁴, and 0.01 to 10⁻².",
    year: "JAMB 2024 Past Question",
    topic: "Logarithms & Indices"
  },
  {
    id: 220,
    subject: "Mathematics",
    question: "Find the gradient of the curve y = 2x³ - 5x² + 4x - 7 at the point where x = 2:",
    options: [
      { key: "A", text: "4" },
      { key: "B", text: "8" },
      { key: "C", text: "12" },
      { key: "D", text: "16" }
    ],
    correct: "B",
    explanation: "Gradient = dy/dx.\ndy/dx = d/dx (2x³ - 5x² + 4x - 7) = 6x² - 10x + 4.\nAt x = 2: dy/dx = 6(2)² - 10(2) + 4 = 6(4) - 20 + 4 = 24 - 20 + 4 = 8.",
    trapWarning: "Do not forget the constant derivative of -7 is 0. Evaluate carefully at x = 2.",
    hint: "Differentiate y with respect to x, then substitute x = 2.",
    year: "JAMB 2024 Past Question",
    topic: "Differentiation (Calculus)"
  },
  {
    id: 221,
    subject: "Mathematics",
    question: "If a matrix A = [[3, 2], [1, 4]], calculate the determinant and inverse |A| and A⁻¹:",
    options: [
      { key: "A", text: "det = 10, A⁻¹ = (1/10)[[4, -2], [-1, 3]]" },
      { key: "B", text: "det = 10, A⁻¹ = (1/10)[[-4, 2], [1, -3]]" },
      { key: "C", text: "det = 14, A⁻¹ = (1/14)[[4, -2], [-1, 3]]" },
      { key: "D", text: "det = 10, A⁻¹ = [[4, -2], [-1, 3]]" }
    ],
    correct: "A",
    explanation: "For 2x2 matrix [[a, b], [c, d]]: det = ad - bc = (3)(4) - (2)(1) = 12 - 2 = 10.\nAdjoint = [[d, -b], [-c, a]] = [[4, -2], [-1, 3]].\nInverse = (1/det) * Adjoint = (1/10)[[4, -2], [-1, 3]].",
    trapWarning: "Remember to swap the principal diagonal elements (3 and 4) and negate the off-diagonal elements (2 and 1).",
    hint: "Formula for 2x2 inverse: 1/det * [[d, -b], [-c, a]].",
    year: "JAMB 2023 Past Question",
    topic: "Matrices & Determinants"
  },
  {
    id: 222,
    subject: "Mathematics",
    question: "Solve the quadratic equation 3x² - 5x - 2 = 0:",
    options: [
      { key: "A", text: "x = 2 or x = -1/3" },
      { key: "B", text: "x = -2 or x = 1/3" },
      { key: "C", text: "x = 3 or x = -2" },
      { key: "D", text: "x = 1 or x = -2/3" }
    ],
    correct: "A",
    explanation: "Factorize: 3x² - 6x + x - 2 = 0\n3x(x - 2) + 1(x - 2) = 0\n(3x + 1)(x - 2) = 0\nSo x = -1/3 or x = 2.",
    trapWarning: "Watch the signs: 3x + 1 = 0 gives x = -1/3, not +1/3.",
    hint: "Find two numbers whose product is (3)(-2) = -6 and sum is -5: they are -6 and +1.",
    year: "JAMB 2023 Past Question",
    topic: "Quadratic Equations"
  },
  {
    id: 223,
    subject: "Mathematics",
    question: "The 3rd term of a Geometric Progression (G.P.) is 12 and the 6th term is 96. Find the first term (a) and common ratio (r):",
    options: [
      { key: "A", text: "a = 3, r = 2" },
      { key: "B", text: "a = 2, r = 3" },
      { key: "C", text: "a = 4, r = 2" },
      { key: "D", text: "a = 3, r = 4" }
    ],
    correct: "A",
    explanation: "T₃ = ar² = 12.\nT₆ = ar⁵ = 96.\nDivide T₆ by T₃: (ar⁵)/(ar²) = 96/12 => r³ = 8 => r = 2.\nSubstitute into ar² = 12: a(2)² = 12 => 4a = 12 => a = 3.",
    trapWarning: "Do not confuse G.P. (arⁿ⁻¹) with A.P. (a + (n-1)d).",
    hint: "Divide the two terms to find r³, then cube root of 8 is 2.",
    year: "JAMB 2024 Past Question",
    topic: "Sequences & Series (G.P.)"
  },
  {
    id: 224,
    subject: "Mathematics",
    question: "Evaluate the definite integral ∫₁³ (3x² - 4x + 1) dx:",
    options: [
      { key: "A", text: "12" },
      { key: "B", text: "10" },
      { key: "C", text: "14" },
      { key: "D", text: "8" }
    ],
    correct: "A",
    explanation: "Integral = [x³ - 2x² + x] from 1 to 3.\nAt upper limit 3: 3³ - 2(3)² + 3 = 27 - 18 + 3 = 12.\nAt lower limit 1: 1³ - 2(1)² + 1 = 1 - 2 + 1 = 0.\nResult = 12 - 0 = 12.",
    trapWarning: "Remember: ∫ x² dx = x³/3, so 3x² integrates to x³. ∫ x dx = x²/2, so -4x integrates to -2x².",
    hint: "Integrate each term: x³ - 2x² + x, then evaluate between 3 and 1.",
    year: "JAMB 2022 Past Question",
    topic: "Integration (Calculus)"
  },
  {
    id: 225,
    subject: "Mathematics",
    question: "Simplify the surd expression (3√2 + 2√3) / (3√2 - 2√3):",
    options: [
      { key: "A", text: "5 + 2√6" },
      { key: "B", text: "5 - 2√6" },
      { key: "C", text: "6 + 3√6" },
      { key: "D", text: "3 + √6" }
    ],
    correct: "A",
    explanation: "Rationalize the denominator by multiplying numerator and denominator by (3√2 + 2√3):\nNumerator = (3√2 + 2√3)² = (3√2)² + 2(3√2)(2√3) + (2√3)² = 18 + 12√6 + 12 = 30 + 12√6.\nDenominator = (3√2)² - (2√3)² = 18 - 12 = 6.\nDividing: (30 + 12√6) / 6 = 5 + 2√6.",
    trapWarning: "Ensure you expand (a + b)² correctly: a² + 2ab + b².",
    hint: "Multiply by the conjugate of the denominator: (3√2 + 2√3).",
    year: "JAMB 2023 Past Question",
    topic: "Surds & Rationalization"
  },
  {
    id: 226,
    subject: "Mathematics",
    question: "A bag contains 5 red balls, 4 blue balls, and 3 green balls. If two balls are drawn at random one after the other without replacement, what is the probability that both balls are red?",
    options: [
      { key: "A", text: "5/33" },
      { key: "B", text: "25/144" },
      { key: "C", text: "1/6" },
      { key: "D", text: "5/12" }
    ],
    correct: "A",
    explanation: "Total balls = 5 + 4 + 3 = 12.\nP(1st is Red) = 5/12.\nSince there is NO replacement, 4 red balls remain out of 11 total balls.\nP(2nd is Red) = 4/11.\nP(Both Red) = (5/12) * (4/11) = 20/132 = 5/33.",
    trapWarning: "WITHOUT replacement means the total reduces from 12 to 11, and red reduces from 5 to 4.",
    hint: "Multiply 5/12 by 4/11 and simplify.",
    year: "JAMB 2024 Past Question",
    topic: "Probability"
  },
  {
    id: 227,
    subject: "Mathematics",
    question: "Find the angle of elevation of the top of a tower 50m high from a point on horizontal ground 50√3 m from the foot of the tower:",
    options: [
      { key: "A", text: "30°" },
      { key: "B", text: "45°" },
      { key: "C", text: "60°" },
      { key: "D", text: "90°" }
    ],
    correct: "A",
    explanation: "tan θ = Opposite / Adjacent = 50 / (50√3) = 1/√3.\nSince tan 30° = 1/√3, θ = 30°.",
    trapWarning: "Do not confuse tan 30° (1/√3) with tan 60° (√3).",
    hint: "tan θ = 50 / (50√3) = 1/√3 = tan 30°.",
    year: "JAMB 2022 Past Question",
    topic: "Trigonometry"
  },
  {
    id: 228,
    subject: "Mathematics",
    question: "Find the equation of the line passing through points (2, 3) and (4, 7):",
    options: [
      { key: "A", text: "y = 2x - 1" },
      { key: "B", text: "y = 2x + 1" },
      { key: "C", text: "y = x + 3" },
      { key: "D", text: "2y = x + 4" }
    ],
    correct: "A",
    explanation: "Slope m = (y₂ - y₁) / (x₂ - x₁) = (7 - 3) / (4 - 2) = 4 / 2 = 2.\nUsing point-slope form: y - y₁ = m(x - x₁)\ny - 3 = 2(x - 2) => y - 3 = 2x - 4 => y = 2x - 1.",
    trapWarning: "Check by substituting point (2,3): y = 2(2) - 1 = 3 (correct!).",
    hint: "Calculate slope m = 4/2 = 2, then use y = mx + c.",
    year: "JAMB 2023 Past Question",
    topic: "Coordinate Geometry"
  }
];
