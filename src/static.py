from flask import *
import os
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


models_path = "static/models"
@app.route("/models/list")
def listModels(arg=None):
    models = []
    for entry in os.listdir(models_path):
        if entry != ".DS_Store":
            models.append(entry)
    return json.dumps(models)

if __name__ == '__main__':
    app.run(debug=True)
