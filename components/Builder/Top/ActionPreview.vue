<script setup>
const { isPreview, setDisplay, display, closePreview } = useStateUiBuilder()
const { displaySize } = useStore()
</script>

<template>
  <div v-if="isPreview"
    class="fixed z-50 top-0 left-1/2 -translate-x-1/2 inline-flex items-center justify-center space-x-4 px-4 text-[18px] bg-white/30">
    <div @click="closePreview" class="cursor-pointer">
      <Icon name="heroicons:eye-slash-solid" style="font-size: 24px" />
    </div>
    <div @click="setDisplay('fit')"
      :class="{ 'cursor-pointer text-[20px]': true, 'text-2xl font-bold text-blue-500': display == 'fit' }">
      <Icon name="fluent:auto-fit-width-24-regular" />
    </div>
    <div @click="setDisplay('xs')"
      :class="{ 'cursor-pointer': true, 'text-2xl font-bold text-blue-500': display == 'xs' }">
      <Icon name="heroicons:device-phone-mobile-solid" />
    </div>
    <div @click="setDisplay('sm')"
      :class="{ 'cursor-pointer': true, 'text-2xl font-bold text-blue-500': display == 'sm' }">
      <Icon name="heroicons:device-phone-mobile-solid" class="rotate-90" />
    </div>
    <div @click="setDisplay('md')"
      :class="{ 'cursor-pointer': true, 'text-2xl font-bold text-blue-500': display == 'md' }">
      <Icon name="heroicons:device-tablet-solid" />
    </div>
    <div @click="setDisplay('lg')"
      :class="{ 'cursor-pointer': true, 'text-xl font-bold text-blue-500': display == 'lg' }">
      <Icon name="material-symbols:laptop-mac-outline" />
    </div>
    <div @click="setDisplay('xl')"
      :class="{ 'cursor-pointer': true, 'text-xl font-bold text-blue-500': display == 'xl' }">
      <Icon name="heroicons:computer-desktop-solid" />
    </div>
    <div class="font-bold text-xs">{{ displaySize.toFixed() }}px</div>
  </div>
</template>