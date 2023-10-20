export default () => {
    return {
        juZhong: [
            {
                required: true,
                message: "请输入剧种",
                trigger: "blur",
            },
        ],
        juMu: [
            {
                required: true,
                message: "请输入剧目",
                trigger: "blur",
            },
        ],
        title: [
            {
                required: true,
                message: "请输入选段",
                trigger: "blur",
            },
        ],
        offset: [
            {
                required: true,
                message: "时差",
                trigger: "blur",
            },
        ],
        content: [
            {
                required: true,
                message: "唱词",
                trigger: "blur",
            },
        ],
    };
}