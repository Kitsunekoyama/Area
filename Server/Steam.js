const {Service, Action, Reaction, Relation} = require("./General");

var SteamAPI = require('steamapi');

class getSteamAppNews extends Action {
    constructor() {
        super("getSteamAppNews", "Flag when there is news from an steam app");
        this.arg = [{id: 0, name: "Steam app", type: "id", value: []}];
        this.app = []
        this.result = []
        this.s = new SteamAPI('FCA9C5A0284B86B3DD6601D10E7867FB');
    }

    check(you, data, callback) {
        try {
            console.log(data);
            if (you.app.length == 0) {
                you.app = data; 
            }
            else if (you.app != data) {
                you.app = data;
                callback.activate();
            }
        } catch (e) {you.app = data;};
    }

    checkSteam(arg, callback) {
        this.s.getGameNews(arg[0].value).then(app => {
            this.check(this, app[0].gid, callback);
            console.log(app[0])
            console.log(app[1])
            console.log(app[2])
        }).catch(err => {console.log(err)});
    }

    activate(callback) {
        setInterval(this.checkSteam.bind(this, this.arg , callback), 5000);
    }
}

class getSteamNewGame extends Action {
    constructor() {
        super("getSteamNewGame", "Flag when there is new game");
        this.arg = [];
        this.game = []
        this.result = []
        this.s = new SteamAPI('FCA9C5A0284B86B3DD6601D10E7867FB');
    }

    check(you, data, callback) {
        console.log(data);
        try {
            if (you.game.length == 0) {
                you.game = data; 
            }
            else if (you.game != data) {
                you.game = data;
                callback.activate();
            }
        } catch (e) {you.game = data;};
    }

    checkSteam(callback) {
        this.s.getFeaturedGames().then(app => {
            console.log(app.featured_win[0]);
            console.log(app.featured_win[1]);
            console.log(app.featured_win[2]);
            this.check(this, app.featured_win[0].id);
        }).catch(err => {console.log(err)});
    }

    activate(callback) {
        setInterval(this.checkSteam.bind(this, callback), 5000);
    }
}

// class getSteamAchievements extends Action {
//     constructor() {
//         super("getSteamAchievements", "Flag when there is news achievements on the steam app");
//         this.arg = [{id: 0, name: "Steam app", type: "id", value: []}, {id: 1, name: "user", type: "id", value: []}];
//         this.app = []
//         this.result = []
//         this.s = new SteamAPI('FCA9C5A0284B86B3DD6601D10E7867FB');
//     }

//     check(you, data, callback) {
//         try {
//             console.log(data);
//             if (you.app.length == 0) {
//                 you.app = data; 
//             }
//             else if (you.app != data) {
//                 you.app = data;
//                 callback.activate();
//             }
//         } catch (e) {you.app = data;};
//     }

//     checkSteam(arg, callback) {
//         console.log(arg[0].value)
//         console.log(arg[1].value)
//         this.s.getUserAchievements(arg[1].value, arg[0].value).then(app => {
//             // console.log(app)
//             // this.check(this, app[0].gid, callback);
//         })
//     }

//     activate(callback) {
//         setInterval(this.checkSteam.bind(this, this.arg , callback), 5000);
//     }
// }

class getSteamLvl extends Action {
    constructor() {
        super("getSteamLvl", "Flag when the user lvl up");
        this.arg = [{id: 1, name: "user id", type: "id", value: []}];
        this.app = [];
        this.result = [];
        this.s = new SteamAPI('FCA9C5A0284B86B3DD6601D10E7867FB');
    }

    check(you, data, callback) {
        try {
            console.log(data);
            if (you.app.length == 0) {
                you.app = data; 
            }
            else if (you.app != data) {
                you.app = data;
                callback.activate();
            }
        } catch (e) {you.app = data;};
    }

    checkSteam(arg, callback) {
        this.s.getUserLevel(arg[0].value).then(app => {
            this.check(this, app, callback);
        }).catch(err => {console.log(err)});
    }

    activate(callback) {
        setInterval(this.checkSteam.bind(this, this.arg , callback), 5000);
    }
}

class Steam extends Service {
    constructor () {
        super("Steam", "https://assets.ifttt.com/images/channels/32/icons/monochrome_large.png", "#333333");
        this.action = [new getSteamAppNews, new getSteamNewGame, new getSteamLvl];
        this.reaction = [];
    };
}

module.exports = {Steam, getSteamAppNews, getSteamNewGame, getSteamLvl};
