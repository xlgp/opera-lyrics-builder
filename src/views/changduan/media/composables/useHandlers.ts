import { Ref } from "vue";
import { equalFiles } from "../utils/util";

export default (videoRef: Ref<HTMLMediaElement | undefined>, videoSrc: Ref<string>) => {

    let currentFile: File;

    const playVideoWithWeb = () => playVideo(videoSrc.value);

    const playVideo = (url: string) => {
        if (videoRef.value) {
            videoRef.value.src = url;
            videoRef.value.play();
        }
    };

    const playVideoWithFile = (file: File | undefined | null) => {
        if (!file) {
            console.warn("没有选择音视频文件");
            return;
        }
        if (!equalFiles(currentFile, file)) {
            currentFile = file;
            playVideo(URL.createObjectURL(file));
        }
    };

    const changeHandler = (e: Event) => {
        let inputElem = e.target as HTMLInputElement;
        let files = inputElem.files;
        if (files && files.length > 0) {
            playVideoWithFile(files[0]);
        }
    };

    const dropHandler = (ev: DragEvent) => {
        ev.preventDefault();
        let file;
        if (ev.dataTransfer?.items) {
            for (var i = 0; i < ev.dataTransfer.items.length; i++) {
                if (ev.dataTransfer.items[i].kind === "file") {
                    file = ev.dataTransfer.items[i].getAsFile();
                    break;
                }
            }
        } else if (ev.dataTransfer?.files) {
            for (var i = 0; i < ev.dataTransfer?.files?.length; i++) {
                file = ev.dataTransfer?.files[i];
                break;
            }
        }
        playVideoWithFile(file);
    };
    return {
        ondragover,
        changeHandler,
        playVideoWithWeb,
        dropHandler
    };
}