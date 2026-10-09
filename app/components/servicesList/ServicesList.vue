<script lang="ts" setup>
import type { Service } from '~/constants/services.ts';

const { activeService, services } = defineProps<{
	activeService: Service;
	services: readonly Service[];
}>();

const emit = defineEmits<{ selectService: [number] }>();
</script>

<template>
	<section class="bg-white flex justify-center p-1 border-b border-b-blue">
		<ul v-if="services.length" class="flex gap-3">
			<li
				:class="activeService.name === item.name ? 'text-red' : 'text-blue'"
				class="cursor-pointer"
				v-for="(item, index) in services"
				:key="item.name"
				@click="emit('selectService', index)"
				v-text="item.name"
			/>
		</ul>
	</section>
</template>
