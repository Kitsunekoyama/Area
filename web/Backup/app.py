from flask import Flask, render_template, request, redirect, url_for
import requests
import time
import json
import sys

app = Flask(__name__)

connected = False
username = None
password = None

services = [
    {'title': 'Twitter', 'color': '#000000', 'background': '#ffffff', 'logo': 'https://assets.stickpng.com/images/580b57fcd9996e24bc43c53e.png'},
    {'title': 'Reddit', 'color': '#ffffff','background': '#ff4300', 'logo': 'https://www.elementaryos-fr.org/wp-content/uploads/2019/08/logo-reddit.png'},
    {'title': 'Reddit', 'color': '#ffffff','background': '#ff4300', 'logo': 'https://www.elementaryos-fr.org/wp-content/uploads/2019/08/logo-reddit.png'},
    {'title': 'Reddit', 'color': '#ffffff','background': '#ff4300', 'logo': 'https://www.elementaryos-fr.org/wp-content/uploads/2019/08/logo-reddit.png'},
    {'title': 'Reddit', 'color': '#ffffff','background': '#ff4300', 'logo': 'https://www.elementaryos-fr.org/wp-content/uploads/2019/08/logo-reddit.png'},
    {'title': 'Reddit', 'color': '#ffffff','background': '#ff4300', 'logo': 'https://www.elementaryos-fr.org/wp-content/uploads/2019/08/logo-reddit.png'},
    {'title': 'Reddit', 'color': '#ffffff','background': '#ff4300', 'logo': 'https://www.elementaryos-fr.org/wp-content/uploads/2019/08/logo-reddit.png'},
    {'title': 'Reddit', 'color': '#ffffff','background': '#ff4300', 'logo': 'https://www.elementaryos-fr.org/wp-content/uploads/2019/08/logo-reddit.png'},
    {'title': 'Reddit', 'color': '#ffffff','background': '#ff4300', 'logo': 'https://www.elementaryos-fr.org/wp-content/uploads/2019/08/logo-reddit.png'},
]

@app.route('/', methods=['GET', 'POST'])
def index():
    print('Hello world!', file=sys.stderr)
    jsn = []
    response = requests.get("https://api.jikan.moe/v3/search/anime?q=rezero")
    if response.status_code == 200:
        jsn = response.json()
        r = requests.post("http://sv:8080/service", json = jsn)
    print(r.text, file=sys.stderr)
    return render_template('index.html', **locals())

@app.route('/logout', methods=['GET', 'POST'])
def logout():
    global username
    global password
    global connected

    connected = False
    username = None
    password = None
    print("connected ->")
    print(connected)
    print("username ->")
    print(username)
    print("password ->")
    print(password)
    return redirect(url_for('index'))

@app.route("/login", methods=['POST', 'GET'])
def login(status = 'default'):
    error_msg = ""
    if (status == 'error'):
        error_msg = "Invalid username or password"
    return render_template('login.html', **locals())

@app.route("/register", methods=['POST', 'GET'])
def register(status = 'default'):
    error_msg = ""
    if (status == 'error'):
        error_msg = "Invalid username or password"
    return render_template('register.html', **locals())

@app.route("/check_register", methods=['POST', 'GET'])
def check_register():
    if request.method == 'POST':
        #username = request.form['username']
        #email = request.form['email']
        password = request.form['password']
        password2 = request.form['password2']
    if (password != password2):
        register('error')
    return redirect(url_for('login'))

@app.route("/hub", methods=['POST', 'GET'])
def check_id():
    global username
    global password
    global connected

    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
    print(username)
    print(password)
    for i in range(0, 1):
        time.sleep(1)
        print(i)
    if username == "Ayunaki":
        connected = True
        return hub()
    return login('error')

@app.route("/hub", methods=['POST', 'GET'])
def hub():
    print(connected)
    print(username)
    print(password)
    if connected == False:
        return login('error')
    return render_template('hub.html', **locals(), services=services, username=username)

@app.route("/service", methods=['POST', 'GET'])
def service():
    return render_template('service.html', **locals(), services=services, username=username)

@app.route("/action", methods=['POST', 'GET'])
def action():
    return render_template('action.html', **locals(), services=services, username=username)

@app.errorhandler(404)
def error(error):
    return render_template('error.html'), 404

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
