import type { LANGUAGES } from '~/constants/snippets';

export type Language = (typeof LANGUAGES)[number];
export interface Snippet {
	id: number;
	title: string;
	description: string;
	language: Language[];
	category: string;
	code: string;
	demo: boolean;
}

export type SnippetForm = Omit<Snippet, 'id'>;
