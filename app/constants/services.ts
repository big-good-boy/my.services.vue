import Snippets from '~/components/snippets/Snippets.vue';
import ToDo from '~/components/toDo/ToDo.vue';

export const SERVICES = [
	{ name: 'Список задач', component: markRaw(ToDo) },
	{ name: 'Сниппеты', component: markRaw(Snippets) },
] as const;

export type Service = (typeof SERVICES)[number];
