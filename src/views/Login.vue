<template>
    <div>
        <vue-particles id="tsparticles" @particles-loaded="particlesLoaded" :options="option" />
    </div>
    <div class="formContainer">
        <el-form ref="loginFormRef" style="max-width: 600px" :model="loginForm" status-icon :rules="loginrules"
            label-width="auto" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="loginForm.username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">
                    Submit
                </el-button>
                <el-button @click="resetForm(loginFormRef)">Reset</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
const loginForm = reactive({
    username: '',
    password: ''
})
const loginFormRef = ref()
const loginrules = reactive({
    username: [{
        required: true, message: '请输入用户名', trigger: 'blur'
    }],
    password: [{
        required: true, message: '请输入密码', trigger: 'blur'
    }],
})
const handleLogin = () => {
    localStorage.setItem("token", "kerwin");
};
const particlesLoaded = async container => {
    console.log("Particles container loaded", container);
};
const submitForm = () => {

}
const resetForm = (formEl) => {
    if (!formEl) return;
    formEl.resetFields()
}



const option = {
    background: {
        color: {
            value: '#0d47a1'
        }
    },
    fpsLimit: 120,
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: 'push'
            },
            onHover: {
                enable: true,
                mode: 'repulse'
            },
        },
        modes: {
            bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40
            },
            push: {
                quantity: 4
            },
            repulse: {
                distance: 200,
                duration: 0.4
            }
        }
    },
    particles: {
        color: {
            value: '#ffffff'
        },
        links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1
        },
        move: {
            direction: 'none',
            enable: true,
            outModes: 'bounce',
            random: false,
            speed: 6,
            straight: false
        },
        number: {
            density: {
                enable: true,
            },
            value: 80
        },
        opacity: {
            value: 0.5
        },
        shape: {
            type: 'circle'
        },
        size: {
            value: { min: 1, max: 5 }
        }
    },
    detectRetina: true
};


</script>

<style lang="scss" scoped></style>