<script lang="ts" setup>
import type { Task } from '~/interfaces/task.interfaces.js';
import ToDoTask from './ToDoTask.vue';
import { TEXT } from '~/constants/toDo.js';

const { tasks } = defineProps<{
	tasks: Task[];
}>();

const emit = defineEmits<{
	remove: [id: string];
	edit: [task: Task];
	'clear-completed': [];
}>();

const visibleCompleted = ref<boolean>(true);
const popup = ref<boolean>(false);
const popupRef = ref<HTMLElement | null>(null);

const numberOfActive = computed((): number => {
	return tasks.filter((task) => !task.done).length;
});
const visibleTasks = computed((): Task[] => {
	return !visibleCompleted.value ? tasks.filter((task) => !task.done) : tasks;
});
const hasCompletedTasks = computed((): boolean => {
	return tasks.some((task) => task.done);
});

function formatActive(value: number): string {
	const { one, few, many } = TEXT.tasks;
	const lastDigit = value % 10;
	const lastTwo = value % 100;
	if (lastTwo >= 11 && lastTwo <= 14) return `${value} ${many}`;
	if (lastDigit === 1) return `${value} ${one}`;
	if (lastDigit >= 2 && lastDigit <= 4) return `${value} ${few}`;
	return `${value} ${many}`;
}

function popupToggle(): void {
	popup.value = !popup.value;
	nextTick(() => {
		popupRef.value?.focus();
	});
}

function removeCompleted(): void {
	emit('clear-completed');
	popupToggle();
}
</script>

<template>
	<header class="flex gap-2 mt-4">
		<span class="flex items-center py-1 text-gray-500" v-if="numberOfActive">
			{{ formatActive(numberOfActive) }}
		</span>

		<label class="flex items-center ml-auto gap-1 py-1 cursor-pointer">
			<span class="relative top-[1px] text-gray-500">
				{{ TEXT.showOnlyActiveLabel }}
			</span>

			<input class="hidden" type="checkbox" v-model="visibleCompleted" />

			<div
				:class="visibleCompleted ? 'text-blue' : 'text-gray-400'"
				class="leading-none w-4 h-4"
			>
				<Icon
					:name="
						visibleCompleted
							? 'cuida:checkbox-checked-outlined'
							: 'cuida:checkbox-unchecked-outlined'
					"
					size="20"
				/>
			</div>
		</label>

		<button
			class="py-1 px-2 border border-red font-sans rounded-sm bg-red text-white cursor-pointer transition duration-300 outline-blue hover:text-red hover:bg-white"
			type="button"
			@click="popupToggle"
			v-if="hasCompletedTasks && visibleCompleted"
		>
			{{ TEXT.delBtn }}
		</button>
	</header>

	<div
		class="fixed z-1 top-0 left-0 flex justify-center items-center w-full h-full bg-mist-950/50"
		v-if="popup"
		@click="popupToggle"
		tabindex="0"
		ref="popupRef"
		@keydown.esc="popupToggle"
	>
		<div class="bg-white rounded-sm p-4" @click.stop>
			<div>{{ TEXT.delAlert }}</div>
			<div class="flex gap-2 justify-center mt-2">
				<button
					class="rounded-sm px-4 py-2 text-white cursor-pointer transition duration-300 border border-red bg-red hover:bg-white hover:text-red"
					@click="removeCompleted"
				>
					{{ TEXT.delYes }}
				</button>
				<button
					class="rounded-sm px-4 py-2 text-white cursor-pointer transition duration-300 border border-green bg-green hover:bg-white hover:text-green"
					@click="popupToggle"
				>
					{{ TEXT.delNo }}
				</button>
			</div>
		</div>
	</div>

	<ul
		class="flex flex-col gap-4 mt-4 mb-0 border-t border-t-blue pt-4"
		v-if="tasks.length"
	>
		<ToDoTask
			v-for="task in visibleTasks"
			:key="task.id"
			:task="task"
			@remove="emit('remove', task.id)"
			@edit="emit('edit', task)"
		/>
	</ul>
</template>
