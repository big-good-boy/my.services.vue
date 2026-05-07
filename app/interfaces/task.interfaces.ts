export interface Task {
	id: string;
	title: string;
	text: string;
	priority: boolean;
	deadline: string | null;
	done: boolean;
	date: number;
}

export interface TaskFormData {
	title: string;
	text: string;
	priority: boolean;
	deadline: string | null;
}

export interface Translations {
	tasks: {
		one: string;
		few: string;
		many: string;
	};
}
