import {defineStore} from 'pinia'
import axios from "axios";
import {ParseToken} from "../utils/jwt";
import {reactive, ref} from "vue";
import router from "../router/index.js";

// setupStore
export const useHomeStore = defineStore("homeStore",
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
                    if (res.data.code === 0) {
                        // 成功
                        let info = ParseToken(res.data.data)
                        setUserInfo(info)
                        console.log(userInfo)
                        infoFunc(res.data.msg)
                        returnValue = res.data
                    } else {
                        // 失败
                        returnValue = res.data
                        warnFunc(res.data.msg)
                    }
                })
            return returnValue
        }
        async function userRegister(data) {
            let returnValue = ""
            await axios.post("/path/api/userregister", data)
                .then(res => {
                    if (res.data.code === 0) {
                        // success
                        infoFunc(res.data.msg)
                        console.log(res.data)
                        returnValue = res.data
                    } else {
                        // failed
                        returnValue = res.data
                        warnFunc(res.data.msg)
                    }
                })
            return returnValue
        }

        // 加载jwt登录状态
        function loadUserInfo() {
            let info = localStorage.getItem("userInfo")
            if (info === null) {
                warnFunc("请登录")
                return
            }
            // 先json解析
            let userInfo = JSON.parse(info)
            let exp = userInfo.exp
            let nowTime = new Date().getTime()
            if (((exp * 1000) - nowTime) <= 0) {
                // 过期了
                warnFunc("当前登录已失效")
                return false
            }

            // 已登录
            console.log("未过期 " + userInfo)
            push({path: 'page'})
            return true

        }

        // 警告信息
        function warnFunc(msg) {
            warnStatus.value = !warnStatus.value
            warnMsg.value = msg
            setTimeout(() => {
                warnStatus.value = !warnStatus.value
            }, 100) // 延迟恢复初始值
        }

        // 提示信息
        function infoFunc(msg) {
            infoStatus.value = !infoStatus.value
            infoMsg.value = msg
            setTimeout(() => {
                infoStatus.value = !infoStatus.value
            }, 100) // 延迟恢复初始值
        }


        async function push(obj) {
            await router.push(obj).then(() => {
                // console.log(obj)
            })
        }

        function classManage() {
            push({path: '/class_manage'})
        }
        function logOut() {
            localStorage.removeItem("userInfo")
            push({path: '/'})
        }


        function addToClass(data) {
            axios.post("/path/api/classusercreate", data)
                .then(res => {
                    console.log(res)
                })
        }

        return {
            userLogin,
            loadUserInfo,
            push,
            classManage,
            userRegister,
            logOut,
            addToClass,


            warnStatus,
            warnMsg,
            infoStatus,
            infoMsg,
            userInfo,
        }
    })