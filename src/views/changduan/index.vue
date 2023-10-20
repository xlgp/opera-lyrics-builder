<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <Media @play-current="playCurrent" />
    </el-col>
    <el-col :span="16">
      <Builder :juZhongs="JUZHONGLIST" :autosize="autosize" />
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref, provide } from "vue";
import { JUZHONGLIST } from "./data/XiquConstant";
import { playCountKey } from "./data/injectionSymbols";
import { setCurrentWebSite } from "./hooks/useWebSite";

setCurrentWebSite();

const autosize = { minRows: 15, maxRows: 30 };

const playCurrent = () => {
  playCount.value++;
};

const playCount = ref(0);

provide(playCountKey, playCount);
</script>
