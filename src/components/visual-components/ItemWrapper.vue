<template>
  <div
    :class="['visual-item-wrapper', `title-wrapper-${labelPosition}`]"
    :data-label="wrapperTitle"
  >
    <div class="visual-content-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "VisualItemWrapper",
  props: {
    labelPosition: {
      type: String,
      default: "top",
      validator: (val: string) =>
        ["top", "left", "right", "bottom"].includes(val),
    },
    wrapperTitle: {
      type: String,
      default: "",
    },
  },
});
</script>

<style>
.visual-item-wrapper {
  position: relative;
  display: flex;
  width: calc(100% - 20px);
  min-height: 120px;
  padding: 0 5px;
  margin-top: 20px;
  margin-left: 10px;
  border: solid 3px var(--el-border-color-base);
  transform: translate(0);
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
}

.visual-item-wrapper:hover {
  border-color: var(--el-color-primary);
  cursor: move;
}

.title-wrapper-top::before {
  position: absolute;
  top: -3px;
  left: -3px;
  z-index: 1;
  padding: 4px 8px;
  font-size: 12px;
  color: #fff;
  background-color: var(--el-color-primary);
  content: attr(data-label);
}

.title-wrapper-bottom::before {
  position: absolute;
  bottom: -3px;
  left: -3px;
  z-index: 1;
  padding: 4px 8px;
  font-size: 12px;
  color: #fff;
  background-color: var(--el-color-primary);
  content: attr(data-label);
}

.visual-content-wrapper {
  pointer-events: none;
}
</style>
