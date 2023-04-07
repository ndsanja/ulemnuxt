<script setup lang="ts">
const { data } = useStore()
const { isPreview } = useStateUiBuilder()
const { id, xs, sm, md, lg, xl, getDataById, hoverId, activeId, currentIndex, currentParentId } = useStore()


const dataClasses = (item: any) => {
  return xl ? `${item?.classes?.xs} ${item?.classes?.sm} ${item?.classes?.md} ${item?.classes?.lg} ${item?.classes?.xl}` : lg ? `${item?.classes?.xs} ${item?.classes?.sm} ${item?.classes?.md} ${item?.classes?.lg}` : md ? `${item?.classes?.xs} ${item?.classes?.sm} ${item?.classes?.md}` : sm ? `${item?.classes?.xs} ${item?.classes?.sm}` : item?.classes?.xs
}

const handleCLick = (e: any, elId: any) => {
  id.value = elId
  activeId.value = elId

}

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
        <Element :data-itemId="data[0].id" :data-item="JSON.stringify(data[0])" :data-index="0"
          @click.self.prevent="handleCLick($event, data[0].id)"
          :class="`${dataClasses(data[0])} ${hoverId == data[0].id && `hover:outline hover:outline-offset-1 hover:outline-2 hover:outline-green-500`} ${activeId == data[0].id && `outline outline-offset-1 outline-2 outline-green-500 relative`}`">
          <ComponentsEditable :data="data[0].children" />
        </Element>

      </BuilderCanvas>
      <BuilderToolsAddElements />
      <BuilderToolsStylesCodeEditor />
    </div>

  </div>
</template>