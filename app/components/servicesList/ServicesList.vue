<script lang="ts" setup>
import type { Service } from '~/constants/services.ts';

const { activeService, services } = defineProps<{
	activeService: Service;
	services: readonly Service[];
}>();

const emit = defineEmits<{ selectService: [number] }>();
</script>

<template>
	<section class="bg-white flex justify-center p-1">
		<ul :class="$style.list" v-if="services.length">
			<li
				:class="[
					$style.item,
					activeService.name === item.name && $style.active,
				]"
				v-for="(item, index) in services"
				:key="item.name"
				@click="emit('selectService', index)"
				v-text="item.name"
			/>
		</ul>
	</section>
</template>

<style lang="css" module>
.list {
	list-style-type: none;
	padding-left: 0;
	display: flex;
	gap: 10px;
}
.item {
	cursor: pointer;
}
.item.active {
	color: red;
}
</style>
