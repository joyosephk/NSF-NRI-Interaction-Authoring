from flask import *
import sys
from json import *
import os
app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

models_path = "static/models"
@app.route("/models/list")
def listModels():
    models = []
    for entry in os.listdir(models_path):
        if entry != ".DS_Store":
            models.append(entry)
    return json.dumps(models)
@app.route("/models/get/<name>")
def getModelInfo(name):
    #returns the path of the model's JSON file, in
    #the future it will also return what type of file it is
    # and other relevant object information like rotation needs and so forth
    pass

if __name__== '__main__':
    app.run(debug = True)
