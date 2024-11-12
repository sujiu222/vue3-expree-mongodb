<template>
  <el-container>
    <SideMenu />
    <el-container direction="vertical">
      <TopHeader />
      <el-main>
        <routerView> </routerView>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import TopHeader from "@/components/mainbox/TopHeader.vue";
import SideMenu from "@/components/mainbox/SideMenu.vue";
</script>

<style lang="scss" scoped>
.el-main {
  overflow: auto;
  height: calc(100vh - 60px);
}
</style>
