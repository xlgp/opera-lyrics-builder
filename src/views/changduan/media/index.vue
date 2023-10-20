<template>
  <div :ondrop="dropHandler" :ondragover="(e: Event) => e.preventDefault()">
    <el-input
      size="large"
      v-model="videoSrc"
      placeholder="于此输入音视频网络地址"
      clearable
    >
      <template #append>
        <el-button @click="playVideoWithWeb">播放</el-button>
      </template>
    </el-input>
    <video ref="videoRef" controls class="video" autoplay></video>
    <div class="btn">
      <input type="file" id="file" hidden @change="changeHandler" />
      <label for="file" class="el-button">
        <span>选择音视频</span>
      </label>
      <el-button type="primary" @click="$emit('playCurrent')">当前时间播放</el-button>
    </div>
    <el-alert
      style="margin-top: 10px"
      title="鼠标放在唱词输入框中有时间所在行，点击当前时间播放按钮"
      type="info"
      show-icon
    />
    <el-alert
      style="margin-top: 10px"
      title="拖拽音视频至视频区域可自动播放视频"
      type="info"
      show-icon
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import useHandlers from "./composables/useHandlers";

const videoRef = ref<HTMLMediaElement | undefined>();

const videoSrc = ref<string>("");

const emit = defineEmits(["playCurrent"]);

const { changeHandler, playVideoWithWeb, dropHandler } = useHandlers(videoRef, videoSrc);
</script>
<style lang="css">
.btn {
  display: flex;
  justify-content: space-between;
}

.video {
  height: 400px;
  width: 100%;
  background: #1e1e1e;
  border: 1px dashed #120b1d;
  border-radius: 4px;
  margin: 10px 0;
}
</style>
