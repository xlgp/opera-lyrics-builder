import { Ref } from "vue";
import { ChangDuanFromType } from "../data/data";

export default (formData: Ref<ChangDuanFromType>) => {

    const storageKey = "__ZIMU_CHANGDUAN_FORM";
    function initFormData() {
        let storageValue = localStorage.getItem(storageKey);
        if (storageValue) {
            formData.value = JSON.parse(storageValue);
        }
    }

    function storageData() {
        localStorage.setItem(storageKey, JSON.stringify(formData.value));
    }

    function unloadListener() {
        window.addEventListener("unload", storageData);
    }

    return {
        init: () => {
            initFormData();
            unloadListener();
        },
        storageData
    }
}