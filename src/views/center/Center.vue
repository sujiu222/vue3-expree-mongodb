<template>
  <div>
    <el-page-header title="企业门户管理系统" :icon="null">
      <template #content>
        <span class="text-large font-600 mr-3"> 个人中心 </span>
      </template>
    </el-page-header>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <el-avatar :src="avatarUrl" :size="150" />
          <h3>{{ store.state.userInfo.username }}</h3>
          <h5>{{ store.state.userInfo.role == 1 ? "管理员" : "编辑" }}</h5>
        </el-card>
      </el-col>

      <el-col :span="16">
        <el-card class="message-card">
          <template #header>
            <span>个人信息</span>
          </template>
          <el-form
            ref="userFormRef"
            style="max-width: 600px"
            :model="userForm"
            :rules="userFormRules"
            label-width="auto"
            class="demo-ruleForm"
            status-icon
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="userForm.username" />
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-select
                v-model="userForm.gender"
                placeholder="性别"
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
            <el-form-item label="个人简介" prop="introduction">
              <el-input v-model="userForm.introduction" type="textarea" />
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
              <Upload :avatar="userForm.avatar" @kerwinchange="handleChange" />
            </el-form-item>
            <el-button type="primary" @click="submitForm()"> 登陆 </el-button>
            <el-form-item> </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { computed, ref, reactive } from "vue";
import { useStore } from "vuex";
import upload from "@/util/upload";
import { ElMessage } from "element-plus";
import Upload from "@/components/upload/Upload.vue";
const store = useStore();
const { username, gender, introduction, avatar } = store.state.userInfo;
const userFormRef = ref();
const userForm = reactive({
  username,
  gender,
  introduction,
  avatar,
  file: null,
});

//选择完图片的回调
//出的bug传回的的file是将file对象进行包装后的对象，要生成file对象的URL
//然后判定，当userForm.avatar一开始就有的时候使用3000后端传回来的，没有的话就要用本地的端口挂载的
const handleChange = (file) => {
  userForm.avatar = URL.createObjectURL(file);
  userForm.file = file;
};

const submitForm = () => {
  userFormRef.value.validate(async (vaild) => {
    if (vaild) {
      console.log("submit");
      const res = await upload("adminapi/user/upload", userForm);
      if (res.ActionType == "OK") {
        store.commit("changeUserInfo", res.data);
        ElMessage.success("更新成功");
      }
    }
  });
};
const options = [
  {
    label: "保密",
    value: 0,
  },
  {
    label: "男性",
    value: 1,
  },
  {
    label: "女性",
    value: 2,
  },
];
const avatarUrl = computed(() =>
  store.state.userInfo.avatar
    ? "http://localhost:3000" + store.state.userInfo.avatar
    : "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
);

const userFormRules = reactive({
  username: [{ required: true, message: "请输入名字", trigger: "blur" }],
  gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
  introduction: [{ required: true, message: "请输入介绍", trigger: "blur" }],
  avatar: [{ required: true, message: "头像不能为空", trigger: "blur" }],
});
</script>

<style lang="scss" scoped>
.el-row {
  margin-top: 20px;

  .box-card {
    text-align: center;
  }
}
</style>
