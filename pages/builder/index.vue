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
        <Element v-else :data-elId="data[0].id"
          :class="xl ? `${data[0].classes.xs} ${data[0].classes.sm} ${data[0].classes.md} ${data[0].classes.lg} ${data[0].classes.xl}` : lg ? `${data[0].classes.xs} ${data[0].classes.sm} ${data[0].classes.md} ${data[0].classes.lg}` : md ? `${data[0].classes.xs} ${data[0].classes.sm} ${data[0].classes.md}` : sm ? `${data[0].classes.xs} ${data[0].classes.sm}` : data[0].classes.xs">
          <ComponentsEditable :data="data[0].children" />
        </Element>
      </BuilderCanvas>
      <BuilderToolsAddElements />
      <BuilderToolsStylesCodeEditor />
    </div>

  </div>
</template>