<template>
  <div>
    <el-page-header content="编辑产品" icon="" title="产品管理" />
    <el-form
      ref="productFormRef"
      style="max-width: 600px"
      :model="productForm"
      :rules="productFormRules"
      label-width="80px"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="产品名称" prop="title">
        <el-input v-model="productForm.title" />
      </el-form-item>
      <el-form-item label="产品简介" prop="introduction">
        <el-input v-model="productForm.introduction" type="textarea" />
      </el-form-item>
      <el-form-item label="产品详细描述" prop="detail">
        <el-input v-model="productForm.detail" type="textarea" />
      </el-form-item>
      <el-form-item label="产品图片" prop="cover">
        <Upload :avatar="productForm.cover" @kerwinchange="handleChange" />
      </el-form-item>
      <el-form-item label-width="80px">
        <el-button type="primary" @click="submitForm()"> 更改产品 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import Upload from "@/components/upload/Upload.vue";
import upload from "@/util/upload";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

const router = useRouter();
const productFormRef = ref();
const productForm = reactive({
  title: "",
  introduction: "",
  detail: "",
  cover: "",
  file: null,
});

const productFormRules = reactive({
  title: [{ required: true, message: "请输入名字", trigger: "blur" }],
  detail: [{ required: true, message: "请输入详细描述", trigger: "blur" }],
  introduction: [{ required: true, message: "请输入介绍", trigger: "blur" }],
  cover: [{ required: true, message: "请上传产品图片", trigger: "blur" }],
});

const handleChange = (file) => {
  productForm.cover = URL.createObjectURL(file);
  productForm.file = file;
};

const submitForm = () => {
  productFormRef.value.validate(async (valid) => {
    if (valid) {
      console.log(productForm);
      await upload("/adminapi/product/list", productForm);
      router.back();
    }
  });
};
onMounted(async () => {
  //   console.log(useRoute().params);
  const res = await axios.get(`/adminapi/product/list/${useRoute().params.id}`);
  Object.assign(productForm, res.data.data[0]);
  console.log(res.data.data);
});
</script>

<style lang="scss" scoped>
.demo-ruleForm {
  margin-top: 50px;
}
</style>
