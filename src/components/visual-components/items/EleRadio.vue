<template>
  <el-radio-group v-bind="$attrs">
    <template
      v-for="({ value, label, ...itemProps }, index) in itemConfigs"
      :key="index"
    >
      <el-radio :label="value" v-bind="itemProps">{{ label }}</el-radio>
    </template>
  </el-radio-group>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import { ElRadioGroup } from "element-plus";

interface ItemConfig {
  label: string;
  value: string | number | boolean;
  disabled: boolean;
  [key: string]: any;
}

const customProps = {
  itemConfigs: {
    type: Array as PropType<ItemConfig[]>,
    default: () => [
      { value: 1, label: "单选1" },
      { value: 2, label: "单选2" },
    ],
  },
};

export default defineComponent({
  name: "VisualEleRadio",
  desc: "Element 单选框",
  props: {
    ...customProps,
  },
  methods: {
    getDefineProps() {
      const { modelValue, ...defineProps } = ElRadioGroup.props;
      return {
        ...defineProps,
        ...customProps,
      };
    },
  },
});
</script>
