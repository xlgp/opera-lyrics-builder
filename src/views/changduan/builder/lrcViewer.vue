<template>
    <el-drawer v-model="object.show" title="Lrc格式" direction="ltr" size="45%">
        <pre><code>{{ object.content }}</code></pre>
    </el-drawer>
</template>
<script setup lang="ts">
import { toRefs } from 'vue';

const props = defineProps({
    object: {
        type: Object,
        default: {
            show: { type: Boolean, default: false },
            content: { type: String, default: "" }
        }
    }
});

const { object } = toRefs(props);

</script>
<style lang="css" scoped>
pre {
    padding: 1em;
    background-color: #1a1a1a;
    color: #f8fcff;
    border-radius: 4px;
}

pre code {
    line-height: 1.618;
    font-size: 1.1em;
}
</style>