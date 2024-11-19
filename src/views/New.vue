<template>
  <el-row>
    <el-col :span="17" :offset="1">
      <div>
        <h2>{{ currentNews.title }}</h2>
        <div class="time">{{ whichTime(currentNews.editTime) }}</div>
      </div>
      <el-divider>
        <el-icon><star-filled /></el-icon>
      </el-divider>
      <div v-html="currentNews.content"></div>
    </el-col>
    <el-col :span="4" :offset="1" :pull="1">
      <el-card>
        <template #header>
          <span style="font-size: 16px; font-weight: bold">最近新闻</span>
        </template>

        <div
          v-for="item in topNews"
          :key="item._id"
          style="padding: 14px"
          @click="handleChange(item._id)"
        >
          <div style="">
            <span>{{ item.title }}</span>
          </div>

          <time class="time">{{ whichTime(item.editTime) }}</time>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { onMounted, ref, watchEffect, onBeforeUnmount } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import moment from "moment";
import { StarFilled } from "@element-plus/icons-vue";
moment.locale("zh-cn");
const topNews = ref([]);
const router = useRouter();
const currentNews = ref({});
const whichTime = (item) => moment(item).format("lll");
const stop = watchEffect(async () => {
  if (!useRoute().params.id) return; //为了阻止跳转到其他页面时监听先应用然后发出错误请求
  const res1 = await axios.get(`/webapi/news/list/${useRoute().params.id}`);
  const res2 = await axios.get(`/webapi/news/toplist?limit=4`);
  console.log(res2.data);
  currentNews.value = res1.data.data[0];
  topNews.value = res2.data.data;
});
onBeforeUnmount(() => {
  stop(); //停止监听
});
const handleChange = (id) => {
  router.push(`/news/${id}`);
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-top: 30px;
}
.time {
  font-size: 13px;
  color: gray;
}
</style>
