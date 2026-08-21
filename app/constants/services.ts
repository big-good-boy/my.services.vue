import ToDo from '~/components/toDo/ToDo.vue';

export const SERVICES = [
	{ name: 'Список задач', component: markRaw(ToDo) },
] as const;

export type Service = (typeof SERVICES)[number];
