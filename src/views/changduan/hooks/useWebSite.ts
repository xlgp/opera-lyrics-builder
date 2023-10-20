import useMediaDom from './useMediaDom'

let webSite: any;

export const setCurrentWebSite = () => {
  webSite = useMediaDom();
};

export const setVideoDom = (dom: HTMLElement) => {
  webSite.setMedia(dom);
};

export default () => {
  return {
    getCurrentTime: () => {
      return webSite?.getCurrentTime();
    },
    setCurrentTime(time: number) {
      webSite.setCurrentTime(time);
    }
  };
};
