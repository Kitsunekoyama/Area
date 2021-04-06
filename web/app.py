
"""
Documentation for the web module

File Handling the front-end of AREA's web interface
"""

from flask import Flask, render_template, request, redirect, url_for
import requests
import time
import json
import sys
app = Flask(__name__)



"""
**Global variables**

ID:                   Server generated UID

data:                 services and A/R index associated - json

user_data:            Array of relations - A/R list

info_action:          Informations about a specific Action (service, action, info)

info_reaction:        Informations about a specific Reaction (service, reaction, info)

info_username:        Information about the username (name of the user)
"""
ID = []
data = []
user_data = []
info_action = []
info_reaction = []
info_username = []
google_redirection = ""

"""
**Google module**
 
contains: 
    
    -google function
    
    -google_callback function

google:

posts the information to the google service at: http://sv:8080/google

google_callback:

posts the user information to the authentication page and redirects to the google authentication service at: http://sv:8080/authGoogle
"""
@app.route('/google', methods=['GET', 'POST'])
def google():
    response = requests.post("http://sv:8080/google")
    return (redirect(response.text))

@app.route('/google_callback', methods=['GET', 'POST'])
def google_callback():
    global relation
    r = requests.post("http://sv:8080/authGoogle", json = {'id': ID, 'code': request.args.get('code')})
    return (redirect(google_redirection))


"""
**fill_data & index functions**
  
index:
calls fill_data
  
fill_data:
fills the data global variable with the services and A/R index associated
"""
@app.route('/fill_data')
def fill_data():
    global data
    # jsn = []
    # error_msg = []    
    # response = requests.get("https://api.jikan.moe/v3/search/anime?q=rezero")
    # if response.status_code == 200:
    #     jsn = response.json()

    # send and reception info to server
    r = requests.post("http://sv:8080/service")
    # check post and get
    if r.status_code == 500:
        print("error server", file=sys.stderr)
        error_msg = "Error server"
    # convert reception info to json
    data = r.json()
    print("Fill data", file=sys.stderr)
    print(data, file=sys.stderr)

@app.route('/', methods=['GET', 'POST'])
def index():
    if data == []:
        fill_data()
    return render_template('index.html', **locals())

"""
**logout function**
 
logout:
empties the global variables: ID, user_data and info_username
"""
@app.route('/logout', methods=['GET', 'POST'])
def logout():
    global ID
    global user_data
    global info_username

    ID = []
    user_data = []
    info_username = []
    return redirect(url_for('index'))

"""
**login function**
  
login:
checks the login information
"""
@app.route("/login", methods=['POST', 'GET'])
def login(status = 'default'):
    error_msg = ""

    if data == []:
        fill_data()
    if (status == 'error'):
        error_msg = "Invalid username or password"
        print("Invalid username or password", file=sys.stderr)
    if (status == 'error_post'):
        error_msg = "Bad request method POST"
        print("Bad request method POST", file=sys.stderr)
    return render_template('login.html', **locals())

"""
**register function**
  
register:
callows for a user to register
"""
@app.route("/register", methods=['POST', 'GET'])
def register(status = 'default'):
    error_msg = ""

    if data == []:
        fill_data()
    if (status == 'error'):
        error_msg = "Invalid username or password"
        print("Invalid username or password", file=sys.stderr)
    if (status == 'error_post'):
        error_msg = "Bad request method POST"
        print("Bad request method POST", file=sys.stderr)
    return render_template('register.html', **locals())

"""
**check_register function**
  
check_register:
posts to the server the information the user filled in the registration page
"""
@app.route("/check_register", methods=['POST', 'GET'])
def check_register():
    global ID
    global info_username

    print("CHECK_REGISTER", file=sys.stderr)
    if request.method == 'POST':
        u = request.form['username']
        p = request.form['password']

        # send and reception info to server
        r = requests.post("http://sv:8080/signUp?username=" + u + "&password=" + p)
        # check post and get
        if r.status_code == 500:
            print(r, file=sys.stderr)
            register('error')
        if r.status_code == 200:
            ID = r.text
            # convert reception info to json
            # r = r.json()
        print("GO HUB", file=sys.stderr)
        info_username = u
        return hub()
    return register('error_post')

"""
**check_id function**
 
check_id:
checks the credentials the user filled in when logging in
"""
@app.route("/hub", methods=['POST', 'GET'])
def check_id():
    global ID
    global info_username

    if request.method == 'POST':
        u = request.form['username']
        p = request.form['password']
        print(u, file=sys.stderr)
        print(p, file=sys.stderr)
        # send and reception info to server
        r = requests.post("http://sv:8080/login?username=" + u + "&password=" + p)
        # check post and get
        if r.status_code == 200:
            ID = r.text
            print("SUCESS:", file=sys.stderr)
            print(ID, file=sys.stderr)
        if r.status_code == 500:
            print("ERROR: " + str(r), file=sys.stderr)
            login('error')
        info_username = u
        return hub()
    if ID == []:
        return login('error_post')
    return hub()

"""
**hub function**

hub:
prints out the relations the user chose on the /hub page
"""
@app.route("/hub", methods=['POST', 'GET'])
def hub(status = 'default'):
    global user_data
    error_msg = ""

    if ID == []:
        return login('error')
    if data == []:
        fill_data()
    if user_data == []:
        json = {"id": ID}
        print(json, file=sys.stderr)
        r = requests.post("http://sv:8080/hub", json=json)
        if r.status_code == 200:
            #print("r:", file=sys.stderr)
            #print(r, file=sys.stderr)
            print(r.json, file=sys.stderr)
            user_data = r.json()
            print("SUCESS:", file=sys.stderr)
            print(user_data, file=sys.stderr)
            print(type(user_data), file=sys.stderr)
        if r.status_code == 500:
            print("ERROR: " + str(r), file=sys.stderr)
            login('error')
    if status == 'error_delete':
        error_msg = "Error delete"
    if status == 'error_activation':
        error_msg = "Error activation"
    return render_template('hub.html', **locals(), user_data=user_data, info_username=info_username)

@app.route('/active/<int:n>', methods=['POST', 'GET'])
def active(n):
    global user_data

    print("[ACTIVE]", file=sys.stderr)
    print(n, file=sys.stderr)
    if ID == []:
        return login('error')
    if user_data == []:
        return hub('error_activation')
    data_to_send = {"id": ID, "ndx": n}
    r = requests.post("http://sv:8080/active", json=data_to_send)
    if r.status_code == 200:
        user_data = r.json()
        print("ACTIVE SUCESS", file=sys.stderr)
    if r.status_code == 500:
        print("ACTIVE FAILED", file=sys.stderr)
        hub('error_active')
    print("USER_DATA", file=sys.stderr)
    print(user_data, file=sys.stderr)
    return hub()

@app.route('/unactive/<int:n>', methods=['POST', 'GET'])
def unactive(n):
    global user_data

    print("[UNACTIVE]", file=sys.stderr)
    print(n, file=sys.stderr)
    if ID == []:
        return login('error')
    if user_data == []:
        return hub('error_activation')
    data_to_send = {"id": ID, "ndx": n}
    r = requests.post("http://sv:8080/unactive", json=data_to_send)
    if r.status_code == 200:
        user_data = r.json()
        print("UNACTIVE SUCESS", file=sys.stderr)
    if r.status_code == 500:
        print("UNACTIVE FAILED", file=sys.stderr)
        hub('error_unactive')
    print("USER_DATA", file=sys.stderr)
    print(user_data, file=sys.stderr)
    return hub()

"""
**delete function**

delete:
deletes the relation
"""
@app.route("/delete/<int:n>", methods=['POST', 'GET'])
def delete(n):
    global user_data

    if ID == []:
        return login('error')
    if user_data == []:
        return hub('error_delete')
    data_to_send = {"id": ID, "ndx": n}
    # send and reception info to server
    r = requests.post("http://sv:8080/delete", json=data_to_send)
    # check post and get
    if r.status_code == 200:
        user_data = r.json()
        print("DELETE SUCESS", file=sys.stderr)
    if r.status_code == 500:
        print(r, file=sys.stderr)
        hub('error_delete')
    return hub()

"""
**service function**

service:
displays the available services unless the id is empty
"""
@app.route("/service", methods=['POST', 'GET'])
def service():
    if ID == []:
        return login('error')
    return render_template('service.html', **locals(), data=data)

"""
**action function**

-action:
displays the available actions unless the id is empty
"""
@app.route("/action/<int:n>", methods=['POST', 'GET'])
def action(n):
    if ID == []:
        return login('error')
    print("SELECT ACTION n = " + str(n), file=sys.stderr)
    return render_template('action.html', **locals(), data=data)

"""
**config_actions function**

config_actions:
displays the available options an action has
"""
@app.route("/config_action/<int:s>/<int:a>", methods=['POST', 'GET'])
def config_action(s, a):
    if ID == []:
        return login('error')
    print("ACTION selected service = " + str(s) + " a = " + str(a), file=sys.stderr)
    print("len " + str(len(data["services"][s]["action"][a]["arg"])), file=sys.stderr)
    return render_template('config_action.html', **locals(), data=data)

"""
**reactions function**

reactions:
displays the available reactions corresponding to the service and action pair selected
"""
@app.route('/reaction/<int:s>/<int:a>', methods=['POST', 'GET'])
def reaction(s, a):
    global info_action
    global google_redirection
    if ID == []:
        return login('error')
    print("REACTION selected service = " + str(s) + " a = " + str(a), file=sys.stderr)
    if request.method == 'POST':
        info = request.form.getlist('info[]')
        print("[INFO]", file=sys.stderr)
        print(info, file=sys.stderr)
        info_action = { 'service' : s, 'action' : a, 'info' : info }
        print("[SUCESS] tab_action", file=sys.stderr)
        print(info_action, file=sys.stderr)
        for i in range (0, len(data["services"][s]["action"][a]["arg"])):
            if (data["services"][s]["action"][a]["arg"][i]["name"] == "google"):
                print("GOOGLE", file=sys.stderr)
                google_redirection = 'another_service'
                return redirect(url_for('google'))
        return another_service()
    print("[INFO] ERROR !", file=sys.stderr)
    return hub()

"""
**another_service function**

another_service:
lets the user add another service to add a reaction to, unless the id is empty
"""
@app.route('/another_service', methods=['POST', 'GET'])
def another_service():
    if ID == []:
        return login('error')
    print("[INFO] INFO ACTION", file=sys.stderr)
    print(info_action, file=sys.stderr)
    return render_template('another_service.html', **locals(), data=data, info_action=info_action)

"""
**select_reaction and config_reactions functions**

select_reaction:
displays the available reactions unless the id is empty


config_reactions:
displays the available options a reaction has
"""
@app.route('/select_reaction/<int:s>', methods=['POST', 'GET'])
def select_reaction(s):
    if ID == []:
        return login('error')
    print("SELECT REACTION s = " + str(s), file=sys.stderr)
    return render_template('select_reaction.html', **locals(), data=data)

@app.route('/config_reaction/<int:s>/<int:r>', methods=['POST', 'GET'])
def config_reaction(s, r):
    if ID == []:
        return login('error')
    return render_template('config_reaction.html', **locals(), data=data)

"""
**create function**

create:
adds a relation once the service, the action, its configuration, the reaction, its corresponding service and configuration are selected
"""
@app.route("/create/<int:s>/<int:r>", methods=['POST', 'GET'])
def create(s, r):
    global user_data
    global info_action
    global info_reaction
    global google_redirection
    if ID == []:
        return login('error')
    
    if request.method == 'POST':
        info = request.form.getlist('info[]')
        print("[INFO]", file=sys.stderr)
        print(info, file=sys.stderr)
        info_reaction = { 'service' : s, 'reaction' : r, 'info' : info }
        print("[SUCESS] tab_action", file=sys.stderr)
        print(info_reaction, file=sys.stderr)
    else:
        print("[ERROR] POST FAIL", file=sys.stderr)
        return login('error')

    new_data = data.copy()
    print("NEW_DATA", file=sys.stderr)
    print(new_data, file=sys.stderr)
    print("END NEW DATA", file=sys.stderr)
    print(new_data["services"][info_action["service"]]["action"][info_action["action"]]["arg"], file=sys.stderr)

    if info_action["info"] != []:
        for i in range(0, len(new_data["services"][info_action["service"]]["action"][info_action["action"]]["arg"])):
            #print("[CHECK] " + str(new_data["services"][info_action["service"]]["action"][info_action["action"]]["arg"][i]), file=sys.stderr)
            if new_data["services"][info_action["service"]]["action"][info_action["action"]]["arg"][i]["type"] != "oauth":
                new_data["services"][info_action["service"]]["action"][info_action["action"]]["arg"][i]["value"] = info_action["info"][i]
    
    if info_reaction["info"] != []:
        for i in range(0, len(new_data["services"][info_reaction["service"]]["reaction"][info_reaction["reaction"]]["arg"])):
            if new_data["services"][info_reaction["service"]]["reaction"][info_reaction["reaction"]]["arg"][i]["type"] != "oauth":
                new_data["services"][info_reaction["service"]]["reaction"][info_reaction["reaction"]]["arg"][i]["value"] = info_reaction["info"][i]
    
    info_to_send = {"id": ID, "action": new_data["services"][info_action["service"]]["action"][info_action["action"]], "reaction": new_data["services"][info_reaction["service"]]["reaction"][info_reaction["reaction"]]}

    print(info_to_send, file=sys.stderr)

    # send and reception info to server
    print("[BEFORE SEND INFO SERVER]", file=sys.stderr)
    response = requests.post("http://sv:8080/create", json=info_to_send)
    print("[AFTER SEND INFO SERVER]", file=sys.stderr)
    info_action = []
    info_reaction = []
    # check post and get
    if response.status_code == 200:
        # convert reception info to json
        user_data = response.json()
        print("SUCESS CREATE", file=sys.stderr)
        print(user_data, file=sys.stderr)
        for i in range (0, len(data["services"][s]["reaction"][r]["arg"])):
            if (data["services"][s]["reaction"][r]["arg"][i]["name"] == "google"):
                print("GOOGLE", file=sys.stderr)
                google_redirection = 'hub'
                return redirect(url_for('google'))
    elif response.status_code == 500:
        print(response, file=sys.stderr)
        login('error')
    return hub()

"""
**error function**

error:
displays an error page with the 404 error code
"""
@app.errorhandler(404)
def error(error):
    return render_template('error.html'), 404

"""
**debug function**

debug:
displays a page with essential debug information such as the data, user_data and id
"""
@app.route('/debug', methods=['GET', 'POST'])
def debug():
    print(ID, file=sys.stderr)
    print(data, file=sys.stderr)
    print(user_data, file=sys.stderr)
    if (data != []):
        return (data)
    if (user_data != []):
        return (user_data)
    if (ID != []):
        return (ID)
    return ("debug")

@app.route('/test', methods=['GET', 'POST'])
def test():
    url = "https://api.jikan.moe/v3/search/anime?q="
    animeID = None
    if request.method == 'POST':
        animeID = request.form['anime_name']
    else:
        animeID = "re:zero"
    response = requests.get(url + animeID)
    if response.status_code == 200:
        jsn = response.json()
        data = jsn["results"]
    return render_template('test.html', **locals())

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, debug=True, threaded=True)
