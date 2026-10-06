import type { Snippet } from '~/interfaces/snippet.interfaces.ts';

export const TEXT = {
	formTitle: 'Название',
	formDescription: 'Описание',
	formLanguage: 'Языки',
	formCategory: 'Категория',
	formCode: 'Код сниппета',
	formDemo: 'Демонстрация',
	formBtnAdd: 'Добавить',
	formBtnEdit: 'Изменить',
	formBtnDel: 'Удалить',
	formBtnCancel: 'Отмена',
} as const;

export const LANGUAGES = [
	'html',
	'css',
	'scss',
	'js',
	'ts',
	'vue',
	'react',
] as const;

export const DEMO_SNIPPETS: Snippet[] = [
	{
		id: 0,
		title: 'Привет!',
		description: 'Скорее добавь свой первый сниппет!',
		language: [...LANGUAGES],
		category: 'Приветствие',
		code: 'Тут будет твой код',
		demo: false,
	},
];
