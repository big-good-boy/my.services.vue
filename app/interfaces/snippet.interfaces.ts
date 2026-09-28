export type Language = 'html' | 'css' | 'scss' | 'js' | 'ts' | 'vue' | 'react';
export interface Snippet {
	id: number;
	title: string;
	description: string;
	language: Language[];
	category: string;
	code: string;
	demo: boolean;
}
