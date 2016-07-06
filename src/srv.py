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
        print(entry)
        models.append(entry)
    return json.dumps(models)

if __name__== '__main__':
    app.run(debug = True)
