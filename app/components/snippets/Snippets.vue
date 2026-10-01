<script setup lang="ts">
import { snippets } from '~/services/snippets.ts';
import SnippetCard from './SnippetCard.vue';
import type { Snippet } from '~/interfaces/snippet.interfaces.ts';

type SnippetForm = Omit<Snippet, 'id'>;

const activeCategory = ref<string>('');
const activeSnippetForm = ref<boolean>(false);
const nameInput = useTemplateRef('nameInput');
const form = ref<SnippetForm>({
	title: '',
	description: '',
	language: [],
	category: '',
	code: '',
	demo: false,
});
const editingId = ref<number | null>(null);
const resetForm = ref<boolean>(true);

const categories = computed((): string[] => {
	return [...new Set(snippets.value.map((snippet) => snippet.category))].sort();
});

const filteredSnippets = computed((): Snippet[] => {
	if (activeCategory.value === '') {
		return snippets.value;
	}
	return snippets.value.filter(
		(snippet) => snippet.category === activeCategory.value
	);
});

const filteredCategories = computed((): string[] => {
	const query = form.value.category.trim().toLowerCase();
	if (!query) return categories.value;
	return categories.value.filter((category) =>
		category.toLocaleLowerCase().includes(query)
	);
});

function selectCategory(category: string): void {
	activeCategory.value = category;
}

function resetCategory(): void {
	activeCategory.value = '';
}

async function openSnippetForm(): Promise<void> {
	activeSnippetForm.value = !activeSnippetForm.value;
	if (activeSnippetForm.value) {
		await nextTick();
		nameInput.value?.focus();
	}
}

function openNewSnippetForm(): void {
	if (editingId.value !== null) {
		editingId.value = null;
		resetSnippetForm();
	}
	openSnippetForm();
}

function closeSnippetForm(reset: boolean = true): void {
	resetForm.value = reset;
	activeSnippetForm.value = false;
}

function resetSnippetForm(): void {
	form.value = {
		title: '',
		description: '',
		language: [],
		category: '',
		code: '',
		demo: false,
	};
}

function handleSubmit(): void {
	if (editingId.value !== null) {
		snippets.value = snippets.value.map((s) =>
			s.id === editingId.value ? { ...s, ...form.value } : s
		);
	} else {
		const payload: Snippet = {
			id: snippets.value.length
				? Math.max(...snippets.value.map((s) => s.id)) + 1
				: 1,
			...form.value,
		};
		snippets.value.push(payload);
	}
	closeSnippetForm();
}

function openEditingSnippet(snippet: Snippet): void {
	if (editingId.value !== snippet.id) {
		form.value = {
			title: snippet.title,
			description: snippet.description,
			language: [...snippet.language],
			category: snippet.category,
			code: snippet.code,
			demo: snippet.demo,
		};
	}
	editingId.value = snippet.id;
	openSnippetForm();
}

function deleteSnippet(): void {
	snippets.value = snippets.value.filter((el) => el.id !== editingId.value);
	closeSnippetForm();
}
</script>

<template>
	<SnippetsHeader
		:categories
		:activeCategory
		@open-new-snippet-form="openNewSnippetForm"
		@select-category="selectCategory"
		@reset-category="resetCategory"
	/>

	<Transition
		enter-active-class="transition-opacity duration-300"
		enter-from-class="opacity-0"
		enter-to-class="opacity-100"
		leave-active-class="transition-opacity duration-300"
		leave-from-class="opacity-100"
		leave-to-class="opacity-0"
		@after-leave="
			if (resetForm) {
				editingId = null;
				resetSnippetForm();
			}
		"
	>
		<form
			v-show="activeSnippetForm"
			class="fixed top-0 right-0 w-full h-full bg-black/30 flex flex-col justify-center z-2"
			@click.self="closeSnippetForm(false)"
			@submit.prevent="handleSubmit"
		>
			<div
				class="max-w-xl w-full m-auto flex flex-col p-4 gap-2 bg-blue"
				@keydown.esc="closeSnippetForm()"
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
					@click="deleteSnippet"
				>
					Удалить
				</button>

				<button
					class="bg-orange text-white py-1 px-2 cursor-pointer"
					type="button"
					@click="closeSnippetForm()"
				>
					Отмена
				</button>
			</div>
		</form>
	</Transition>

	<section class="max-w-7xl w-full m-auto flex flex-col gap-2 grow">
		<SnippetCard
			v-for="snippet in filteredSnippets"
			:snippet
			:activeCategory
			:key="snippet.id"
			@select-category="selectCategory(snippet.category)"
			@reset-category="resetCategory"
			@select="openEditingSnippet"
		/>
	</section>

	<footer class="bg-blue py-8">
		<div class="max-w-7xl w-full m-auto">
			<a href="/"><img src="/logo-footer.svg" alt="" /></a>
		</div>
	</footer>
</template>
