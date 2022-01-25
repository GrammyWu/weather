const debug = true
const log = debug ? console.log.bind(console) : function () { }

const int = number => parseInt(number, 10)

const len = arr_or_str => arr_or_str.length

const copy = arr_or_obj => {
    let a = JSON.parse(JSON.stringify(arr_or_obj))
    return a
}

const bindEvent = (element, eventName, callback) => {
    element.addEventListener(eventName, callback)
}
const bindAll = (elements, eventName, callback) => {
    for (let e of elements) {
        bindEvent(e, eventName, callback)
    }
}
const appendHtml = (element, html) => {
    element.insertAdjacentHTML('beforeend', html)
}

const e = selector => document.querySelector(selector)
const es = selector => document.querySelectorAll(selector)

const find = (ele, sel) => {
    return ele.querySelector(sel)
}

const ajax = (request) => {
    let {method, path, data, callback} = request
    let r = new XMLHttpRequest()
    r.open(method, path, true)
    r.setRequestHeader('Content-Type', 'application/json')
    r.onreadystatechange = () => {
        // log('r', r, r.readyState)
        if (r.readyState === 4) {
            // log('r', r.response)
            callback(r.response)
        }
    }
    if (method === 'POST') {
        data = JSON.stringify(data)
    }
    r.send(data)
}

const formattedTime = () => {
    let d = new Date()

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
}
 