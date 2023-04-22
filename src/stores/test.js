import {defineStore} from "pinia";
import {reactive } from "vue";

export const useTestStore = defineStore('teststore',() => {
    let testValue = reactive("测试数值")
    return  {
        testValue
    }
})