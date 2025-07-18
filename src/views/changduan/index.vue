<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <Media @play-current="playCurrent" />
    </el-col>
    <el-col :span="16">
      <Builder :juZhongs="JUZHONGLIST" :autosize="autosize" :currentTime="currentTime" @add-time="addTimeHandler"
        @get-current-time="handleGetCurrentTime" />
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref, provide } from "vue";
import { JUZHONGLIST } from "./data/XiquConstant";
import { playCountKey } from "./data/injectionSymbols";
import useWebSite, { setCurrentWebSite } from "./hooks/useWebSite";
import useElmessage from "./hooks/useElmessage";

useElmessage();

setCurrentWebSite();

const { getCurrentTime, setCurrentTime } = useWebSite();

const autosize = { minRows: 15, maxRows: 30 };

const currentTime = ref<number>(0);

const playCurrent = () => {
  playCount.value++;
};

const playCount = ref(0);

provide(playCountKey, playCount);

/**
 * 唱词字幕
 * 外部传入当前时间，
 *
 */

const handleGetCurrentTime = (currentTime: number) => {
  setCurrentTime(currentTime);
};
const addTimeHandler = () => {
  currentTime.value = getCurrentTime();
};
</script>
