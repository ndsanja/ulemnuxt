<script setup lang="ts">
const { data, displaySize } = useStore()
const classes = ref('bg-red-500 h-10 w-10 rounded-lg')

</script>

<template>
  <div class="un-cloak">
    <NuxtLink to="/builder">Builder</NuxtLink>
    <div ref="el">
      <Components :data="data" />
    </div>
    <div :class="classes"></div>
    <input type="text" v-model="classes" />
  </div>
</template>
