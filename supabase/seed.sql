-- Emma Math Learning Portal — Seed Data (3 Weeks)

-- ============================================================
-- TOPICS
-- ============================================================
insert into topics (id, slug, title, description, grade_level, sort_order) values
  ('00000000-0000-0000-0000-000000000001', 'decimal-place-value', 'Decimal Place Value', 'Understanding place value, comparing, and rounding decimals', '5th Grade', 1),
  ('00000000-0000-0000-0000-000000000002', 'decimal-operations', 'Decimal Operations', 'Adding, subtracting, multiplying, and dividing decimals', '5th Grade', 2),
  ('00000000-0000-0000-0000-000000000003', 'fractions-review', 'Fractions Review', 'Understanding fractions, mixed numbers, and equivalent fractions', '5th Grade', 3)
on conflict (slug) do nothing;

-- ============================================================
-- LESSONS
-- ============================================================
insert into lessons (id, slug, title, summary, content, examples, common_mistakes, topic_id, week_number, sort_order) values
(
  '00000000-0000-0000-0001-000000000001',
  'decimal-place-value-lesson',
  'Decimal Place Value, Comparing & Rounding',
  'Learn how to read, compare, and round decimal numbers with confidence.',
  'Decimals are numbers that have a whole part and a fractional part separated by a decimal point. Every digit in a decimal has a specific place value.\n\n## Place Value Chart\n\nFor the number **3.472**:\n- 3 is in the **ones** place\n- 4 is in the **tenths** place (1/10)\n- 7 is in the **hundredths** place (1/100)\n- 2 is in the **thousandths** place (1/1000)\n\n## Comparing Decimals\n\nTo compare decimals, line up the decimal points and compare digit by digit from left to right.\n\n**4.08 vs 4.8**\n- Both have 4 ones\n- Tenths: 0 vs 8 → 4.8 is greater\n\n## Rounding Decimals\n\n1. Find the place you are rounding to\n2. Look at the digit to the right\n3. If it is 5 or more, round up; if less than 5, keep the same',
  '[
    {"problem": "What is the value of the 7 in 3.472?", "solution": "Hundredths place = 7/100 = 0.07", "explanation": "Count the places: tenths (4), hundredths (7), thousandths (2). The 7 is in the hundredths place."},
    {"problem": "Round 6.738 to the nearest hundredth.", "solution": "6.74", "explanation": "Look at the thousandths digit (8). Since 8 ≥ 5, round the hundredths digit up: 3 becomes 4."}
  ]',
  '["Confusing tenths and hundredths places", "Thinking 4.8 < 4.08 because 08 looks bigger", "Forgetting to look at the digit to the RIGHT when rounding"]',
  '00000000-0000-0000-0000-000000000001',
  1,
  1
),
(
  '00000000-0000-0000-0001-000000000002',
  'decimal-operations-lesson',
  'Adding, Subtracting & Multiplying Decimals',
  'Master decimal operations by keeping digits lined up and tracking the decimal point.',
  '## Adding and Subtracting Decimals\n\nThe most important rule: **line up the decimal points!**\n\nThen add or subtract as you would whole numbers.\n\n**2.75 + 3.4**\n```\n  2.75\n+ 3.40\n------\n  6.15\n```\nAdd a zero placeholder so both numbers have the same number of decimal places.\n\n## Multiplying Decimals\n\n1. Ignore the decimal points and multiply as whole numbers\n2. Count the total decimal places in both factors\n3. Place the decimal point that many places from the right in your answer\n\n**1.2 × 3.4**\n- 12 × 34 = 408\n- Total decimal places: 1 + 1 = 2\n- Answer: 4.08',
  '[
    {"problem": "2.75 + 3.4", "solution": "6.15", "explanation": "Line up decimals: 2.75 + 3.40 = 6.15"},
    {"problem": "1.2 × 3.4", "solution": "4.08", "explanation": "12 × 34 = 408. Two total decimal places → 4.08"}
  ]',
  '["Forgetting to line up decimal points when adding/subtracting", "Miscounting decimal places when multiplying", "Not adding zero placeholders (3.4 vs 3.40)"]',
  '00000000-0000-0000-0000-000000000002',
  2,
  1
),
(
  '00000000-0000-0000-0001-000000000003',
  'fractions-review-lesson',
  'Fractions, Mixed Numbers & Equivalent Fractions',
  'Review the key ideas behind fractions and learn to find equivalent forms.',
  '## What is a Fraction?\n\nA fraction represents part of a whole. **3/4** means 3 out of 4 equal parts.\n- **Numerator** (top): how many parts you have\n- **Denominator** (bottom): total equal parts\n\n## Equivalent Fractions\n\nFractions that represent the same amount. Multiply or divide both numerator and denominator by the same number.\n\n**1/2 = 2/4 = 4/8**\n\nTo simplify a fraction, divide both by their GCF (greatest common factor).\n\n## Mixed Numbers and Improper Fractions\n\n**Mixed number**: 2 3/4 (a whole number + fraction)\n**Improper fraction**: 11/4 (numerator > denominator)\n\nTo convert: 2 3/4 → (2 × 4 + 3)/4 = 11/4\n\n## Comparing Fractions\n\nFind a common denominator, then compare numerators.\n\n**2/3 vs 3/4** → 8/12 vs 9/12 → 3/4 is greater',
  '[
    {"problem": "Simplify 8/12", "solution": "2/3", "explanation": "GCF of 8 and 12 is 4. Divide both: 8÷4 = 2, 12÷4 = 3. Answer: 2/3"},
    {"problem": "Convert 2 3/4 to an improper fraction", "solution": "11/4", "explanation": "Multiply whole number by denominator: 2 × 4 = 8. Add numerator: 8 + 3 = 11. Keep denominator: 11/4"}
  ]',
  '["Flipping numerator and denominator", "Forgetting to multiply both top and bottom for equivalent fractions", "Adding numerators AND denominators when adding fractions (wrong!)"]',
  '00000000-0000-0000-0000-000000000003',
  3,
  1
)
on conflict (slug) do nothing;

-- ============================================================
-- QUESTIONS — Week 1: Decimal Place Value
-- ============================================================
insert into questions (id, topic_id, week_number, question_text, question_type, difficulty, choices, correct_answer, explanation, is_challenge, is_active) values

-- Easy
('00000000-0000-0001-0001-000000000001', '00000000-0000-0000-0000-000000000001', 1,
 'What is the value of the digit 7 in the number 3.472?',
 'multiple_choice', 'easy',
 '["7 tenths (0.7)", "7 hundredths (0.07)", "7 thousandths (0.007)", "7 ones (7)"]',
 '7 hundredths (0.07)',
 'In 3.472, reading left to right after the decimal: 4 is tenths, 7 is hundredths, 2 is thousandths. So 7 is in the hundredths place = 0.07.',
 false, true),

('00000000-0000-0001-0001-000000000002', '00000000-0000-0000-0000-000000000001', 1,
 'Which number is greater: 4.08 or 4.8?',
 'multiple_choice', 'easy',
 '["4.08", "4.8", "They are equal", "Cannot tell"]',
 '4.8',
 'Line up the decimals: 4.08 has 0 tenths, while 4.8 has 8 tenths. Since 8 > 0 in the tenths place, 4.8 is greater.',
 false, true),

('00000000-0000-0001-0001-000000000003', '00000000-0000-0000-0000-000000000001', 1,
 'What is the place value of the 5 in 12.053?',
 'multiple_choice', 'easy',
 '["Tenths", "Hundredths", "Thousandths", "Ones"]',
 'Hundredths',
 'After the decimal point: 0 is tenths, 5 is hundredths, 3 is thousandths. The 5 is in the hundredths place.',
 false, true),

('00000000-0000-0001-0001-000000000004', '00000000-0000-0000-0000-000000000001', 1,
 'Round 6.738 to the nearest hundredth.',
 'numeric', 'easy',
 '[]',
 '6.74',
 'Look at the thousandths digit (8). Since 8 ≥ 5, round the hundredths digit up: 3 becomes 4. Answer: 6.74.',
 false, true),

('00000000-0000-0001-0001-000000000005', '00000000-0000-0000-0000-000000000001', 1,
 'Write the decimal for "three and five hundredths".',
 'numeric', 'easy',
 '[]',
 '3.05',
 '"Three" = 3 (whole number). "Five hundredths" = 0.05. Combined: 3.05. Notice there must be a zero in the tenths place.',
 false, true),

-- Standard
('00000000-0000-0001-0001-000000000006', '00000000-0000-0000-0000-000000000001', 1,
 'Order these decimals from least to greatest: 0.4, 0.04, 0.44, 0.404',
 'multiple_choice', 'standard',
 '["0.04, 0.4, 0.404, 0.44", "0.04, 0.404, 0.4, 0.44", "0.4, 0.04, 0.44, 0.404", "0.44, 0.404, 0.4, 0.04"]',
 '0.04, 0.4, 0.404, 0.44',
 'Compare tenths first: 0.04 has 0 tenths (smallest). Then 0.4 and 0.404 both have 4 tenths — compare hundredths: 0 vs 0, then thousandths: 0 vs 4, so 0.4 < 0.404. Finally 0.44 has 4 tenths and 4 hundredths (largest).',
 false, true),

('00000000-0000-0001-0001-000000000007', '00000000-0000-0000-0000-000000000001', 1,
 'Round 2.945 to the nearest tenth.',
 'numeric', 'standard',
 '[]',
 '2.9',
 'Look at the hundredths digit (4). Since 4 < 5, keep the tenths digit the same. Answer: 2.9.',
 false, true),

('00000000-0000-0001-0001-000000000008', '00000000-0000-0000-0000-000000000001', 1,
 'Write 5.06 in expanded form.',
 'multiple_choice', 'standard',
 '["5 + 0.6", "5 + 0.06", "5 + 0.006", "50 + 6"]',
 '5 + 0.06',
 '5.06 = 5 ones + 0 tenths + 6 hundredths = 5 + 0.06.',
 false, true),

-- Word Problem
('00000000-0000-0001-0001-000000000009', '00000000-0000-0000-0000-000000000001', 1,
 'A runner ran 2.75 miles on Monday and 3.4 miles on Tuesday. How many miles did she run in total?',
 'numeric', 'word_problem',
 '[]',
 '6.15',
 'Line up the decimals: 2.75 + 3.40 = 6.15 miles. Always write 3.4 as 3.40 to align the decimal places.',
 false, true),

('00000000-0000-0001-0001-000000000010', '00000000-0000-0000-0000-000000000001', 1,
 'Emma bought a notebook for $2.49 and a pen for $0.85. How much did she spend in total?',
 'numeric', 'word_problem',
 '[]',
 '3.34',
 '2.49 + 0.85 = 3.34. Line up decimal points: 9 + 5 = 14, write 4 carry 1; 4 + 8 + 1 = 13, write 3 carry 1; 2 + 0 + 1 = 3.',
 false, true),

-- Challenge
('00000000-0000-0001-0001-000000000011', '00000000-0000-0000-0000-000000000001', 1,
 'A number has a 3 in the tenths place, a 5 in the thousandths place, and a 0 in all other decimal places, with 1 in the ones place. What is the number?',
 'numeric', 'challenge',
 '[]',
 '1.305',
 'Build it piece by piece: 1 (ones) + 0.3 (tenths) + 0.00 (hundredths) + 0.005 (thousandths) = 1.305.',
 true, true),

-- ============================================================
-- QUESTIONS — Week 2: Decimal Operations
-- ============================================================

-- Easy
('00000000-0000-0001-0002-000000000001', '00000000-0000-0000-0000-000000000002', 2,
 'What is 3.6 + 2.4?',
 'numeric', 'easy',
 '[]',
 '6',
 'Line up decimals: 3.6 + 2.4. Tenths: 6 + 4 = 10, write 0 carry 1. Ones: 3 + 2 + 1 = 6. Answer: 6.0 = 6.',
 false, true),

('00000000-0000-0001-0002-000000000002', '00000000-0000-0000-0000-000000000002', 2,
 'What is 5.8 − 2.3?',
 'numeric', 'easy',
 '[]',
 '3.5',
 'Line up decimals: 5.8 − 2.3. Tenths: 8 − 3 = 5. Ones: 5 − 2 = 3. Answer: 3.5.',
 false, true),

('00000000-0000-0001-0002-000000000003', '00000000-0000-0000-0000-000000000002', 2,
 'What is 0.4 × 3?',
 'numeric', 'easy',
 '[]',
 '1.2',
 '4 × 3 = 12. One decimal place in 0.4, so answer has one decimal place: 1.2.',
 false, true),

('00000000-0000-0001-0002-000000000004', '00000000-0000-0000-0000-000000000002', 2,
 'What is 7.25 + 1.5?',
 'numeric', 'easy',
 '[]',
 '8.75',
 'Write 1.5 as 1.50. Then: 7.25 + 1.50 = 8.75.',
 false, true),

('00000000-0000-0001-0002-000000000005', '00000000-0000-0000-0000-000000000002', 2,
 'Which correctly lines up 4.7 + 12.35 for addition?',
 'multiple_choice', 'easy',
 '[" 4.70\\n+12.35", " 4.7\\n+12.35", " 47\\n+1235", "4.70\\n+1.235"]',
 ' 4.70\n+12.35',
 'Always line up the decimal points and add a zero placeholder. 4.7 becomes 4.70 so both numbers have the same decimal places.',
 false, true),

-- Standard
('00000000-0000-0001-0002-000000000006', '00000000-0000-0000-0000-000000000002', 2,
 'What is 1.2 × 3.4?',
 'numeric', 'standard',
 '[]',
 '4.08',
 '12 × 34 = 408. Count decimal places: 1 + 1 = 2. Place decimal 2 from right: 4.08.',
 false, true),

('00000000-0000-0001-0002-000000000007', '00000000-0000-0000-0000-000000000002', 2,
 'What is 9.6 ÷ 4?',
 'numeric', 'standard',
 '[]',
 '2.4',
 '96 ÷ 4 = 24. The dividend 9.6 has one decimal place, so the answer has one decimal place: 2.4.',
 false, true),

('00000000-0000-0001-0002-000000000008', '00000000-0000-0000-0000-000000000002', 2,
 'What is 10.05 − 3.7?',
 'numeric', 'standard',
 '[]',
 '6.35',
 'Write 3.7 as 3.70. Then 10.05 − 3.70 = 6.35.',
 false, true),

-- Word Problem
('00000000-0000-0001-0002-000000000009', '00000000-0000-0000-0000-000000000002', 2,
 'A bottle holds 1.75 liters of water. Emma fills 4 bottles. How many liters of water is that in total?',
 'numeric', 'word_problem',
 '[]',
 '7',
 '1.75 × 4 = 7.00 = 7 liters. Multiply 175 × 4 = 700. Two decimal places → 7.00.',
 false, true),

('00000000-0000-0001-0002-000000000010', '00000000-0000-0000-0000-000000000002', 2,
 'Marcus had $15.00. He spent $6.48 on lunch. How much does he have left?',
 'numeric', 'word_problem',
 '[]',
 '8.52',
 '15.00 − 6.48 = 8.52. Borrow as needed: 0 − 8 (borrow), 10 − 8 = 2; 9 − 4 = 5; 14 − 6 = 8.',
 false, true),

-- Challenge
('00000000-0000-0001-0002-000000000011', '00000000-0000-0000-0000-000000000002', 2,
 'What is 2.5 × 0.4 × 2?',
 'numeric', 'challenge',
 '[]',
 '2',
 '2.5 × 0.4 = 1.0 (25 × 4 = 100, two decimal places → 1.00). Then 1.0 × 2 = 2.',
 true, true),

-- ============================================================
-- QUESTIONS — Week 3: Fractions Review
-- ============================================================

-- Easy
('00000000-0000-0001-0003-000000000001', '00000000-0000-0000-0000-000000000003', 3,
 'Which fraction is equivalent to 1/2?',
 'multiple_choice', 'easy',
 '["2/3", "3/6", "4/5", "2/5"]',
 '3/6',
 'Multiply both numerator and denominator of 1/2 by 3: (1×3)/(2×3) = 3/6. Both represent the same amount.',
 false, true),

('00000000-0000-0001-0003-000000000002', '00000000-0000-0000-0000-000000000003', 3,
 'Simplify 6/8.',
 'multiple_choice', 'easy',
 '["1/2", "3/4", "2/3", "4/6"]',
 '3/4',
 'GCF of 6 and 8 is 2. Divide both: 6÷2 = 3, 8÷2 = 4. Answer: 3/4.',
 false, true),

('00000000-0000-0001-0003-000000000003', '00000000-0000-0000-0000-000000000003', 3,
 'Convert 2 3/4 to an improper fraction.',
 'multiple_choice', 'easy',
 '["5/4", "9/4", "11/4", "8/4"]',
 '11/4',
 'Multiply whole number by denominator: 2 × 4 = 8. Add numerator: 8 + 3 = 11. Keep denominator: 11/4.',
 false, true),

('00000000-0000-0001-0003-000000000004', '00000000-0000-0000-0000-000000000003', 3,
 'Which fraction is largest: 1/2, 1/3, or 1/4?',
 'multiple_choice', 'easy',
 '["1/4", "1/3", "1/2", "They are equal"]',
 '1/2',
 'When numerators are the same, the fraction with the SMALLER denominator is larger (fewer, bigger pieces). 1/2 > 1/3 > 1/4.',
 false, true),

('00000000-0000-0001-0003-000000000005', '00000000-0000-0000-0000-000000000003', 3,
 'Convert the improper fraction 7/3 to a mixed number.',
 'multiple_choice', 'easy',
 '["2 1/3", "1 4/3", "3 1/7", "2 2/3"]',
 '2 1/3',
 'Divide: 7 ÷ 3 = 2 remainder 1. So 7/3 = 2 and 1/3 = 2 1/3.',
 false, true),

-- Standard
('00000000-0000-0001-0003-000000000006', '00000000-0000-0000-0000-000000000003', 3,
 'Compare: 2/3 vs 3/4. Which is greater?',
 'multiple_choice', 'standard',
 '["2/3", "3/4", "They are equal", "Cannot determine"]',
 '3/4',
 'Common denominator of 12: 2/3 = 8/12, 3/4 = 9/12. Since 9 > 8, 3/4 is greater.',
 false, true),

('00000000-0000-0001-0003-000000000007', '00000000-0000-0000-0000-000000000003', 3,
 'Simplify 12/16.',
 'multiple_choice', 'standard',
 '["2/4", "3/4", "6/8", "1/2"]',
 '3/4',
 'GCF of 12 and 16 is 4. 12÷4 = 3, 16÷4 = 4. Answer: 3/4.',
 false, true),

('00000000-0000-0001-0003-000000000008', '00000000-0000-0000-0000-000000000003', 3,
 'What fraction of a dollar is 75 cents?',
 'multiple_choice', 'standard',
 '["7/5", "3/4", "75/10", "7/10"]',
 '3/4',
 '75 cents out of 100 cents = 75/100. Simplify by dividing by 25: 3/4.',
 false, true),

-- Word Problem
('00000000-0000-0001-0003-000000000009', '00000000-0000-0000-0000-000000000003', 3,
 'Emma ate 1/4 of a pizza and her brother ate 3/8 of the same pizza. Who ate more?',
 'multiple_choice', 'word_problem',
 '["Emma", "Her brother", "They ate the same amount", "Cannot tell"]',
 'Her brother',
 'Convert to same denominator: 1/4 = 2/8. Compare 2/8 vs 3/8. Since 3 > 2, her brother ate more.',
 false, true),

('00000000-0000-0001-0003-000000000010', '00000000-0000-0000-0000-000000000003', 3,
 'A recipe needs 2/3 cup of sugar. If you want to make half the recipe, how much sugar do you need?',
 'multiple_choice', 'word_problem',
 '["1/3 cup", "1/6 cup", "1/4 cup", "2/6 cup"]',
 '1/3 cup',
 'Half of 2/3 = 2/3 ÷ 2 = 2/3 × 1/2 = 2/6 = 1/3. You need 1/3 cup of sugar.',
 false, true),

-- Challenge
('00000000-0000-0001-0003-000000000011', '00000000-0000-0000-0000-000000000003', 3,
 'Order from least to greatest: 5/6, 3/4, 7/8',
 'multiple_choice', 'challenge',
 '["3/4, 5/6, 7/8", "7/8, 5/6, 3/4", "5/6, 3/4, 7/8", "3/4, 7/8, 5/6"]',
 '3/4, 5/6, 7/8',
 'Common denominator 24: 3/4 = 18/24, 5/6 = 20/24, 7/8 = 21/24. Order: 18/24 < 20/24 < 21/24, so 3/4 < 5/6 < 7/8.',
 true, true)

on conflict (id) do nothing;

-- ============================================================
-- QUIZZES
-- ============================================================
insert into quizzes (id, title, description, week_number, topic_id, is_active) values
  ('00000000-0000-0002-0001-000000000001', 'Week 1 Quiz: Decimal Place Value', 'Test your understanding of decimal place value, comparing, and rounding.', 1, '00000000-0000-0000-0000-000000000001', true),
  ('00000000-0000-0002-0002-000000000001', 'Week 2 Quiz: Decimal Operations', 'Test your skills with adding, subtracting, and multiplying decimals.', 2, '00000000-0000-0000-0000-000000000002', true),
  ('00000000-0000-0002-0003-000000000001', 'Week 3 Quiz: Fractions Review', 'Test your understanding of fractions, equivalence, and mixed numbers.', 3, '00000000-0000-0000-0000-000000000003', true)
on conflict (id) do nothing;

-- Quiz questions for Week 1 quiz (6 questions)
insert into quiz_questions (quiz_id, question_id, sort_order) values
  ('00000000-0000-0002-0001-000000000001', '00000000-0000-0001-0001-000000000001', 1),
  ('00000000-0000-0002-0001-000000000001', '00000000-0000-0001-0001-000000000002', 2),
  ('00000000-0000-0002-0001-000000000001', '00000000-0000-0001-0001-000000000004', 3),
  ('00000000-0000-0002-0001-000000000001', '00000000-0000-0001-0001-000000000006', 4),
  ('00000000-0000-0002-0001-000000000001', '00000000-0000-0001-0001-000000000008', 5),
  ('00000000-0000-0002-0001-000000000001', '00000000-0000-0001-0001-000000000009', 6)
on conflict do nothing;

-- Quiz questions for Week 2 quiz (6 questions)
insert into quiz_questions (quiz_id, question_id, sort_order) values
  ('00000000-0000-0002-0002-000000000001', '00000000-0000-0001-0002-000000000001', 1),
  ('00000000-0000-0002-0002-000000000001', '00000000-0000-0001-0002-000000000002', 2),
  ('00000000-0000-0002-0002-000000000001', '00000000-0000-0001-0002-000000000006', 3),
  ('00000000-0000-0002-0002-000000000001', '00000000-0000-0001-0002-000000000007', 4),
  ('00000000-0000-0002-0002-000000000001', '00000000-0000-0001-0002-000000000009', 5),
  ('00000000-0000-0002-0002-000000000001', '00000000-0000-0001-0002-000000000010', 6)
on conflict do nothing;

-- Quiz questions for Week 3 quiz (6 questions)
insert into quiz_questions (quiz_id, question_id, sort_order) values
  ('00000000-0000-0002-0003-000000000001', '00000000-0000-0001-0003-000000000001', 1),
  ('00000000-0000-0002-0003-000000000001', '00000000-0000-0001-0003-000000000002', 2),
  ('00000000-0000-0002-0003-000000000001', '00000000-0000-0001-0003-000000000003', 3),
  ('00000000-0000-0002-0003-000000000001', '00000000-0000-0001-0003-000000000006', 4),
  ('00000000-0000-0002-0003-000000000001', '00000000-0000-0001-0003-000000000009', 5),
  ('00000000-0000-0002-0003-000000000001', '00000000-0000-0001-0003-000000000010', 6)
on conflict do nothing;

-- ============================================================
-- WEEKLY PROGRESS (initial state)
-- ============================================================
insert into weekly_progress (week_number, status, completion_percentage, lesson_completed, practice_completed, quiz_completed) values
  (1, 'not_started', 0, false, false, false),
  (2, 'not_started', 0, false, false, false),
  (3, 'not_started', 0, false, false, false)
on conflict (week_number) do nothing;
