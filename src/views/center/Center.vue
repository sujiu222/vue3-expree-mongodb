<template>
    <div>
        <el-page-header title="企业门户管理系统" :icon="null">
            <template #content>
                <span class="text-large font-600 mr-3"> 个人中心 </span>
            </template>
        </el-page-header>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card class="box-card">
                    <el-avatar :src="avatarUrl" :size="150" />
                    <h3>{{ store.state.userInfo.username }}</h3>
                    <h5>{{ store.state.userInfo.role == 1 ? '管理员' : '编辑' }}</h5>
                </el-card>
            </el-col>

            <el-col :span="16">
                <el-card>
                    <template #header>
                        <span>个人信息</span>
                    </template>
                    <el-form ref="userFormRef" style="max-width: 600px" :model="userForm" :rules="userFormRules"
                        label-width="auto" class="demo-ruleForm" status-icon>
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="userForm.name" />
                        </el-form-item>
                        <el-form-item label="性别" prop="gender">
                            <el-select v-model="userForm.gender" placeholder="性别" style="width: 100% ">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="个人简介" prop="introduction">
                            <el-input v-model="userForm.name" type="textarea" />
                        </el-form-item>
                        <el-form-item label="头像" prop="avatar">
                            <el-upload class="avatar-uploader"
                                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                                :show-file-list="false" :auto-upload="false">
                                <img v-if="userForm.avatar" :src="userForm.avatar" class="avatar" />
                                <el-icon v-else class="avatar-uploader-icon">
                                    <Plus />
                                </el-icon>
                            </el-upload>



                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { computed, ref, reactive } from 'vue';
import { useStore } from 'vuex';
import { Plus } from '@element-plus/icons-vue'
const store = useStore();
const { username, gender, introduction, avatar } = store.state.userInfo;
const userFormRef = ref();
const userForm = reactive({
    username,
    gender,
    introduction,
    avatar,
})
const options = [
    {
        label: '保密',
        value: 0,
    },
    {
        label: '男性',
        value: 1,
    },
    {
        label: '女性',
        value: 2,
    }
]
const avatarUrl = computed(() =>
    store.state.userInfo.avatar ? store.state.userInfo.avatar :
        'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'

)


const userFormRules = reactive({
    username: [
        { required: true, message: '请输入名字', trigger: 'blur' },
    ],
    gender: [
        { required: true, message: '请选择性别', trigger: 'blur' },
    ], introduction: [
        { required: true, message: '请输入介绍', trigger: 'blur' },
    ], avatar: [
        { required: true, message: '头像不能为空', trigger: 'blur' },
    ],
})
</script>

<style lang="scss" scoped>
.el-row {
    margin-top: 20px;

    .box-card {
        text-align: center;
    }
}

::v-deep .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}

::v-deep .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

::v-deep .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

::v-deep .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>
