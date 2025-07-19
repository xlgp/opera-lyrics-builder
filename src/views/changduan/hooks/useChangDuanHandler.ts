import { FormInstance } from "element-plus";
import { Ref, watch } from "vue";
import { ChangDuanFromType } from "../data/data";
import { SEPARATOR } from "../data/XiquConstant";
import { getShowTime, addShowTime, getPastedContent, generateLrc } from "./changDuanUtil";
import useClipboard from "vue-clipboard3";

export default (formData: Ref<ChangDuanFromType>,
    currentTime: Ref<number>,
    getTextareaEl: () => HTMLTextAreaElement,
    storageData: () => void) => {

    const { toClipboard } = useClipboard();

    const getCurrentTime = () => {
        return getShowTime(formData.value.content, SEPARATOR, getTextareaEl());
    };

    const resetForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return;
        formEl.resetFields();
        storageData();
    };

    watch(currentTime, (value: number) => {
        formData.value.content = addShowTime(
            formData.value.content,
            getTextareaEl(),
            value + SEPARATOR
        );
    })

    const handlePaste = (event: ClipboardEvent) => {
        if (formData.value.content.trim() == "") {
            formData.value.content = getPastedContent(event);
            event.preventDefault();
        }
    };

    const validateAndGenerateLrc = async (formEl: FormInstance | undefined) => {
        if (!formEl) {
            throw new Error("不存在表单对象");
        }
        const valid = await formEl.validate(() => { });
        if (!valid) {
            throw new Error("唱段校验出错");
        }
        return generateLrc(formData.value);
    }

    const handleCopy = async (formEl: FormInstance | undefined) => {

        try {
            const lrc = await validateAndGenerateLrc(formEl);
            await toClipboard(lrc);
            ElMessage({
                message: "已复制",
                type: "success",
            });
        } catch (e: any) {
            console.error(e);
            ElMessage.error("复制出错了\n" + e.message);
        }
    };

    return {
        handleCopy, handlePaste, getCurrentTime, resetForm,
        validateAndGenerateLrc
    }
}