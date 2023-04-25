<script setup lang="ts">

const { dataClasses } = useStore()
const { editorIsDragStart, editorIsDragging, editorIsDragEnd, editorIsDragOver, useEditorDragStart, useEditorDragMove, useEditorDragEnd, editorItemHoverId, editorItemSelectedId, editorOrderedSection, editorGettDataById } = useEditor()

interface Props {
  data: any
}

const props = defineProps<Props>()

const handleMouseOver = (e: any, id: any) => {
  editorItemHoverId.value = id
  let parent = e.target.parentNode.attributes?.['data-item-id']?.value

  document
    .querySelector(`[data-item-id="${parent}"]`)
    ?.classList.add('selected');
}

</script>


<template>
  <ElementEditable v-for="(item, index) in  props.data " :key="item.id" :dataItemProps="item" :id="item.id"
    :data-el-kind="item.elKind" :data-item-id="item.id" @mouseover.self="handleMouseOver($event, item.id)"
    @mousedown.self.prevent="useEditorDragStart($event, item.id)" @mousemove.self.prevent="useEditorDragMove"
    @mouseup.self.prevent="useEditorDragEnd" @touchstart.self.passive="useEditorDragStart($event, item.id)"
    @touchmove.self.prevent="useEditorDragMove" @touchend.self.prevent="useEditorDragEnd"
    :class="`${dataClasses(item?.classes)} ${editorItemSelectedId == item.id && !editorIsDragging ? 'selected' : ''} ${editorItemHoverId == item.id && 'hovered'} ${editorIsDragStart && editorItemSelectedId == item.id && item.elKind != 'section' && item.id != 'root' ? 'dragging' : ''}`">
    <ComponentsEditor :data="item.children" />

    <div :class="{ 'hidden': true, 'flex': item.elKind == 'section' && editorItemSelectedId == item.id }"
      class="tw-space-x-2 tw-px-2 tw-items-center tw-justify-center tw-absolute tw-top-[20px] tw-right-[20px] tw-bg-white tw-w-[100px] tw-h-[50px] tw-rounded-lg tw-border tw-border-black">
      <button @click.prevent="editorOrderedSection(index, 'before')" class="tw-cursor-pointer"
        :class="{ 'tw-opacity-40 tw-cursor-not-allowed': index == 0 }" :disabled="index == 0">
        <Icon name="fluent:chevron-up-24-regular" class="text-[28px]" />
      </button>
      <button @click.prevent="editorOrderedSection(index, 'after')" class="tw-cursor-pointer"
        :class="{ 'tw-opacity-40 tw-cursor-not-allowed': editorGettDataById('root').value.children.length - 1 == index }"
        :disabled="editorGettDataById('root').value.children.length - 1 == index">
        <Icon name="fluent:chevron-down-24-regular" class="text-[28px]" />
      </button>
    </div>
  </ElementEditable>
</template>

<style scoped>
.selected {
  outline: 1px blue solid;
  outline-offset: 1px;
}

.dragging {
  cursor: move;
  opacity: 0.8;
  position: absolute;
}

.hovered {
  outline: 1px blue solid;
  outline-offset: 1px;
}
</style>
