from flask import *
import sys
from json import *
import os
from ZODB import FileStorage, DB
import transaction
import PGraph
from actions import ActionHandler
import rospy
from moveit_commander import RobotCommander, os, PlanningSceneInterface, roscpp_initialize, roscpp_shutdown
import sys
import random

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

# get all stored positions
@app.route("/positions/get")
def getPositions():
    positions = pGraph.getAuthoringInfo()
    return json.dumps(positions)

# save new position
@app.route("/positions/save/<name>")
def putPosition(name):
    ID = random.random()
    pGraph.addNode(ID, name, acHan)

# move arm
@app.route("/positions/move/<ID>")
def putArmGo(ID):
    print "moving to " + ID
    ret = pGraph.setCurrNode(int(ID), acHan)
    print ret
    print "moved to " + ID
    return ID

# make plan
def putPlan():
    pGraph.makePath(ID, acHan)

# move to a node
def putArmMove():
    pGraph.moveTo(ID, acHan)

if __name__== '__main__':
    ############### ROS setup #######################
    node_name = 'mico_planner'
    group_name = 'arm'
    planner_name = 'RRTstarkConfigDefault'
    ee_link_name = 'mico_link_endeffector'

    roscpp_initialize(sys.argv)
    rospy.init_node(node_name, anonymous=True)

    acHan = ActionHandler(group_name, planner_name, ee_link_name)

    rospy.sleep(1)
    #################################################
    print "running"

    # Database setup
    storage = FileStorage.FileStorage("pGraph.fs")
    db = DB(storage)
    conn = db.open()
    pGraphDB = conn.root()

    if not pGraphDB.has_key("graph"):
        pGraphDB["graph"] = PGraph.PGraph()

    # Variables
    pGraph = pGraphDB["graph"]

    # clear persistent program memory
    pGraph.setCurrNodeNone()

    # save initial position
    pGraph.addNode(9999, "initalposition", acHan)
    transaction.commit()
    app.run(debug = True, use_reloader=False)

