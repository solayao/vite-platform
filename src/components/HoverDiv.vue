<template>
  <div @mouseover="isHover = true" @mouseleave="isHover = false">
    <slot v-bind="{ isHover }"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      isHover: false,
    };
  },
});
</script>
