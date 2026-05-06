export interface Task {
	id: string;
	title: string;
	text: string;
	priority: boolean;
	done: boolean;
	date: number;
}

export interface TaskFormData {
	title: string;
	text: string;
	priority: boolean;
}
