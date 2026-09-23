<script setup lang="ts">
import IconCodeSlash from '~/components/icons/IconCodeSlash.vue';
import IconPuzzle from '~/components/icons/IconPuzzle.vue';
import type { Snippet } from '~/interfaces/snippet.interfaces.ts';

const { snippet } = defineProps<{ snippet: Snippet }>();
const activeTab = ref<'demo' | 'code'>('code');
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
			<ol class="flex gap-2">
				<li
					class="cursor-pointer"
					v-if="snippet.demo"
					@click="activeTab = 'demo'"
				>
					<IconPuzzle
						:class="[activeTab === 'demo' ? 'text-orange' : 'text-blue']"
					/>
				</li>
				<li class="cursor-pointer" @click="activeTab = 'code'">
					<IconCodeSlash
						:class="[activeTab === 'code' ? 'text-orange' : 'text-blue']"
					/>
				</li>
			</ol>

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
