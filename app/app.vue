<script lang="ts" setup>
import { SERVICES, type Service } from '~/constants/services.js';

const activeService = ref<Service>(SERVICES[0]);

function selectService(el: number): void {
	activeService.value = SERVICES[el] ?? SERVICES[0];
}
</script>

<template>
	<main class="main">
		<ServicesList
			:services="SERVICES"
			:activeService
			@activeService="selectService"
			v-if="SERVICES.length > 1"
		/>
		<component :is="activeService?.component" />
	</main>
</template>
