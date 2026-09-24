<script setup lang="ts">
import { snippets } from '~/services/snippets.ts';
import IconList from '~/components/icons/IconList.vue';
import IconSearch from '~/components/icons/IconSearch.vue';
import SnippetCard from './SnippetCard.vue';
import type { Snippet } from '~/interfaces/snippet.interfaces.ts';

const activeSearch = ref<boolean>(false);
const inputSearch = useTemplateRef('inputSearch');
const activeMenu = ref<boolean>(false);
const activeCategory = ref<string>('');

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

async function toggleSearch() {
	activeSearch.value = !activeSearch.value;
	if (activeSearch.value) {
		await nextTick();
		inputSearch.value?.focus();
	}
}

function closeMenu(): void {
	activeMenu.value = false;
}

function selectCategory(category: string): void {
	activeCategory.value = category;
	closeMenu();
}

function resetCategory(): void {
	activeCategory.value = '';
	closeMenu();
}
</script>

<template>
	<header class="max-w-7xl w-full m-auto flex justify-between pt-5">
		<a href="/"><img src="/logo-header.svg" alt="" /></a>

		<div class="flex gap-4 justify-end items-end">
			<div
				class="bg-blue rounded-sm p-2 flex gap-5 cursor-pointer"
				@click="toggleSearch"
			>
				<input
					class="text-white outline-0"
					v-show="activeSearch"
					@click.stop
					type="search"
					name="search"
					placeholder="Название компонента"
					ref="inputSearch"
				/>
				<IconSearch />
			</div>

			<div
				class="bg-blue rounded-sm p-2 cursor-pointer relative z-1"
				@click="activeMenu = !activeMenu"
			>
				<IconList />
			</div>
		</div>
	</header>

	<nav class="absolute w-full h-full bg-white" v-show="activeMenu">
		<ul
			class="max-w-7xl w-full h-full m-auto flex flex-col justify-center items-center"
		>
			<li
				v-for="category in categories"
				:key="category"
				:class="[category === activeCategory ? 'text-orange' : 'text-blue']"
				class="cursor-pointer"
			>
				<span @click="selectCategory(category)">{{ category }}</span>
			</li>
			<li
				v-if="activeCategory !== ''"
				@click="resetCategory"
				class="cursor-pointer text-blue"
			>
				<span>Сбросить</span>
			</li>
		</ul>
	</nav>

	<section class="max-w-7xl w-full m-auto flex flex-col gap-2 grow">
		<SnippetCard
			v-for="snippet in filteredSnippets"
			:snippet
			:activeCategory
			:key="snippet.id"
			@select-category="selectCategory(snippet.category)"
			@reset-category="resetCategory"
		/>
	</section>

	<footer class="bg-blue py-8">
		<div class="max-w-7xl w-full m-auto">
			<a href="/"><img src="/logo-footer.svg" alt="" /></a>
		</div>
	</footer>
</template>
