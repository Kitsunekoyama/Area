const {Service, Action, Reaction, Relation} = require("./General");
const needle = require('needle');
const Twit = require('twit');
var APIkey = "qDjFDFZtP9Ew0axC1pJFQsbqM"
var APIkeySecret = "Pgzzq8vM24nujxrFAjbF42XZUWUPqNGd79JzrJWhdzp7K4MkUS"
var AccessToken = "1362718137645486081-xeFhD7GpaUQtM2tqF14qkK0bsCLAwD"
var AccessTokenSecret = "32MvIDerSaUwjpg4Ev8UYoFQPR8zL1J81NhmWVDtqO3gI"
var token = "AAAAAAAAAAAAAAAAAAAAAFayMwEAAAAAjRUF2PT9eSqGAexe%2BJVz1cvk2ag%3Dou2iJbTOBzoOXfBh4CPlRDCaq7gIVrMvcwgJyEcaNzuRCNY2wM"
const LoginWithTwitter = require('login-with-twitter')

var T = new Twit({
    consumer_key:         APIkey,
    consumer_secret:      APIkeySecret,
    access_token:         AccessToken,
    access_token_secret:  AccessTokenSecret,
})

class postTweet extends Reaction {
    constructor() {
        super("postTweet", "post a tweet on twitter");
        this.arg = [{id: 0, name: "body", type: "text", value: []}];
    }
    activate() {
        for (var x = 1;x < this.arg[0].value.length;x++) {
//            this.arg[0].value[0] += this.arg[0].value[x]()
        }
        
        if (this.isActivated == "true") {
            T.post('statuses/update', {status: this.arg[0].value }, function(err, data, response) {
                console.log(data)
            })
        }
    }
}
class getTweet extends Action {
    constructor() {
        super("getTweet", "trigger when a tweet with a certain tag is posted");
        this.arg = [{id: 0, name: "hashtag", type: "id", value: ""}];
    }

    activate (callback) {
       
        var stream = T.stream('statuses/filter', { track: this.arg[0].value})
        
        stream.on('tweet', function (tweet) {
            callback.activate();
        })
    }}
class Tweeter extends Service {
    constructor() {
        super("Twitter", "https://assets.ifttt.com/images/channels/2/icons/monochrome_large.png", "#08a0e9");
        this.action = [new getTweet];
        this.reaction = [new postTweet];
    }
}

module.exports = {Tweeter, getTweet, postTweet};
