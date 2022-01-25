<template>
  <el-table v-bind="$attrs">
    <!-- 多选框, 需要配置selectAble: true -->
    <el-table-column v-if="selectAble" type="selection" width="55" />
    <!-- 内容Column -->
    <template v-for="(column, index) in columnConfigs" :key="index">
      <el-table-column v-bind="column">
        <template
          v-if="!!$slots.hasOwnProperty(`column${column.prop}`)"
          #default="scope"
        >
          <!-- column{prop}插槽，可自定义{prop}column栏目内容 -->
          <slot :name="`column${column.prop}`" v-bind="{ scope }"></slot>
        </template>
      </el-table-column>
    </template>
    <!-- 操作Column, 需要配置actionAble: true, column属性可以设置cActionColumnConfig -->
    <el-table-column v-if="actionAble" v-bind="cActionColumnConfig">
      <template #default="scope">
        <!-- columnaction插槽，可自定义操作栏目内容 -->
        <slot name="columnaction" v-bind="{ scope }"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";

export { TableColumnCtx };

export default defineComponent({
  name: "CustomTableWrapper",
  props: {
    columnConfigs: {
      type: Array as PropType<TableColumnCtx<any>[]>,
      default: () => [],
    },
    selectAble: {
      type: Boolean,
      default: false,
    },
    actionAble: {
      type: Boolean,
      default: false,
    },
    actionColumnConfig: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    cActionColumnConfig() {
      const _base = {
        label: "操作",
        prop: "_action",
        width: 80,
      };
      return Object.assign({}, _base, this.actionColumnConfig);
    },
  },
});
</script>
