import type { SectionAccent } from '$lib/types';

export const accentColors: Record<SectionAccent, string> = {
	primary: 'var(--accent-primary)',
	warm: 'var(--accent-warm)',
	secondary: 'var(--accent-secondary)',
	none: 'var(--border)'
};
