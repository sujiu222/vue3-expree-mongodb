<template>
  <div class="container">
    <el-carousel height="calc(100vh - 60px)">
      <el-carousel-item :key="1">
        <div
          :style="{ backgroundImage: `url(${require('@/assets/home1.jpg')})` }"
        ></div>
      </el-carousel-item>
      <el-carousel-item :key="2">
        <div
          :style="{ backgroundImage: `url(${require('@/assets/home2.jpg')})` }"
        ></div>
      </el-carousel-item>

      <el-carousel-item :key="3">
        <div
          :style="{ backgroundImage: `url(${require('@/assets/home3.jpg')})` }"
        ></div>
      </el-carousel-item>
    </el-carousel>
    <div class="center">互联网+时代</div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.el-carousel div {
  width: 100%;
  height: 100%;
  background-size: cover;
}
.container {
  position: relative;
}
.center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 100px;
  line-height: 100px;
  font-size: 60px;
  color: white;
  text-align: center;
}
.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
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
