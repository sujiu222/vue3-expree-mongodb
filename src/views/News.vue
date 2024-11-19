<template>
  <div class="container">
    <div
      class="news-header"
      :style="{
        backgroundImage: `url(${require('@/assets/newsbg.jpg')})`,
      }"
    ></div>
    <div class="search">
      <el-popover
        placement="bottom"
        title="搜索结果"
        width="50%"
        :visible="visible"
      >
        <template #reference>
          <el-input
            v-model="searchText"
            style="height: 50px; border: 1px solid blue"
            placeholder="请输入搜索内容"
            :prefix-icon="Search"
            type="search"
            size="large"
            @blur="visible = false"
            @input="visible = true"
          />
        </template>
        <div v-if="searchnewslist.length">
          <div
            class="search-item"
            v-for="data in searchnewslist"
            :key="data._id"
            @click="handleChangepage(data._id)"
          >
            {{ data.title }}
          </div>
        </div>
        <div v-else>
          <el-empty description="暂无数据" :image-size="50"></el-empty>
        </div>
      </el-popover>
    </div>
    <div class="topnews">
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in topNewsList" :key="item._id">
          <el-card style="max-width: 480px">
            <template #footer
              ><time class="time">{{
                whichTime(item.editTime)
              }}</time></template
            >
            <div
              class="image"
              :style="{
                backgroundImage: `url(http://localhost:3000${item.cover})`,
              }"
            ></div>
            <div style="padding: 14px">
              <span>{{ item.title }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-tabs style="margin: 20px" v-model="whichTab" class="demo-tabs">
      <el-tab-pane
        v-for="item in tableList"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      >
        <el-row :gutter="20">
          <el-col :span="18">
            <div v-for="data in tabnews[item.name]" :key="data._id">
              <el-card
                style="max-width: 1000px; margin: 10px"
                @click="handleChangepage(data._id)"
              >
                <div
                  class="tab-image"
                  :style="{
                    backgroundImage: `url(http://localhost:3000${data.cover})`,
                  }"
                ></div>
                <div style="padding: 14px">
                  <span>{{ data.title }}</span>
                </div>
                <template #footer
                  ><time class="time">{{
                    whichTime(data.editTime)
                  }}</time></template
                >
              </el-card>
            </div>
          </el-col>
          <el-col :span="6">
            <el-timeline style="max-width: 600px">
              <el-timeline-item
                v-for="(data, index) in tabnews[item.name]"
                :key="index"
                :timestamp="whichTime(data.editTime)"
              >
                {{ data.title }}
              </el-timeline-item>
            </el-timeline>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-backtop :right="100" :bottom="100" :visibility-height="100" />
  </div>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import moment from "moment";
import _ from "lodash";
import { useRouter } from "vue-router";

const router = useRouter();
moment.locale("zh-cn");
const newlist = ref([]);
const searchText = ref("");
const visible = ref(false);
const whichTab = ref(1);
const tableList = [
  {
    label: "最新动态",
    name: 1,
  },
  {
    label: "典型案例",
    name: 2,
  },
  {
    label: "通知公告",
    name: 3,
  },
];
const tabnews = computed(() =>
  _.groupBy(newlist.value, (item) => item.category)
);
const searchnewslist = computed(() =>
  searchText.value
    ? newlist.value.filter((item) => item.title.includes(searchText.value))
    : []
);
const topNewsList = computed(() => newlist.value.slice(0, 4));
onMounted(async () => {
  const res = await axios.get("/webapi/news/list");
  newlist.value = res.data.data;
  // console.log(newlist.value);
});
const whichTime = (item) => moment(item).format("lll");

const handleChangepage = (id) => {
  router.push(`/news/${id}`);
};
</script>

<style lang="scss" scoped>
.tab-image {
  width: 150px;
  height: 100px;
  background-size: cover;
  float: left;
}
.topnews {
  margin: 20px;
  .image {
    width: 100%;
    height: 150px;
    background-size: cover;
  }
}
.time {
  font-size: 12px;
  color: #999;
}
.container {
  position: relative;
}
.news-header {
  width: 100%;
  height: 600px;
  background-size: cover;
}
.search {
  position: absolute;
  top: 400px;
  width: 100%;
  text-align: center;
  .el-input {
    width: 50%;
  }
}
.search-item {
  height: 50px;
  line-height: 50px;
  &:hover {
    background: whitesmoke;
    color: red;
  }
}
</style>
