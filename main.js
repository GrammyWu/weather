

const templateLocationBox = (data) => {
    let { location, date } = data
    let t = `
    <div class="location-box">
           <div class="location grammy-location"> ${location} </div>
           <div class="date grammy-date">${date}</div>
     </div>
    `
    return t
}

const insertLocationBox = (data) => {
    let container = e('.grammy-weather-container')
    let t = templateLocationBox(data)
    appendHtml(container, t)
}

const toggleWarmColdBy = (temp) => {
    let state = e('.grammy-weather-state')
    if (temp > 20) {
        state.classList.add('warm')
    } else {
        state.classList.remove('warm')
    }
}

const templateWeatherBox = (data) => {
    let { temp, txt_d } = data
    // 更新背景
    toggleWarmColdBy(temp)

    let t = `
      <div class="weather-box">
            <div class="temp grammy-temp"> ${temp}°c</div>
            <div class="weather grammy-weather"> ${txt_d} </div>
      </div>
    `
    return t
}

const insertWeatherBox = (data) => {
    let container = e('.grammy-weather-container')
    let t = templateWeatherBox(data)
    appendHtml(container, t)
}

const filterWeather = (data) => {
    data = data.HeWeather5[0]
    let daily = data.daily_forecast[0]
    // 温度
    let temp = Number(daily.vis)
    let txt_d = daily.cond.txt_d

    let w = data.daily_forecast
    let b = data.basic

    let ci = b.city
    let cn = b.cnty
    // 位置 
    let location = `${cn} - ${ci}`
    // 时间
    let date = formattedTime()
    let r = {
        temp,
        txt_d,
        location,
        date,
    }
    return r
}
 
const insertData = (data) => {
    insertLocationBox(data)
    insertWeatherBox(data)
}

const fetchWeather = (city = '武汉') => {
    let c = city
    let url = `https://free-api.heweather.com/v5/forecast?city=${c}&key=7caf480d5fd8416c9f60e74658d70cfa`
    let request = {
        method: 'GET',
        path: url,
        data: '',
        callback: (data) => {
            data = JSON.parse(data) 
            let r = filterWeather(data)
            // 1. 请页面容器
            clearContainer()
            // 2. 插入数据
            insertData(r)
        }
    }
    ajax(request)
}

const clearContainer = () => {
    e('.grammy-weather-container').innerHTML = ''
}

const showWeatherBy = (inputElement) => {
    let city = inputElement.value
    if (city.length == 0) {
        return
    }
    inputElement.value = ''
    fetchWeather(city)
}

const bindEventSearch = () => {
    e('.search-box').addEventListener('keydown', event => {
        let self = event.target
        // log('self', self, event.key)
        if (self.classList.contains('grammy-search-input')) {
            if (event.key === 'Enter') {
                log('按了回车键', event)
                showWeatherBy(self)
            }
        }
    })
}

const bindEvents = () => {
    bindEventSearch()
}

const __main = () => {
    bindEvents()
}

__main()
