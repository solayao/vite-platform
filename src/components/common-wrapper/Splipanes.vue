<template>
  <splitpanes class="default-theme" v-bind="$attrs">
    <template v-for="(child, index) in childSlotList" :key="index">
      <pane v-bind="{ ...child.props?.paneProps }">
        <component :is="child"></component>
      </pane>
    </template>
  </splitpanes>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "splitpanes/dist/splitpanes.css";

export default defineComponent({
  name: "SplitpanesWrapper",
});
</script>

<script lang="ts" setup>
// https://antoniandre.github.io/splitpanes/
import { Splitpanes, Pane } from "splitpanes";
import { useSlots } from "vue";

const slots = useSlots();
const childSlotList = slots && slots.default ? slots.default() : [];
</script>

<style lang="less" scoped>
@--splitter-width: -5px;

.splitpanes {
  overflow: hidden;

  :deep(.splitpanes__splitter:before) {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transition: 0.4s;
    transform: translateX(0);
    height: auto;
    z-index: 999;
    background-color: transparent;
    width: auto;
  }
  :deep(.splitpanes__splitter:after) {
    background-color: transparent;
  }
  :deep(.splitpanes__splitter:hover:before) {
    background-color: rgba(255, 0, 0, 0.3);
  }
}

.splitpanes--vertical {
  & > :deep(.splitpanes__splitter:before) {
    left: @--splitter-width;
    right: @--splitter-width;
  }
  & > :deep(.splitpanes__splitter:after) {
    margin-left: -1px;
    border-left: 1px solid rgba(0, 0, 0, 0.15);
    border-right: 1px solid rgba(0, 0, 0, 0.15);
  }
}
.splitpanes--horizontal {
  & > :deep(.splitpanes__splitter:before) {
    top: @--splitter-width;
    bottom: @--splitter-width;
  }
  & > :deep(.splitpanes__splitter:after) {
    margin-top: -1px;
    border-top: 1px solid rgba(0, 0, 0, 0.15);
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  }
}
</style>
