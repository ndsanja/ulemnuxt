<script setup lang="ts">
const { data } = useStore()

</script>

<template>
  <div class="un-cloak">
    <NuxtLink to="/builder">Builder</NuxtLink>
    <Components :data="data" />
  </div>
</template>
