<script setup>
const { isPreview, setDisplay, display, closePreview } = useStateUiBuilder()
const { displaySize } = useStore()
</script>

<template>
  <div v-if="isPreview"
    class="fixed z-50 top-0 left-1/2 -translate-x-1/2 inline-flex items-center justify-center space-x-4 px-4 text-xs bg-white/30">
    <div @click="closePreview" class="cursor-pointer">close</div>
    <div @click="setDisplay('fit')" :class="{ 'cursor-pointer': true, 'text-base font-bold': display == 'fit' }">FIT
    </div>
    <div @click="setDisplay('xs')" :class="{ 'cursor-pointer': true, 'text-base font-bold': display == 'xs' }">XS</div>
  <div @click="setDisplay('sm')" :class="{ 'cursor-pointer': true, 'text-base font-bold': display == 'sm' }">SM</div>
    <div @click="setDisplay('md')" :class="{ 'cursor-pointer': true, 'text-base font-bold': display == 'md' }">MD</div>
    <div @click="setDisplay('lg')" :class="{ 'cursor-pointer': true, 'text-base font-bold': display == 'lg' }">LG</div>
    <div @click="setDisplay('xl')" :class="{ 'cursor-pointer': true, 'text-base font-bold': display == 'xl' }">XL</div>
    <!-- <div @click="setDisplay('xxl')" :class="{ 'cursor-pointer': true, 'text-base font-bold': display == 'xxl' }">XXL
      </div> -->
    <div class="font-bold">{{ displaySize }}px</div>
  </div>
</template>