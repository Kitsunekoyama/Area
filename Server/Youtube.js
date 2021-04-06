const {Service, Action, Reaction, Relation} = require("./General");
const {google} = require('googleapis')
const fetch = require('node-fetch');
//"https://youtube.googleapis.com/youtube/v3/activities?part=snippet%2CcontentDetails&channelId="
/*
class newSubscribe extends Action {
    constructor() {
        super("newSubscribe", "Trigger when the user subscribe to a new channel")

    }

}*/

class newVideo extends Action {
    constructor() {
        super("newVideo", "Trigger when a new Video is posted in a channel");
        this.videos = [];
        this.arg = [{id: 0, name: "channel", type: "id", value: ""}];
    }

    check(you, data, callback) {
        try {
            if (you.Videos.items[0].snippet.title != data.items[0].snippet.title) {
                you.Videos = data;
                callback.activate();
                console.log(data);
            }
        } catch (e) {you.Videos = data;};
    }
    checkVideo(arg, callback) {        
        fetch("https://youtube.googleapis.com/youtube/v3/activities?part=snippet%2CcontentDetails&channelId=" + arg.channel + "&maxResults=2&key=AIzaSyDh-X6iSVUNwFvwoI___VEtBWNfrSG5s_g")
        .then(resp => resp.json())
        .then(data => this.check(this, data, callback))
    }
    activate(callback)  {
            setInterval(this.checkVideo.bind(this, this.arg, callback), 5000);
    }
}
class Youtube extends Service {
    constructor() {
        super("Youtube", "https://assets.ifttt.com/images/channels/32/icons/monochrome_large.png", "#FF0000");
        this.action = [new newVideo];
        this.reaction = [];
    }
}

module.exports = {Youtube, newVideo}
