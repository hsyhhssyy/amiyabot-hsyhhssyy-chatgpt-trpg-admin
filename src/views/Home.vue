<template>
  <el-container>
    <el-header class="header-bar">
      <div class="header-content">
        <div class="logo-area">
          <el-button @click="openDrawer">
            <el-icon class="toggle-button">
              <Menu />
            </el-icon>
          </el-button>
          <div class="logo">兔兔ChatGPT插件管理后台</div>
        </div>
        <a href="/">
          <div class="user-avatar">登出</div>
        </a>
      </div>
    </el-header>
    <el-container class="aside-container">
      <el-drawer width="200px" v-model="isDrawerOpen" direction="ltr">
        <el-menu :router="true" class="aside-menu">
          <el-sub-menu index="common">
            <template #title>
              <span>通用设置</span>
            </template>
            <el-menu-item index="/view-execution-log">执行日志</el-menu-item>
            <el-menu-item index="/template-editor">编辑模板</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="trpg-mode">
            <template #title>
              <span>跑团模式</span>
            </template>
            <el-menu-item index="/speech-log">对话记录</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-drawer>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, } from 'vue';

const isDrawerOpen = ref(false);

const openDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};

</script>

<style scoped>
.header-bar {
  background-color: #b3c0d1;
  color: white;
  text-align: center;
  line-height: 60px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-area {
  display: flex;
  align-items: center;
}

.logo {
  margin-left: 20px;
}

.user-avatar {
  margin-right: 20px;
}


.aside-menu {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.logout-item {
  margin-top: auto;
}
</style>
