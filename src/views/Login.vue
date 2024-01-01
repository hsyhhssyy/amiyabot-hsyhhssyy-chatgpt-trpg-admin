<template>
    <div class="login-container">
        <el-card class="login-card">
            <div slot="header">
                <h1>兔兔TRPG管理器</h1>
            </div>
            <p class="disclaimer">本网站<b style="color: red;">不是</b>鹰角网络或腾讯下属的官方网站。</p>
            <el-form label-width="100px">
                <el-form-item label="服务器地址：">
                    <el-input v-model="email" placeholder="AmiayBot服务地址"></el-input>
                </el-form-item>
                <el-form-item label="连接密钥：">
                    <el-input type="password" v-model="password" placeholder="AmiyaBot服务秘钥"></el-input>
                </el-form-item>
                <el-form-item>
                    <div class="button-container">
                        <el-button type="primary" @click="login">登录</el-button>
                    </div>
                </el-form-item>
            </el-form>
            <div class="footer">
                <p>本网站不是鹰角网络或腾讯的官方网站，而是由爱好者自行开发的工具网站。</p>
            </div>
        </el-card>
    </div>
</template>
  
<script lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const router = useRouter();
        const email = ref('');
        const password = ref('');

        const login = async () => {
            try {

                axios.defaults.baseURL = email.value;

                axios.interceptors.request.use(
                    config => {
                        config.headers['authKey'] = password.value;
                           
                        return config;
                    },
                    error => {
                        return Promise.reject(error);
                    }
                );

                router.push('/home');
            } catch (error) {
                console.error("An error occurred while logging in:", error);
            }
        };

        return {
            email,
            password,
            login
        };
    },
};
</script>
  
<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.login-card {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
    width: 600px;
    text-align: center;
}

.disclaimer {
    font-size: 14px;
    color: gray;
    text-align: center;
    margin-bottom: 20px;
}

.button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.footer {
    text-align: center;
    font-size: 14px;
    color: gray;
}
</style>