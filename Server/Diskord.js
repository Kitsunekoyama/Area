const {Service, Action, Reaction, Relation} = require("./General");
const D = require('discord.js');
//const client = new D.Client();
/*client.on('ready', msg => {
    client.channels.fetch("810837502151622666").then((channel) => {
        channel.send("newTEST")
    })
    console.log('ready');
});
client.on('message', msg => {
});*/

class DiscordMsg extends Reaction {
    constructor() {
        super("DiscordMsg", "Send a message on a channel");
        this.arg = [{id: 0, name: "body", type: "text", value: ""}, {id: 1, name: "token", type: "id", value: ""}, {id: 2, name: "channel", type: "id", value: ""}];
        this.client = new D.Client();
        this.isLogin = false;
    }
    activate() {
        if (this.isLogin == false) {
            this.client.login(this.arg[1].value)
            if (this.isActivated == "true") {
                this.client.on('ready', msg => {
                    this.isLogin = true;
                })                         
            }
        }
        if (this.isLogin == true) {
            this.client.channels.fetch(this.arg[2].value).then((user) => {
                user.send(this.arg[0].value)
            })
        }
    }
}
class DiscordRcv extends Action {
    constructor() {
        super("DiscordRcv", "Trigger when a message is received in a channel");
        this.arg = [{id: 0, name: "token", type: "id", value: ""}, {id: 1, name: "channel", type: "id", value: ""}];
        this.client = new D.Client();
    }
    activate(callback) {
        this.client.login(this.arg[0].value)
        this.client.on('message', msg => {
            callback.activate();
        });
    }
}
class Discord extends Service {
    constructor() {
        super("Discord", "https://www.freepnglogos.com/uploads/discord-logo-png/concours-discord-cartes-voeux-fortnite-france-6.png", "#7289da");
        this.action = [new DiscordRcv];
        this.reaction = [new DiscordMsg]
    }
}

module.exports = {Discord, DiscordRcv, DiscordMsg};
