let input = document.querySelector('input')
let btn = document.querySelector('button')
let span = document.querySelector('span')
let search_bar = document.querySelector('.search_box')
let temperature = document.querySelector('.temperature')
let condition = document.querySelector('.condition')
let humidity_t = document.querySelector('.humidity')
let wind = document.querySelector('.wind')

let reload = (action) => {
    let city = input.value.trim()
    let api

    let fetchApi = (act) => {
        fetch(api)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data)
                let searchWeather = () => {
                    const { temp, humidity } = data.main
                    const {description} = data.weather[0]

                    condition.innerText = description
                    span.innerText = data.name
                    temperature.innerText = `${parseInt(temp) - 273} °C`
                    humidity_t.innerText = `Humidity rate: ${humidity}%`
                    wind.innerText = data.wind.speed + ' ' + 'km/h'

                }
                searchWeather()
            })
            .catch((error) => {
                console.log(error)
            })

    }
    if (action == 'start') {
        let longtitude
        let latitude
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((location) => {
                longtitude = location.coords.longitude
                latitude = location.coords.latitude
                api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=49f13d2ed3ee0bcc0193b72d8fb1fb0e`
                fetchApi(api)
            })
        }
    } else {
        api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=49f13d2ed3ee0bcc0193b72d8fb1fb0e`
        fetchApi(api)
    }

}
window.onload = () => {
    reload('start')
}

fm.onsubmit = () => {
    event.preventDefault()
    reload('search')
}
