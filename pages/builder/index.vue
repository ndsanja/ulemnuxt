<script setup>
const { data } = useStore()
const { isPreview } = useStateUiBuilder()

</script>

<template>
  <div class="" un-cloak>

    <BuilderTop />
    <BuilderTopActionPreview />

    <div :class="{
      'flex min-h-[calc(100vh-40px)] max-h-[calc(100vh-40px)] w-full': true,
      '!min-h-[calc(100vh-0px)] !max-h-[calc(100vh-0px)]': isPreview
    }">


      <BuilderCanvas>
        <ComponentsTest :data="data" />
      </BuilderCanvas>
      <BuilderToolsAddElements />
      <BuilderToolsStylesCodeEditor />
    </div>

  </div>
</template>