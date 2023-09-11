<template>
  <el-container>
    <el-header>
      <div class="header-content">
        <div class="logo">兔兔TRPG管理后台</div>
        <div class="user-avatar" index="/speech-log">兔兔可爱</div>
      </div>
    </el-header>
    <el-container class="aside-container">
      <el-aside width="200px">
        <el-menu :router="true" class="aside-menu">
          <el-menu-item index="/speech-log">对话日志</el-menu-item>
          <el-menu-item index="/env-edit">编辑世界观(EnvInfo)</el-menu-item>
          <el-menu-item index="/item-edit">编辑物品(ItemInfo)</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    // 逻辑代码
  },
});
</script>

<style scoped>
.el-header {
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
