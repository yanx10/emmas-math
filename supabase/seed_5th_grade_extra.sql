-- Emma Math Learning Portal — Extra 5th Grade Practice Questions
-- Adds 12 more questions per week for Weeks 1–3 (36 total new questions)
-- IDs continue from existing set: ...000000000012 through ...000000000023
-- Run after seed.sql

-- ============================================================
-- EXTRA QUESTIONS — Week 1: Decimal Place Value (12 new)
-- ============================================================
insert into questions (id, topic_id, week_number, question_text, question_type, difficulty, choices, correct_answer, explanation, is_challenge, is_active) values

-- Easy
('00000000-0000-0001-0001-000000000012', '00000000-0000-0000-0000-000000000001', 1,
 'What digit is in the tenths place in 8.247?',
 'multiple_choice', 'easy',
 '["2", "4", "7", "8"]',
 '2',
 'After the decimal point, reading left to right: 2 is tenths, 4 is hundredths, 7 is thousandths.',
 false, true),

('00000000-0000-0001-0001-000000000013', '00000000-0000-0000-0000-000000000001', 1,
 'Round 4.2 to the nearest whole number.',
 'numeric', 'easy',
 '[]',
 '4',
 'Look at the tenths digit (2). Since 2 < 5, round down — keep the ones digit the same. 4.2 ≈ 4.',
 false, true),

('00000000-0000-0001-0001-000000000014', '00000000-0000-0000-0000-000000000001', 1,
 'Are 0.50 and 0.5 equal?',
 'multiple_choice', 'easy',
 '["Yes, they are equal", "No, 0.50 is greater", "No, 0.5 is greater", "Cannot tell"]',
 'Yes, they are equal',
 'Trailing zeros after the last significant decimal digit do not change the value. 0.50 = 5 tenths = 0.5.',
 false, true),

('00000000-0000-0001-0001-000000000015', '00000000-0000-0000-0000-000000000001', 1,
 'Write "fourteen hundredths" as a decimal.',
 'numeric', 'easy',
 '[]',
 '0.14',
 '"Hundredths" means 2 decimal places. 14/100 = 0.14. The tenths place is 1, the hundredths place is 4.',
 false, true),

('00000000-0000-0001-0001-000000000016', '00000000-0000-0000-0000-000000000001', 1,
 'Write "forty-two and three tenths" as a decimal.',
 'numeric', 'easy',
 '[]',
 '42.3',
 '"Forty-two" is the whole number part: 42. "Three tenths" = 0.3. Together: 42.3.',
 false, true),

-- Standard
('00000000-0000-0001-0001-000000000017', '00000000-0000-0000-0000-000000000001', 1,
 'What is the value of the digit 9 in 0.709?',
 'multiple_choice', 'standard',
 '["9 tenths (0.9)", "9 hundredths (0.09)", "9 thousandths (0.009)", "9 ones (9)"]',
 '9 thousandths (0.009)',
 'In 0.709: 7 is tenths, 0 is hundredths, 9 is thousandths. The 9 is in the thousandths place = 0.009.',
 false, true),

('00000000-0000-0001-0001-000000000018', '00000000-0000-0000-0000-000000000001', 1,
 'Round 3.549 to the nearest tenth.',
 'numeric', 'standard',
 '[]',
 '3.5',
 'Look at the hundredths digit (4). Since 4 < 5, round down — keep the tenths digit. 3.549 ≈ 3.5.',
 false, true),

('00000000-0000-0001-0001-000000000019', '00000000-0000-0000-0000-000000000001', 1,
 'Which list is in order from greatest to least?',
 'multiple_choice', 'standard',
 '["0.3, 0.29, 0.199, 0.01", "0.01, 0.199, 0.29, 0.3", "0.29, 0.3, 0.199, 0.01", "0.199, 0.29, 0.01, 0.3"]',
 '0.3, 0.29, 0.199, 0.01',
 'Compare tenths first: 0.3 (3 tenths) > 0.29 (2 tenths) > 0.199 (1 tenth) > 0.01 (0 tenths).',
 false, true),

-- Word Problem
('00000000-0000-0001-0001-000000000020', '00000000-0000-0000-0000-000000000001', 1,
 'Jasmine''s ribbon is 8.6 cm long. She needs 10 cm. How much more ribbon does she need?',
 'numeric', 'word_problem',
 '[]',
 '1.4',
 '10.0 − 8.6 = 1.4 cm. Tenths: borrow 1 from ones → 10 − 6 = 4. Ones: 9 − 8 = 1.',
 false, true),

('00000000-0000-0001-0001-000000000021', '00000000-0000-0000-0000-000000000001', 1,
 'The morning temperature was 18.4°C and the afternoon temperature was 24.7°C. By how many degrees did the temperature rise?',
 'numeric', 'word_problem',
 '[]',
 '6.3',
 '24.7 − 18.4 = 6.3°C. Tenths: 7 − 4 = 3. Ones: borrow → 14 − 8 = 6. Answer: 6.3.',
 false, true),

-- Challenge
('00000000-0000-0001-0001-000000000022', '00000000-0000-0000-0000-000000000001', 1,
 'A number rounded to the nearest tenth is 5.7. Which could be the original number?',
 'multiple_choice', 'challenge',
 '["5.64", "5.75", "5.74", "5.62"]',
 '5.74',
 '5.74: the hundredths digit is 4 (< 5), so it rounds DOWN to 5.7. ✓ 5.75 rounds UP to 5.8. 5.64 and 5.62 both round to 5.6.',
 true, true),

('00000000-0000-0001-0001-000000000023', '00000000-0000-0000-0000-000000000001', 1,
 'Write 0.345 in expanded form using fractions.',
 'multiple_choice', 'challenge',
 '["3/10 + 4/100 + 5/1000", "3/100 + 4/10 + 5/1000", "345/100", "3/10 + 45/1000"]',
 '3/10 + 4/100 + 5/1000',
 '0.345 = 3 tenths + 4 hundredths + 5 thousandths = 3/10 + 4/100 + 5/1000.',
 true, true),

-- ============================================================
-- EXTRA QUESTIONS — Week 2: Decimal Operations (12 new)
-- ============================================================

-- Easy
('00000000-0000-0001-0002-000000000012', '00000000-0000-0000-0000-000000000002', 2,
 'What is 0.9 + 0.3?',
 'numeric', 'easy',
 '[]',
 '1.2',
 'Tenths: 9 + 3 = 12. Write 2, carry 1. Ones: 0 + 0 + 1 = 1. Answer: 1.2.',
 false, true),

('00000000-0000-0001-0002-000000000013', '00000000-0000-0000-0000-000000000002', 2,
 'What is 8.5 − 3.2?',
 'numeric', 'easy',
 '[]',
 '5.3',
 'Tenths: 5 − 2 = 3. Ones: 8 − 3 = 5. Answer: 5.3.',
 false, true),

('00000000-0000-0001-0002-000000000014', '00000000-0000-0000-0000-000000000002', 2,
 'What is 0.7 × 4?',
 'numeric', 'easy',
 '[]',
 '2.8',
 '7 × 4 = 28. There is 1 decimal place in 0.7, so the answer has 1 decimal place: 2.8.',
 false, true),

('00000000-0000-0001-0002-000000000015', '00000000-0000-0000-0000-000000000002', 2,
 'What is 5.00 − 1.25?',
 'numeric', 'easy',
 '[]',
 '3.75',
 '5.00 − 1.25 = 3.75. Hundredths: 0 − 5, borrow: 10 − 5 = 5. Tenths: 9 − 2 = 7. Ones: 4 − 1 = 3.',
 false, true),

('00000000-0000-0001-0002-000000000016', '00000000-0000-0000-0000-000000000002', 2,
 'Estimate: 3.8 + 2.1 is closest to which whole number?',
 'multiple_choice', 'easy',
 '["4", "5", "6", "7"]',
 '6',
 'Round each to the nearest whole number: 3.8 ≈ 4 and 2.1 ≈ 2. Estimate: 4 + 2 = 6.',
 false, true),

-- Standard
('00000000-0000-0001-0002-000000000017', '00000000-0000-0000-0000-000000000002', 2,
 'What is 3.25 × 4?',
 'numeric', 'standard',
 '[]',
 '13',
 'Ignore the decimal: 325 × 4 = 1300. There are 2 decimal places in 3.25, so: 13.00 = 13.',
 false, true),

('00000000-0000-0001-0002-000000000018', '00000000-0000-0000-0000-000000000002', 2,
 'What is 15.6 ÷ 3?',
 'numeric', 'standard',
 '[]',
 '5.2',
 '156 ÷ 3 = 52. There is 1 decimal place in 15.6, so the answer has 1 decimal place: 5.2.',
 false, true),

('00000000-0000-0001-0002-000000000019', '00000000-0000-0000-0000-000000000002', 2,
 'What is 4.8 − 1.56?',
 'numeric', 'standard',
 '[]',
 '3.24',
 'Write 4.8 as 4.80. Then 4.80 − 1.56: hundredths 0 − 6 borrow → 10 − 6 = 4; tenths 7 − 5 = 2; ones 4 − 1 = 3. Answer: 3.24.',
 false, true),

-- Word Problem
('00000000-0000-0001-0002-000000000020', '00000000-0000-0000-0000-000000000002', 2,
 'Shirts cost $12.50 each. Emma buys 3 shirts. How much does she spend in total?',
 'numeric', 'word_problem',
 '[]',
 '37.50',
 '12.50 × 3 = 37.50. Multiply 1250 × 3 = 3750. Two decimal places → $37.50.',
 false, true),

('00000000-0000-0001-0002-000000000021', '00000000-0000-0000-0000-000000000002', 2,
 'Carlos has $20.00. He buys a book for $7.35 and a pencil for $1.15. How much change does he get?',
 'numeric', 'word_problem',
 '[]',
 '11.50',
 'Total spent: $7.35 + $1.15 = $8.50. Change: $20.00 − $8.50 = $11.50.',
 false, true),

-- Challenge
('00000000-0000-0001-0002-000000000022', '00000000-0000-0000-0000-000000000002', 2,
 'What is 0.25 × 0.4?',
 'numeric', 'challenge',
 '[]',
 '0.1',
 '25 × 4 = 100. Count decimal places: 2 (from 0.25) + 1 (from 0.4) = 3 total. Place decimal 3 from right: 0.100 = 0.1.',
 true, true),

('00000000-0000-0001-0002-000000000023', '00000000-0000-0000-0000-000000000002', 2,
 'A rope is 7.2 meters long. It is cut into 6 equal pieces. Then 0.15 meters is trimmed from one piece. How long is that trimmed piece?',
 'numeric', 'challenge',
 '[]',
 '1.05',
 '7.2 ÷ 6 = 1.2 meters per piece. Then 1.20 − 0.15 = 1.05 meters. (Hundredths: 0 − 5 borrow → 10 − 5 = 5; tenths: 1 − 1 = 0; ones: 1.)',
 true, true),

-- ============================================================
-- EXTRA QUESTIONS — Week 3: Fractions Review (12 new)
-- ============================================================

-- Easy
('00000000-0000-0001-0003-000000000012', '00000000-0000-0000-0000-000000000003', 3,
 'What is 1/5 + 2/5?',
 'multiple_choice', 'easy',
 '["1/5", "2/5", "3/5", "3/10"]',
 '3/5',
 'Same denominator — add the numerators: 1 + 2 = 3. Keep the denominator: 3/5.',
 false, true),

('00000000-0000-0001-0003-000000000013', '00000000-0000-0000-0000-000000000003', 3,
 'What is 4/7 − 2/7?',
 'multiple_choice', 'easy',
 '["1/7", "2/7", "6/7", "3/7"]',
 '2/7',
 'Same denominator — subtract the numerators: 4 − 2 = 2. Keep the denominator: 2/7.',
 false, true),

('00000000-0000-0001-0003-000000000014', '00000000-0000-0000-0000-000000000003', 3,
 'What is 1/4 of 20?',
 'numeric', 'easy',
 '[]',
 '5',
 '1/4 of 20 means 20 ÷ 4 = 5.',
 false, true),

('00000000-0000-0001-0003-000000000015', '00000000-0000-0000-0000-000000000003', 3,
 'Which fraction is equivalent to 2/3?',
 'multiple_choice', 'easy',
 '["3/4", "4/6", "2/4", "6/8"]',
 '4/6',
 'Multiply both numerator and denominator by 2: (2×2)/(3×2) = 4/6.',
 false, true),

('00000000-0000-0001-0003-000000000016', '00000000-0000-0000-0000-000000000003', 3,
 'Is 3/5 greater than, less than, or equal to 1/2?',
 'multiple_choice', 'easy',
 '["3/5 > 1/2", "3/5 < 1/2", "3/5 = 1/2", "Cannot tell"]',
 '3/5 > 1/2',
 'Common denominator 10: 3/5 = 6/10 and 1/2 = 5/10. Since 6 > 5, we have 3/5 > 1/2.',
 false, true),

-- Standard
('00000000-0000-0001-0003-000000000017', '00000000-0000-0000-0000-000000000003', 3,
 'What is 1/2 + 1/3?',
 'multiple_choice', 'standard',
 '["2/5", "1/6", "5/6", "2/6"]',
 '5/6',
 'LCD of 2 and 3 is 6. Convert: 1/2 = 3/6 and 1/3 = 2/6. Add: 3/6 + 2/6 = 5/6.',
 false, true),

('00000000-0000-0001-0003-000000000018', '00000000-0000-0000-0000-000000000003', 3,
 'What is 3/4 − 1/3?',
 'multiple_choice', 'standard',
 '["2/1", "5/12", "2/12", "1/4"]',
 '5/12',
 'LCD of 4 and 3 is 12. Convert: 3/4 = 9/12 and 1/3 = 4/12. Subtract: 9/12 − 4/12 = 5/12.',
 false, true),

('00000000-0000-0001-0003-000000000019', '00000000-0000-0000-0000-000000000003', 3,
 'What is 3/4 of 24?',
 'numeric', 'standard',
 '[]',
 '18',
 '3/4 of 24 = (24 ÷ 4) × 3 = 6 × 3 = 18.',
 false, true),

-- Word Problem
('00000000-0000-0001-0003-000000000020', '00000000-0000-0000-0000-000000000003', 3,
 'A pizza is cut into 8 equal slices. Emma eats 3/8 of it and her friend eats 2/8. What fraction of the pizza did they eat altogether?',
 'multiple_choice', 'word_problem',
 '["1/8", "5/8", "5/16", "6/8"]',
 '5/8',
 'Same denominator: 3/8 + 2/8 = 5/8 of the pizza.',
 false, true),

('00000000-0000-0001-0003-000000000021', '00000000-0000-0000-0000-000000000003', 3,
 'A string is 7/8 of a meter long. Emma uses 1/4 of a meter for a project. How much string is left?',
 'multiple_choice', 'word_problem',
 '["3/8", "5/8", "6/8", "1/2"]',
 '5/8',
 'Convert 1/4 to eighths: 1/4 = 2/8. Subtract: 7/8 − 2/8 = 5/8 of a meter.',
 false, true),

-- Challenge
('00000000-0000-0001-0003-000000000022', '00000000-0000-0000-0000-000000000003', 3,
 'Add: 1 2/5 + 2 3/5',
 'multiple_choice', 'challenge',
 '["3", "4", "4 1/5", "5"]',
 '4',
 'Add whole numbers: 1 + 2 = 3. Add fractions: 2/5 + 3/5 = 5/5 = 1. Total: 3 + 1 = 4.',
 true, true),

('00000000-0000-0001-0003-000000000023', '00000000-0000-0000-0000-000000000003', 3,
 'A bag of flour weighs 3 1/4 pounds. Emma uses 1 3/4 pounds for baking. How much flour is left?',
 'multiple_choice', 'challenge',
 '["1 1/4", "1 1/2", "2", "2 1/2"]',
 '1 1/2',
 'Borrow 1 from the whole number: 3 1/4 = 2 5/4. Subtract: 2 5/4 − 1 3/4 = 1 2/4 = 1 1/2 pounds.',
 true, true)

on conflict (id) do nothing;
