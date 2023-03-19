

export default function kirby() {

    let num = Math.random()
    if (num > 0 && num <= 0.2)
        num = 0
    if (num > 0.2 && num <= 0.4)
        num = 1
    if (num > 0.4 && num <= 0.6)
        num = 2
    if (num > 0.6 && num <= 0.8)
        num = 3
    if (num > 0.8 && num <= 1)
        num = 4

    switch (num) {
        case 0:
            console.log(num)
            return
        case 1:
            console.log(num)
            return
        case 2:
            console.log(num)
            return
        case 3:
            console.log(num)
            return
        case 4:
            console.log(num)
            return
        default:
            return
        // audio播放 https://blog.csdn.net/animatecat/article/details/97646746

    }
}