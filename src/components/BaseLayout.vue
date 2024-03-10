<template>
  <h1>{{ title }}</h1>
  <div class="layout-content">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<style scoped>
h1 {
  font-weight: 900;
  color: #252733;
  font-size: 1em;
  margin-bottom: 2em;
}
</style>
