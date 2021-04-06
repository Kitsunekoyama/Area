const express = require('express')
const { v4: uuidv4 } = require('uuid');
const app = express()
app.use(express.json());
const port = 8080
const {DateTime, EveryDayAt, EveryYearAt} = require("./DateAndTime");
const {Discord, DiscordRcv, DiscordMsg} = require("./Diskord")
const {Youtube, newVideo} = require("./Youtube");
const {Tweeter, getTweet, postTweet} = require("./Tweeter")
const u = require("./User");
const {Service, Action, Reaction, Relation} = require("./General");
const {Gmail, sendMail} = require("./Gmail");
const {google} = require('googleapis')
const fetch = require('node-fetch');
let test = [new DateTime, new Discord, new Youtube, new Tweeter, new Gmail];
var jsonList = JSON.stringify({services: test});
let TIME = 0
let DISCORD = 1;
let YOUTUBE = 2;
let TWITTER = 3
let GMAIL = 4
let UserList = [];
var APIkey = "qDjFDFZtP9Ew0axC1pJFQsbqM"
var APIkeySecret = "Pgzzq8vM24nujxrFAjbF42XZUWUPqNGd79JzrJWhdzp7K4MkUS"
const LoginWithTwitter = require('login-with-twitter')

/*
const tw = new LoginWithTwitter({
    consumerKey: APIkey,
    consumerSecret: APIkeySecret,
    callbackUrl: 'https://0.0.0.0:3000/twitter/callback'
    })*/

const oauth2Client = new google.auth.OAuth2(
    '767475818166-edksor444kenqkh8009rulpja81m7cg6.apps.googleusercontent.com',
    'devmK7jcJu2hhFgKb_Tn34cV',
    'http://localhost:8081/google_callback'
)

const scopes = [
    'https://mail.google.com/'
]
const url = oauth2Client.generateAuthUrl({
    acces_type: 'offline',
    scope: scopes
})
app.get('/url', (req, res) => {
    res.send(url);
})
app.get('/oauthplayground', (req, res) => {
    var code = req.param("code");
    const {tokens} = test[GMAIL].oauth2Client.getToken(code)
    test[GMAIL].oauth2Client.setCredentials(tokens);
    UserList[0].googleId = oauth2Client._clientId;
    UserList[0].googleSecret = oauth2Client._clientSecret;
    console.log(UserList[0].googleId)
    console.log(UserList[0].googleSecret)
    const mail = google.gmail({
        version: 'v1',
        auth: oauth2Client
    })
    console.log(mail)
    })

/*
app.get('/twitter', (req, res) => {
    tw.login((err, tokenSecret, url) => {
        if (err) {
            // Handle the error your way
        }

        // Save the OAuth token secret for use in your /twitter/callback route
        req.session.tokenSecret = tokenSecret

        // Redirect to the /twitter/callback route, with the OAuth responses as query params
        res.redirect(url)
    })
})
app.get('/twitter/callback', (req, res) => {
    tw.callback({
        oauth_token: req.query.oauth_token,
        oauth_verifier: req.query.oauth_verifier
    }, req.session.tokenSecret, (err, user) => {
        if (err) {
            // Handle the error your way
        }

        // Delete the tokenSecret securely
        delete req.session.tokenSecret

        // The user object contains 4 key/value pairs, which
        // you should store and use as you need, e.g. with your
        // own calls to Twitter's API, or a Twitter API module
        // like `twitter` or `twit`.
        // user = {
        //   userId,
        //   userName,
        //   userToken,
        //   userTokenSecret
        // }
        req.session.user = user

        // Redirect to whatever route that can handle your new Twitter login user details!
        res.redirect('/')
    });
});*/

app.post('/create', (req, res) => {
    console.log("test");
    console.log(req.body);
    for (var x = 0;x != UserList.length;x++)
        if (UserList[x].id == req.body.id) {
            UserList[x].addRelation(req.body);
        }
})

app.get('/home', (req, res) => {
    res.send(jsonList)
})


app.listen(port, () => {
    var uid = uuidv4()
    console.log(`Example app listening at http://localhost:${port}`)
    noob =  new u("test", "123", uid);
    console.log(url)
    UserList.push(noob);
    r = new Relation(test[TIME].action[1], test[GMAIL].reaction[0], uid);
/*    r.reaction.arg[0].value[0] = "test -> ";
    r.reaction.arg[0].value[3] = r.action.arg[0].value//r.action.getDay.bind(r.action);
    r.reaction.arg[0].value[2] = "/"
    r.reaction.arg[0].value[1] = r.action.arg[1].value//getMonth.bind(r.action);*/
    r.action.arg[0].value = 27;
    r.action.arg[1].value = 02;
    console.log(JSON.stringify(r))
    /*fetch("http://0.0.0.0:8080/create", {
        method: 'POST',
        body: JSON.stringify(r),
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        })*/
})
