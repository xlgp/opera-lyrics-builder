<template>
    <el-row :gutter="20">
        <el-col :span="8">
            <Media />
        </el-col>
        <el-col :span="16">
            <Builder :juZhongs="JUZHONGLIST" :autosize="autosize" />
        </el-col>
    </el-row>
</template>
  
<script lang="ts" setup>
import { JUZHONGLIST } from "./data/XiquConstant";
import { setCurrentWebSite } from "./hooks/useWebSite";

setCurrentWebSite();

const autosize = { minRows: 15, maxRows: 30 };
</script>
  