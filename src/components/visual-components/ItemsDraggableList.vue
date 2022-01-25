<template>
  <DraggableWrapper
    :list="draggableList"
    :animation="200"
    :component-data="{
      tag: 'ul',
      name: 'flip-list',
      type: 'transition',
    }"
    :group="{
      name: 'visualComponents',
      pull: 'clone',
      put: false,
    }"
    item-key="id"
    tag="transition-group"
    ghostClass="ghost"
  >
    <template #item="{ element }">
      <VisualItemWrapper :wrapperTitle="element.title">
        <component :is="element.component"></component>
      </VisualItemWrapper>
    </template>
  </DraggableWrapper>
</template>

<script lang="ts">
import { defineComponent, ComponentCustomProps } from "vue";
import DraggableWrapper from "@/components/common-wrapper/Draggable.vue";
import VisualItemWrapper from "./ItemWrapper.vue";

interface VItemComponent extends ComponentCustomProps {
  desc: string;
  name: string;
}
interface FileType {
  [key: string]: VItemComponent;
}
const files: Record<string, FileType> = import.meta.globEager("./items/*.vue");

// console.log(files);

export default defineComponent({
  name: "VisualItemsDraggableList",
  components: { DraggableWrapper, VisualItemWrapper },
  data() {
    return {
      draggableList: Object.values(files).map((it) => ({
        id: it.default.name,
        component: it.default,
        title: it.default.desc,
      })),
    };
  },
});
</script>
