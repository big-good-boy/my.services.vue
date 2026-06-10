<template>
	<header :class="$style.info">
		<span :class="$style.active" v-if="numberOfActive">
			{{ formatActive(numberOfActive) }}
		</span>

		<label :class="$style.hidden">
			<span :class="$style.hiddenLabel">
				{{ TEXT.showOnlyActiveLabel }}
			</span>

			<input
				:class="$style.hiddenCheckbox"
				type="checkbox"
				v-model="visibleCompleted"
			/>

			<div
				:class="[
					$style.hiddenIcon,
					visibleCompleted && $style.hiddenIconChecked,
				]"
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
			:class="$style.clear"
			type="button"
			@click="popupToggle"
			v-if="hasCompletedTasks && visibleCompleted"
		>
			Очистить
		</button>
	</header>

	<div
		:class="$style.popup"
		v-if="popup"
		@click="popupToggle"
		tabindex="0"
		ref="popupRef"
		@keydown.esc="popupToggle"
	>
		<div :class="$style.popupInner" @click.stop>
			<div :class="$style.popupTitle">Удалить выполненные задачи?</div>
			<div :class="$style.popupBtns">
				<button
					:class="[$style.popupBtn, $style.popupBtnYes]"
					@click="removeCompleted"
				>
					Да
				</button>
				<button
					:class="[$style.popupBtn, $style.popupBtnNo]"
					@click="popupToggle"
				>
					Нет
				</button>
			</div>
		</div>
	</div>

	<ul :class="$style.list" v-if="tasks.length">
		<ToDoTask
			v-for="task in visibleTasks"
			:key="task.id"
			:task="task"
			@remove="$emit('remove', task.id)"
			@edit="$emit('edit', task)"
		/>
	</ul>
</template>

<script lang="ts">
import type { Task } from '~/interfaces/task.interfaces.js';
import ToDoTask from './ToDoTask.vue';
import { TEXT } from '~/constants/toDo.js';

export default defineComponent({
	name: 'ToDoList',

	components: {
		ToDoTask,
	},

	props: {
		tasks: {
			type: Array as () => Task[],
			required: true,
		},
	},

	emits: ['remove', 'edit', 'clear-completed'],

	data() {
		return {
			TEXT,
			visibleCompleted: true as boolean,
			popup: false as boolean,
		};
	},

	computed: {
		numberOfActive(): number {
			return this.tasks.filter((task) => !task.done).length;
		},

		visibleTasks(): Task[] {
			return !this.visibleCompleted
				? this.tasks.filter((task) => !task.done)
				: this.tasks;
		},

		hasCompletedTasks(): boolean {
			return this.tasks.some((task) => task.done);
		},
	},

	methods: {
		formatActive(value: number): string {
			const { one, few, many } = this.TEXT.tasks;
			const lastDigit = value % 10;
			const lastTwo = value % 100;
			if (lastTwo >= 11 && lastTwo <= 14) return `${value} ${many}`;
			if (lastDigit === 1) return `${value} ${one}`;
			if (lastDigit >= 2 && lastDigit <= 4) return `${value} ${few}`;
			return `${value} ${many}`;
		},

		popupToggle(): void {
			this.popup = !this.popup;
			this.$nextTick(() => {
				(this.$refs.popupRef as HTMLElement)?.focus();
			});
		},

		removeCompleted(): void {
			this.$emit('clear-completed');
			this.popupToggle();
		},
	},
});
</script>

<style lang="css" module>
.list {
	display: flex;
	flex-direction: column;
	gap: 16px;
	margin-bottom: 0;
	border-top: 1px solid var(--blue);
	padding-top: 16px;
	padding-left: 0;
}
.info {
	display: flex;
	gap: 8px;
	margin-top: 16px;
	color: var(--gray);
}
.active {
	display: flex;
	align-items: center;
	margin-right: auto;
	padding: 4px 0;
}
.hidden {
	display: flex;
	align-items: center;
	gap: 4px;
	padding: 4px 0;
	cursor: pointer;
}
.hiddenIcon {
	line-height: 0;
	color: var(--blue);
	width: 20px;
	height: 20px;
}
.hiddenIconChecked {
}
.hiddenCheckbox {
	display: none;
}
.hiddenLabel {
	position: relative;
	top: 1px;
	color: var(--gray);
}
.clear {
	padding: 4px 8px;
	border: 1px solid var(--red);
	font-family: sans-serif;
	font-size: 16px;
	border-radius: 4px;
	background-color: var(--red);
	color: white;
	cursor: pointer;
	transition: var(--transition);
	outline-color: var(--blue);
}
.clear:hover {
	color: var(--red);
	background-color: white;
}
.popup {
	z-index: 1;
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.25);
}
.popupInner {
	background-color: #fff;
	border-radius: 8px;
	padding: 16px;
}
.popupTitle {
}
.popupBtns {
	display: flex;
	gap: 8px;
	justify-content: center;
	margin-top: 8px;
}
.popupBtn {
	border-width: 1px;
	border-style: solid;
	border-radius: 8px;
	padding: 8px 16px;
	color: white;
	cursor: pointer;
	transition: var(--transition);
}
.popupBtn:hover {
	background-color: white;
}
.popupBtnYes {
	border-color: var(--red);
	background-color: var(--red);
}
.popupBtnYes:hover {
	color: var(--red);
}
.popupBtnNo {
	border-color: var(--green);
	background-color: var(--green);
}
.popupBtnNo:hover {
	color: var(--green);
}
</style>
