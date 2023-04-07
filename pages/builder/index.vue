<script setup>
const { data } = useStore()
const { isPreview } = useStateUiBuilder()
const { id, xs, sm, md, lg, xl, getDataById, hoverId, activeId, currentIndex, currentParentId } = useStore()


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
        <Components v-if="isPreview == true" :data="data" />

        <ComponentsEditable :data="data" />

      </BuilderCanvas>
      <BuilderToolsAddElements />
      <BuilderToolsStylesCodeEditor />
    </div>

  </div>
</template>