<template>
  <div class="tinymce-box">
    <Editor
      v-model="contentValue"
      :init="initParams"
      :tinymceScriptSrc="initParams.tinymceScriptSrc"
      :disabled="disabled"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TinymceEditor",
});
</script>

<script lang="ts" setup>
//引入tinymce编辑器
import Editor from "@tinymce/tinymce-vue";
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  plugins: {
    type: [String, Array],
    default:
      "print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern autosave autoresize",
  },
  toolbar: {
    type: [String, Array],
    default:
      "fullscreen undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | \
                styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | \
                table image media charmap emoticons hr pagebreak insertdatetime print preview | code selectall | indent2em lineheight formatpainter axupimgs",
  },
});

const initParams = ref({
  tinymceScriptSrc: "/tinymce-assets/tinymce.min.js",

  language_url: "/tinymce-assets/langs/zh_CN.js", //引入语言包文件
  language: "zh_CN", //语言类型

  skin_url: "/tinymce-assets/skins/ui/oxide", //皮肤：浅色
  // skin_url: "/tinymce-assets/skins/ui/oxide-dark", //皮肤：暗色

  plugins: props.plugins, //插件配置
  toolbar: props.toolbar, //工具栏配置，设为false则隐藏
  // menubar: 'file edit',  //菜单栏配置，设为false则隐藏，不配置则默认显示全部菜单，也可自定义配置--查看 http://tinymce.ax-z.cn/configure/editor-appearance.php --搜索“自定义菜单”

  fontsize_formats:
    "12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 48px 56px 72px", //字体大小
  font_formats:
    "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;",

  height: 500, //注：引入autoresize插件时，此属性失效
  placeholder: "在这里输入文字",
  branding: false, //tiny技术支持信息是否显示
  resize: false, //编辑器宽高是否可变，false-否,true-高可变，'both'-宽高均可，注意引号
  statusbar: false, //最下方的元素路径和字数统计那一栏是否显示
  elementpath: false, //元素路径是否显示

  content_style: "img {max-width:100%;}", //直接自定义可编辑区域的css样式
  // content_css: '/tinycontent.css',  //以css文件方式自定义可编辑区域的css样式，css文件需自己创建并引入

  // images_upload_url: '/demo/upimg.php',  //后端处理程序的url
  // images_upload_base_path: '/demo',  //相对基本路径--关于图片上传建议查看--http://tinymce.ax-z.cn/general/upload-images.php
  // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
  // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
  // images_upload_handler: (blobInfo, success, failure) => {
  //   const img = 'data:image/jpeg;base64,' + blobInfo.base64();
  //   success(img);
  // },
});

const emits = defineEmits(["update:modelValue"]);

const contentValue = ref(props.modelValue);

watch(
  () => contentValue.value,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      emits("update:modelValue", newVal);
    }
  }
);
</script>
