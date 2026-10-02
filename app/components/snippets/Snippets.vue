<script setup lang="ts">
import { snippets } from '~/services/snippets.ts';
import type { Snippet } from '~/interfaces/snippet.interfaces.ts';

type SnippetForm = Omit<Snippet, 'id'>;

const form = ref<SnippetForm>({
	title: '',
	description: '',
	language: [],
	category: '',
	code: '',
	demo: false,
});
const editingId = ref<number | null>(null);
const activeCategory = ref<string>('');
const clearForm = ref<boolean>(true);
const activeForm = ref<boolean>(false);
const formRef = useTemplateRef('formRef');

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

function selectCategory(category: string): void {
	activeCategory.value = category;
}

function resetCategory(): void {
	activeCategory.value = '';
}

async function openForm(): Promise<void> {
	activeForm.value = !activeForm.value;
	if (activeForm.value) {
		await nextTick();
		formRef.value?.focus();
	}
}

function closeForm(reset: boolean = true): void {
	clearForm.value = reset;
	activeForm.value = false;
}

function resetForm(): void {
	form.value = {
		title: '',
		description: '',
		language: [],
		category: '',
		code: '',
		demo: false,
	};
}

function activeAddSnippet(): void {
	if (editingId.value !== null) {
		editingId.value = null;
		resetForm();
	}
	openForm();
}

function editSnippet(snippet: Snippet): void {
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
	openForm();
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
	closeForm();
}

function deleteSnippet(): void {
	snippets.value = snippets.value.filter((el) => el.id !== editingId.value);
	closeForm();
}
</script>

<template>
	<SnippetsHeader
		:categories
		:activeCategory
		@active-add-snippet="activeAddSnippet"
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
			if (clearForm) {
				editingId = null;
				resetForm();
			}
		"
	>
		<SnippetsForm
			ref="formRef"
			v-model="form"
			:categories
			:editingId
			:activeForm="activeForm"
			@close-form="closeForm"
			@delete-snippet="deleteSnippet"
			@submit="handleSubmit"
		/>
	</Transition>

	<section class="max-w-7xl w-full m-auto flex flex-col gap-2 grow">
		<SnippetsCard
			v-for="snippet in filteredSnippets"
			:snippet
			:activeCategory
			:key="snippet.id"
			@select-category="selectCategory(snippet.category)"
			@reset-category="resetCategory"
			@edit-snippet="editSnippet"
		/>
	</section>

	<footer class="bg-blue py-8">
		<div class="max-w-7xl w-full m-auto">
			<a href="/"><img src="/logo-footer.svg" alt="" /></a>
		</div>
	</footer>
</template>
