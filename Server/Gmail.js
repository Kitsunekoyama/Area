const {Service, Action, Reaction, Relation} = require("./General");
const {google} = require('googleapis')

class gotMailSubject extends Action {
    constructor() {
        super("gotMailSubject", "Trigger when the user receives a mail with a subject including a keyword")
        this.arg = [{id: 0, name: "keyword", type: "id", value: ""}, {id: 1, name: "google", type: "oauth", value: ""}]
        this.message = [];
        this.auth = "";
    }
    checkKeyword(response, callback, you, message_id) {
        
        if (response.data.labelIds[0] != 'SENT') {
            //this.checkKeyword(response, callback);
            you.message = message_id;
        for (let x = 0;x != response.data.payload.headers.length;x++)
            if (response.data.payload.headers[x].name == "Subject" && (response.data.payload.headers[x].value).includes(this.arg[0]))
                callback.activate();
        }

    }
    checkId(you, err, response, gmail, callback) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        try {
        var message_id = response['data']['messages'][0]['id'];
        if (you.message == "") {
           you.message = message_id
        }
            if (message_id != you.message) {
                gmail.users.messages.get({
                    userId: 'me',
                    id: message_id,
                }, (err, response) => you.checkKeyword(response, callback, you, message_id))
            }
        }catch(e){}
        return(you)
    }
    checkMail(callback, gmail) {
        gmail.users.messages.list({auth: this.auth, userId: 'me', maxResults: 1}, (err, response) => this.checkId(this, err, response, gmail, callback))
    }
    activate(callback) {
        const gmail = google.gmail({
            version: 'v1',
            auth: this.auth
        })
            setInterval(this.checkMail.bind(this, callback, gmail), 5000);
    }
}

class gotMailFrom extends Action {
    constructor() {
        super("gotMailFrom", "Trigger when the user receives a mail from a specific address")
        this.arg = [{id: 0, name: "keyword", type: "id", value: ""}, {id: 1, name: "google", type: "oauth", value: ""}]
        this.message = [];
        this.auth = "";
    }
    checkKeyword(response, callback, you, message_id) {
        if (response.data.labelIds[0] != 'SENT') {
         //   this.checkKeyword(response, callback);
            you.message = message_id;
        
        for (let x = 0;x != response.data.payload.headers.length;x++)
            if (response.data.payload.headers[x].name == "From" && (response.data.payload.headers[x].value).includes(this.arg[0]))
                callback.activate();
        }
    }
    checkId(you, err, response, gmail, callback) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        var message_id = response['data']['messages'][0]['id'];
        try {
        if (you.message == "") {
           you.message = message_id
        }
            if (message_id != you.message) {
                gmail.users.messages.get({
                    userId: 'me',
                    id: message_id,
                }, (err, response) => you.checkKeyword(response, callback, you, message_id))
            }
        }catch(e){}
        return(you)
    }
    checkMail(callback, gmail) {
        gmail.users.messages.list({auth: this.auth, userId: 'me', maxResults: 1}, (err, response) => this.checkId(this, err, response, gmail, callback))
    }
    activate(callback) {
        const gmail = google.gmail({
            version: 'v1',
            auth: this.auth
        })
            setInterval(this.checkMail.bind(this, callback, gmail), 5000);
    }
}


class newMail extends Action {
    constructor() {
        super("newMail", "Trigger when the user receive a mail")
        this.arg = [{id: 0, name: "google", type: "oauth", value: ""}]
        this.message = [];
        this.auth = "";
    }
    
    checkId(you, err, response, gmail, callback) {
        if (err) {
            gmail.users.messages.list({auth: this.auth, userId: 'me', maxResults: 1}, (err, response) => this.checkId(this, err, response, gmail, callback))
            //console.log('The API returned an error: ' + err);
            return;
        }
        var message_id = response['data']['messages'][0]['id'];
        if (you.message == "") {
           you.message = message_id
        }
            if (message_id != you.message) {
                gmail.users.messages.get({
                    userId: 'me',
                    id: message_id,
                }, function(err, response) {
                    console.log(response)
                    //console.log(response.data.header)
                    console.log(response.data.payload.headers)
                    if (response.data.labelIds[0] != 'SENT') {
                        callback.activate()
                        you.message = message_id;
                    }
                });
            }
        return(you)
    }
    checkMail(callback, gmail) {
        gmail.users.messages.list({auth: this.auth, userId: 'me', maxResults: 1}, (err, response) => this.checkId(this, err, response, gmail, callback))
    }
    activate(callback) {
            const gmail = google.gmail({
                version: 'v1',
                auth: this.auth
            })
            setInterval(this.checkMail.bind(this, callback, gmail), 5000);
    }
}
function makeBody(to, from, subject, message) {
    var str = ["Content-Type: text/plain; charset=\"UTF-8\"\r\n",
               "MIME-Version: 1.0\r\n",
               "Content-Transfer-Encoding: 7bit\r\n",
               "to: ", to, "\r\n",
               "from: ", from, "\r\n",
               "subject: ", subject, "\r\n\r\n",
               message
              ].join('');

    encodedMail = new Buffer(str).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');

    return encodedMail;
}

class sendMail extends Reaction {
    constructor() {
        super("sendMail", "Send a mail to the user X");
        this.arg = [{id: 0, name: "receiver", type: "id", value: ""}, {id: 1, name: "subject", type: "id", value: ""}, {id: 2, name: "message", type: "text", value: ""}, {id: 3, name: "google", type: "oauth", value: ""}]
        this.auth;
    }
    checkMail(you, err, response, gmail) {
        console.log("receiver=" + you.arg[0].value)
        var raw = makeBody('<' + /*response.data.emailAddress*/you.arg[0].value + '>', '<' + you.arg[0].value + '>', you.arg[1].value, you.arg[2].value);

        gmail.users.messages.send({
            auth: you.auth,
            userId: 'me',
            resource: {
                raw: raw
            }

        }, function(err, response) {
       //     console.log(err || response)
        });
    }
    activate() {
            const gmail = google.gmail({
                version: 'v1',
                auth: this.auth
            })
        if (this.isActivated == "true") {
            gmail.users.getProfile({
                auth: this.auth,
                userId: 'me'
            }, (err, response) => this.checkMail(this, err, response, gmail))

        }
    }
}
class Gmail extends Service {
    constructor() {
        super("Gmail", "https://assets.ifttt.com/images/channels/6/icons/monochrome_large.png", "#FF0000");
        this.action = [new newMail, new gotMailFrom, new gotMailSubject];
        this.reaction = [new sendMail];
    }    
}

module.exports = {Gmail, sendMail, newMail, gotMailFrom, gotMailSubject};
