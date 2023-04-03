<script setup lang="ts">

enum Element {
  Div = "div"
}

const el = ref('div')
</script>
<template>
  <ElementDiv v-if="el = Element.Div">
    <slot />
  </ElementDiv>
  <ElementDiv v-else>
    <slot />
  </ElementDiv>
</template>