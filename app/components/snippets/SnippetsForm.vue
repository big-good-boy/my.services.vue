<script setup lang="ts">
import type { Snippet } from '~/interfaces/snippet.interfaces.ts';

type SnippetForm = Omit<Snippet, 'id'>;

const { categories, form, editingId, activeSnippetForm } = defineProps<{
	categories: string[];
	form: SnippetForm;
	editingId: number | null;
	activeSnippetForm: boolean;
}>();

defineEmits<{
	'handle-submit': [];
	'close-snippet-form': [reset?: boolean];
	'delete-snippet': [];
}>();

const filteredCategories = computed((): string[] => {
	const query = form.category.trim().toLowerCase();
	if (!query) return categories;
	return categories.filter((category) =>
		category.toLocaleLowerCase().includes(query)
	);
});
</script>

<template>
	<form
		v-show="activeSnippetForm"
		class="fixed top-0 right-0 w-full h-full bg-black/30 flex flex-col justify-center z-2"
		@click.self="$emit('close-snippet-form', false)"
		@submit.prevent="$emit('handle-submit')"
	>
		<div
			class="max-w-xl w-full m-auto flex flex-col p-4 gap-2 bg-blue"
			@keydown.esc="$emit('close-snippet-form')"
		>
			<input
				class="bg-white py-1 px-2 placeholder:text-black"
				type="text"
				name="title"
				placeholder="Название"
				required
				ref="nameInput"
				v-model="form.title"
			/>

			<textarea
				class="bg-white py-1 px-2 resize-none placeholder:text-black"
				rows="3"
				name="description"
				placeholder="Описание"
				required
				v-model="form.description"
			></textarea>

			<label class="bg-white py-1 px-2 flex justify-between">
				<span>Языки</span>
				<select
					name="language"
					multiple
					size="1"
					required
					v-model="form.language"
				>
					<option value="html">html</option>
					<option value="css">css</option>
					<option value="scss">scss</option>
					<option value="js">js</option>
					<option value="ts">ts</option>
					<option value="vue">vue</option>
					<option value="react">react</option>
				</select>
			</label>

			<label class="relative group">
				<input
					class="bg-white py-1 px-2 placeholder:text-black w-full"
					type="text"
					name="category"
					placeholder="Категория"
					required
					v-model="form.category"
				/>

				<ul
					class="hidden group-focus-within:flex absolute right-1 top-0 bottom-0 items-center gap-1"
				>
					<li
						class="bg-green text-white px-2 cursor-pointer rounded-2xl"
						v-for="category in filteredCategories"
						:key="category"
						@click="form.category = category"
						@mousedown.prevent
					>
						{{ category }}
					</li>
				</ul>
			</label>

			<textarea
				class="bg-white py-1 px-2 resize-none placeholder:text-black"
				rows="7"
				name="code"
				placeholder="Код сниппета"
				v-model="form.code"
			></textarea>

			<label class="bg-white py-1 px-2 flex justify-between cursor-pointer">
				Демонстрация
				<input type="checkbox" name="demo" v-model="form.demo" />
			</label>

			<button class="bg-green text-white py-1 px-2 cursor-pointer">
				{{ editingId ? 'Изменить' : 'Добавить' }}
			</button>

			<button
				v-if="editingId"
				class="bg-red text-white py-1 px-2 cursor-pointer"
				type="button"
				@click="$emit('delete-snippet')"
			>
				Удалить
			</button>

			<button
				class="bg-orange text-white py-1 px-2 cursor-pointer"
				type="button"
				@click="$emit('close-snippet-form')"
			>
				Отмена
			</button>
		</div>
	</form>
</template>
