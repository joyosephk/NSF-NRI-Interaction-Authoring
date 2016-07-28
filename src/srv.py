from flask import *
import sys
from json import *
import forceControlWrapper
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

fc = forceControlWrapper.ForceControl()

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

# get all stored positions, ALSO ***NEW*** added lists of paths for each position that they have a planned path to
# as key 'paths'
@app.route("/positions/get")
def getPositions():
    positions = pGraph.getAuthoringInfo()
    return json.dumps(positions)

# get all overarching plans made in the authoring environment
@app.route("/plans/get")
def getPlans():
    return json.dumps(pGraph.getAuthoredPlans())

# save new position
@app.route("/positions/save/<name>")
def putPosition(name):
    # generate a random ID
    ID = int(random.random() * 1000000)
    while pGraph.hasNode(ID):
        ID = int(random.random() * 1000000)
    pGraph.addNode(ID, name, acHan)
    return ID

# move arm
@app.route("/positions/move/<ID>")
def putArmGo(ID):
    try:
        ret = pGraph.setCurrNode(int(ID), acHan)
        print "return value: " + str(ret)
    except ValueError:
        print "Non integer-convertible value given for ID"
    return ID

# make plan from a dictionary of plans, with each key corresponding to and ID, and the value being a grasp value 0-100
# 100 = closed, 0 = open, floating point value
@app.route("/plans/make/<taskname>")
def putPlan(taskname):
    # path is the dictionary of ID's
    path = request.json['path']
    # skip first node
    iterable = iter(path)
    next(iterable)
    #set first node to be current node
    pGraph.setCurrNode(path[0], acHan)
    for ID in iterable:
        try:
            pGraph.makePath(int(ID), acHan)
        except ValueError:
            print "Non integer-convertible value given for ID"
    pGraph.setAuthoredPlans(taskname, path)
    return taskname

# plan from current position to another position
@app.route("/plans/individual/<ID>")
def putIndividualPlan(ID):
    try:
        pGraph.makePath(int(ID), acHan)
    except ValueError:
        print "Non integer-convertible value given for ID"
    return ID

# move to a node from the current node of the arm
@app.route("/plans/move/<ID>")
def putArmMove(ID):
    try:
        pGraph.moveTo(int(ID), acHan)
    except ValueError:
        print "Non integer-convertible value given for ID"

    return ID

# turn on/off force control
@app.route("/forcecontrol/<on>")
def putForceControl(on):
    if on == "true":
        fc.startForceControl()
    else:
        fc.stopForceControl()
    return str(on)

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

