<template>
  <el-form ref="zimuFormRef" :model="formData" :rules="rules" label-width="60px">
    <el-row :gutter="10">
      <el-col :span="14">
        <el-form-item prop="content">
          <el-button class="add-btn" type="primary" @click="addTimeHandler">
            <span>添加时间</span>
          </el-button>
          <el-input type="textarea" :autosize="autosize" v-model="formData.content" ref="contentRef"
            placeholder="请输入或复制唱词" @paste="handlePaste">
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="剧种" prop="juZhong">
          <el-select v-model="formData.juZhong" filterable allow-create default-first-option :reserve-keyword="false"
            placeholder="请输入剧种" :popper-append-to-body="false">
            <el-option v-for="(item, index) in juZhongs" :key="index" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="剧目" prop="juMu">
          <el-input v-model="formData.juMu" placeholder="请输入剧目"></el-input>
        </el-form-item>
        <el-form-item label="选段" prop="title">
          <el-input v-model="formData.title" placeholder="请输入选段"></el-input>
        </el-form-item>
        <el-form-item label="版本" prop="version">
          <el-input v-model="formData.version" placeholder="唱段版本（可不填）"></el-input>
        </el-form-item>
        <el-form-item label="制作者" prop="by">
          <el-input v-model="formData.by" placeholder="制作者"> </el-input>
        </el-form-item>
        <el-form-item label="时差" prop="offset">
          <el-input-number v-model="formData.offset" placeholder="时差" :step="1"></el-input-number>
        </el-form-item>
        <el-form-item label="关键词" prop="searchKeys">
          <el-input v-model="formData.searchKeys" placeholder="关键词以逗号隔开"></el-input>
        </el-form-item>
        <el-button type="primary" @click="handleCopy(zimuFormRef)">生成并复制字幕</el-button>
        <el-button plain type="primary" @click="handlePreviewLrc(zimuFormRef)">预览字幕</el-button>
        <el-popconfirm title="重置唱段内容吗？" @confirm="resetForm(zimuFormRef)">
          <template #reference>
            <el-button>重置</el-button>
          </template>
        </el-popconfirm>
        <lrc-viewer :object="lrcViewProps" />
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, onMounted, Ref, inject, watch, toRefs } from "vue";
import useChangDuanRules from "../hooks/useChangDuanRules";
import useInitChangDuan from "../hooks/useInitChangDuan";
import useChangDuanHandler from "../hooks/useChangDuanHandler";
import { ChangDuanFromType } from "../data/data.d";
import { playCountKey } from "../data/injectionSymbols";
import { FormInstance } from "element-plus";

const formData: Ref<ChangDuanFromType> = ref<ChangDuanFromType>({
  juZhong: "",
  juMu: "",
  title: "",
  offset: -9,
  content: "",
  version: "",
  searchKeys: "",
  by: "戏曲字幕",
});

const props = defineProps({
  autosize: {
    type: [Object, Boolean],
    default: { minRows: 15, maxRows: 15 },
  },
  juZhongs: {
    type: Array<string>,
    default: []
  },
  currentTime: {
    type: Number,
    default: 0
  },
});

const { currentTime } = toRefs(props);

const emit = defineEmits(['getCurrentTime', 'addTime'])

const playCount = inject<Ref<number>>(playCountKey, ref(0));

const zimuFormRef = ref();
const contentRef = ref();
let textareaEl: HTMLTextAreaElement = (undefined as unknown) as HTMLTextAreaElement;

const lrcViewProps = ref({
  show: false,
  content: ""
});

const { init, storageData } = useInitChangDuan(formData);

const {
  handleCopy,
  handlePaste,
  getCurrentTime,
  resetForm,
  validateAndGenerateLrc
} = useChangDuanHandler(formData, currentTime, () => textareaEl, storageData);

const handlePreviewLrc = async (formEl: FormInstance | undefined) => {
  const props = { show: false, content: "" };
  try {
    props.content = await validateAndGenerateLrc(formEl);
    props.show = true;
  } catch (e: any) {
    console.error(e);
    ElMessage.error("预览出错了\n" + e.message);
  }
  lrcViewProps.value = props;
}

const rules = useChangDuanRules();

const addTimeHandler = () => {
  emit("addTime");
}

watch(() => playCount.value, () => emit("getCurrentTime", getCurrentTime()))

onMounted(() => {
  init();
  textareaEl = contentRef.value.$el.firstElementChild;
});
</script>
<style scoped>
.add-btn {
  width: 52px;
  position: absolute;
  left: -60px;
  top: 0;
  height: 100%;
}

.add-btn span {
  writing-mode: vertical-lr;
}
</style>
