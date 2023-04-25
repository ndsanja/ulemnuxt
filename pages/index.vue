<script setup lang="ts">
const { data } = useStore()

</script>

<template>
  <div class="un-cloak">
    <NuxtLink to="/editor">Editor</NuxtLink>
    <Components :data="data" />
  </div>
</template>
