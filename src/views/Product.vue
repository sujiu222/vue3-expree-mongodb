<template>
  <div>
    <el-carousel
      :height="windowHeight + 'px'"
      direction="vertical"
      :autoplay="false"
      v-if="looplist.length"
    >
      <el-carousel-item v-for="item in looplist" :key="item._id">
        <div
          class="item"
          :style="{
            backgroundImage: `url(http://localhost:3000${item.cover})`,
          }"
        >
          <el-card class="card">
            <template #header>
              <div class="card-header">
                <h2>{{ item.title }}</h2>
              </div>
            </template>
            <div>{{ item.introduction }}</div>
            <div style="margin-top: 20px">{{ item.detail }}</div>
            <div class="more" style="margin-top: 20px">
              更多信息请访问：
              <br />
              <a href="#" target="_blank">链接 </a>
            </div>
          </el-card>
        </div>
      </el-carousel-item>
    </el-carousel>
    <el-empty v-else description="暂无产品"></el-empty>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
const looplist = ref([]);

const windowHeight = ref(window.innerHeight); // 响应式窗口高度

// 更新窗口高度的函数
const updateWindowHeight = () => {
  windowHeight.value = window.innerHeight;
};
onMounted(async () => {
  const res = await axios.get("/webapi/product/list");
  looplist.value = res.data.data;
});
</script>

<style lang="scss" scoped>
::v-deep .el-card__header {
  border-bottom: 1px solid rgb(124, 120, 150);
}
.card {
  width: 50%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
}
.item {
  height: 100%;
  width: 100%;
  background-size: cover; /* 保证图片完全显示 */
  // background-repeat: no-repeat; /* 禁止重复 */
  // background-position: center; /* 居中对齐 */
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
