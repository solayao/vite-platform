<template>
  <div class="custom-platform-wrapper">
    <splitpanes-wrapper horizontal style="height: 600px">
      <splitpanes-wrapper>
        <postman-main></postman-main>
        <div :paneProps="{ size: 30 }">
          <FormWrapper :itemConfigs="testFormItemConfig"></FormWrapper>
          <DescWrapper :border="true"></DescWrapper>

          <div class="dragger-wrapper">
            <VisualItemsDraggableList></VisualItemsDraggableList>

            <DraggableWrapper
              :list="showList"
              tag="transition-group"
              :component-data="{
                tag: 'ul',
                name: 'flip-list',
                type: 'transition',
              }"
              :animation="200"
              item-key="id"
              group="visualComponents"
              ghostClass="ghost"
              @change="log"
            >
              <template #item="{ element }">
                <VisualItemWrapper :wrapperTitle="element.title">
                  <component :is="element.component"></component>
                </VisualItemWrapper>
              </template>
            </DraggableWrapper>
          </div>
        </div>
      </splitpanes-wrapper>

      <tinymce-editor v-model="test"></tinymce-editor>
    </splitpanes-wrapper>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PostmanMain from "@/components/Postman.vue";
import SplitpanesWrapper from "@/components/common-wrapper/Splipanes.vue";
import TinymceEditor from "@/components/tinymce-editor/index.vue";
import FormWrapper from "@/components/common-wrapper/Form.vue";
import type { ItemConfig } from "@/components/common-wrapper/Form.vue";
import DescWrapper from "@/components/common-wrapper/Descriptions.vue";
import DraggableWrapper from "@/components/common-wrapper/Draggable.vue";
import VisualItemWrapper from "@/components/visual-components/ItemWrapper.vue";
import VisualItemsDraggableList from "@/components/visual-components/ItemsDraggableList.vue";

export default defineComponent({
  components: {
    PostmanMain,
    SplitpanesWrapper,
    TinymceEditor,
    FormWrapper,
    DescWrapper,
    DraggableWrapper,
    VisualItemWrapper,
    VisualItemsDraggableList,
  },
  data() {
    return {
      test: "1323123",
      testFormItemConfig: [
        { label: "test", prop: "test1" },
      ] as unknown as ItemConfig[],
      showList: [],
    };
  },
  methods: {
    log: function (evt) {
      debugger;
      window.console.log(evt);
    },
  },
});
</script>

<style lang="less" scoped>
.custom-platform-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
}

.dragger-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  & > * {
    width: 50%;
  }
}
</style>
