<template>
  <div>
    <el-page-header content="创建新闻" icon="" title="新闻管理">
    </el-page-header>

    <el-form
      ref="newsFormRef"
      style="max-width: 800px"
      :model="newsForm"
      :rules="newsFormRules"
      label-width="80px"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="newsForm.title" />
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <Editor @event="handleChange" />
      </el-form-item>
      <el-form-item label="类别" prop="category">
        <el-select
          v-model="newsForm.category"
          placeholder="类别"
          style="width: 100%"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <Upload :avatar="newsForm.cover" @kerwinchange="handleChangeCover" />
      </el-form-item>
      <el-form-item label-width="80px">
        <el-button type="primary" @click="submitForm()"> 添加新闻 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import Editor from "@/components/editor/Editor.vue";
import Upload from "@/components/upload/Upload.vue";
import upload from "@/util/upload";
import { useRouter } from "vue-router";
const router = useRouter();
const newsFormRef = ref();
const newsForm = reactive({
  title: "",
  content: "",
  category: 1, //1 最新动态，2 典型案例 3 通知公告
  cover: "",
  file: null,
  isPublish: 0, //0 未发布 1 已发布
});

const handleChange = (value) => {
  newsForm.content = value;
};

const options = [
  { label: "最新动态", value: 1 },
  { label: "典型案例", value: 2 },
  { label: "通知公告", value: 3 },
];
const handleChangeCover = (file) => {
  newsForm.cover = URL.createObjectURL(file);
  // console.log(file);
  newsForm.file = file;
};
const submitForm = () => {
  newsFormRef.value.validate(async (valid) => {
    if (valid) {
      // console.log(newsForm);
      await upload("/adminapi/news/add", newsForm);
      router.push("/news-manage/newslist");
    }
  });
};
const newsFormRules = {
  title: [
    {
      required: true,
      message: "请输入新闻标题",
      trigger: "blur",
    },
  ],
  content: [
    {
      required: true,
      message: "请输入新闻内容",
      trigger: "blur",
    },
  ],
  category: [
    {
      required: true,
      message: "请选择分类",
      trigger: "blur",
    },
  ],
  cover: [
    {
      required: true,
      message: "请上传图片",
      trigger: "blur",
    },
  ],
};
</script>

<style lang="scss" scoped>
.el-form {
  margin-top: 50px;
}
</style>
