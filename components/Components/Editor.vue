<script setup lang="ts">

const { dataClasses } = useStore()
const { editorIsDragStart, editorIsDragging, editorIsDragEnd, editorIsDragOver, useEditorDragStart, useEditorDragMove, useEditorDragEnd, editorItemHoverId, editorItemSelectedId, editorOrderedSection, editorGettDataById, editorAddSection, editorDeleteSection, editorDuplicateSection } = useEditor()

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
      class="tw-space-x-2 tw-px-2 tw-items-center tw-justify-center tw-absolute tw-top-[10px] tw-right-[10px] tw-bg-white tw-min-w-[120px] tw-h-[50px] tw-rounded-lg tw-border tw-border-black">
      <button @click.prevent="editorOrderedSection(index, 'before')" class="tw-cursor-pointer"
        :class="{ 'tw-opacity-40 tw-cursor-not-allowed': index == 0 }" :disabled="index == 0">
        <Icon name="fluent:chevron-up-24-regular" class="tw-text-[24px]" />
      </button>
      <button @click.prevent="editorOrderedSection(index, 'after')" class="tw-cursor-pointer"
        :class="{ 'tw-opacity-40 tw-cursor-not-allowed': editorGettDataById('root').value.children.length - 1 == index }"
        :disabled="editorGettDataById('root').value.children.length - 1 == index">
        <Icon name="fluent:chevron-down-24-regular" class="tw-text-[24px]" />
      </button>
      <button @click.prevent="editorDuplicateSection(index)" class="tw-cursor-pointer">
        <Icon name="fluent:copy-add-24-regular" class="tw-text-[24px]" />
      </button>
      <button @click.prevent="editorDeleteSection(index)" class="tw-cursor-pointer">
        <Icon name="fluent:delete-24-regular" class="tw-text-[24px] tw-text-red-500" />
      </button>
    </div>

    <button @click="editorAddSection(index, 'before')"
      :class="{ 'hidden': true, 'flex': item.elKind == 'section' && editorItemSelectedId == item.id }"
      class="tw-z-30 tw-bg-blue-500 tw-text-white tw-px-3 tw-py-1 tw-rounded-full tw-border tw-border-black tw-absolute -tw-top-4 tw-left-1/2 -tw-translate-x-1/2 text-sm font-semibol">
      Add Section
    </button>
    <button @click="editorAddSection(index, 'after')"
      :class="{ 'hidden': true, 'flex': item.elKind == 'section' && editorItemSelectedId == item.id }"
      class="tw-z-30 tw-bg-blue-500 tw-text-white tw-px-3 tw-py-1 tw-rounded-full tw-border tw-border-black tw-absolute -tw-bottom-4 tw-left-1/2 -tw-translate-x-1/2 text-sm font-semibol">
      Add Section
    </button>

  </ElementEditable>
</template>

<style scoped>
.selected {
  outline: 1px blue solid;
}

.dragging {
  cursor: move;
  opacity: 0.8;
  position: absolute;
}

.hovered {
  outline: 1px blue solid;
}
</style>
