import flask
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
from functools import wraps, partial
import logging
from flask_cors import CORS, cross_origin
import std_msgs.msg
import thread

################## DATA ############################
# current task
tracking = {}
tracking["currTask"] = ""
tracking["currTherblig"] = ""
tracking["currHAL"] = ""

app = flask.Flask(__name__)
CORS(app)

def logged(func): #, level=logging.INFO, name=None, message=None):
    '''
    if func is None:
        return partial(logged, level=level, name=name, message=message)


    # get function arguments name
    argnames = func.func_code.co_varnames[:func.func_code.co_argcount]

    # get function name
    fname = name if name else func.__name__
    logger = logging.getLogger(fname)
    logmsg = message if message else None
    '''
    @wraps(func)
    def func_wrapper(*args, **kwargs):
        resp = flask.Response(func(*args, **kwargs))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
        return resp
    return func_wrapper

@app.route("/")
@logged
def index(arg=None):
    return flask.render_template("index.html")

models_path = "static/models"
@app.route("/models/list")
@logged
def listModels(arg=None):
    models = []
    for entry in os.listdir(models_path):
        if entry != ".DS_Store":
            models.append(entry)
    return flask.json.dumps(models)

@app.route("/models/get/<name>")
@logged
def getModelInfo(name):
    #returns the path of the model's JSON file, in
    #the future it will also return what type of file it is
    # and other relevant object information like rotation needs and so forth
    pass

# get all stored positions, ALSO ***NEW*** added lists of paths for each position that they have a planned path to
# as key 'paths'
@app.route("/positions/get")
@logged
def getPositions(arg=None):
    positions = pGraph.getAuthoringInfo()
    print "getPositions\n"
    return flask.json.dumps(positions)

# get all overarching plans made in the authoring environment
@app.route("/plans/get")
@logged
def getPlans(arg=None):
    print "getPlans\n"
    return flask.json.dumps(pGraph.getAuthoredPlans())

'''
@app.route("/plans/execute/<name>")
@logged
def executePlan(name):
    pGraph.taskPlanPlayback(name, acHan)
    print "executePlan\n"
    return name
'''

@app.route("/plans/execute", methods=["POST", "GET"])
@logged
def executeStep():
    ID = flask.request.json['id']
    graspVal = flask.request.json['graspVal'] 
    print "waiting for arm to be ready"
    while pGraph.setCurrNode(ID, acHan) is not True:
        pass
    print "trajectory sent"
    print "grasping if any"
    pGraph.grasp(graspVal, acHan)
    print "executeStep\n"
    return "True"




# save new position
@app.route("/positions/save/<name>")
@logged
def putPosition(name):
    # generate a random ID
    ID = int(random.random() * 1000000)
    while pGraph.hasNode(ID):
        ID = int(random.random() * 1000000)
    pGraph.addNode(ID, name, acHan)
    transaction.commit()
    print "putPosition\n"
    return str(ID)

# move arm
@app.route("/positions/move/<ID>")
@logged
def putArmGo(ID):
    print "Got and ID to move to" + str(ID)
    try:
        ###############J O S H   L O O K   H E R E ###################
        # below line moves arm
        thread.start_new_thread(pGraph.setCurrNode, [int(ID), acHan, ])
        # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        print "return value: " + str(ret)
    except ValueError:
        print "Non integer-convertible value given for ID"
    print "putArmGo\n"
    return ID

# make plan from a dictionary of plans, with each key corresponding to and ID, and the value being a grasp value 0-100
# 100 = closed, 0 = open, floating point value
@app.route("/plans/make/<taskname>", methods=["GET", "POST"])
@cross_origin()
def putTaskPlan(taskname):
    # path is the dictionary of ID's
    path = flask.request.json['path']
    ''' commenting out until we implement saved trajectories
    # skip first node
    iterable = iter(path)
    next(iterable)
    # set first node to be current node
    ID = path[0]['id']
    pGraph.setCurrNode(int(ID), acHan)
    for pose in iterable:
        print pose
        try:
            ID = pose['id']
            print "ID: " + str(ID)
            pGraph.makePath(int(ID), acHan)
        except ValueError:
            print "Non integer-convertible value given for ID"
    '''
    pGraph.setAuthoredPlans(taskname, path)
    transaction.commit()
    print "putTaskPlan\n"
    return taskname

# plan from current position to another position
@app.route("/plans/individual/<ID>")
@logged
def putPlan(ID):
    result = ""
    try:
        result = pGraph.makePath(int(ID), acHan)
        transaction.commit()
    except ValueError:
        print "Non integer-convertible value given for ID"
    print "putPlan\n"
    return str(result)

# move to a node from the current node of the arm
@app.route("/plans/move/<ID>")
@logged
def putArmMove(ID):
    try:
        pGraph.moveTo(int(ID), acHan)
    except ValueError:
        print "Non integer-convertible value given for ID"

    print "putArmMove\n"
    return ID

# turn on/off force control
@app.route("/forcecontrol/<on>")
@logged
def putForceControl(on):
    print "Toggling force control\n"
    if on == 'true':
        pub.publish(data=True)
    else:
        pub.publish(data=False)
    return str(on)

# grasp
@app.route("/grasp/<value>")
@logged
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

# kinect tracking data
@app.route("/tracking/kinect/<task>")
@logged
def kinectTrack(task):
    print "\nTracking kinect"
    # update current tracked task
    tracking["currTask"] = str(task)
    print str(task)
    return str(task)

# myo therblig data
@app.route("/tracking/myo/therblig/<therblig>", methods=["GET", "POST"])
@logged
def myoTrackTherblig(therblig):
    print "\nTracking therblig"
    # update current tracked therblig
    tracking["currTherblig"] = str(therblig)
    print str(therblig)
    return str(therblig)

# myo HAL data
@app.route("/tracking/myo/HAL/<HAL>", methods=["GET", "POST"])
@logged
def myoTrackHAL(HAL):
    print "\nTracking HAL"
    # update current tracked HAL
    tracking["currHAL"] = str(HAL)
    print str(HAL)
    return str(HAL)


# get tracking data
@app.route("/tracking/get")
@logged
def getTracking():
    print "\nMethod get tracking"
    # return json of tracking dictionary
    return flask.json.dumps(tracking)


if __name__== '__main__':
    ############### ROS setup #######################
    '''uncomment this
    node_name = 'mico_planner'
    group_name = 'arm'
    planner_name = 'RRTConnectkConfigDefault'
    ee_link_name = 'mico_link_endeffector'

    roscpp_initialize(sys.argv)
    rospy.init_node(node_name, anonymous=True)

    acHan = ActionHandler(group_name, planner_name, ee_link_name)

    rospy.sleep(1)
    '''
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

    '''uncomment this
    pub = rospy.Publisher('mico_arm/Forcecontrol', std_msgs.msg.Bool, queue_size=10)
    rospy.sleep(1)
    '''

    app.run(host='0.0.0.0',debug = True, use_reloader=False)

