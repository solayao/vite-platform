<template>
  <el-form ref="form" v-bind="$attrs">
    <template v-for="item in itemConfigs" :key="item.prop + item.label">
      <el-form-item v-bind="item">
        <template v-if="!!$slots.hasOwnProperty(`${item.prop}Item`)">
          <slot :name="`${item.prop}Item`"></slot>
        </template>
        <template v-else>
          <div>{{ returnSlotText(item.prop) }}</div>
        </template>
      </el-form-item>
    </template>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import type { ComponentSize } from "element-plus/es/utils/types";
import type { FormItemRule } from "element-plus/es/components/form/src/form.type";

interface ItemConfig {
  label: StringConstructor;
  prop: StringConstructor;
  labelWidth?: {
    type: (StringConstructor | NumberConstructor)[];
    default: string;
  };
  required?: {
    type: BooleanConstructor;
    default: undefined;
  };
  rules?: PropType<FormItemRule | FormItemRule[]>;
  error?: StringConstructor;
  validateStatus?: StringConstructor;
  for?: StringConstructor;
  inlineMessage?: {
    type: (BooleanConstructor | StringConstructor)[];
    default: string;
  };
  showMessage?: {
    type: BooleanConstructor;
    default: boolean;
  };
  size?: {
    type: PropType<ComponentSize>;
    validator: (val: string) => boolean;
  };
}

export type { ItemConfig };

export default defineComponent({
  name: "CustomFormWrapper",
  props: {
    itemConfigs: {
      type: Array as PropType<ItemConfig[]>,
      default: () => [],
    },
  },
  methods: {
    returnSlotText(key) {
      return `<template v-slot="${key}Item"><xxx></xxx></template>`;
    },
  },
});
</script>

<script setup></script>
