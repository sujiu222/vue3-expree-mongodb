<template>
  <el-header>
    <div class="left">
      <el-icon>
        <Menu />
      </el-icon>
      <span> 企业门户管理系统</span>
    </div>
    <div class="right">
      <span>欢迎{{ userForm.username }} 回来</span>
      <el-dropdown style="margin-left: 5px">
        <span class="el-dropdown-link">
          <el-icon :size="30" color="white">
            <User />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleCenter">个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleLogin">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup>
import { Menu, User } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { reactive } from "vue";
const store = useStore();
const router = useRouter();

const { username, gender, introduction, avatar } = store.state.userInfo;
const userForm = reactive({
  username,
  gender,
  introduction,
  avatar,
  file: null,
});

const handleCollapse = () => {
  store.commit("changeCollapse");
};
const handleCenter = () => {
  router.push("/center");
};
const handleLogin = () => {
  localStorage.removeItem("token");
  store.commit("clearUserInfo");
  router.push("/login");
};
</script>

<style lang="scss" scoped>
.el-header {
  background: #2d3a4b;
  color: white;
  width: 100%;
  height: 60px;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left,
.right {
  display: flex;
}

.left {
  i {
    margin: auto;
  }
}

.right {
  .el-dropdown {
    margin: auto;
  }
}
</style>
