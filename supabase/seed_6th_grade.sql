-- Emma Math Learning Portal — 6th Grade Prep (Weeks 4–10)
-- Run after seed.sql. After applying, update WEEK_META in app/app/page.tsx to include weeks 4–10.

-- ============================================================
-- TOPICS
-- ============================================================
insert into topics (id, slug, title, description, grade_level, sort_order) values
  ('00000000-0000-0000-0000-000000000004', 'ratios-and-rates', 'Ratios & Rates', 'Understanding ratios, equivalent ratios, unit rates, and solving ratio problems', '6th Grade', 4),
  ('00000000-0000-0000-0000-000000000005', 'percentages', 'Percentages', 'Converting between fractions, decimals, and percents; finding the percent of a number', '6th Grade', 5),
  ('00000000-0000-0000-0000-000000000006', 'integers', 'Integers & Negative Numbers', 'Number line, comparing integers, absolute value, and adding and subtracting integers', '6th Grade', 6),
  ('00000000-0000-0000-0000-000000000007', 'expressions-and-equations', 'Expressions & Equations', 'Variables, writing and evaluating expressions, and solving one-step equations', '6th Grade', 7),
  ('00000000-0000-0000-0000-000000000008', 'geometry-area-volume', 'Geometry: Area & Volume', 'Area of triangles and parallelograms, volume of rectangular prisms', '6th Grade', 8),
  ('00000000-0000-0000-0000-000000000009', 'statistics', 'Statistics', 'Mean, median, mode, and range; reading and interpreting data sets', '6th Grade', 9),
  ('00000000-0000-0000-0000-00000000000a', 'coordinate-plane', 'Coordinate Plane', 'Four quadrants, plotting (x,y) points, and finding distance along axes', '6th Grade', 10)
on conflict (slug) do nothing;

-- ============================================================
-- LESSONS
-- ============================================================
insert into lessons (id, slug, title, summary, content, examples, common_mistakes, topic_id, week_number, sort_order) values
(
  '00000000-0000-0000-0001-000000000004',
  'ratios-and-rates-lesson',
  'Ratios & Rates: Comparing Quantities',
  'Learn to write ratios three ways, find equivalent ratios, calculate unit rates, and solve ratio problems.',
  '## What is a Ratio?\nA **ratio** compares two quantities. If there are 3 red apples and 5 green apples, the ratio of red to green is **3 to 5**.\n\n## Three Ways to Write a Ratio\n- With a colon: **3:5**\n- With the word to: **3 to 5**\n- As a fraction: **3/5**\n\n**Order matters!** 3:5 is NOT the same as 5:3. Always list quantities in the order the problem asks.\n\n## Equivalent Ratios\nEquivalent ratios represent the same comparison. Multiply or divide BOTH parts by the same number.\n\n**2:3 = 4:6 = 6:9 = 10:15**\n\nThink of them just like equivalent fractions!\n\n## Unit Rate\nA **unit rate** tells you how much per 1 unit of another quantity.\n\nIf a car travels 150 miles in 3 hours:\nUnit rate = 150 / 3 = **50 miles per hour**\n\nDivide so the denominator becomes 1.\n\n## Solving Ratio Problems\nIf the ratio of cats to dogs is 2:3 and there are 12 dogs, how many cats?\n- Find the multiplier: 3 x ? = 12, so ? = 4\n- Cats = 2 x 4 = **8 cats**',
  '[{"problem": "A recipe uses 3 cups of oats for every 2 cups of raisins. If you use 8 cups of raisins, how many cups of oats do you need?", "solution": "12 cups of oats", "explanation": "Find the multiplier: 2 x ? = 8, so ? = 4. Oats = 3 x 4 = 12 cups."}, {"problem": "A car travels 240 miles in 4 hours. What is the unit rate in miles per hour?", "solution": "60 miles per hour", "explanation": "Unit rate = total distance / total time = 240 / 4 = 60 miles per hour."}]',
  '["Writing the ratio in the wrong order — always list quantities in the order asked", "Multiplying only one part when finding equivalent ratios — multiply BOTH parts", "Confusing unit rate with the total — divide to get the rate per 1 unit"]',
  '00000000-0000-0000-0000-000000000004',
  4,
  1
),
(
  '00000000-0000-0000-0001-000000000005',
  'percentages-lesson',
  'Percentages: Fractions, Decimals & Percents',
  'Master converting between fractions, decimals, and percents, and learn to find the percent of any number.',
  '## What is a Percent?\nA **percent** means "out of 100." The symbol is **%**.\n25% means 25 out of 100, or 25/100, or 0.25.\n\n## Converting Between Forms\n**Fraction to Percent:** Divide numerator by denominator, then multiply by 100.\n- 3/4 = 3 / 4 = 0.75 = **75%**\n\n**Decimal to Percent:** Multiply by 100 (move decimal two places right).\n- 0.4 = **40%**\n\n**Percent to Decimal:** Divide by 100 (move decimal two places left).\n- 35% = **0.35**\n\n## Finding the Percent of a Number\nMultiply the percent (as a decimal) by the number.\n\n**What is 30% of 50?**\n- Convert: 30% = 0.30\n- Multiply: 0.30 x 50 = **15**\n\n## Finding What Percent One Number is of Another\nDivide the part by the whole, then multiply by 100.\n\n**9 is what percent of 36?**\n- 9 / 36 = 0.25\n- 0.25 x 100 = **25%**',
  '[{"problem": "Convert 2/5 to a percent.", "solution": "40%", "explanation": "2 / 5 = 0.40. Multiply by 100: 0.40 x 100 = 40%."}, {"problem": "What is 15% of 200?", "solution": "30", "explanation": "Convert 15% to a decimal: 0.15. Then multiply: 0.15 x 200 = 30."}]',
  '["Moving the decimal the wrong direction — to convert percent to decimal, divide by 100 (move left)", "Forgetting to convert the percent to a decimal before multiplying", "Mixing up the part and the whole when finding what percent one number is of another"]',
  '00000000-0000-0000-0000-000000000005',
  5,
  1
),
(
  '00000000-0000-0000-0001-000000000006',
  'integers-lesson',
  'Integers & Negative Numbers',
  'Explore the number line, compare integers, find absolute values, and add and subtract negative numbers.',
  '## What are Integers?\n**Integers** are whole numbers and their opposites: ..., -3, -2, -1, 0, 1, 2, 3, ...\n\nPositive integers are greater than 0. Negative integers are less than 0. Zero is neither positive nor negative.\n\n## The Number Line\nIntegers are arranged on a number line. Numbers to the **right** are greater; numbers to the **left** are smaller.\n\n**-5 < -2 < 0 < 3 < 7**\n\n## Absolute Value\n**Absolute value** is the distance from zero — always positive!\n\n|-8| = 8 and |6| = 6\n\nThink of it as "how far from zero?" without caring about direction.\n\n## Adding Integers\n- Same signs: add the values, keep the sign. (-3) + (-5) = -8\n- Different signs: subtract the smaller from the larger, take the sign of the larger. (-3) + 7 = 4\n\n## Subtracting Integers\nSubtracting is the same as adding the opposite!\n\n5 - 8 = 5 + (-8) = -3\n-2 - 4 = -2 + (-4) = -6',
  '[{"problem": "What is -6 + 9?", "solution": "3", "explanation": "Different signs: subtract smaller from larger (9 - 6 = 3). The larger number (9) is positive, so the answer is positive: 3."}, {"problem": "What is 3 - 10?", "solution": "-7", "explanation": "Rewrite as adding the opposite: 3 + (-10). Different signs: 10 - 3 = 7. The larger value (10) is negative, so the answer is -7."}]',
  '["Thinking -8 is greater than -2 because 8 looks bigger — on the number line, -8 is further left and smaller", "Forgetting that absolute value is always positive — |-5| = 5, not -5", "Subtracting a negative and getting confused — remember: subtracting a negative means adding a positive"]',
  '00000000-0000-0000-0000-000000000006',
  6,
  1
),
(
  '00000000-0000-0000-0001-000000000007',
  'expressions-equations-lesson',
  'Expressions & Equations: The Language of Algebra',
  'Learn to write and evaluate algebraic expressions, and solve one-step equations using inverse operations.',
  '## Variables and Expressions\nA **variable** is a letter that represents an unknown number (like x, y, or n).\nAn **expression** is a math phrase with numbers, variables, and operations.\n\n- "5 more than x" → x + 5\n- "3 times a number n" → 3n\n- "a number divided by 4" → n / 4\n\n## Evaluating Expressions\nSubstitute the value of the variable and calculate.\n\n**Evaluate 2x + 3 when x = 4:**\n- Replace x with 4: 2(4) + 3\n- Multiply first: 8 + 3\n- Add: **11**\n\n## Equations\nAn **equation** shows two expressions are equal: **3x = 15**\n\n## Solving One-Step Equations\nUse **inverse operations** (opposites) to isolate the variable.\n\n**x + 7 = 12** → Subtract 7 from both sides → x = 5\n**3x = 21** → Divide both sides by 3 → x = 7\n**x - 4 = 9** → Add 4 to both sides → x = 13\n**x / 4 = 6** → Multiply both sides by 4 → x = 24',
  '[{"problem": "Evaluate 3m - 1 when m = 5.", "solution": "14", "explanation": "Replace m with 5: 3(5) - 1 = 15 - 1 = 14."}, {"problem": "Solve: 4x = 28.", "solution": "x = 7", "explanation": "Divide both sides by 4: 4x / 4 = 28 / 4, so x = 7."}]',
  '["Performing the wrong inverse operation — if the equation adds, subtract; if it multiplies, divide", "Only doing the operation to one side — whatever you do to one side, do to the other", "Confusing an expression (no equals sign) with an equation (has an equals sign)"]',
  '00000000-0000-0000-0000-000000000007',
  7,
  1
),
(
  '00000000-0000-0000-0001-000000000008',
  'geometry-area-volume-lesson',
  'Geometry: Area of Shapes & Volume of Prisms',
  'Learn to find the area of triangles and parallelograms, and the volume of rectangular prisms.',
  '## Area of a Rectangle\nArea = **length x width** (A = l x w)\n\nA rectangle 8 cm long and 5 cm wide: A = 8 x 5 = **40 sq cm**\n\n## Area of a Parallelogram\nA parallelogram is like a slanted rectangle. Use the **perpendicular height**, not the slant side!\n\nArea = **base x height** (A = b x h)\n\nParallelogram with base 6 m and height 4 m: A = 6 x 4 = **24 sq m**\n\n## Area of a Triangle\nA triangle is half a parallelogram!\n\nArea = **1/2 x base x height** (A = 1/2 b h)\n\nTriangle with base 10 ft and height 7 ft: A = 1/2 x 10 x 7 = **35 sq ft**\n\n## Volume of a Rectangular Prism\nVolume fills 3D space — measured in cubic units.\n\nVolume = **length x width x height** (V = l x w x h)\n\nBox 5 cm x 4 cm x 3 cm: V = 5 x 4 x 3 = **60 cu cm**',
  '[{"problem": "Find the area of a triangle with base 12 m and height 5 m.", "solution": "30 sq m", "explanation": "Area = 1/2 x base x height = 1/2 x 12 x 5 = 6 x 5 = 30 sq m."}, {"problem": "A rectangular box is 6 cm long, 4 cm wide, and 3 cm tall. What is its volume?", "solution": "72 cu cm", "explanation": "Volume = l x w x h = 6 x 4 x 3 = 72 cu cm."}]',
  '["Using the slant side instead of the perpendicular height for parallelograms and triangles", "Forgetting the 1/2 in the triangle area formula", "Mixing up area (flat, square units) and volume (3D, cubic units)"]',
  '00000000-0000-0000-0000-000000000008',
  8,
  1
),
(
  '00000000-0000-0000-0001-000000000009',
  'statistics-lesson',
  'Statistics: Mean, Median, Mode & Range',
  'Learn to find and use the four key measures that describe a data set.',
  '## The Four Measures\n\n### Mean (Average)\nAdd all values, then divide by how many there are.\n\nData: {4, 7, 3, 8, 8} → Sum = 30, Count = 5 → Mean = 30 / 5 = **6**\n\n### Median (Middle Value)\nSort the data, then find the middle value.\n- Odd count: middle number is the median.\n- Even count: average of the two middle numbers.\n\nData: {3, 4, 7, 8, 8} → Middle = **7**\n\n### Mode (Most Frequent)\nThe value that appears most often. A data set can have more than one mode, or no mode.\n\nData: {3, 4, 7, 8, 8} → **8** (appears twice)\n\n### Range (Spread)\nRange = Maximum - Minimum\n\nData: {3, 4, 7, 8, 8} → Range = 8 - 3 = **5**\n\n## Which Measure to Use?\n- Use **mean** when data has no extreme outliers.\n- Use **median** when there are very high or very low values.\n- Use **mode** for categories or most popular items.',
  '[{"problem": "Find the mean of {6, 10, 8, 12, 14}.", "solution": "10", "explanation": "Sum = 6 + 10 + 8 + 12 + 14 = 50. Count = 5. Mean = 50 / 5 = 10."}, {"problem": "Find the median of {7, 2, 9, 4, 1, 6, 3}.", "solution": "4", "explanation": "First sort: {1, 2, 3, 4, 6, 7, 9}. With 7 values, the median is the 4th value: 4."}]',
  '["Forgetting to sort the data before finding the median", "Averaging only the two middle numbers when there is an odd count — with an odd count there is one exact middle", "Confusing mode with median — mode is most frequent, median is the middle value"]',
  '00000000-0000-0000-0000-000000000009',
  9,
  1
),
(
  '00000000-0000-0000-0001-00000000000a',
  'coordinate-plane-lesson',
  'The Coordinate Plane: Plotting Points & Quadrants',
  'Navigate the four quadrants, plot and read (x, y) coordinates, and find distances between points.',
  '## The Coordinate Plane\nThe coordinate plane has two number lines that cross at the **origin (0, 0)**.\n- **x-axis**: horizontal (left-right)\n- **y-axis**: vertical (up-down)\n\n## Reading Coordinates\nEvery point is written as **(x, y)** — x first, y second. Remember: "x before y, walk before you fly!"\n\nPoint (3, -2): start at origin, go 3 right, then 2 down.\n\n## The Four Quadrants\n- **Quadrant I**: (+, +) — right and up\n- **Quadrant II**: (-, +) — left and up\n- **Quadrant III**: (-, -) — left and down\n- **Quadrant IV**: (+, -) — right and down\n\nPoints on an axis are NOT in any quadrant.\n\n## Finding Distance Along an Axis\nIf two points share the same y-coordinate, the distance is the difference in x-coordinates (and vice versa).\n\nDistance from (1, 4) to (6, 4) = |6 - 1| = **5 units**',
  '[{"problem": "In which quadrant is the point (-4, 3)?", "solution": "Quadrant II", "explanation": "The x-coordinate is negative (left) and y is positive (up). That is Quadrant II."}, {"problem": "What is the distance between (2, 5) and (2, 9)?", "solution": "4 units", "explanation": "Both points have x = 2, so count vertically: |9 - 5| = 4 units."}]',
  '["Mixing up x and y — x is always first (left/right), y is always second (up/down)", "Putting a point on the wrong side of an axis when a coordinate is negative", "Forgetting that points on the axes are not in any quadrant"]',
  '00000000-0000-0000-0000-00000000000a',
  10,
  1
)
on conflict (slug) do nothing;

-- ============================================================
-- QUESTIONS — Week 4: Ratios & Rates
-- ============================================================
insert into questions (id, topic_id, week_number, question_text, question_type, difficulty, choices, correct_answer, explanation, is_challenge, is_active) values

-- Easy
('00000000-0000-0001-0004-000000000001', '00000000-0000-0000-0000-000000000004', 4,
 'Which of the following correctly writes "5 to 8" as a ratio?',
 'multiple_choice', 'easy',
 '["5:8", "8:5", "58", "5+8"]',
 '5:8',
 'A ratio of 5 to 8 is written as 5:8. The first number mentioned always comes first.',
 false, true),

('00000000-0000-0001-0004-000000000002', '00000000-0000-0000-0000-000000000004', 4,
 'A smoothie recipe uses 2 cups of strawberries for every 1 cup of banana. What is the ratio of strawberries to bananas?',
 'multiple_choice', 'easy',
 '["1:2", "2:1", "3:1", "1:3"]',
 '2:1',
 'Strawberries to bananas means strawberries first: 2:1. There are 2 cups of strawberries for every 1 cup of banana.',
 false, true),

('00000000-0000-0001-0004-000000000003', '00000000-0000-0000-0000-000000000004', 4,
 'A car travels 180 miles in 3 hours. What is the unit rate in miles per hour?',
 'numeric', 'easy',
 '[]',
 '60',
 'Unit rate = total miles / total hours = 180 / 3 = 60 miles per hour.',
 false, true),

('00000000-0000-0001-0004-000000000004', '00000000-0000-0000-0000-000000000004', 4,
 'Which ratio is equivalent to 2:3?',
 'multiple_choice', 'easy',
 '["4:5", "4:6", "6:4", "3:2"]',
 '4:6',
 'Multiply both parts of 2:3 by 2: 2x2 = 4 and 3x2 = 6. So 4:6 is equivalent to 2:3.',
 false, true),

('00000000-0000-0001-0004-000000000005', '00000000-0000-0000-0000-000000000004', 4,
 'A store sells 5 apples for $2.50. What is the cost per apple?',
 'numeric', 'easy',
 '[]',
 '0.5',
 'Unit rate = $2.50 / 5 = $0.50 per apple.',
 false, true),

-- Standard
('00000000-0000-0001-0004-000000000006', '00000000-0000-0000-0000-000000000004', 4,
 'The ratio of boys to girls in a class is 3:4. If there are 16 girls, how many boys are there?',
 'multiple_choice', 'standard',
 '["10", "12", "16", "20"]',
 '12',
 'Find the multiplier: 4 x ? = 16, so ? = 4. Boys = 3 x 4 = 12.',
 false, true),

('00000000-0000-0001-0004-000000000007', '00000000-0000-0000-0000-000000000004', 4,
 'A recipe calls for 3 cups of sugar for every 4 cups of flour. If you use 12 cups of flour, how many cups of sugar do you need?',
 'numeric', 'standard',
 '[]',
 '9',
 'Find the multiplier: 4 x ? = 12, so ? = 3. Sugar = 3 x 3 = 9 cups.',
 false, true),

('00000000-0000-0001-0004-000000000008', '00000000-0000-0000-0000-000000000004', 4,
 'Which pair of ratios is equivalent?',
 'multiple_choice', 'standard',
 '["1:2 and 2:3", "3:4 and 6:8", "2:5 and 4:8", "1:4 and 2:6"]',
 '3:4 and 6:8',
 'Simplify 6:8 by dividing both by 2: 3:4. It matches! Check 2:5 and 4:8: 4:8 simplifies to 1:2, not 2:5. So 3:4 and 6:8 are equivalent.',
 false, true),

-- Word Problems
('00000000-0000-0001-0004-000000000009', '00000000-0000-0000-0000-000000000004', 4,
 'Emma earns $24 babysitting for 3 hours. At the same rate, how much will she earn in 5 hours?',
 'multiple_choice', 'word_problem',
 '["$32", "$36", "$40", "$45"]',
 '$40',
 'Unit rate = $24 / 3 = $8 per hour. For 5 hours: $8 x 5 = $40.',
 false, true),

('00000000-0000-0001-0004-000000000010', '00000000-0000-0000-0000-000000000004', 4,
 'A car uses 2 gallons of gas to travel 50 miles. How many miles can it travel on 7 gallons?',
 'numeric', 'word_problem',
 '[]',
 '175',
 'Unit rate = 50 / 2 = 25 miles per gallon. Total miles = 25 x 7 = 175 miles.',
 false, true),

-- Challenge
('00000000-0000-0001-0004-000000000011', '00000000-0000-0000-0000-000000000004', 4,
 'In a fruit salad, the ratio of grapes to strawberries to blueberries is 3:2:1. If there are 48 pieces of fruit total, how many grapes are there?',
 'multiple_choice', 'challenge',
 '["8", "16", "24", "32"]',
 '24',
 'Total ratio parts = 3 + 2 + 1 = 6. Each part = 48 / 6 = 8 pieces. Grapes = 3 x 8 = 24.',
 true, true),

-- ============================================================
-- QUESTIONS — Week 5: Percentages
-- ============================================================

-- Easy
('00000000-0000-0001-0005-000000000001', '00000000-0000-0000-0000-000000000005', 5,
 'What percent is equivalent to 1/4?',
 'multiple_choice', 'easy',
 '["10%", "20%", "25%", "40%"]',
 '25%',
 '1 / 4 = 0.25. Multiply by 100: 0.25 x 100 = 25%.',
 false, true),

('00000000-0000-0001-0005-000000000002', '00000000-0000-0000-0000-000000000005', 5,
 'Convert 0.75 to a percent.',
 'multiple_choice', 'easy',
 '["7.5%", "75%", "750%", "0.75%"]',
 '75%',
 'To convert a decimal to a percent, multiply by 100: 0.75 x 100 = 75%.',
 false, true),

('00000000-0000-0001-0005-000000000003', '00000000-0000-0000-0000-000000000005', 5,
 'What is 50% of 80?',
 'numeric', 'easy',
 '[]',
 '40',
 '50% = 0.50. Multiply: 0.50 x 80 = 40.',
 false, true),

('00000000-0000-0001-0005-000000000004', '00000000-0000-0000-0000-000000000005', 5,
 'Which fraction is equal to 40%?',
 'multiple_choice', 'easy',
 '["1/4", "2/5", "3/5", "1/2"]',
 '2/5',
 '40% = 40/100. Simplify by dividing both by 20: 2/5. Check: 2 / 5 = 0.40 = 40%. Correct!',
 false, true),

('00000000-0000-0001-0005-000000000005', '00000000-0000-0000-0000-000000000005', 5,
 'Convert 3/5 to a percent.',
 'numeric', 'easy',
 '[]',
 '60',
 '3 / 5 = 0.6. Multiply by 100: 0.6 x 100 = 60%.',
 false, true),

-- Standard
('00000000-0000-0001-0005-000000000006', '00000000-0000-0000-0000-000000000005', 5,
 'What is 30% of 150?',
 'numeric', 'standard',
 '[]',
 '45',
 '30% = 0.30. Multiply: 0.30 x 150 = 45.',
 false, true),

('00000000-0000-0001-0005-000000000007', '00000000-0000-0000-0000-000000000005', 5,
 '15 is what percent of 60?',
 'multiple_choice', 'standard',
 '["15%", "20%", "25%", "30%"]',
 '25%',
 'Divide the part by the whole: 15 / 60 = 0.25. Multiply by 100: 25%.',
 false, true),

('00000000-0000-0001-0005-000000000008', '00000000-0000-0000-0000-000000000005', 5,
 'A jacket costs $80 and is 25% off. How much is the discount?',
 'multiple_choice', 'standard',
 '["$15", "$20", "$25", "$30"]',
 '$20',
 '25% of $80 = 0.25 x 80 = $20. The discount is $20.',
 false, true),

-- Word Problems
('00000000-0000-0001-0005-000000000009', '00000000-0000-0000-0000-000000000005', 5,
 'Emma got 18 out of 25 questions correct on her math test. What percent did she get right?',
 'numeric', 'word_problem',
 '[]',
 '72',
 '18 / 25 = 0.72. Multiply by 100: 72%. Emma got 72% correct!',
 false, true),

('00000000-0000-0001-0005-000000000010', '00000000-0000-0000-0000-000000000005', 5,
 'A store has 80 items. 60% are on sale. How many items are on sale?',
 'multiple_choice', 'word_problem',
 '["40", "44", "48", "52"]',
 '48',
 '60% of 80 = 0.60 x 80 = 48 items on sale.',
 false, true),

-- Challenge
('00000000-0000-0001-0005-000000000011', '00000000-0000-0000-0000-000000000005', 5,
 'A price increased from $50 to $65. What is the percent increase?',
 'multiple_choice', 'challenge',
 '["13%", "15%", "25%", "30%"]',
 '30%',
 'Increase = $65 - $50 = $15. Percent increase = 15 / 50 x 100 = 0.30 x 100 = 30%.',
 true, true),

-- ============================================================
-- QUESTIONS — Week 6: Integers & Negative Numbers
-- ============================================================

-- Easy
('00000000-0000-0001-0006-000000000001', '00000000-0000-0000-0000-000000000006', 6,
 'Which number is less than -3?',
 'multiple_choice', 'easy',
 '["-1", "0", "-5", "3"]',
 '-5',
 'On a number line, numbers to the left are smaller. -5 is to the left of -3, so -5 < -3.',
 false, true),

('00000000-0000-0001-0006-000000000002', '00000000-0000-0000-0000-000000000006', 6,
 'What is the absolute value of -7?',
 'multiple_choice', 'easy',
 '["-7", "0", "7", "1/7"]',
 '7',
 'Absolute value is the distance from zero, always positive. |-7| = 7.',
 false, true),

('00000000-0000-0001-0006-000000000003', '00000000-0000-0000-0000-000000000006', 6,
 'What is -4 + 9?',
 'numeric', 'easy',
 '[]',
 '5',
 'Start at -4 on the number line, move 9 steps right. 9 - 4 = 5. Since 9 > 4 and 9 is positive, the answer is positive: 5.',
 false, true),

('00000000-0000-0001-0006-000000000004', '00000000-0000-0000-0000-000000000006', 6,
 'Order from least to greatest: -2, 5, -8, 1',
 'multiple_choice', 'easy',
 '["5, 1, -2, -8", "-8, -2, 1, 5", "-2, -8, 1, 5", "1, 5, -2, -8"]',
 '-8, -2, 1, 5',
 'On a number line from left to right (least to greatest): -8 is furthest left, then -2, then 1, then 5.',
 false, true),

('00000000-0000-0001-0006-000000000005', '00000000-0000-0000-0000-000000000006', 6,
 'What is -6 + (-3)?',
 'numeric', 'easy',
 '[]',
 '-9',
 'Same signs (both negative): add the values and keep the negative sign. 6 + 3 = 9, so -6 + (-3) = -9.',
 false, true),

-- Standard
('00000000-0000-0001-0006-000000000006', '00000000-0000-0000-0000-000000000006', 6,
 'What is 4 - 9?',
 'numeric', 'standard',
 '[]',
 '-5',
 'Rewrite as 4 + (-9). Different signs: 9 - 4 = 5. Since 9 > 4 and 9 is negative, the answer is -5.',
 false, true),

('00000000-0000-0001-0006-000000000007', '00000000-0000-0000-0000-000000000006', 6,
 'What is |-15|?',
 'numeric', 'standard',
 '[]',
 '15',
 'Absolute value removes the negative sign and gives the distance from zero: |-15| = 15.',
 false, true),

('00000000-0000-0001-0006-000000000008', '00000000-0000-0000-0000-000000000006', 6,
 'What is -5 + 12?',
 'multiple_choice', 'standard',
 '["-17", "-7", "7", "17"]',
 '7',
 'Different signs: subtract smaller value from larger (12 - 5 = 7). The larger number (12) is positive, so the answer is positive: 7.',
 false, true),

-- Word Problems
('00000000-0000-0001-0006-000000000009', '00000000-0000-0000-0000-000000000006', 6,
 'The temperature was -4 degrees F in the morning and rose 11 degrees by afternoon. What is the afternoon temperature?',
 'multiple_choice', 'word_problem',
 '["-15 degrees F", "-7 degrees F", "7 degrees F", "15 degrees F"]',
 '7 degrees F',
 '-4 + 11 = 7 degrees F. Move 11 steps right from -4 on the number line: -4 + 11 = 7.',
 false, true),

('00000000-0000-0001-0006-000000000010', '00000000-0000-0000-0000-000000000006', 6,
 'A submarine is at -30 meters. It rises 18 meters. What is its new depth?',
 'numeric', 'word_problem',
 '[]',
 '-12',
 '-30 + 18 = -12 meters. The submarine is still below sea level (negative depth), but 18 meters closer to the surface.',
 false, true),

-- Challenge
('00000000-0000-0001-0006-000000000011', '00000000-0000-0000-0000-000000000006', 6,
 'A football team gained 7 yards, lost 12 yards, then gained 5 yards. What is the total change in yards?',
 'multiple_choice', 'challenge',
 '["-5", "0", "5", "24"]',
 '0',
 '7 + (-12) + 5 = 7 - 12 + 5. Step by step: 7 - 12 = -5, then -5 + 5 = 0. Back to where they started!',
 true, true),

-- ============================================================
-- QUESTIONS — Week 7: Expressions & Equations
-- ============================================================

-- Easy
('00000000-0000-0001-0007-000000000001', '00000000-0000-0000-0000-000000000007', 7,
 'What is the value of 3x when x = 5?',
 'multiple_choice', 'easy',
 '["8", "15", "35", "53"]',
 '15',
 'Substitute x = 5: 3x = 3 x 5 = 15.',
 false, true),

('00000000-0000-0001-0007-000000000002', '00000000-0000-0000-0000-000000000007', 7,
 'Which expression means "6 more than a number n"?',
 'multiple_choice', 'easy',
 '["6 x n", "n - 6", "n + 6", "6 / n"]',
 'n + 6',
 '"More than" means addition. "6 more than n" translates to n + 6.',
 false, true),

('00000000-0000-0001-0007-000000000003', '00000000-0000-0000-0000-000000000007', 7,
 'Evaluate 2a + 3 when a = 4.',
 'numeric', 'easy',
 '[]',
 '11',
 'Substitute a = 4: 2(4) + 3 = 8 + 3 = 11.',
 false, true),

('00000000-0000-0001-0007-000000000004', '00000000-0000-0000-0000-000000000007', 7,
 'Solve: x + 7 = 12',
 'multiple_choice', 'easy',
 '["x = 4", "x = 5", "x = 7", "x = 19"]',
 'x = 5',
 'Subtract 7 from both sides: x + 7 - 7 = 12 - 7, so x = 5. Check: 5 + 7 = 12. Correct!',
 false, true),

('00000000-0000-0001-0007-000000000005', '00000000-0000-0000-0000-000000000007', 7,
 'Solve: n - 4 = 9',
 'numeric', 'easy',
 '[]',
 '13',
 'Add 4 to both sides: n - 4 + 4 = 9 + 4, so n = 13. Check: 13 - 4 = 9. Correct!',
 false, true),

-- Standard
('00000000-0000-0001-0007-000000000006', '00000000-0000-0000-0000-000000000007', 7,
 'Solve: 3x = 21',
 'numeric', 'standard',
 '[]',
 '7',
 'Divide both sides by 3: 3x / 3 = 21 / 3, so x = 7. Check: 3 x 7 = 21. Correct!',
 false, true),

('00000000-0000-0001-0007-000000000007', '00000000-0000-0000-0000-000000000007', 7,
 'Evaluate 4m - 2 when m = 3.',
 'multiple_choice', 'standard',
 '["8", "10", "12", "14"]',
 '10',
 'Substitute m = 3: 4(3) - 2 = 12 - 2 = 10.',
 false, true),

('00000000-0000-0001-0007-000000000008', '00000000-0000-0000-0000-000000000007', 7,
 'Solve: y / 4 = 6',
 'numeric', 'standard',
 '[]',
 '24',
 'Multiply both sides by 4: y / 4 x 4 = 6 x 4, so y = 24. Check: 24 / 4 = 6. Correct!',
 false, true),

-- Word Problems
('00000000-0000-0001-0007-000000000009', '00000000-0000-0000-0000-000000000007', 7,
 'Emma has some stickers. She gives away 15 and has 23 left. How many stickers did she start with?',
 'multiple_choice', 'word_problem',
 '["s = 8", "s = 28", "s = 38", "s = 48"]',
 's = 38',
 'Let s = starting stickers. Equation: s - 15 = 23. Add 15 to both sides: s = 23 + 15 = 38.',
 false, true),

('00000000-0000-0001-0007-000000000010', '00000000-0000-0000-0000-000000000007', 7,
 'A number multiplied by 6 equals 54. What is the number?',
 'numeric', 'word_problem',
 '[]',
 '9',
 'Let n be the number. Equation: 6n = 54. Divide both sides by 6: n = 54 / 6 = 9.',
 false, true),

-- Challenge
('00000000-0000-0001-0007-000000000011', '00000000-0000-0000-0000-000000000007', 7,
 'If 2x + 5 = 17, what is the value of x?',
 'multiple_choice', 'challenge',
 '["4", "6", "8", "11"]',
 '6',
 'Step 1: Subtract 5 from both sides: 2x = 17 - 5 = 12. Step 2: Divide both sides by 2: x = 12 / 2 = 6. Check: 2(6) + 5 = 17.',
 true, true),

-- ============================================================
-- QUESTIONS — Week 8: Geometry: Area & Volume
-- ============================================================

-- Easy
('00000000-0000-0001-0008-000000000001', '00000000-0000-0000-0000-000000000008', 8,
 'What is the area of a rectangle with length 8 cm and width 5 cm?',
 'multiple_choice', 'easy',
 '["26 sq cm", "40 sq cm", "80 sq cm", "13 sq cm"]',
 '40 sq cm',
 'Area of a rectangle = length x width = 8 x 5 = 40 sq cm.',
 false, true),

('00000000-0000-0001-0008-000000000002', '00000000-0000-0000-0000-000000000008', 8,
 'What is the area of a triangle with base 10 m and height 6 m?',
 'numeric', 'easy',
 '[]',
 '30',
 'Area of a triangle = 1/2 x base x height = 1/2 x 10 x 6 = 5 x 6 = 30 sq m.',
 false, true),

('00000000-0000-0001-0008-000000000003', '00000000-0000-0000-0000-000000000008', 8,
 'Which formula gives the area of a parallelogram?',
 'multiple_choice', 'easy',
 '["A = l x w x h", "A = b x h", "A = 1/2 x b x h", "A = pi x r x r"]',
 'A = b x h',
 'A parallelogram uses Area = base x height. A triangle uses 1/2 x b x h. Do not confuse them!',
 false, true),

('00000000-0000-0001-0008-000000000004', '00000000-0000-0000-0000-000000000008', 8,
 'A triangle has base 12 ft and height 7 ft. What is its area?',
 'multiple_choice', 'easy',
 '["19 sq ft", "38 sq ft", "42 sq ft", "84 sq ft"]',
 '42 sq ft',
 'Area = 1/2 x base x height = 1/2 x 12 x 7 = 6 x 7 = 42 sq ft.',
 false, true),

('00000000-0000-0001-0008-000000000005', '00000000-0000-0000-0000-000000000008', 8,
 'What is the volume of a rectangular box 4 cm long, 3 cm wide, and 5 cm tall?',
 'numeric', 'easy',
 '[]',
 '60',
 'Volume = length x width x height = 4 x 3 x 5 = 60 cu cm.',
 false, true),

-- Standard
('00000000-0000-0001-0008-000000000006', '00000000-0000-0000-0000-000000000008', 8,
 'A parallelogram has a base of 9 cm and a height of 4 cm. What is its area?',
 'numeric', 'standard',
 '[]',
 '36',
 'Area = base x height = 9 x 4 = 36 sq cm.',
 false, true),

('00000000-0000-0001-0008-000000000007', '00000000-0000-0000-0000-000000000008', 8,
 'What is the volume of a box that is 5 cm long, 4 cm wide, and 3 cm tall?',
 'multiple_choice', 'standard',
 '["12 cu cm", "47 cu cm", "60 cu cm", "120 cu cm"]',
 '60 cu cm',
 'Volume = l x w x h = 5 x 4 x 3 = 60 cu cm.',
 false, true),

('00000000-0000-0001-0008-000000000008', '00000000-0000-0000-0000-000000000008', 8,
 'A triangle has an area of 24 sq cm. If its base is 8 cm, what is its height?',
 'numeric', 'standard',
 '[]',
 '6',
 'Area = 1/2 x b x h → 24 = 1/2 x 8 x h → 24 = 4h → h = 24 / 4 = 6 cm.',
 false, true),

-- Word Problems
('00000000-0000-0001-0008-000000000009', '00000000-0000-0000-0000-000000000008', 8,
 'Emma wants to carpet her rectangular bedroom. The room is 12 feet long and 10 feet wide. How many square feet of carpet does she need?',
 'multiple_choice', 'word_problem',
 '["44 sq ft", "110 sq ft", "120 sq ft", "144 sq ft"]',
 '120 sq ft',
 'Area = length x width = 12 x 10 = 120 sq ft. Emma needs 120 square feet of carpet.',
 false, true),

('00000000-0000-0001-0008-000000000010', '00000000-0000-0000-0000-000000000008', 8,
 'A fish tank is 50 cm long, 25 cm wide, and 30 cm tall. What is its volume in cubic centimeters?',
 'numeric', 'word_problem',
 '[]',
 '37500',
 'Volume = l x w x h = 50 x 25 x 30 = 37,500 cu cm.',
 false, true),

-- Challenge
('00000000-0000-0001-0008-000000000011', '00000000-0000-0000-0000-000000000008', 8,
 'A triangular garden has a base of 14 m and an area of 49 sq m. What is the height?',
 'multiple_choice', 'challenge',
 '["3.5 m", "7 m", "14 m", "98 m"]',
 '7 m',
 'Area = 1/2 x b x h → 49 = 1/2 x 14 x h → 49 = 7h → h = 49 / 7 = 7 m.',
 true, true),

-- ============================================================
-- QUESTIONS — Week 9: Statistics
-- ============================================================

-- Easy
('00000000-0000-0001-0009-000000000001', '00000000-0000-0000-0000-000000000009', 9,
 'What is the mean of {2, 4, 6, 8}?',
 'multiple_choice', 'easy',
 '["4", "5", "6", "8"]',
 '5',
 'Mean = sum / count = (2 + 4 + 6 + 8) / 4 = 20 / 4 = 5.',
 false, true),

('00000000-0000-0001-0009-000000000002', '00000000-0000-0000-0000-000000000009', 9,
 'What is the median of {3, 5, 7, 9, 11}?',
 'multiple_choice', 'easy',
 '["3", "5", "7", "9"]',
 '7',
 'The data is already sorted. With 5 values, the median is the 3rd value (the middle): 7.',
 false, true),

('00000000-0000-0001-0009-000000000003', '00000000-0000-0000-0000-000000000009', 9,
 'What is the mode of {4, 7, 3, 7, 9, 2, 7}?',
 'multiple_choice', 'easy',
 '["3", "4", "7", "9"]',
 '7',
 'The mode is the value that appears most often. 7 appears 3 times — more than any other number.',
 false, true),

('00000000-0000-0001-0009-000000000004', '00000000-0000-0000-0000-000000000009', 9,
 'What is the range of {15, 22, 8, 30, 12}?',
 'numeric', 'easy',
 '[]',
 '22',
 'Range = maximum - minimum = 30 - 8 = 22.',
 false, true),

('00000000-0000-0001-0009-000000000005', '00000000-0000-0000-0000-000000000009', 9,
 'Find the mean of {10, 20, 30}.',
 'numeric', 'easy',
 '[]',
 '20',
 'Mean = sum / count = (10 + 20 + 30) / 3 = 60 / 3 = 20.',
 false, true),

-- Standard
('00000000-0000-0001-0009-000000000006', '00000000-0000-0000-0000-000000000009', 9,
 'Find the median of {2, 9, 4, 7, 1, 6, 3}.',
 'numeric', 'standard',
 '[]',
 '4',
 'First sort: {1, 2, 3, 4, 6, 7, 9}. With 7 values, the median is the 4th value: 4.',
 false, true),

('00000000-0000-0001-0009-000000000007', '00000000-0000-0000-0000-000000000009', 9,
 'Emma''s test scores are 85, 90, 78, 90, and 92. What is the mode?',
 'multiple_choice', 'standard',
 '["85", "87", "90", "92"]',
 '90',
 '90 appears twice; all other scores appear once. The mode is 90.',
 false, true),

('00000000-0000-0001-0009-000000000008', '00000000-0000-0000-0000-000000000009', 9,
 'Find the mean of {13, 17, 15, 21, 14}.',
 'numeric', 'standard',
 '[]',
 '16',
 'Sum = 13 + 17 + 15 + 21 + 14 = 80. Mean = 80 / 5 = 16.',
 false, true),

-- Word Problems
('00000000-0000-0001-0009-000000000009', '00000000-0000-0000-0000-000000000009', 9,
 'A student scored 72, 88, 91, 65, and 84 on five tests. What is the mean score?',
 'multiple_choice', 'word_problem',
 '["78", "80", "82", "84"]',
 '80',
 'Sum = 72 + 88 + 91 + 65 + 84 = 400. Mean = 400 / 5 = 80.',
 false, true),

('00000000-0000-0001-0009-000000000010', '00000000-0000-0000-0000-000000000009', 9,
 'The ages of players on a soccer team are: 11, 12, 11, 13, 11, 12, 14. What is the mode age?',
 'multiple_choice', 'word_problem',
 '["11", "12", "13", "14"]',
 '11',
 '11 appears 3 times, 12 appears 2 times, 13 and 14 each appear once. The mode is 11.',
 false, true),

-- Challenge
('00000000-0000-0001-0009-000000000011', '00000000-0000-0000-0000-000000000009', 9,
 'The mean of five numbers is 12. Four of the numbers are 8, 14, 15, and 11. What is the fifth number?',
 'multiple_choice', 'challenge',
 '["10", "11", "12", "13"]',
 '12',
 'Total sum needed = 12 x 5 = 60. Sum of the four known numbers = 8 + 14 + 15 + 11 = 48. Fifth number = 60 - 48 = 12.',
 true, true),

-- ============================================================
-- QUESTIONS — Week 10: Coordinate Plane
-- ============================================================

-- Easy
('00000000-0000-0001-000a-000000000001', '00000000-0000-0000-0000-00000000000a', 10,
 'What are the coordinates of a point 3 units right and 4 units up from the origin?',
 'multiple_choice', 'easy',
 '["(4, 3)", "(3, 4)", "(-3, 4)", "(3, -4)"]',
 '(3, 4)',
 'Moving right increases x; moving up increases y. From (0,0): 3 right gives x=3, 4 up gives y=4. The point is (3, 4).',
 false, true),

('00000000-0000-0001-000a-000000000002', '00000000-0000-0000-0000-00000000000a', 10,
 'In which quadrant is the point (-2, 5)?',
 'multiple_choice', 'easy',
 '["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"]',
 'Quadrant II',
 'x is negative (left) and y is positive (up). That puts it in Quadrant II (top-left).',
 false, true),

('00000000-0000-0001-000a-000000000003', '00000000-0000-0000-0000-00000000000a', 10,
 'What is the x-coordinate of the point (6, -3)?',
 'multiple_choice', 'easy',
 '["-3", "3", "6", "-6"]',
 '6',
 'In the ordered pair (x, y), the first number is always the x-coordinate. In (6, -3), x = 6.',
 false, true),

('00000000-0000-0001-000a-000000000004', '00000000-0000-0000-0000-00000000000a', 10,
 'Which point lies on the y-axis?',
 'multiple_choice', 'easy',
 '["(2, 0)", "(0, -3)", "(3, 3)", "(-1, 2)"]',
 '(0, -3)',
 'Points on the y-axis have an x-coordinate of 0. Only (0, -3) has x = 0.',
 false, true),

('00000000-0000-0001-000a-000000000005', '00000000-0000-0000-0000-00000000000a', 10,
 'In which quadrant is the point (4, -7)?',
 'multiple_choice', 'easy',
 '["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"]',
 'Quadrant IV',
 'x is positive (right) and y is negative (down). That puts it in Quadrant IV (bottom-right).',
 false, true),

-- Standard
('00000000-0000-0001-000a-000000000006', '00000000-0000-0000-0000-00000000000a', 10,
 'A point starts at (2, 3) and moves 5 units to the right. What is the new x-coordinate?',
 'numeric', 'standard',
 '[]',
 '7',
 'Moving right increases the x-coordinate: 2 + 5 = 7. The new point is (7, 3).',
 false, true),

('00000000-0000-0001-000a-000000000007', '00000000-0000-0000-0000-00000000000a', 10,
 'What is the distance between points (1, 4) and (1, 9)?',
 'multiple_choice', 'standard',
 '["3", "4", "5", "13"]',
 '5',
 'Both points share x = 1, so the distance is measured vertically: |9 - 4| = 5 units.',
 false, true),

('00000000-0000-0001-000a-000000000008', '00000000-0000-0000-0000-00000000000a', 10,
 'Which quadrant has both x and y coordinates negative?',
 'multiple_choice', 'standard',
 '["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"]',
 'Quadrant III',
 'Quadrant I: (+,+). Quadrant II: (-,+). Quadrant III: (-,-). Quadrant IV: (+,-). Both negative means Quadrant III.',
 false, true),

-- Word Problems
('00000000-0000-0001-000a-000000000009', '00000000-0000-0000-0000-00000000000a', 10,
 'On a map, Emma''s house is at (2, 3) and school is at (7, 3). Each unit equals 1 block. How many blocks does Emma walk to school?',
 'multiple_choice', 'word_problem',
 '["3 blocks", "4 blocks", "5 blocks", "10 blocks"]',
 '5 blocks',
 'Both points share y = 3, so measure horizontally: |7 - 2| = 5 blocks.',
 false, true),

('00000000-0000-0001-000a-000000000010', '00000000-0000-0000-0000-00000000000a', 10,
 'A treasure map shows the treasure at (-3, -4). Starting from the origin, which directions do you travel?',
 'multiple_choice', 'word_problem',
 '["Right and up", "Left and up", "Right and down", "Left and down"]',
 'Left and down',
 'Negative x means move left from the origin. Negative y means move down. Go left and down to reach (-3, -4).',
 false, true),

-- Challenge
('00000000-0000-0001-000a-000000000011', '00000000-0000-0000-0000-00000000000a', 10,
 'Points A(1, 2), B(1, 8), and C(5, 8) form three corners of a rectangle. What is the area of the rectangle?',
 'multiple_choice', 'challenge',
 '["10", "20", "24", "48"]',
 '24',
 'Side AB (vertical): |8 - 2| = 6 units. Side BC (horizontal): |5 - 1| = 4 units. Area = 6 x 4 = 24 square units.',
 true, true)

on conflict (id) do nothing;

-- ============================================================
-- QUIZZES (weeks 4–10)
-- ============================================================
insert into quizzes (id, title, description, week_number, topic_id, is_active) values
  ('00000000-0000-0002-0004-000000000001', 'Week 4 Quiz: Ratios & Rates', 'Test your understanding of ratios, equivalent ratios, and unit rates.', 4, '00000000-0000-0000-0000-000000000004', true),
  ('00000000-0000-0002-0005-000000000001', 'Week 5 Quiz: Percentages', 'Test your skills converting between fractions, decimals, and percents.', 5, '00000000-0000-0000-0000-000000000005', true),
  ('00000000-0000-0002-0006-000000000001', 'Week 6 Quiz: Integers & Negative Numbers', 'Test your understanding of integers, absolute value, and adding negatives.', 6, '00000000-0000-0000-0000-000000000006', true),
  ('00000000-0000-0002-0007-000000000001', 'Week 7 Quiz: Expressions & Equations', 'Test your ability to evaluate expressions and solve one-step equations.', 7, '00000000-0000-0000-0000-000000000007', true),
  ('00000000-0000-0002-0008-000000000001', 'Week 8 Quiz: Geometry: Area & Volume', 'Test your skills finding area of shapes and volume of prisms.', 8, '00000000-0000-0000-0000-000000000008', true),
  ('00000000-0000-0002-0009-000000000001', 'Week 9 Quiz: Statistics', 'Test your understanding of mean, median, mode, and range.', 9, '00000000-0000-0000-0000-000000000009', true),
  ('00000000-0000-0002-000a-000000000001', 'Week 10 Quiz: Coordinate Plane', 'Test your ability to plot points and navigate the coordinate plane.', 10, '00000000-0000-0000-0000-00000000000a', true)
on conflict (id) do nothing;

-- ============================================================
-- QUIZ QUESTIONS (6 per week: 2 easy, 2 standard, 1 word_problem, 1 challenge)
-- ============================================================

-- Week 4
insert into quiz_questions (quiz_id, question_id, sort_order) values
  ('00000000-0000-0002-0004-000000000001', '00000000-0000-0001-0004-000000000001', 1),
  ('00000000-0000-0002-0004-000000000001', '00000000-0000-0001-0004-000000000004', 2),
  ('00000000-0000-0002-0004-000000000001', '00000000-0000-0001-0004-000000000006', 3),
  ('00000000-0000-0002-0004-000000000001', '00000000-0000-0001-0004-000000000007', 4),
  ('00000000-0000-0002-0004-000000000001', '00000000-0000-0001-0004-000000000009', 5),
  ('00000000-0000-0002-0004-000000000001', '00000000-0000-0001-0004-000000000011', 6)
on conflict do nothing;

-- Week 5
insert into quiz_questions (quiz_id, question_id, sort_order) values
  ('00000000-0000-0002-0005-000000000001', '00000000-0000-0001-0005-000000000001', 1),
  ('00000000-0000-0002-0005-000000000001', '00000000-0000-0001-0005-000000000004', 2),
  ('00000000-0000-0002-0005-000000000001', '00000000-0000-0001-0005-000000000006', 3),
  ('00000000-0000-0002-0005-000000000001', '00000000-0000-0001-0005-000000000007', 4),
  ('00000000-0000-0002-0005-000000000001', '00000000-0000-0001-0005-000000000009', 5),
  ('00000000-0000-0002-0005-000000000001', '00000000-0000-0001-0005-000000000011', 6)
on conflict do nothing;

-- Week 6
insert into quiz_questions (quiz_id, question_id, sort_order) values
  ('00000000-0000-0002-0006-000000000001', '00000000-0000-0001-0006-000000000001', 1),
  ('00000000-0000-0002-0006-000000000001', '00000000-0000-0001-0006-000000000004', 2),
  ('00000000-0000-0002-0006-000000000001', '00000000-0000-0001-0006-000000000006', 3),
  ('00000000-0000-0002-0006-000000000001', '00000000-0000-0001-0006-000000000007', 4),
  ('00000000-0000-0002-0006-000000000001', '00000000-0000-0001-0006-000000000009', 5),
  ('00000000-0000-0002-0006-000000000001', '00000000-0000-0001-0006-000000000011', 6)
on conflict do nothing;

-- Week 7
insert into quiz_questions (quiz_id, question_id, sort_order) values
  ('00000000-0000-0002-0007-000000000001', '00000000-0000-0001-0007-000000000001', 1),
  ('00000000-0000-0002-0007-000000000001', '00000000-0000-0001-0007-000000000004', 2),
  ('00000000-0000-0002-0007-000000000001', '00000000-0000-0001-0007-000000000006', 3),
  ('00000000-0000-0002-0007-000000000001', '00000000-0000-0001-0007-000000000007', 4),
  ('00000000-0000-0002-0007-000000000001', '00000000-0000-0001-0007-000000000009', 5),
  ('00000000-0000-0002-0007-000000000001', '00000000-0000-0001-0007-000000000011', 6)
on conflict do nothing;

-- Week 8
insert into quiz_questions (quiz_id, question_id, sort_order) values
  ('00000000-0000-0002-0008-000000000001', '00000000-0000-0001-0008-000000000001', 1),
  ('00000000-0000-0002-0008-000000000001', '00000000-0000-0001-0008-000000000004', 2),
  ('00000000-0000-0002-0008-000000000001', '00000000-0000-0001-0008-000000000006', 3),
  ('00000000-0000-0002-0008-000000000001', '00000000-0000-0001-0008-000000000007', 4),
  ('00000000-0000-0002-0008-000000000001', '00000000-0000-0001-0008-000000000009', 5),
  ('00000000-0000-0002-0008-000000000001', '00000000-0000-0001-0008-000000000011', 6)
on conflict do nothing;

-- Week 9
insert into quiz_questions (quiz_id, question_id, sort_order) values
  ('00000000-0000-0002-0009-000000000001', '00000000-0000-0001-0009-000000000001', 1),
  ('00000000-0000-0002-0009-000000000001', '00000000-0000-0001-0009-000000000004', 2),
  ('00000000-0000-0002-0009-000000000001', '00000000-0000-0001-0009-000000000006', 3),
  ('00000000-0000-0002-0009-000000000001', '00000000-0000-0001-0009-000000000007', 4),
  ('00000000-0000-0002-0009-000000000001', '00000000-0000-0001-0009-000000000009', 5),
  ('00000000-0000-0002-0009-000000000001', '00000000-0000-0001-0009-000000000011', 6)
on conflict do nothing;

-- Week 10
insert into quiz_questions (quiz_id, question_id, sort_order) values
  ('00000000-0000-0002-000a-000000000001', '00000000-0000-0001-000a-000000000001', 1),
  ('00000000-0000-0002-000a-000000000001', '00000000-0000-0001-000a-000000000004', 2),
  ('00000000-0000-0002-000a-000000000001', '00000000-0000-0001-000a-000000000006', 3),
  ('00000000-0000-0002-000a-000000000001', '00000000-0000-0001-000a-000000000007', 4),
  ('00000000-0000-0002-000a-000000000001', '00000000-0000-0001-000a-000000000009', 5),
  ('00000000-0000-0002-000a-000000000001', '00000000-0000-0001-000a-000000000011', 6)
on conflict do nothing;

-- ============================================================
-- WEEKLY PROGRESS (weeks 4–10, initial state)
-- ============================================================
insert into weekly_progress (week_number, status, completion_percentage, lesson_completed, practice_completed, quiz_completed) values
  (4,  'not_started', 0, false, false, false),
  (5,  'not_started', 0, false, false, false),
  (6,  'not_started', 0, false, false, false),
  (7,  'not_started', 0, false, false, false),
  (8,  'not_started', 0, false, false, false),
  (9,  'not_started', 0, false, false, false),
  (10, 'not_started', 0, false, false, false)
on conflict (week_number) do nothing;
