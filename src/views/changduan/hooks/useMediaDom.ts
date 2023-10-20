export default () => {
    let media: HTMLMediaElement = getMedia();

    function getMedia() {
        //直接取dom, 应该要先判断一下，dom是否存在
        let media = document.getElementsByTagName('video')[0] as HTMLMediaElement;
        if (!media) {
            media = document.getElementsByTagName('audio')[0] as HTMLMediaElement;
        }
        return media;
    }

    function getCurrentTime() {
        media = media || getMedia();
        return media.currentTime;
    }

    function setCurrentTime(time: number) {
        media = media || getMedia();
        media.currentTime = time;
    }

    function setMedia(dom: HTMLMediaElement) {
        media = dom;
    }
    return {
        getCurrentTime,
        setCurrentTime,
        setMedia,
    };
};
