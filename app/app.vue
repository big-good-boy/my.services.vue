<script lang="ts" setup>
const route = useRoute();
</script>

<template>
	<main
		:class="route.path === '/todos' && 'bg-blue'"
		class="flex flex-col min-h-[100vh]"
	>
		<ServicesList />
		<NuxtPage keepalive />
	</main>
</template>
