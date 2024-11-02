<template>


    <el-container>
        <SideMenu />
        <el-container direction="vertical">
            <TopHeader />
            <el-main>
                <routerView>
                </routerView>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import TopHeader from '@/components/TopHeader.vue';
import SideMenu from '@/components/SideMenu.vue';
</script>

<style lang="scss" scoped></style>