<template>
  <el-descriptions v-bind="$attrs">
    <template #title><slot name="title"></slot></template>
    <template #extra><slot name="extra"></slot></template>

    <template v-for="item in itemConfigs" :key="item.label + item.value">
      <el-descriptions-item v-bind="item">
        <template #label>
          <el-icon v-if="item.icon">
            <component :is="item.icon"></component>
          </el-icon>
          {{ item.label }}
        </template>

        <template v-if="item.isTag">
          <el-tag v-bind="item.tagParams">{{ item.value }}</el-tag>
        </template>
        <template v-else>{{ item.value }}</template>
      </el-descriptions-item>
    </template>
  </el-descriptions>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

interface ItemConfig {
  label: string;
  value: string | number | boolean | undefined | null;
  isTag: boolean;
  icon: any;
  tagParams: any;
}

export default defineComponent({
  name: "CustomDescriptionsWrapper",
  props: {
    itemConfigs: {
      type: Array as PropType<ItemConfig[]>,
      default: () => [
        { label: "label1", value: "value1" },
        { label: "label2", value: "value2" },
        { label: "label3", value: "value3", isTag: true },
      ],
    },
  },
});
</script>
