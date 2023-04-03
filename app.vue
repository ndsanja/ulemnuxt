<script setup>
import '@unocss/reset/tailwind.css'

onMounted(() => {
  window.__unocss = {
    // rules: [
    //   // custom rules...
    // ],
    // presets: [
    //   // custom presets...

    // ],
    theme: {
      // ...
      breakpoints: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
        xxl: 1400,
      },
    }

    // ...
  }
})
</script>

<template>
  <div class="" un-cloak>

    <Head>
      <Style type="text/css" children="[un-cloak] {display: none;/}" />
    </Head>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>


<style></style>
