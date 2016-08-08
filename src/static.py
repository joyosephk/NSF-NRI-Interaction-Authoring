from flask import *

import sys
import requests

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/plans/make/<taskname>", methods=['GET', 'POST'])
def make(taskname):
    data = request.json
    requests.post("http://7abacf62.ngrok.io", data = data)
    return ""

if __name__ == '__main__':
    app.run(debug=True)
