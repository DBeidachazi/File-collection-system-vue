export function ParseToken(token) {
    let payload = token.split(".")[1]
    // console.log(userInfo)
    return JSON.parse(decodeURIComponent(escape(window.atob(payload.replace(/-/g, "+").replace(/_/g, "/")))))
}