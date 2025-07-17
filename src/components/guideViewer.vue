<template>
<el-button @click="showPreview = true" text>说明</el-button>
 <el-image-viewer
        v-if="showPreview"
        :url-list="srcList"
        show-progress
        @close="showPreview = false"
      />
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const showPreview = ref(false)
const srcList = ["https://gitlab.com/xlgp/static/-/raw/main/opera-lyrics-builder/1.jpg"];

</script>