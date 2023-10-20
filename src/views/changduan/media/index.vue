<template>
  <video ref="videoRef" controls class="video" autoplay></video>
  <div>
    <input type="file" id="file" hidden @change="changeHandler" />
    <el-input v-model="videoSrc" placeholder="于此输入音视频网络地址" clearable>
      <template #append>
        <el-button @click="playVideoWithWeb">播放</el-button>
      </template>
    </el-input>
    <label class="drag-box" for="file" :ondrop="dropHandler" :ondragover="(e: Event) => e.preventDefault()">
      <span>点我选择音视频，或拖拽音视频至此</span>
    </label>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import useHandlers from "./composables/useHandlers";

const videoRef = ref<HTMLMediaElement | undefined>();

const videoSrc = ref<string>("");

const { changeHandler, playVideoWithWeb, dropHandler } = useHandlers(
  videoRef,
  videoSrc
);
</script>
<style lang="css">
.drag-box {
  display: flex;
  height: 180px;
  margin-top: 6px;
  border: 1px dashed var(--el-color-primary);
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  color: var(--el-text-color-primary);
  cursor: pointer;
}

.video {
  height: 400px;
  width: 100%;
  background: #ece7f4;
  border: 1px dashed #120b1d;
  border-radius: 4px;
}
</style>
