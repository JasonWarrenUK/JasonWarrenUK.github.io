import type { TerminalFrame } from '$lib/types';

export const irisSession: TerminalFrame[] = [
	{ text: '$ iris validate --input learners.csv', delay: 800 },
	{ text: '', delay: 200 },
	{ text: '  ╔══════════════════════════════════════════╗', delay: 100 },
	{ text: '  ║           IRIS v5.0.0 — ILR Toolkit      ║', delay: 100 },
	{ text: '  ╚══════════════════════════════════════════╝', delay: 400 },
	{ text: '', delay: 200 },
	{ text: '  Loading learner data... 247 records found', delay: 600 },
	{ text: '', delay: 150 },
	{ text: '  ┌─ Validation ──────────────────────────────┐', delay: 100 },
	{ text: '  │ ✓ ULN format              247/247 passed  │', delay: 300 },
	{ text: '  │ ✓ Date ranges             247/247 passed  │', delay: 250 },
	{ text: '  │ ✓ Funding model           247/247 passed  │', delay: 250 },
	{ text: '  │ ⚠ Postcode lookup         3 warnings      │', delay: 400 },
	{ text: '  │ ✓ Cross-submission check  No conflicts     │', delay: 300 },
	{ text: '  └───────────────────────────────────────────┘', delay: 200 },
	{ text: '', delay: 150 },
	{ text: '  Generating ILR-compliant XML...', delay: 700 },
	{ text: '  Output: ./output/ILR-R14-2024-25.xml', delay: 400 },
	{ text: '', delay: 150 },
	{ text: '  Done. 247 learner records exported.', delay: 0 }
];
