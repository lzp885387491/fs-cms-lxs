<script setup lang="ts">
import { reactive } from 'vue'
import { RouterView } from 'vue-router'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const { locale } = reactive({
  locale: zhCn
})
</script>

<template>
  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
</template>

<style>
body {
  min-height: 100vh;
}
</style>
