<template>
  <el-container>
    <el-header>
      <div
        style="display: flex; flex: 1; background: black; height: 100%"
      ></div>
    </el-header>
    <el-main>
      <router-view v-slot="{ Component, route }">
        <!-- 使用任何自定义过渡和回退到 `fade` -->
        <transition :name="route.meta.transition || 'fade'">
          <component :is="Component" />
        </transition>
      </router-view>
    </el-main>
  </el-container>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
</style>
