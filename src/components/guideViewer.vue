<template>
  <el-button @click="showPreview = true" text
    >说明
    <el-image :src="srcList[0]" lazy style="width: 10px; height: 10px">
      <template #placeholder>
        <div class="image-slot">...</div>
      </template>
      <template #error>
        <div class="image-slot">
          <el-icon><icon-picture /></el-icon>
        </div>
      </template>
    </el-image>
  </el-button>
  <el-image-viewer
    v-if="showPreview"
    :url-list="srcList"
    show-progress
    @close="showPreview = false"
  />
</template>
<script lang="ts" setup>
import { ref } from "vue";

const showPreview = ref(false);
const srcList = [
  "https://gitlab.com/xlgp/static/-/raw/main/opera-lyrics-builder/1.jpg",
];
</script>