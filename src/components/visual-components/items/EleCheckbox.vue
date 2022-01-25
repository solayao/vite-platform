<template>
  <div class="visual-checkbox-wrapper">
    <el-checkbox
      v-if="indeterminate"
      v-model="checkAll"
      :indeterminate="isIndeterminate"
      style="margin-right: 30px"
      @change="handleCheckAllChange"
      >全选</el-checkbox
    >
    <el-checkbox-group
      v-bind="$attrs"
      v-model="checkedList"
      @change="handleCheckedGroup"
    >
      <template
        v-for="({ value, label, ...itemProps }, index) in itemConfigs"
        :key="index"
      >
        <el-checkbox :label="value" v-bind="itemProps">{{ label }}</el-checkbox>
      </template>
    </el-checkbox-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs } from "vue";
import { ElCheckboxGroup } from "element-plus";

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
      { value: 1, label: "多选1" },
      { value: 2, label: "多选2" },
    ],
  },
  indeterminate: {
    type: Boolean,
    default: true,
  },
};

export default defineComponent({
  name: "VisualEleCheckbox",
  desc: "Element 多选框",
  props: {
    ...customProps,
    modelValue: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      checkAll: false,
      isIndeterminate: true,
      checkedList: props.modelValue,
    });

    const handleCheckAllChange = (val) => {
      emit(
        "update:modelValue",
        val ? props.itemConfigs.map((it) => it.value) : []
      );
      state.checkedList = val ? props.itemConfigs.map((it) => it.value) : [];
      state.isIndeterminate = false;
    };
    const handleCheckedGroup = (value) => {
      const checkedCount = value.length;
      state.checkAll = checkedCount === props.itemConfigs.length;
      state.isIndeterminate =
        checkedCount > 0 && checkedCount < props.itemConfigs.length;
    };

    return {
      ...toRefs(state),
      handleCheckAllChange,
      handleCheckedGroup,
    };
  },
  methods: {
    getDefineProps() {
      const { modelValue, ...defineProps } = ElCheckboxGroup.props;
      return {
        ...defineProps,
        ...customProps,
      };
    },
  },
});
</script>

<style lang="less" scoped>
.visual-checkbox-wrapper {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
}
</style>
