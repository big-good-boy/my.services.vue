<script setup lang="ts">
import { snippets } from '~/services/snippets.ts';
import IconList from '~/components/icons/IconList.vue';
import IconSearch from '~/components/icons/IconSearch.vue';
import SnippetCard from './SnippetCard.vue';

const activeSearch = ref<boolean>(false);
const inputSearch = useTemplateRef('inputSearch');
const activeMenu = ref<boolean>(false);

async function toggleSearch() {
	activeSearch.value = !activeSearch.value;
	if (activeSearch.value) {
		await nextTick();
		inputSearch.value?.focus();
	}
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
		<ul class="max-w-7xl w-full h-full m-auto flex justify-center items-center">
			<li><span>Список категорий</span></li>
		</ul>
	</nav>

	<section class="max-w-7xl w-full m-auto flex flex-col gap-2 grow">
		<SnippetCard v-for="snippet in snippets" :snippet :key="snippet.id" />
	</section>

	<footer class="bg-blue py-8">
		<div class="max-w-7xl w-full m-auto">
			<a href="/"><img src="/logo-footer.svg" alt="" /></a>
		</div>
	</footer>
</template>
