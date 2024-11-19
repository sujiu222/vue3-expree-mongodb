<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
    />
    <Editor
      style="height: 350px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      @onChange="onChange"
      @onCreated="handleCreated"
    />
  </div>
</template>

<script setup>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import {
  onBeforeUnmount,
  ref,
  shallowRef,
  onMounted,
  defineEmits,
  defineProps,
} from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

const editorRef = shallowRef();
const emit = defineEmits(["event"]);
const props = defineProps({
  content: String,
});
// 内容 HTML
const valueHtml = ref("");

// 模拟 ajax 异步获取内容
// onMounted(() => {
//   setTimeout(() => {
//     valueHtml.value = "<p>模拟 Ajax 异步设置内容</p>";
//   }, 1500);
// });

const toolbarConfig = {};
const editorConfig = {
  placeholder: "请输入内容...",
};

const onChange = (editor) => {
  // 每次内容变化时，自动更新内容
  // console.log("content:", editor.getHtml());
  emit("event", editor.getHtml());
};
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
  props.content && editor.setHtml(props.content);
};
</script>

<style lang="scss" scoped></style>
