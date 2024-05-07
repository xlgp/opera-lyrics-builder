<template>
    <el-menu :default-active="activeIndex" mode="horizontal" :ellipsis="false" @select="handleSelect">
        <el-menu-item index="title">戏曲字幕 唱词制作</el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="extentions"><a target="_blank" href="https://gitee.com/xlgp/XiquZimuExtensions">插件</a></el-menu-item>
        <el-menu-item index="oldVersion"><a target="_blank" href="https://xlgp.github.io/opera-lyrics-builder/changci.html">旧版</a></el-menu-item>
        <el-menu-item index="gitee"><a target="_blank" href="https://gitee.com/xlgp/opera-lyrics-builder">
                <img src="https://gitee.com/static/images/logo-en.svg" alt="Gitee" width="30"
                    style="vertical-align: middle;" />
            </a></el-menu-item>
        <el-menu-item index="gitee"><a target="_blank" href="https://github.com/xlgp/opera-lyrics-builder">
                <img src="https://gitee.com/xlgp/static/raw/master/github-logos/github-mark.svg" alt="Github" width="30"
                    style="vertical-align: middle;" />
            </a></el-menu-item>
    </el-menu>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref('title')
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
</script>
  
<style>
.flex-grow {
    flex-grow: 1;
}

.title {
    font-size: 1.5em;
    color: var(--el-color-primary-light-9);
}
</style>
  