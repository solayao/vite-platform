<template>
  <el-input placeholder="请输入" v-bind="$attrs"></el-input>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ElInput } from "element-plus";

export default defineComponent({
  name: "VisualEleInput",
  desc: "Element 输入框",
  methods: {
    getDefineProps() {
      const { modelValue, ...defineProps } = ElInput.props;
      return {
        ...defineProps,
      };
    },
  },
});
</script>
