<script setup lang="ts">
import IconList from '~/components/icons/IconList.vue';
import IconSearch from '~/components/icons/IconSearch.vue';
import IconPlus from '~/components/icons/IconPlus.vue';

const { activeCategory, categories } = defineProps<{
	activeCategory: string;
	categories: string[];
}>();

const emit = defineEmits<{
	'select-category': [category: string];
	'reset-category': [];
	'open-new-snippet-form': [];
}>();

const activeSearch = ref<boolean>(false);
const inputSearch = useTemplateRef('inputSearch');

const activeMenu = ref<boolean>(false);

async function toggleSearch(): Promise<void> {
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
	emit('select-category', category);
	closeMenu();
}

function resetCategory(): void {
	emit('reset-category');
	closeMenu();
}
</script>

<template>
	<header class="max-w-7xl w-full m-auto flex justify-between pt-5">
		<a href="/"><img src="/logo-header.svg" alt="" /></a>

		<div class="flex gap-4 justify-end items-end">
			<div
				class="bg-blue rounded-sm p-2 flex gap-5 cursor-pointer text-white hover:bg-orange transition duration-300"
				@click="toggleSearch"
			>
				<input
					class="outline-0"
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
				class="bg-blue rounded-sm p-2 cursor-pointer text-white hover:bg-orange transition duration-300"
				@click="emit('open-new-snippet-form')"
			>
				<IconPlus />
			</div>

			<div
				class="bg-blue rounded-sm p-2 cursor-pointer relative z-1 text-white hover:bg-orange transition duration-300"
				@click="activeMenu = !activeMenu"
			>
				<IconList />
			</div>
		</div>

		<nav class="fixed top-0 right-0 w-full h-full bg-white" v-show="activeMenu">
			<ul
				class="max-w-7xl w-full h-full m-auto flex flex-col justify-center items-center"
			>
				<li
					v-for="category in categories"
					:key="category"
					:class="[category === activeCategory ? 'text-orange' : 'text-blue']"
					class="cursor-pointer"
				>
					<span @click="selectCategory(category)">
						{{ category }}
					</span>
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
	</header>
</template>
