<template>
    <el-aside width="200px">
        <el-menu>
            <el-menu-item index="2">
                <el-icon><icon-menu /></el-icon>
                <span>aaa</span>
            </el-menu-item>
            <el-sub-menu index="1">
                <template #title>
                    <el-icon>
                        <location />
                    </el-icon>
                    <span>Navigator One</span>
                </template>
                <el-menu-item index="1-1">item one</el-menu-item>
            </el-sub-menu>

        </el-menu>


    </el-aside>

</template>

<style lang="scss" scoped>
.el-aside {
    height: 100vh;
}
</style>