<template>
  <div>
    <vue-particles
      id="tsparticles"
      @particles-loaded="particlesLoaded"
      :options="option"
    />
  </div>
  <div class="formContainer">
    <h3>企业门户网站管理系统</h3>
    <el-form
      ref="loginFormRef"
      style="max-width: 600px"
      :model="loginForm"
      status-icon
      :rules="loginrules"
      label-width="auto"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()"> 登陆 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { useStore } from "vuex"; // Import useStore from vuex
import { ElMessage } from "element-plus";
import axios from "axios";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const loginForm = reactive({
  username: "",
  password: "",
});
const loginFormRef = ref();
const loginrules = reactive({
  username: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
  ],
});
const handleLogin = () => {
  localStorage.setItem("token", "kerwin");
};
const particlesLoaded = async (container) => {
  console.log("Particles container loaded", container);
};
const submitForm = () => {
  loginFormRef.value.validate((valid) => {
    //console.log(valid);
    if (valid) {
      // console.log(loginForm);
      // localStorage.setItem("token", "kerwin");
      axios.post("/adminapi/user/login", loginForm).then((res) => {
        console.log(res.data);
        if (res.data.ActionType === "OK") {
          store.commit("changeUserInfo", res.data.data);
          store.commit("changeGetterRouter", false); //因为在进入一次管理员页面后，Router配置过了，再登陆编辑页面的时候可以直接越权访问页面，所以重新加载一遍路由
          // console.log(JSON.stringify(store.state.userInfo, null, 2));
          // localStorage.setItem("token", res.data.token);
          router.push("/index");
        } else {
          ElMessage.error({
            message: "用户名和密码不匹配",
          });
        }
      });
      //     .catch(err => {
      //         console.log(err);
      //     })
    }
  });
};
const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};

const option = {
  background: {
    color: {
      value: "#0d47a1",
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: "bounce",
      random: false,
      speed: 6,
      straight: false,
    },
    number: {
      density: {
        enable: true,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: true,
};
</script>

<style lang="scss" scoped>
.formContainer {
  width: 500px;
  height: 200px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: rgba($color: #000000, $alpha: 0.5);
  color: white;
  text-align: center;
  padding: 20px;

  h3 {
    font-size: 30px;
    margin-bottom: 20px;
  }
}

::v-deep .el-form-item__label {
  //v-deep就是一个印记 ，当使用这个后就会从.el-form-item__label[data-v-26084dc2] 变成[data-v-26084dc2] .el-form-item__label
  color: white;
}
</style>
