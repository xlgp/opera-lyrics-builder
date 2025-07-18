<template>
    <el-drawer v-model="drawer" title="Lrc格式" :direction="direction" size="45%">
        <pre><code>{{ lrc }}</code></pre>
    </el-drawer>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const drawer = ref(false);
const direction = "ltr";

const lrc = ref("");

</script>
<style lang="css" scoped>
pre {
    padding: 1em 1em 0 1em;
    background-color: #1a1a1a;
    color: #f8fcff;
    border-radius: 4px;
}

pre code {
    line-height: 1.618;
    font-size: 1.1em;
}
</style>