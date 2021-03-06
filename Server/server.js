const express = require('express');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
//const s = require("./service");
const {DateTime, EveryDayAt, EveryYearAt} = require("./DateAndTime");
const {Discord, DiscordRcv, DiscordMsg} = require("./Diskord")
const {Youtube, newVideo} = require("./Youtube");
const {Tweeter, getTweet, postTweet} = require("./Tweeter")
const {Gmail, sendMail, newMail} = require("./Gmail")
const {Reddit, getReddit, getTrophiesReddit, postReddit} = require("./Reddit")
const {google} = require('googleapis')
const u = require("./User");
const {Service, Action, Reaction, Relation} = require("./General");
const {Weather, getWeather, getWeatherPrecipitation} = require("./Weather")
const {Steam, getSteamAppNews, getSteamNewGame} = require("./Steam")
const {Twitch, getTwitch, getTwitchVideo} = require("./Twitch")
const fetch = require('node-fetch');

let test = [new DateTime, new Discord, new Youtube, new Tweeter, new Gmail, new Reddit, new Weather, new Steam, new Twitch];
global.UserList = [];
const connection = mysql.createConnection({
    host : 'db',
    port : '3306',
    user : 'root',
    password : 'password',
    database: 'test',
});
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors())

const oauth2Client = new google.auth.OAuth2(
    '767475818166-edksor444kenqkh8009rulpja81m7cg6.apps.googleusercontent.com',
    'devmK7jcJu2hhFgKb_Tn34cV',
    'http://localhost:8081/google_callback'
)

const scopes = [
    'https://mail.google.com/'
]

const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes
})

app.post('/active', (req, res) => {
    for (var x = 0;x != UserList.length;x++)
        if (UserList[x].id == req.body.id) {
            UserList[x].activeRelation(req.body.ndx)
            res.status(200).send(JSON.stringify(UserList[x].relations))
        }
})
        
app.post('/unactive', (req, res) => {
    for (var x = 0;x != UserList.length;x++)
        if (UserList[x].id == req.body.id) {
            UserList[x].unactiveRelation(req.body.ndx)
            res.status(200).send(JSON.stringify(UserList[x].relations))
        }
})

app.post('/delete', (req, res) => {
    for (var x = 0;x != UserList.length;x++)
        if (UserList[x].id == req.body.id) {
            UserList[x].deleteRelation(req.body.ndx)
            res.status(200).send(JSON.stringify(UserList[x].relations))
            connection.query("UPDATE userArea SET relations= ? WHERE username= ? ", [JSON.stringify(UserList[x].relations), UserList[x].username], function (err, result, fields) {
                if (err) {
                    console.log(err);
                }
            })
        }
})
app.post('/hub', (req, res) => {
    for (var x = 0;x != UserList.length;x++)
        if (UserList[x].id == req.body.id) {
            console.log("hub")
            res.status(200).send(JSON.stringify(UserList[x].relations))
        }
})

app.post('/google', (req, res) => {
    res.send(url);
})

app.post('/create', (req, res) => {
    try {
        console.log(UserList[0].relations)
    } catch(e) {}
    for (var x = 0;x != UserList.length;x++)
        if (UserList[x].id == req.body.id) {
            UserList[x].addRelation(req.body);
            res.status(200).send(JSON.stringify(UserList[x].relations))
            connection.query("UPDATE userArea SET relations= ? WHERE username= ? ", [JSON.stringify(UserList[x].relations), UserList[x].username], function (err, result, fields) {
           // connection.query("UPDATE userArea SET relations='" + JSON.stringify(UserList[x].relations) + "' WHERE username='" + UserList[x].username + "'", function (err, result, fields) {
                if (err) {
                    console.log(err);
                }
            })              
        }
})

function checkToken(x, err, tokens, res) {
    if (err) {
        console.error('Error getting oAuth tokens:');
        res.status(500).send("no");
        throw err;
    }
    console.log(tokens)
    UserList[x].google_oauth.setCredentials(tokens);
    UserList[x].google_oauth.on('tokens', (tokens) => {
        if (tokens.refresh_token) {
            console.log(tokens.refresh_token);
        }
        console.log(tokens.access_token);
    })
    for (let y = 0;y != UserList[x].relations.length;y++) {
        UserList[x].relations[y].reaction.auth = UserList[x].google_oauth;
        UserList[x].relations[y].action.auth = UserList[x].google_oauth;
    }
    connection.query("UPDATE userArea SET google= ? WHERE username= ?", [JSON.stringify({refresh_token: tokens.refresh_token, access_token: tokens.access_token, type: "web"}), UserList[x].username], function (err, result, fields) {
        if (err) {
            console.log(err);
        }
    })
    console.log("connexion");
    res.status(200).send("yes");
}
app.post('/authGoogle', (req, res) => {
    for (var x = 0;x != UserList.length;x++)
        if (UserList[x].id == req.body.id) {
            UserList[x].google_oauth = new google.auth.OAuth2(
                '767475818166-edksor444kenqkh8009rulpja81m7cg6.apps.googleusercontent.com',
                'devmK7jcJu2hhFgKb_Tn34cV',
                'http://localhost:8081/google_callback'
            )
        return UserList[x].google_oauth.getToken(req.body.code, (err, tokens) => checkToken(x, err, tokens, res))
        }
})
app.post('/mobGoogle', (req, res) => {
    for (var x = 0;x != UserList.length;x++)
        if (UserList[x].id == req.body.id) {
            UserList[x].google_oauth = new google.auth.OAuth2(
                '767475818166-ngdapu6mh2kj2e50j5hsj53cneqtqrgc.apps.googleusercontent.com',
            )
            UserList[x].google_oauth.setCredentials({access_token: req.body.access_token, refresh_token: req.body.refresh_token});
            for (let y = 0;y != UserList[x].relations.length;y++) {
                UserList[x].relations[y].reaction.auth = UserList[x].google_oauth;
                UserList[x].relations[y].action.auth = UserList[x].google_oauth;
            }
            console.log("mobbbb")
            connection.query("UPDATE userArea SET google=? WHERE username= ?", [JSON.stringify({refresh_token: req.body.refresh_token, access_token: req.body.access_token, type: "android"}), UserList[x].username], function (err, result, fields) {
            
                if (err) {
                    console.log(err);
                }
            })
            res.status(200).send("yes")
            return;
        }
        res.status(500).send("no")
        
})
app.post('/reaction', function(req, res) {
    if (req.query.service != undefined && req.query.reaction != undefined) {
        res.status(200).send(JSON.stringify(test[req.query.service].reaction[req.query.reaction]))
        return;
    }
    res.status(500).send("error")
})
app.post('/action', function(req, res) {
    if (req.query.service != undefined && req.query.action != undefined) {
        res.status(200).send(JSON.stringify(test[req.query.service].action[req.query.action]))
        return;
    }
    res.status(500).send("error")
})
app.post('/service', function(req, res) {
    
    if (req.query.id != undefined)
        res.status(200).send(JSON.stringify({services: test[req.query.id]}))
    else
        res.status(200).send(JSON.stringify({services: test}));
})

app.post('/login', function (req, res) {
    for (let x = 0;x != UserList.length;x++)
        if (UserList[x].username == req.query.username && UserList[x].password == req.query.password) {
            res.status(200).send(UserList[x].id);
            return;
        }
    res.status(500).send("Error: password or username incorrect");
})

app.post('/signUp', function (req, res) {
    console.log(req.query.username)
    if (req.query.username != undefined && req.query.password != undefined) {
        var uid = uuidv4();
       // connection.query("INSERT INTO userArea (id, username, password) VALUES ('" + uid + "', '" + req.query.username + "', '" + req.query.password + "')", function (err, result, fields) {
        connection.query("INSERT INTO userArea (id, username, password) VALUES (?, ?, ?)", [uid, req.query.username, req.query.password] ,function (err, result, fields) {
            if (err)
                console.log(err);
            nooby = new u(req.query.username, req.query.password, uid);
            UserList.push(nooby);
            console.log("create")
            res.status(200).send(uid);
        });
    } else {
        res.status(500).send("Error");
        console.log("invalid parameter ?");
    }
})

app.listen(8080, () => {
    console.log('http://localhost:8080/signUp');
    for (let x = 0;x != test.length;x++) {
        test[x].id = x;
        for (let y = 0;y != test[x].action.length;y++)
            test[x].action[y].id = y;
        for (let y = 0;y != test[x].reaction.length;y++)
            test[x].action[y].id = y;
    }
    connection.query("SELECT * FROM userArea", function (err, result, fields) {
        if (err) {
            console.log(err);
            return;
        }
        for (let x = 0;x != result.length;x++) {
            nooby = new u(result[x].username, result[x].password, result[x].id)
            if (result[x].google != null) {
                googleauth = JSON.parse(result[x].google)
                if (googleauth.type == "web")
                    nooby.google_oauth = new google.auth.OAuth2(
                        '767475818166-edksor444kenqkh8009rulpja81m7cg6.apps.googleusercontent.com',
                        'devmK7jcJu2hhFgKb_Tn34cV',
                        'http://localhost:8081/google_callback'
                    )
                    else
                        nooby.google_oauth = new google.auth.OAuth2('767475818166-ngdapu6mh2kj2e50j5hsj53cneqtqrgc.apps.googleusercontent.com')
                nooby.google_oauth.setCredentials({refresh_token: googleauth.refresh_token, access_token: googleauth.access_token});
            }
            if (result[x].relations != null) {
                res = JSON.parse(result[x].relations)
                for (let y = 0;y != res.length;y++) {
                   // console.log(res[y])
                    nooby.addRelation(res[y])
                }
            }
            console.log(nooby)
            UserList.push(nooby);
        }
    })
});
