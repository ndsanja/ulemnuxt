<script setup lang="ts">
const { data } = useStore()
const { isPreview } = useStateUiBuilder()
</script>

<template>
  <div class="" un-cloak>

    <BuilderTop />
    <BuilderTopActionPreview />

    <div :class="{
      'tw-flex tw-min-h-[calc(100vh-40px)] tw-max-h-[calc(100vh-40px)] tw-w-full': true,
      '!tw-min-h-[calc(100vh-0px)] !tw-max-h-[calc(100vh-0px)]': isPreview
    }">

      <BuilderCanvas>
        <Components v-if="isPreview == true" :data="data" />
        <div v-else class="rootBuilder">
          <ClientOnly fallback-tag="span" fallback="Loading comments...">
            <ComponentsEditable :data="data" un-cloak />
          </ClientOnly>
        </div>
      </BuilderCanvas>
      <BuilderToolsAddElements />
      <BuilderToolsStylesCodeEditor />
    </div>

  </div>
</template>