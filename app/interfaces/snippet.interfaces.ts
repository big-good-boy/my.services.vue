export interface Snippet {
	id: number;
	title: string;
	description: string;
	language: ('html' | 'css' | 'scss' | 'js' | 'ts' | 'vue' | 'react')[];
	category: string;
	code: string;
	demo: boolean;
}
