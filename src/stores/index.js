import {defineStore} from 'pinia'
import axios from "axios";
import {ParseToken} from "../utils/jwt";
import {reactive, ref} from "vue";
import router from "../router/index.js";

// setupStore
export const useHomeStore = defineStore("counter",
    () => {
        let warnStatus = ref(false)
        let infoStatus = ref(false)
        let infoMsg = ref("")
        let warnMsg = ref("")
        const userInfo = reactive({
            username: "",
            stu_id: 0,
            iss: "",
            exp: 0
        })

        // 浏览器localStorage设置jwt
        function setUserInfo(info) {
            userInfo.iss = info.iss
            userInfo.stu_id = info.stu_id
            userInfo.username = info.username
            userInfo.exp = info.exp
            // 持久化
            localStorage.setItem("userInfo", JSON.stringify(info))
        }

        // 用户登录，请求jwt
        async function userLogin(data) {
            let returnValue = ""
            await axios.post("/path/api/userlogin", data)
                .then(res => {
                    // todo 加入返回code码判断
                    if (res.data.code === 0) {
                        // 成功
                        let info = ParseToken(res.data.data)
                        setUserInfo(info)
                        console.log(userInfo)
                        infoFunc("登陆成功")
                        returnValue = res.data
                    } else {
                        // 失败
                        returnValue = res.data
                    }
                })
            return returnValue
        }
        // todo 清除jwt登录状态
        // 加载jwt登录状态
        function loadUserInfo() {
            let info = localStorage.getItem("userInfo")
            if (info === null) {
                return
            }
            // 先json解析
            let userInfo = JSON.parse(info)
            let exp = userInfo.exp
            let nowTime = new Date().getTime()
            // fixme 无法使用计算
            if (((exp * 1000) - nowTime) <= 0) {
                // 过期了
                warnFunc("当前登录已失效")
                return false
            }

            // 已登录
            console.log("未过期 " + userInfo)
            return true

        }

        // 警告信息
        function warnFunc(msg) {
            warnStatus.value = !warnStatus.value
            warnMsg.value = msg
            setTimeout(() => {
                warnStatus.value = !warnStatus.value
                console.log(warnStatus.value)
            }, 100) // 延迟恢复初始值
        }
        // 提示信息
        function infoFunc(msg) {
            infoStatus.value = !infoStatus.value
            infoMsg.value = msg
            setTimeout(() => {
                infoStatus.value =!infoStatus.value
            }, 100) // 延迟恢复初始值
        }


        function push(obj) {
            router.push(obj).then(() => {
                console.log(obj)
            })
        }
        return {
            userLogin: userLogin,
            loadUserInfo: loadUserInfo,
            warnStatus: warnStatus,
            warnMsg: warnMsg,
            infoStatus: infoStatus,
            infoMsg: infoMsg,
            push: push,
        }
    })