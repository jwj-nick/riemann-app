# Epilogue — The Machine Opened the Door

<!-- 자동 생성: scripts/split_story.py ← content/en/story-draft.md Stage 9. 직접 고치지 말고 원고를 고친 뒤 다시 생성. -->

**Hook**: In November 2026 a proof of the 167-year-old problem appeared. Machines say "correct"; people are still reading it.

In the summer of 2026, an Anthropic staff member made a rather bold request to an unreleased version of Claude: "Take a real stab at the Riemann hypothesis." No mathematical choices were made for it by people.

At that point Claude did not prove the Riemann hypothesis, and Anthropic said so. Instead, in the race we saw in Stage 7 — the "guaranteed proportion of zeros on the line" — it got past a wall that had stood for a long time, raising that lower bound from 41.6% to 67.2%.

What came next matters. Two of the company's mathematicians studied the argument, and Conrey and Goldston, senior experts in the field, examined it too. And the proof was formalized in Lean, a proof-checking program, and passed machine verification.

Two months later, in October, OpenAI announced a proof of a "quasi-Riemann hypothesis". It does not say the zeros lie on one line, but that they are trapped in a band narrower than width 1. The first version claimed real parts between 1/8 and 7/8 (verified in Lean); a shorter version about a week later claimed 1/12 to 11/12. One mathematician remarked that "the vast majority of consequences of RH already follow from quasi-RH".

[graphic:ai-results] The records of 2026 — a gauge for "proportion on the line", a "narrowed band", and finally "the single line".

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
