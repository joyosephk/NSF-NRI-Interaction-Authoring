#!/usr/bin/env/python

import rospy
from std_msgs.msg import String

def hello_world():
    pub = rospy.Publisher("test", String, queue_size = 3)
    rospy.init_node("test_node", anonymous=True)
    rate = rospy.Rate(10)
    while not rospy.is_shutdown():
        string = "hello, client!"
        rospy.loginfo(string)
#        pub.publish(string)
        rate.sleep()

if __name__ == '__main__':
    print('starting ros topic')
    hello_world()
