import flask
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
from functools import wraps

app = flask.Flask(__name__)

fc = forceControlWrapper.ForceControl()

def decorator(func):
    @wraps(func)
    def func_wrapper(*args):
        resp = flask.Response(func(*args))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp
    return func_wrapper

@app.route("/")
@decorator
def index(arg=None):
    return flask.render_template("index.html")

models_path = "static/models"
@app.route("/models/list")
@decorator
def listModels(arg=None):
    models = []
    for entry in os.listdir(models_path):
        if entry != ".DS_Store":
            models.append(entry)
    return flask.json.dumps(models)

@app.route("/models/get/<name>")
@decorator
def getModelInfo(name):
    #returns the path of the model's JSON file, in
    #the future it will also return what type of file it is
    # and other relevant object information like rotation needs and so forth
    pass

# get all stored positions, ALSO ***NEW*** added lists of paths for each position that they have a planned path to
# as key 'paths'
@app.route("/positions/get")
@decorator
def getPositions(arg=None):
    positions = pGraph.getAuthoringInfo()
    return flask.json.dumps(positions)

# get all overarching plans made in the authoring environment
@app.route("/plans/get")
@decorator
def getPlans(arg=None):
    return flask.json.dumps(pGraph.getAuthoredPlans())

# save new position
@app.route("/positions/save/<name>")
@decorator
def putPosition(name):
    # generate a random ID
    ID = int(random.random() * 1000000)
    while pGraph.hasNode(ID):
        ID = int(random.random() * 1000000)
    pGraph.addNode(ID, name, acHan)
    transaction.commit()
    return str(ID)

# move arm
@app.route("/positions/move/<ID>")
@decorator
def putArmGo(ID):
    print "Got and ID to move to" + str(ID)
    try:
        ret = pGraph.setCurrNode(int(ID), acHan)
        print "return value: " + str(ret)
    except ValueError:
        print "Non integer-convertible value given for ID"
    return ID

# make plan from a dictionary of plans, with each key corresponding to and ID, and the value being a grasp value 0-100
# 100 = closed, 0 = open, floating point value
@app.route("/plans/make/<taskname>")
@decorator
def putTaskPlan(taskname):
    # path is the dictionary of ID's
    path = flask.request.json['path']
    # skip first node
    iterable = iter(path)
    next(iterable)
    # set first node to be current node
    pGraph.setCurrNode(path[0], acHan)
    for pose in iterable:
        try:
            (ID, graspVal) = pose.items()
            pGraph.makePath(int(ID), acHan)
        except ValueError:
            print "Non integer-convertible value given for ID"
    pGraph.setAuthoredPlans(taskname, path)
    transaction.commit()
    return taskname

# plan from current position to another position
@app.route("/plans/individual/<ID>")
@decorator
def putPlan(ID):
    try:
        pGraph.makePath(int(ID), acHan)
        transaction.commit()
    except ValueError:
        print "Non integer-convertible value given for ID"
    return ID

# move to a node from the current node of the arm
@app.route("/plans/move/<ID>")
@decorator
def putArmMove(ID):
    try:
        pGraph.moveTo(int(ID), acHan)
    except ValueError:
        print "Non integer-convertible value given for ID"

    return ID

# turn on/off force control
@app.route("/forcecontrol/<on>")
@decorator
def putForceControl(on):
    if on == "true":
        fc.startForceControl()
    else:
        fc.stopForceControl()
    return str(on)

#grasp
@app.route("/grasp/<value>")
@decorator
def grasp(value):
    try:
        value = float(value)
        if value >= 0 and value <= 100:
            acHan.grasp(value)
        else:
            print "Value is out of range 0-100, value given: " + str(value)
    except ValueError:
        print "Grasp value must be a floating point value"
    return str(value)

if __name__== '__main__':
    ############### ROS setup #######################
    node_name = 'mico_planner'
    group_name = 'arm'
    planner_name = 'RRTConnectkConfigDefault'
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
    transaction.commit()
    app.run(debug = True, use_reloader=False)

