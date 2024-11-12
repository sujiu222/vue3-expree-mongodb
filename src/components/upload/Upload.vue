<template>
  <el-upload
    class="avatar-uploader"
    :on-change="handleChange"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :show-file-list="false"
    :auto-upload="false"
  >
    <img v-if="userForm.avatar" :src="init + userForm.avatar" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon">
      <Plus />
    </el-icon>
  </el-upload>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";

const handleChange = (file) => {
  // console.log(file);
  userForm.avatar = URL.createObjectURL(file.raw);
  // console.log(userForm.avatar);

  // console.log(file.raw);
  userForm.file = file.raw;
  // userForm.avatar = URL.createObjectURL(file);
  // userForm.file = file;

  // 检查是否存在 raw 属性，如果没有直接使用 file

  init.value = "";
};
</script>
