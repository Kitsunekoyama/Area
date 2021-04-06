const {Service, Action, Reaction, Relation} = require("./General");

const snoowrap = require('snoowrap');

class postReddit extends Reaction {
        constructor() {
            super("postReddit", "post a new subreddit");
            this.arg = [{id: 0, name: "subreddit", type: "id", value: []}];
            this.post = [];
            this.r = new snoowrap({
                userAgent: 'Whatever',
                clientId: 'DmIrk5G1pBjEXg',
                clientSecret: 'W5Rrlb0xp_ujYaGtv0cUF-bFGXgwaw',
                username: 'Antique_Literature94',
                password: 'T8Q4Ckdb3GXaVFb'
            });
        }
        activate() {
            console.log('flaged')
        }
}

class getReddit extends Action {
    constructor() {
        super("getReddit", "Flag when there is a new post on the subreddit");
        this.arg = [{id: 0, name: "Subreddit", type: "id", value: []}];
        this.post = [];
        this.r = new snoowrap({
            userAgent: 'Whatever',
            clientId: 'DmIrk5G1pBjEXg',
            clientSecret: 'W5Rrlb0xp_ujYaGtv0cUF-bFGXgwaw',
            username: 'Antique_Literature94',
            password: 'T8Q4Ckdb3GXaVFb'
        });
    }

    check(you, data, callback) {
        console.log(data.title);
        try {
            if (you.post.length == 0) {
                you.post = data; 
            }
            else if (you.post.title != data.title) {
                you.post = data;
                callback.activate();
            }
        } catch (e) {you = data;};
    }

    checkReddit(arg, callback) {
        this.r.getSubreddit(arg[0].value).getNew({limit: 1}).map(data => {
            this.check(this, data, callback);
        }).catch(err => {console.log(err)});
    }

    activate(callback) {
        setInterval(this.checkReddit.bind(this, this.arg, callback), 5000);
    }
}

class getTrophiesReddit extends Action {
    constructor() {
        super("getTrophiesReddit", "Flag when the user got a new Trophies");
        this.arg = [{id: 0, name: "Name of the user", type: "id", value: []}];
        this.trophies = [];
        this.r = new snoowrap({
            userAgent: 'Whatever',
            clientId: 'DmIrk5G1pBjEXg',
            clientSecret: 'W5Rrlb0xp_ujYaGtv0cUF-bFGXgwaw',
            username: 'Antique_Literature94',
            password: 'T8Q4Ckdb3GXaVFb'
        });
    }

    check(you, data, callback) {
        console.log(data);
        console.log(you.trophies)
        try {
            if (you.trophies.length == 0) {
                you.trophies = data; 
            }
            else if (you.trophies != data) {
                you.trophies = data;
                callback.activate();
            }
        } catch (e) {you.trophies = data;};
    }

    checkReddit(arg, callback) {
        this.r.getUser(arg[0].value).getTrophies().then((data) => {
            console.log(data.trophies);
            this.check(this, data.trophies[0].name, callback);
        }).catch(err => {console.log(err)});
    }

    activate(callback) {
        setInterval(this.checkReddit.bind(this, this.arg, callback), 5000);
    }
}

class getRedditHot extends Action {
    constructor() {
        super("getRedditHot", "Flag when there is a new hot post on the subreddit");
        this.arg = [{id: 0, name: "Subreddit", type: "id", value: []}];
        this.post = [];
        this.r = new snoowrap({
            userAgent: 'Whatever',
            clientId: 'DmIrk5G1pBjEXg',
            clientSecret: 'W5Rrlb0xp_ujYaGtv0cUF-bFGXgwaw',
            username: 'Antique_Literature94',
            password: 'T8Q4Ckdb3GXaVFb'
        });
    }

    check(you, data, callback) {
        console.log(data.title);
        try {
            if (you.post.length == 0) {
                you.post = data; 
            }
            else if (you.post.title != data.title) {
                you.post = data;
                callback.activate();
            }
        } catch (e) {you = data;};
    }

    checkReddit(arg, callback) {
        this.r.getSubreddit(arg[0].value).getHot({limit: 1}).map(data => {
            this.check(this, data, callback);
        }).catch(err => {console.log(err)});
    }

    activate(callback) {
        setInterval(this.checkReddit.bind(this, this.arg, callback), 5000);
    }
}

class Reddit extends Service {
    constructor () {
        super("Reddit", "https://assets.ifttt.com/images/channels/1352860597/icons/monochrome_large.png", "#FF0000");
        this.action = [new getReddit, new getTrophiesReddit, new getRedditHot];
        this.reaction = [new postReddit];
    };
}

module.exports = {Reddit, getReddit, getTrophiesReddit, postReddit, getRedditHot};
