const {Service, Action, Reaction, Relation} = require("./General");
var weather = require('weather-js');

class getWeatherTemperature extends Action {
    constructor() {
        super("getWeatherTemperature", "Flag when temperature is good");
        this.arg = [{id: 0, name: "The city", type: "id", value: []}, {id: 1, name: "Min C°", type: "id", value: []}, {id: 2, name: "Max C°", type: "id", value: []}];
        this.weather = '';
    }

    check(you, result, callback) {
        console.log(result[0])
        if (this == null)
            console.log("bah alors on est un zombie ?")
        if (result[0] == undefined)
            console.log('Weather: Invalid argument')
        else {
            if (result[0].current.temperature >= Number(you.arg[1].value) && result[0].current.temperature <= Number(you.arg[2].value)) {
                if (you.weather.length == 0) {
                    you.weather = result[0].current.temperature
                    callback.activate();
                }
                else if (you.weather != result[0].current.temperature) {
                    you.weather = result[0].current.temperature
                    callback.activate();
                }
            }
        }
    }

    checkWeather(arg, callback) {
        weather.find({search: arg[0].value, degreeType: 'C'}, (err, result) => this.check(this, result, callback));
    }

    activate(callback) {
        // 86400000
        setInterval(this.checkWeather.bind(this, this.arg, callback), 5000);
    }
}

class getWeatherHumidity extends Action {
    constructor() {
        super("getWeatherHumidity", "Flag when Humidity is good");
        this.arg = [{id: 0, name: "The city", type: "id", value: []}, {id: 1, name: "Max humidity", type: "id", value: []}];
        this.weather = [];
    }

    check(you, result, callback) {
        if (result[0] == undefined)
            console.log('Weather: Invalid argument')
        else {
            console.log(result[0].current.humidity)
            if (result[0].current.humidity <= Number(you.arg[1].value)) {
                if (you.weather.length == 0) {
                    you.weather = result[0].current.humidity
                    callback.activate()
                }
                else if (you.weather != result[0].current.humidity) {
                    you.weather = result[0].current.humidity
                    callback.activate()
                }
            }
        }
    }

    checkWeather(arg, callback) {
        weather.find({search: arg[0].value, degreeType: 'C'}, (err, result) => this.check(this, result, callback))
    }

    activate(callback) {

        setInterval(this.checkWeather.bind(this, this.arg , callback), 5000);
    }
}

class getWeatherFeel extends Action {
    constructor() {
        super("getWeatherFeel", "Flag when feeling temperature is good");
        this.arg = [{id: 0, name: "The city", type: "id", value: []}, {id: 1, name: "Min C°", type: "id", value: []}, {id: 2, name: "Max C°", type: "id", value: []}];
        this.weather = '';
    }

    check(you, result, callback, err) {
        console.log(result[0])
        if (result[0] == undefined)
            console.log('Weather: Invalid argument')
        else {
            if (result[0].current.feelslike >= Number(you.arg[1].value) && result[0].current.feelslike <= Number(you.arg[2].value)) {
                if (you.weather.length == 0) {
                    you.weather = result[0].current.feelslike
                    callback.activate();
                }
                else if (you.weather != result[0].current.feelslike) {
                    you.weather = result[0].current.feelslike
                    callback.activate();
                }
            }
        }
    }

    checkWeather(arg, callback) {
        weather.find({search: arg[0].value, degreeType: 'C'}, (err, result) => this.check(this, result, callback, err));
    }

    activate(callback) {
        // 86400000
        setInterval(this.checkWeather.bind(this, this.arg, callback), 5000);
    }
}

class Weather extends Service {
    constructor () {
        super("Weather", "https://assets.ifttt.com/images/channels/650643717/icons/monochrome_large.png", "#97C751");
        this.action = [new getWeatherTemperature, new getWeatherHumidity, new getWeatherFeel];
        this.reaction = [];
    };
}

module.exports = {Weather, getWeatherTemperature, getWeatherHumidity, getWeatherFeel};
