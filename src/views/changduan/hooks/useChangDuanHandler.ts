import { FormInstance, ElMessage } from "element-plus";
import { Ref } from "vue";
import { ChangDuanFromType } from "../data/data";
import { SEPARATOR } from "../data/XiquConstant";
import { getShowTime, addShowTime, getPastedContent, getLrc } from "./changDuanUtil";
import useClipboard from "vue-clipboard3";
import useWebSite from "../hooks/useWebSite";

export default (formData: Ref<ChangDuanFromType>, getTextareaEl: () => HTMLTextAreaElement, storageData: () => void) => {

    const { toClipboard } = useClipboard();
    const { getCurrentTime, setCurrentTime } = useWebSite();

    const handlePlay = () => {
        let time = getShowTime(formData.value.content, SEPARATOR, getTextareaEl());
        time && setCurrentTime(+time);
    };

    const resetForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return;
        formEl.resetFields();
        storageData();
    };

    const handleAddTime = () => {
        formData.value.content = addShowTime(
            formData.value.content,
            getTextareaEl(),
            getCurrentTime() + SEPARATOR
        );
    };

    const handlePaste = (event: ClipboardEvent) => {
        if (formData.value.content.trim() == "") {
            formData.value.content = getPastedContent(event);
            event.preventDefault();
        }
    };

    const handleCopy = async (formEl: FormInstance | undefined) => {
        if (!formEl) {
            return;
        }
        await formEl.validate(async (valid) => {
            if (valid) {
                try {
                    await toClipboard(getLrc(formData.value));
                    ElMessage({
                        message: "已复制",
                        type: "success",
                    });
                } catch (e: any) {
                    console.error(e);
                    ElMessage.error("复制出错了, " + e.message);
                }
            } else {
                ElMessage.error("唱段校验出错");
            }
        })

    };
    return {
        handleAddTime, handleCopy, handlePaste, handlePlay, resetForm
    }
}