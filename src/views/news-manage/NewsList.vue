<template>
  <div>
    <el-card>
      <el-page-header
        content="新闻列表"
        icon=""
        title="新闻管理"
      ></el-page-header>
    </el-card>
    <el-card>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="标题" width="180">
        </el-table-column>
        <el-table-column prop="category" label="分类">
          <template #default="scope">
            {{ categoryFormat(scope.row.category) }}
          </template>
        </el-table-column>
        <el-table-column prop="editTime" label="更新时间">
          <template #default="scope">
            {{ timeFormat.getTime(scope.row.editTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="isPublish" label="是否发布">
          <template #default="scope">
            <!-- 设置开关打开时的值 -->
            <!-- 设置开关关闭时的值 -->
            <el-switch
              v-model="scope.row.isPublish"
              :active-value="1"
              :inactive-value="0"
              @change="handleSwitch(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="small"
              @click="handlePreview(scope.row)"
              circle
              :icon="Star"
              type="success"
            >
            </el-button>
            <el-button
              size="small"
              @click="handleEdit(scope.row)"
              circle
              :icon="Edit"
              type="warning"
            >
            </el-button>

            <el-popconfirm
              title="你确定要删除吗？"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-button size="small" circle :icon="Delete" type="danger">
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" title="预览新闻" width="30%">
      <div>
        <h2>{{ previewDate.title }}</h2>
        <div style="font-size: 12px; color: gray">
          {{ timeFormat.getTime(previewDate.editTime) }}
        </div>
        <el-divider>
          <el-icon> <star /> </el-icon>
        </el-divider>
      </div>
      <div v-html="previewDate.content" class="htmlcontent"></div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import timeFormat from "@/util/formatTime";
import { Star, Edit, Delete } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const router = useRouter();
const tableData = ref([]);
const previewDate = ref({});
const dialogVisible = ref(false);
onMounted(async () => {
  getTableData();
});
const getTableData = async () => {
  const res = await axios.get("/adminapi/news/list");
  console.log(res.data);
  tableData.value = res.data.data;
};
const categoryFormat = (category) => {
  const arr = ["最新动态", "典型案例", "通知公告"];
  return arr[category - 1];
};
const handleSwitch = async (item) => {
  // console.log(isPublish);
  await axios.put("/adminapi/news/publish", {
    _id: item._id,
    isPublish: item.isPublish,
  });
  await getTableData();
};
const handlePreview = (data) => {
  previewDate.value = data;
  dialogVisible.value = true;
};
const handleDelete = async (item) => {
  await axios.delete(`/adminapi/news/list/${item._id}`);
  await getTableData();
};
const handleEdit = async (item) => {
  router.push(`/news-manage/editnews/${item._id}`);
};
</script>

<style lang="scss" scoped>
.el-table {
  margin-top: 50px;
}

::v-deep .htmlcontent {
  img {
    max-width: 100%;
  }
}
</style>
