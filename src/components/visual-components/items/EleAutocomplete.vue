<template>
  <el-autocomplete placeholder="请输入" v-bind="$attrs"></el-autocomplete>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ElAutocomplete } from "element-plus";

export default defineComponent({
  name: "VisualEleAutoComplete",
  desc: "Element 自动补全输入框",
  methods: {
    getDefineProps() {
      const { modelValue, ...defineProps } = ElAutocomplete.props;
      return {
        ...defineProps,
      };
    },
  },
});
</script>
