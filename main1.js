class Weather {
    constructor(city = '武汉') {
        this.container = e('.grammy-weather-container')
        // 默认输入的城市是武汉
        this.input_city = city
        // 初始化
        this.init()
    }
    static new(...args) {
        let n = new this(...args)
        return n
    }
    filterWeather(data) {
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
    templateLocationBox(data) {
        let { location, date } = data
        let t = `
        <div class="location-box">
               <div class="location grammy-location"> ${location} </div>
               <div class="date grammy-date">${date}</div>
         </div>
        `
        return t
    }
    insertLocationBox(data) {
        let t = this.templateLocationBox(data)
        appendHtml(this.container, t)
    }
    toggleWarmColdBy(temp) {
        let state = e('.grammy-weather-state')
        if (temp > 20) {
            state.classList.add('warm')
        } else {
            state.classList.remove('warm')
        }
    }
    templateWeatherBox(data) {
        let { temp, txt_d } = data
        // 更新背景
        this.toggleWarmColdBy(temp)
        let t = `
          <div class="weather-box">
                <div class="temp grammy-temp"> ${temp}°c</div>
                <div class="weather grammy-weather"> ${txt_d} </div>
          </div>
        `
        return t
    }
    insertWeatherBox(data) {
        let t = this.templateWeatherBox(data)
        appendHtml(this.container, t)
    }
    insertData(data) {
        this.insertLocationBox(data)
        this.insertWeatherBox(data)
    }
    clearContainer() {
        e('.grammy-weather-container').innerHTML = ''
    }
    renderWeather() {
        let self = this
        let c = this.input_city
        let url = `https://free-api.heweather.com/v5/forecast?city=${c}&key=7caf480d5fd8416c9f60e74658d70cfa`
        let request = {
            method: 'GET',
            path: url,
            data: '',
            callback: (data) => {
                log('this.', this)
                data = JSON.parse(data)
                // 过滤数据
                let r = self.filterWeather(data)
                // 1. 请页面容器
                self.clearContainer()
                // 2. 插入数据
                self.insertData(r)
            }
        }
        ajax(request)
    }
    bindEventSearch() {
        let self = this
        e('.search-box').addEventListener('keydown', event => {
            let input = event.target
            if (input.classList.contains('grammy-search-input')) {
                if (event.key === 'Enter') {
                    let city = input.value
                    if (city.length == 0) {
                        return
                    }
                    self.input_city = city
                    self.renderWeather()
                    input.value = ''
                }
            }
        })
    }
    init() {
        // 渲染数据
        this.renderWeather()
        // 绑定事件
        this.bindEventSearch()
    }
}

const __main = () => {
    Weather.new()
}

__main()