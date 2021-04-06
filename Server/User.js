//const s = require("./DateAndTime");
const {DiscordRcv, DiscordMsg} = require("./Diskord");
const {newVideo} = require("./Youtube");
const {Service, Action, Reaction, Relation} = require("./General");
const {DateTime, EveryDayAt, EveryYearAt} = require("./DateAndTime");
const {Tweeter, getTweet, postTweet} = require("./Tweeter")
const {Gmail, sendMail, newMail, gotMailFrom, gotMailSubject} = require("./Gmail");
const {Reddit, getReddit, getTrophiesReddit, postReddit, getRedditHot} = require("./Reddit")
const {Weather, getWeatherTemperature, getWeatherHumidity, getWeatherFeel} = require("./Weather")
const {Steam, getSteamAppNews, getSteamNewGame, getSteamLvl} = require("./Steam")
const {Twitch, getTwitch, getTwitchVideo, getTwitchClip} = require("./Twitch")
const {google} = require('googleapis')
let act = {"EveryDayAt": new EveryDayAt,
            "EveryYearAt": new EveryYearAt,
            "DiscordRcv": new DiscordRcv,
            "newVideo": new newVideo,
            "getTweet": new getTweet,
            "newMail": new newMail,
            "getReddit": new getReddit,
            "getTrophiesReddit": new getTrophiesReddit,
            "getRedditHot": new getRedditHot,
            "getWeatherTemperature": new getWeatherTemperature,
            "getWeatherHumidity": new getWeatherHumidity,
            "getWeatherFeel": new getWeatherFeel,
            "getTwitch": new getTwitch,
            "getTwitchVideo": new getTwitchVideo,
            "getTwitchClip": new getTwitchClip,
            "getSteamAppNews": new getSteamAppNews,
            "getSteamLvl": new getSteamLvl,
           "getSteamNewGame": new getSteamNewGame,
           "gotMailSubject": new gotMailSubject,
           "gotMailFrom": new gotMailFrom
          }
let react = {"DiscordMsg": new DiscordMsg,
             "postTweet": new postTweet,
             "postReddit": new postReddit,
             "sendMail": new sendMail}
module.exports = class User {
    constructor(username, password, id) {
        this.username = username;
        this.password = password;
        this.id = id;
        this.relations = [];
        this.google_oauth = "";
        this.twitter_oauth = "";
        this.ndx = 0;
    }
    deleteRelation(id) {        
        for (let x = 0;x != this.relations.length;x++)
            if (this.relations[x].id == id) {
                this.relations.splice(x, 1);
                break;
            }

    }
    activeRelation(id) {
        console.log("active")
        for (let x = 0;x != this.relations.length;x++)
            if (this.relations[x].id == id) {
                console.log("activerelation")
                this.relations[x].reaction.isActivated = "true";
                break;
            }
    }
    unactiveRelation(id) {
        console.log("unactive");
        for (let x = 0;x != this.relations.length;x++)
            if (this.relations[x].id == id) {
                this.relations[x].reaction.isActivated = "false";
                break;
            }
    }
    addRelation(r) {
        console.log(r.action.name)
        var are = new act[r.action.name].constructor()
        var rea = new react[r.reaction.name].constructor()
        are.arg = r.action.arg
        rea.arg = r.reaction.arg
        rea.auth = this.google_oauth;
        are.auth = this.google_oauth;
        this.relations.push(new Relation (are, rea, this.ndx))
        this.ndx += 1;
        this.relations[this.relations.length-1].action.activate(this.relations[this.relations.length-1].reaction);
    }
}
