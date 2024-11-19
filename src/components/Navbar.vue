<template>
  <div class="navbar">
    <el-menu
      :default-active="route.fullPath"
      class="el-menu-demo"
      mode="horizontal"
      :router="true"
    >
      <el-menu-item index="/home">首页</el-menu-item>
      <el-menu-item index="/news">新闻中心</el-menu-item>
      <el-menu-item index="/product">产品与服务</el-menu-item>
      <el-menu-item index="" @click="handleClick">登陆</el-menu-item>
    </el-menu>
    <div class="right">企业门户官网</div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const handleClick = () => {
  window.location = "http://localhost:8080/login";
};
</script>

<style lang="scss" scoped>
.navbar {
  top: 0px;
  position: sticky;
  z-index: 1000;
}
.right {
  position: fixed;
  top: 0px;
  right: 20px;
  widows: 100px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
</style>
