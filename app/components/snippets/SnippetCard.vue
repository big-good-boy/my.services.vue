<script setup lang="ts">
import IconCodeSlash from '~/components/icons/IconCodeSlash.vue';
import IconPuzzle from '~/components/icons/IconPuzzle.vue';
import IconCopy from '~/components/icons/IconCopy.vue';
import type { Snippet } from '~/interfaces/snippet.interfaces.ts';

const { snippet } = defineProps<{ snippet: Snippet }>();
const activeTab = ref<'demo' | 'code'>('code');
const justCopied = ref<boolean>(false);

async function handleCopy(): Promise<void> {
	await navigator.clipboard.writeText(snippet.code);
	justCopied.value = true;
	setTimeout(() => {
		justCopied.value = false;
	}, 3000);
}
</script>

<template>
	<div class="flex bg-white border border-blue rounded-sm p-5">
		<div class="w-1/2">
			<div>
				<strong>{{ snippet.title }}</strong>
			</div>

			<div>
				{{ snippet.description }}
			</div>

			<ul class="flex wrap gap-2 mt-2">
				<li
					class="bg-blue text-white px-2 pb-[2px] rounded-2xl"
					v-for="language in snippet.language"
					:key="language"
				>
					{{ language }}
				</li>
			</ul>
		</div>

		<div class="w-1/2">
			<header class="flex gap-2 justify-between">
				<ol class="flex gap-2">
					<li
						v-if="snippet.demo"
						:class="[activeTab === 'demo' ? 'text-orange' : 'text-blue']"
						class="cursor-pointer"
						@click="activeTab = 'demo'"
					>
						<IconPuzzle />
					</li>
					<li
						:class="[activeTab === 'code' ? 'text-orange' : 'text-blue']"
						class="cursor-pointer"
						@click="activeTab = 'code'"
					>
						<IconCodeSlash />
					</li>
				</ol>

				<ul>
					<li
						v-if="activeTab === 'code'"
						:class="[justCopied ? 'text-orange' : 'text-blue']"
						class="cursor-pointer transition duration-300 hover:text-orange"
						@click="handleCopy"
					>
						<IconCopy />
					</li>
				</ul>
			</header>

			<ol
				class="border border-orange rounded-sm px-2 py-1 mt-2 overflow-auto scrollbar-thin scrollbar-thumb-blue max-h-80"
			>
				<li name="demo" v-if="activeTab === 'demo'">
					<iframe :srcdoc="snippet.code" sandbox="allow-scripts" />
				</li>
				<li name="code" v-if="activeTab === 'code'">
					<code>
						<pre>{{ snippet.code }}</pre>
					</code>
				</li>
			</ol>
		</div>
	</div>
</template>
