from flask import *
import os
import sys
import requests
from planner import Planner

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

@app.route("/plan/get")
def get_plan():
   robot, human = planner.get_plans()
   return json.dumps( {"robot":robot, "human":human})

if __name__ == '__main__':
    planner = Planner()
    app.run(debug=True)
