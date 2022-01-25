<template>
  <draggable v-bind="$attrs">
    <template #header>
      <slot name="header"></slot>
    </template>
    <template #footer>
      <slot name="footer"></slot>
    </template>

    <template #item="{ element }">
      <div class="list-group-item">
        <slot name="item" v-bind="{ element }"></slot>
      </div>
    </template>
  </draggable>
</template>

<script>
import { defineComponent } from "vue";
import draggable from "vuedraggable";

export default defineComponent({
  name: "CustomDraggableWrapper",
  components: { draggable },
});
</script>
