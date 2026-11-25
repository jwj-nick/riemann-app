# The Music of the Primes — Story Script (Lv1, English translation draft v0.1)

> Translated from `content/ko/story-draft.md` (the canonical Korean script). Keep the structure identical: `## Stage N · Title`, `[Graphic] …` cue lines in the same order, `**Fact check**` and `**Junior line**` paragraphs (hidden in the app). Regenerate stage files with `python3 scripts/split_story.py`.

## Stage 0 · Prologue — A Door Opened After 167 Years?

**Hook**: Solve it and win a million dollars. For 167 years no one could — and in 2026 a mathematician working with AI announced he had.

In May 2000, in a lecture hall in Paris, the Clay Mathematics Institute announced seven problems: the homework that mathematics of the new millennium would have to finish, the so-called Millennium Problems. Each carries a million-dollar prize, and so far only one has been solved.

The oldest problem on that list is the Riemann hypothesis. In 1859 a German mathematician wrote, in the middle of a paper, a single sentence saying "very probably". For 167 years since, the best mathematicians of every generation have tried, and no one has reached the end.

In the summer and autumn of 2026, the mood changed. AI broke, one after another, records around this problem that had stood still for decades. Then in November an Anthropic mathematician released a proof of the Riemann hypothesis made together with Claude. Computer proof checkers say it is correct; mathematicians say they do not yet fully understand it.

If machines confirm a proof that people do not yet understand, has the door been opened? This app is a journey that lets you judge that for yourself. The starting point is the numbers you learned in primary school: 2, 3 and 5.

[Graphic] A five-second teaser of "the sound of the primes", made from the frequencies of the zeros. "By the end of the journey, you will know what this sound is."

**Next**: First, let's meet what mathematicians call "the atoms of number".

**Junior line**: "Here's a million-dollar problem. No one has solved it for 167 years, and now AI has jumped in too."

**Fact check**: Millennium Problems announced 2000-05-24, Paris. Only the Poincaré conjecture (Perelman, 2003) is solved. 2026 AI results are covered with sources in Stage 9.

## Stage 1 · Primes — The Atoms of Number

**Hook**: What protects your card payments is the same kind of number as a cicada that rises from the ground every 13 years.

In the third century BC, Eratosthenes, head of the Library of Alexandria, measured the circumference of the Earth with the shadow of a stick. He left another invention: a sieve for numbers. Cross out the multiples of 2, then of 3, then of 5, and some numbers survive to the end.

[Graphic] Sieve animation — the reader crosses out the multiples themselves.

The survivors are the primes: numbers divisible by nothing except 1 and themselves. Every natural number is built by multiplying primes, and in exactly one way. As matter has atoms, numbers have primes.

How many primes are there? Euclid, a little before Eratosthenes, already knew. Suppose there are only finitely many, multiply them all and add 1. The result is divisible by none of them. A contradiction — the primes never end.

Nature uses primes too. The periodical cicadas of North America spend 13 or 17 years underground and then emerge all at once. Both numbers are prime, and one hypothesis says this keeps them from lining up with predators that thrive on 2-, 3- or 5-year cycles.

Humans use primes as locks. The RSA cipher, built in 1977 by Rivest, Shamir and Adleman, rests on one fact: multiplying two huge primes is easy, but splitting the product back apart is hard. Much of online payment still runs on this idea.

Finally, a small experiment. After 2, 3, 5, 7 come 11 and 13, then 17, 19 and 23. But spread the table out far enough and something looks odd. In some places two primes sit side by side; in others hundreds of numbers are empty.

[Graphic] "Guess the next prime" — feel how hard it is, no matter how you try.

**Next**: If we can't predict the next prime, should we give up? One boy changed the question instead.

**Junior line**: "Primes are number Lego bricks that can't be split. Every number is built from them."

**Fact check**: Eratosthenes c. 276–194 BC. Euclid, Elements IX.20 (c. 300 BC). Cicada predator avoidance is a hypothesis. RSA 1977. Largest known prime (as of Oct 2024) 2^136279841 − 1.

## Stage 2 · The Prime Number Theorem — Young Gauss's Fifteen Minutes

**Hook**: One prime can't be predicted. A million of them can.

Around 1792, fifteen-year-old Carl Friedrich Gauss was given a book containing tables of logarithms and of primes. Whenever he had a spare fifteen minutes, he counted the primes in another block of a thousand numbers. The habit lasted his whole life; he eventually counted into the millions.

Gauss did not ask where the next prime would be. He asked, "how dense are the primes around here?" And out of the unruly table rose a smooth trend.

Primes get rarer as numbers grow. But they thin out at a surprisingly steady rate. Each time a number gains one more digit, the average gap between primes grows by about 2.3.

[Graphic] Zoom graph — up close a bumpy staircase, from far away a smooth curve.

In France, Legendre proposed a similar formula, and there was some rivalry over priority. But neither could prove it. Seeing something and knowing it is true are different matters.

The guess was proved exactly a century later, in 1896 — by Hadamard in France and de la Vallée Poussin in Belgium, in the same year, independently. They lived to 97 and 95, which started the joke that proving the prime number theorem makes you live long.

Their proofs had one thing in common. Both used a strange function left decades earlier by one mathematician — and "numbers that don't exist".

One question remains. How far can the curve stray from the true count of primes? The size of that error is the real protagonist of this whole app.

**Next**: What were those "numbers that don't exist"? The story goes back three hundred years.

**Junior line**: "You can't guess the next prime, but you can almost guess how many primes there are up to a million. Like weather versus climate."

**Fact check**: Gauss's recollection is in his 1849 letter to Encke. Hadamard (1865–1963), de la Vallée Poussin (1866–1962). Gap ≈ ln N; +ln 10 ≈ 2.3 per digit.

## Stage 3 · Imaginary Numbers — A Ghost Born in a Duel

**Hook**: A number nobody wanted became the language that describes the universe.

In sixteenth-century Italy, mathematics was a duel. Two mathematicians set each other problems, and whoever solved more won honour and a professorship. A secret formula was a weapon.

In 1535 Tartaglia, "the stammerer", won a duel outright with a method for solving cubic equations. Cardano obtained the secret by swearing never to publish it — and then printed it in his 1545 book. The two were enemies for life.

But the formula had a strange hole. Feed it an equation whose answer is plainly 4, and halfway through the calculation a "square root of a negative number" appeared. No number squared gives a negative.

In 1572 Bombelli made a bold choice: compute with these ghosts as if they were ordinary numbers. The ghosts cancelled each other out, and a clean 4 was left.

People still did not believe it. Descartes called such numbers "imaginary", and the name was close to mockery.

The turning point was a picture. Around 1800, Wessel, Argand and then Gauss placed numbers not on a line but on a plane: ordinary numbers across, imaginary numbers up.

[Graphic] Complex plane playground — every press of ×i turns the point by 90°.

Then the ghost's identity was revealed. Multiplying by i means "turn by 90 degrees". Turn twice and you have turned 180 degrees: the reversed direction, −1.

Imaginary numbers were not imaginary at all. They were the numbers of rotation. Keep rotating and you get oscillation, and oscillation is a wave. That is why i sits at the heart of alternating current, radio, and the wave equation of quantum mechanics.

**Next**: We now have two tools: primes, the atoms of number, and i, the number that rotates. Let's meet the man who first put them in the same room.

**Junior line**: "i is the command 'turn left 90 degrees!'. Do it twice and you face backwards — so i × i = −1."

**Fact check**: Tartaglia vs Fiore 1535. Cardano, Ars Magna 1545. Bombelli, L'Algebra 1572, x³ = 15x + 4. Descartes 1637. Wessel 1799, Argand 1806, Gauss 1831.

## Stage 4 · Zeta and Euler — Primes Hidden in an Infinite Sum

**Hook**: We add up all the natural numbers — so why do the primes pop out?

A problem tormented seventeenth-century mathematicians. Add the reciprocals of the squares forever, 1 + 1/4 + 1/9 + 1/16 + …, and what do you get? The Bernoulli family of Basel tried and retreated, and the puzzle became "the Basel problem".

The answer is about 1.6449. But nobody knew what that number really was. In 1735 Leonhard Euler, a twenty-eight-year-old pupil of Bernoulli, presented the answer.

It was π²/6. Add up whole numbers and out comes the number of the circle. European mathematics was stunned, and Euler became a star overnight.

[Graphic] Partial sums animation — each new term brings the sum closer to the line π²/6.

The real treasure came a few years later. Euler looked at the same sum with the square replaced by any power s — what would later be called the zeta function. And he found that this sum is exactly equal to a "product over all primes".

Why? Because every number is a product of primes in exactly one way. The "Lego brick" principle of Stage 1 reappears in the world of the infinite.

This is one of the most important bridges in mathematics. On one side is a smooth, easy-to-compute function; on the other, the unruly primes. Study the function and you are studying the primes.

Late in life Euler lost the sight of both eyes and still dictated paper after paper. He also left the formula e^{iθ} linking imaginary numbers and rotation. But he never thought to feed imaginary numbers into the zeta function.

**Next**: That step was taken a century later, by a shy and frail young German.

**Junior line**: "Add numbers forever and π appears. Flip the sum over and the primes were hiding inside."

**Fact check**: Basel problem posed by Mengoli 1650, popularized by Jakob Bernoulli 1689. Euler's solution 1734–35 (aged 27–28; rigorous proof 1741). Euler product 1737. Euler was Johann Bernoulli's pupil. Nearly blind by about 1771.

## Stage 5 · Riemann 1859 — An Eight-Page Bombshell

**Hook**: The only number theory paper he ever wrote has been drawing the map of mathematics for 167 years.

Bernhard Riemann was the son of a country pastor. He went to university to study theology, lost his heart to mathematics, and learned from the aged Gauss in Göttingen. He was shy and sickly, and is said to have slept badly the night before a lecture.

In 1859, at thirty-two, Riemann became a corresponding member of the Berlin Academy. Custom required a paper in return. Its title was "On the Number of Primes Less Than a Given Magnitude", and it was eight pages long.

What Riemann did was simple. He fed imaginary numbers into Euler's zeta function. The numbers began to rotate, and the function spread out over the plane as a landscape of mountains and valleys.

[Graphic] Zeta landscape — the complex plane painted in colour. The points that look like whirlpools are the heroes of the next stage.

There was a problem. Euler's sum only gives a value on the right-hand side of the plane. Go left and the terms grow without end; the sum blows up.

Riemann bridged the gap with "analytic continuation". A smooth function is fixed everywhere by any one piece of it. It is like seeing one stretch of road and drawing how it must smoothly continue.

The continued zeta gives strange values. At s = −1 its value is −1/12. That is where the internet's "1 + 2 + 3 + … = −1/12" comes from.

Strictly speaking, that sum is not −1/12. The sum diverges to infinity. What is true is that the function that starts from that sum, continued smoothly, points to −1/12 at that spot.

And in the middle of the paper, Riemann leaves one sentence about the points where the function becomes zero: "very probably they all lie on one line; after some fleeting attempts I have put the proof aside for now." That "for now" has lasted until today.

Riemann died of tuberculosis in 1866, aged thirty-nine. It is said that a housekeeper burned part of his papers. But in 1932 the mathematician Siegel, going through the surviving notes, found something astonishing.

Riemann had been computing zeros by hand, with a refined formula he never wrote down in the paper. His "probably" was not a vague hunch.

**Next**: So what do those "points where it becomes zero" have to do with the primes?

**Junior line**: "Riemann spread the number map out into a 2D plane. Then strange holes appeared on the map."

**Fact check**: Riemann 1826-09-17 – 1866-07-20 (39), died in Selasca, Italy. Corresponding member of the Berlin Academy 1859 (age 32). Paper in the Academy's Monatsberichte, Nov 1859. "Very probably" = sehr wahrscheinlich. The burned papers story is tradition. Riemann–Siegel formula 1932. ζ(−1) = −1/12.

## Stage 6 · Zeros as Notes — The Song the Primes Sing

**Hook**: If the irregular march of the primes could be written as a score, what would it sound like?

Shine sunlight through a prism and a rainbow spreads out. One white light was really many coloured waves on top of each other. An orchestra's chord can likewise be split into the notes of each instrument.

Riemann did the same to the primes. He showed that the bumpy staircase that counts primes splits into two parts: Gauss's smooth curve, and a sum of endlessly many waves.

Each of those waves comes from one zero of the zeta function. The first zero sits at height about 14.13, the second at 21.02, the third at 25.01. The height is the pitch — the frequency — of the wave.

[Graphic] Explicit formula slider — add 1, 10, 100, 1000 zeros and the smooth curve turns, step by step, into the prime staircase.

This scene is the heart of the app. One zero only makes the curve wobble a little. But add a few hundred and at some moment the staircase climbs at exactly the right places: at 2, 3, 5, 7, 11 and at prime powers such as 4, 8 and 9.

The positions of the primes were fully recorded in the chord of the zeros. Know the zeros and you know the primes; know the primes and you know the zeros. Two faces of the same information.

[Graphic] The sound of the primes — the zeros turned into real frequencies. The sound from the prologue.

The most famous story about these zeros is Hardy's postcard. The English mathematician had been visiting a colleague in Denmark, and had to cross the North Sea by boat on a stormy day. Before leaving, it is said, he posted a card to his colleague.

"Have proved the Riemann hypothesis." It was a lie, of course. His reasoning: if the boat sank, God would never allow him the glory of dying with a proof left behind.

It was an insurance policy typical of Hardy, who treated God as a personal enemy. The boat arrived safely, and the card became the wittiest insurance certificate in the history of mathematics.

**Next**: Waves have not only a pitch but also a volume. The one sentence Riemann marked "probably" was about exactly this volume.

**Junior line**: "The primes are a piece played by a giant orchestra. Each zero is one instrument."

**Fact check**: Explicit formula stated by Riemann, proved rigorously by von Mangoldt 1895. Zero heights 14.1347, 21.0220, 25.0109. Hardy's postcard to Harald Bohr is a widely told anecdote; date and wording are traditional ("it is said").

## Stage 7 · The Riemann Hypothesis — If Every Note Rang Equally Loud

**Hook**: Ten trillion checks came out right. In mathematics, that alone proves nothing.

The position of a zero has two coordinates. The height sets the pitch; the horizontal position sets how loudly that wave sounds — its volume. The further right, the louder the note grows over time.

It is known that the zeros are trapped in a band of width 1. Riemann's "probably" was a much stronger claim: that all zeros lie exactly in the middle of the band, on a single line at horizontal position ½.

[Graphic] Zeta spiral — as the curve climbs the critical line, a zero lights up each time it passes the origin.

That is the Riemann hypothesis. And its meaning translates into music: every instrument in the orchestra is playing at exactly the same volume.

Then no instrument can stick out. The primes never crowd or vanish wildly in any stretch, and stray from Gauss's curve as little as possible. This is the answer to the question left open in Stage 2: "how far can it stray?"

[Graphic] "A world where the hypothesis fails" — drag one zero off the line and that note keeps growing, and the prime staircase tilts to one side.

In Paris in 1900, David Hilbert presented 23 problems for the new century. The Riemann hypothesis was number 8. Hilbert is said to have remarked that if he woke after sleeping five hundred years, his first question would be whether the Riemann hypothesis had been proved.

When computers arrived, people began checking zeros one by one. More than ten trillion zeros have been found, all on the line. Mathematicians are still not reassured.

The reason is a warning left by Hardy's colleague Littlewood in 1914. At the time everyone believed Gauss's approximation was always larger than the true count of primes, and in every range computed it was. Littlewood proved that the order eventually flips.

The first flip is unimaginably far away. The first upper bound for it, Skewes' number, was so large that even writing out its digits is impossible. Ten trillion pieces of evidence are only a tiny start in the face of infinity.

So mathematicians have advanced step by step on another road. In 1914 Hardy showed that infinitely many zeros lie on the line, and a race began to raise the guaranteed "proportion" of zeros on the line: a third, then two fifths, then a wall that stood for decades.

**Next**: While mathematicians were stuck, a clue appeared somewhere entirely unexpected: an afternoon tea in Princeton.

**Junior line**: "Getting ten trillion test questions right doesn't prove you'll get them all right. Maths has to catch infinitely many at once."

**Fact check**: Hilbert's 23 problems, ICM 1900. "500 years" is traditional (some versions say 1000). Zero verification: Gourdon 2004 first 10¹³ zeros; Platt–Trudgian 2021 up to height 3×10¹². Littlewood 1914, Skewes 1933. Proportions: Selberg 1942, Levinson 1974 (>⅓), Conrey 1989 (>⅖), then about 41%.

## Stage 8 · Quantum — A Coincidence at Teatime

**Hook**: A formula a mathematician found while studying primes, a physicist had already seen inside the atomic nucleus.

Spring 1972, the Institute for Advanced Study in Princeton. The young mathematician Hugh Montgomery was studying the gaps between zeros: how sparse they are, and how close they come. He had just found a formula that measured this precisely.

One afternoon at tea, a colleague introduced him to the Institute's physicist, Freeman Dyson. When Montgomery showed his formula, Dyson is said to have replied at once: "That's exactly the formula for the energy levels of heavy nuclei."

The energy levels inside a heavy nucleus such as uranium are far too complex to compute one by one. So physicists predicted the distribution of their gaps with a statistical model called "random matrices". Montgomery's zero formula had exactly that shape.

What they share is "repulsion". Energy levels avoid sitting too close together, and so did the zeros. Not the disorder of randomly scattered points, but a strangely orderly disorder.

[Graphic] Spacing histogram — zeta zero gaps, nuclear energy level gaps and the random matrix curve laid on top of each other, with fully random points alongside for comparison.

In the 1980s Odlyzko used supercomputers to compute zeros billions of places up and confirmed the match. On the graph, the two worlds overlapped almost indistinguishably.

People had dreamed of this connection earlier. In the early twentieth century, Hilbert and Pólya are said to have had roughly this idea: in quantum mechanics, energy levels always come out as "real" numbers, with no imaginary part, because of the mathematical structure.

What if the heights of the zeros were the energy levels of some quantum system? Then every zero would automatically stand on the line ½. The Riemann hypothesis would become a consequence of a law of physics.

The trouble is that nobody has found such a quantum system. In 1999 the physicists Berry and Keating proposed a simple candidate, the product of position and momentum, and many variations are still studied. Somewhere there may be "an instrument that plays the music of the primes".

**Next**: At the door that mathematicians and physicists have knocked on for decades, a new challenger stands in 2026.

**Junior line**: "The zeros are like passengers on a packed train who don't want to stand too close. Energy inside a nucleus behaves the same way."

**Fact check**: Montgomery–Dyson meeting 1972 (often said to be introduced by Chowla). Dyson's line is paraphrased: use "it is said". Pair correlation 1 − (sin πu/πu)², GUE. Odlyzko 1987. Hilbert–Pólya is oral tradition. Berry–Keating H = xp, 1999. Graphic note: measured nuclear levels (U-238 neutron resonances, JEFF-3.3) follow GOE, not exactly the zeta (GUE) curve; the app shows both.

## Stage 9 · Epilogue — The Machine Opened the Door

**Hook**: In November 2026 a proof of the 167-year-old problem appeared. Machines say "correct"; people are still reading it.

In the summer of 2026, an Anthropic staff member made a rather bold request to an unreleased version of Claude: "Take a real stab at the Riemann hypothesis." No mathematical choices were made for it by people.

At that point Claude did not prove the Riemann hypothesis, and Anthropic said so. Instead, in the race we saw in Stage 7 — the "guaranteed proportion of zeros on the line" — it got past a wall that had stood for a long time, raising that lower bound from 41.6% to 67.2%.

What came next matters. Two of the company's mathematicians studied the argument, and Conrey and Goldston, senior experts in the field, examined it too. And the proof was formalized in Lean, a proof-checking program, and passed machine verification.

Two months later, in October, OpenAI announced a proof of a "quasi-Riemann hypothesis". It does not say the zeros lie on one line, but that they are trapped in a band narrower than width 1. The first version claimed real parts between 1/8 and 7/8 (verified in Lean); a shorter version about a week later claimed 1/12 to 11/12. One mathematician remarked that "the vast majority of consequences of RH already follow from quasi-RH".

[Graphic] The records of 2026 — a gauge for "proportion on the line", a "narrowed band", and finally "the single line".

Mathematicians immediately began taking the paper apart. One called it "the most significant AI-for-math achievement so far". Another pointed out it was written so badly a journal would reject it on sight. Still, short human write-ups began to circulate, and experts largely believe the result is correct. Of Claude's summer result, meanwhile, it was said that there is no visible path from its methods to the real Riemann hypothesis — and Anthropic itself took the same view.

Then on 20 November, Levent Alpöge, a mathematician at Anthropic, released a proof of the Riemann hypothesis itself, with a four-page note. Built over six weeks from early October with an unreleased Claude, it also covers the generalized Riemann hypothesis for Dirichlet L-functions. The proof is not a paper for people to read but about 17 million lines of Lean code.

The next day, the Lean FRO and the Mathlib Initiative jointly announced that they have "full confidence" the proof is correct. Volunteers had rerun the checks dozens of times: that the proof states the Riemann hypothesis correctly, does not quietly redefine it, and passes several independent checkers.

Reactions were mixed. Brian Conrey called it "the biggest thing I think that's ever happened in mathematics"; James Maynard, "a historic milestone" if correct. Andrew Granville criticized the four-page note as unclear and its timing, the day after Anthropic's IPO. Maksym Radziwiłł noted the missing human understanding in the formalization.

In broad strokes, the proof carries techniques used by Weil around 1940 to prove a Riemann hypothesis in the small world of "curves over finite fields" over to the world of the integers. Terence Tao said it "appears to use the full power of modern developments on the Langlands program and arithmetic geometry". Mathematicians have now begun turning 17 million lines into a story people can read; on 25 November a compact version of 76,000 lines appeared.

Here we ask again what a "proof" is. The machine has checked every step. But for mathematicians a proof is not only a stamp of correctness; it is a path that lets people follow *why*. Right now this proof is known to be correct, but why it is correct has not yet been fully written in human language.

So the true meaning of 2026 lies in the method. A mathematician with years of preparation sets the direction, AI fills in an enormous amount of argument, and machines check every line. The Wall Street Journal called it a harbinger of "centaur science", after centaur chess, where a person and a machine play as one team.

And we return to the sound from the prologue. Now you know what it is: the music of the primes, played by countless zeros. And the Riemann hypothesis is one sentence: "every instrument sounds at the same volume."

In November 2026, that sentence was announced as proved by a person and a machine together, and machines have checked the proof. The question left is this: when will we *understand* it?

**Junior line**: "In summer AI beat a mid-boss; in November the final boss was announced beaten. The computer referee says 'pass', but nobody has finished reading the strategy guide yet."

**Fact check**: Checked against originals 2026-11-24/25 (see docs/factcheck-stage9.md): Anthropic (2026-08-10), Scientific American (2026-08-12), Quanta (2026-10-19), Wikipedia 'Alpöge's proof of the Riemann hypothesis' (2026-11-25 revision). Clay Institute recognition unconfirmed.
