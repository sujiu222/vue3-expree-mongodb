<template>
  <div>
    <el-card>
      <el-page-header
        content="产品列表"
        icon=""
        title="产品管理"
      ></el-page-header>
    </el-card>
    <el-card>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="产品名称" width="180">
        </el-table-column>
        <el-table-column prop="introduction" label="产品简介" width="180">
        </el-table-column>
        <el-table-column prop="editTime" label="更新时间">
          <template #default="scope">
            {{ timeFormat.getTime(scope.row.editTime) }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
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
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import timeFormat from "@/util/formatTime";
import { Edit, Delete } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const router = useRouter();
const tableData = ref([]);

onMounted(async () => {
  getTableData();
});

const getTableData = async () => {
  const res = await axios.get("/adminapi/product/list");
  console.log(res.data);
  tableData.value = res.data.data;
};

const handleDelete = async (item) => {
  await axios.delete(`/adminapi/product/delete/${item._id}`);
  await getTableData();
};
const handleEdit = async (item) => {
  router.push(`/product-manage/editproduct/${item._id}`);
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
