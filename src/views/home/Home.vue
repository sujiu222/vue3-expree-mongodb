<template>
    <div>
        <el-page-header title="企业门户管理系统" :icon="null">
            <template #content>
                <span class="text-large font-600 mr-3"> 首页 </span>
            </template>
        </el-page-header>
        <el-card class="b0ox-card">
            <el-row>
                <!-- 在 Element Plus 的 <el-row> 布局系统中，通常将一行划分为 24 份。这种布局方式允许你通过设置 span 属性来控制列的宽度，实现响应式布局。 -->
                <el-col :span="4"><el-avatar :src="avatarUrl" :size="100" /></el-col>
                <el-col :span="20">
                    <h3 style="line-height: 100px;">欢迎回来{{ store.state.userInfo.username }},{{ welcomeText }}</h3>
                </el-col>

            </el-row>
        </el-card>
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>公司产品</span>
                </div>
            </template>


            <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="item in 6" :key="item">
                    <h3 text="2xl" justify="center">{{ item }}</h3>
                </el-carousel-item>
            </el-carousel>
        </el-card>
    </div>
</template>

<script setup>
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore();

const currentHour = ref(new Date().getHours());
axios.get('adminapi/user/home').then(res => {
    console.log(res.data);

})
const avatarUrl = computed(() =>
    store.state.userInfo.avatar ? store.state.userInfo.avatar :
        'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'

)
const welcomeText = computed(() => currentHour.value < 12 ? '早上好，要开心迎接新一天呀！' : '喝杯咖啡提提神吧.')

onMounted(() => {
    setInterval(() => {
        currentHour.value = new Date().getHours()
    }, 3600000);
})
</script>

<style lang="scss" scoped>
.box-card {
    margin-top: 50px;
}

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>
