import { ChangDuanFromType } from "../data/data";
import { START_TAG_CONTENT, DEFAULT_START_LINE, END_TAG_CONTENT, SEPARATOR } from "../data/XiquConstant";

export const hasTag = (content: string, tag: string) => {
    return content.includes(tag);
}

export const addShowTime = (content: string, textareaEl: HTMLTextAreaElement, replacement: string) => {
    let i = content.substring(0, textareaEl.selectionEnd).lastIndexOf("\n") + 1;
    textareaEl.setRangeText(replacement, i, i);
    content = textareaEl.value;
    let j = content.substring(i + 1).indexOf("\n") + i;
    textareaEl.focus();
    textareaEl.setSelectionRange(j + 2, j + 2);
    return content;
};

export const getShowTime = (
    value: string,
    separator: string,
    textareaEl: HTMLTextAreaElement
) => {
    let selectionEnd = textareaEl.selectionEnd;
    let startIndex = value.substring(0, selectionEnd).lastIndexOf("\n") + 1;

    let ei = value.substring(selectionEnd, value.length).indexOf("\n");
    let endIndex = selectionEnd + ei;
    if (ei == -1) {
        //表示到末尾
        endIndex = value.length;
    }
    let timeStr = value.substring(startIndex, endIndex);
    if (timeStr.includes(separator)) {
        return timeStr.substring(0, timeStr.indexOf(separator));
    }
    return "";
};

/**
 * hasHour 是否需要小时
 */
export const num2str = (num: number, hasHour: boolean | undefined) => {
    num = Math.floor(num * 1000);
    let h = Math.floor(num / 3600000);
    let m = Math.floor(num / 60000);
    let s = Math.floor((num % 60000) / 1000);
    let ms = Math.floor((num % 1000) / 10);
    let hStr = (h < 10 ? "0" + h : h) + ":";
    return (
        ((hasHour && hStr) || "") +
        (m < 10 ? "0" + m : m) +
        ":" +
        (s < 10 ? "0" + s : s) +
        "." +
        (ms < 10 ? "0" + ms : ms)
    );
};

export const getLrc = (formData: ChangDuanFromType) => {
    let list = [];

    list.push("[ti:" + (formData.title || "") + "]");
    list.push("[oti:" + (formData.title || "") + "]");
    list.push("[jz:" + (formData.juZhong || "") + "]");
    list.push("[jm:" + (formData.juMu || "") + "]");
    list.push("[ojm:" + (formData.juMu || "") + "]");
    list.push("[ver:" + (formData.version || "") + "]");
    list.push("[offset:" + (formData.offset || 0) + "]");
    list.push("[by:" + (formData.by || "") + "]");
    list.push("[keys:" + (formData.searchKeys || "") + "]");

    let contentList = formData.content.split("\n");

    let startTime = 0;

    for (let i = 0; i < contentList.length; i++) {
        const element = contentList[i];
        let ci = element.split(SEPARATOR);

        if (ci.length !== 2 || Number.isNaN(Number(ci[0]))) {
            throw new Error(`${i} ${element} 格式化不正确`);
        }
        if (i == 0 && hasTag(element, START_TAG_CONTENT)) {
            startTime = Number(ci[0]);
        } else {
            let time = Number(ci[0]) - startTime;
            let changci = "[" + num2str(time, false) + "]" + ci[1];
            list.push(changci);
        }
    }
    return list.join("\n");
};

export const getPastedContent = (event: ClipboardEvent) => {
    let paste = event?.clipboardData?.getData("text");
    if (paste && paste.trim()) {
        let list = paste
            .split("\n")
            .filter((value) => value.trim())
            .map((value) => value.replace(/\r/g, ""));

        if (!hasTag(list[0], START_TAG_CONTENT)) {
            list.splice(0, 0, DEFAULT_START_LINE);
        }

        if (!hasTag(list[list.length - 1], END_TAG_CONTENT)) {
            list.push(END_TAG_CONTENT);
        }
        return list.join("\n");
    }
    return "";
}