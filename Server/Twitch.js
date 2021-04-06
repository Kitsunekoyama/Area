const {Service, Action, Reaction, Relation} = require("./General");

const { ApiClient } = require('twitch');
const { ClientCredentialsAuthProvider } = require('twitch-auth');
const clientId = 'tkzflhrotprlphwgpp8t3hzp5ytkzs';
const clientSecret = 't3k589432zmt8fd0btpkm9uyc758sz';
const authProvider = new ClientCredentialsAuthProvider(clientId, clientSecret);
const apiClient = new ApiClient({ authProvider });

class getTwitch extends Action {
    constructor() {
        super("getTwitch", "Flag when the streamer stream");
        this.arg = [{id: 0, name: "Streamer name", type: "id", value: []}];
        this.isStreaming = false;
    }

    check(you, data, callback) {
        console.log(data);
        if (data == true && you.isStreaming == false) {
            you.isStreaming = true; 
            callback.activate();
        }
        else if (data == false && you.isStreaming == true) {
            you.isStreaming = false;
        }
    }

    async isStreamLive(userName) {
        const user = await apiClient.helix.users.getUserByName(userName);
        if (!user) {
            console("Invalid user")
            return false;
        }
        return await user.getStream() !== null;
    }

    checkTwitch(arg, callback) {
        this.isStreamLive(arg[0].value).catch((err) => {
            console.log(err);
        })
        .then((response => {
            this.check(this, response, callback);
        }))
    }

    activate(callback) {
        setInterval(this.checkTwitch.bind(this, this.arg, callback), 5000);
    }
}

class getTwitchVideo extends Action {
    constructor() {
        super("getTwitchVideo", "Flag when the streamer post a new video");
        this.arg = [{id: 0, name: "Streamer user id", type: "id", value: []}];
        this.video = [];
    }

    check(you, data, callback) {
        if (you.video.length == 0) {
            you.video = data;
        }
        else if (data != you.video) {
            you.video = data;
            callback.activate()
        }
    }

    async getNewVideo(userName) {
        const user = await apiClient.helix.users.getUserByName(userName).catch(err => {console.log(err)});
        const video = await apiClient.helix.videos.getVideosByUserPaginated(user.id);
        const result = await video.getNext().catch(err => {console.log(err)});

        console.log(result[0].title);
        console.log(result[1].title);
        console.log(result[2].title);
	    return (result[0].title);
    }

    checkTwitch(arg, callback) {
        this.getNewVideo(arg[0].value).catch((err) => {
            console.log(err);
        })
        .then((response => {
            this.check(this, response, callback);
        }))
    }

    activate(callback) {
        setInterval(this.checkTwitch.bind(this, this.arg, callback), 5000);
    }
}

class getTwitchClip extends Action {
    constructor() {
        super("getTwitchClip", "Flag when the streamer post a new Clip");
        this.arg = [{id: 0, name: "Streamer user id", type: "id", value: []}];
        this.clip = [];
    }

    check(you, data, callback) {
        if (you.clip.length == 0) {
            you.clip = data;
        }
        else if (data != you.clip) {
            you.clip = data;
            callback.activate()
        }
    }

    async getNewVideo(userName) {
        const user = await apiClient.helix.users.getUserByName(userName).catch(err => {console.log(err)});
        const video = await apiClient.helix.clips.getClipsForBroadcasterPaginated(user.id);
        const result = await video.getNext().catch(err => {console.log(err)});

        console.log(result[0].title);
        console.log(result[1].title);
        console.log(result[2].title);
	    return (result[0].title);
    }

    checkTwitch(arg, callback) {
        this.getNewVideo(arg[0].value).catch((err) => {
            console.log(err);
        })
        .then((response => {
            this.check(this, response, callback);
        }))
    }

    activate(callback) {
        setInterval(this.checkTwitch.bind(this, this.arg, callback), 5000);
    }
}


class Twitch extends Service {
    constructor () {
        super("Twitch", "https://assets.ifttt.com/images/channels/603756155/icons/monochrome_large.png", "#7289da");
        this.action = [new getTwitch, new getTwitchVideo, new getTwitchClip];
        this.reaction = [];
    };
}

module.exports = {Twitch, getTwitch, getTwitchVideo, getTwitchClip};
