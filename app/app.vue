<script lang="ts" setup>
import { SERVICES, type Service } from '~/constants/services.ts';

const activeService = ref<Service>(SERVICES[0]);

function selectService(el: number): void {
	activeService.value = SERVICES[el] ?? SERVICES[0];
}
</script>

<template>
	<main
		:class="activeService.name === 'Список задач' && 'bg-blue'"
		class="flex flex-col min-h-[100vh]"
	>
		<ServicesList
			:services="SERVICES"
			:activeService
			@selectService="selectService"
			v-if="SERVICES.length > 1"
		/>
		<KeepAlive>
			<component :is="activeService?.component" />
		</KeepAlive>
	</main>
</template>
