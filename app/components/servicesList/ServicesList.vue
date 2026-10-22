<script lang="ts" setup>
import { SERVICES } from '~/constants/services.ts';
</script>

<template>
	<section
		class="bg-white flex justify-center p-1 border-b border-b-blue"
		v-if="SERVICES.length > 1"
	>
		<nav v-if="SERVICES.length" class="flex gap-3">
			<NuxtLink
				v-for="item in SERVICES"
				:key="item.name"
				:to="item.path"
				class="text-blue aria-[current=page]:text-red"
			>
				{{ item.name }}
			</NuxtLink>
		</nav>
	</section>
</template>
