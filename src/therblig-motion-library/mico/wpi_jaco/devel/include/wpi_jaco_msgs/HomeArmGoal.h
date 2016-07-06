// Generated by gencpp from file wpi_jaco_msgs/HomeArmGoal.msg
// DO NOT EDIT!


#ifndef WPI_JACO_MSGS_MESSAGE_HOMEARMGOAL_H
#define WPI_JACO_MSGS_MESSAGE_HOMEARMGOAL_H


#include <string>
#include <vector>
#include <map>

#include <ros/types.h>
#include <ros/serialization.h>
#include <ros/builtin_message_traits.h>
#include <ros/message_operations.h>

#include <wpi_jaco_msgs/AngularCommand.h>

namespace wpi_jaco_msgs
{
template <class ContainerAllocator>
struct HomeArmGoal_
{
  typedef HomeArmGoal_<ContainerAllocator> Type;

  HomeArmGoal_()
    : retract(false)
    , retractPosition()
    , numAttempts(0)  {
    }
  HomeArmGoal_(const ContainerAllocator& _alloc)
    : retract(false)
    , retractPosition(_alloc)
    , numAttempts(0)  {
    }



   typedef uint8_t _retract_type;
  _retract_type retract;

   typedef  ::wpi_jaco_msgs::AngularCommand_<ContainerAllocator>  _retractPosition_type;
  _retractPosition_type retractPosition;

   typedef int16_t _numAttempts_type;
  _numAttempts_type numAttempts;




  typedef boost::shared_ptr< ::wpi_jaco_msgs::HomeArmGoal_<ContainerAllocator> > Ptr;
  typedef boost::shared_ptr< ::wpi_jaco_msgs::HomeArmGoal_<ContainerAllocator> const> ConstPtr;

}; // struct HomeArmGoal_

typedef ::wpi_jaco_msgs::HomeArmGoal_<std::allocator<void> > HomeArmGoal;

typedef boost::shared_ptr< ::wpi_jaco_msgs::HomeArmGoal > HomeArmGoalPtr;
typedef boost::shared_ptr< ::wpi_jaco_msgs::HomeArmGoal const> HomeArmGoalConstPtr;

// constants requiring out of line definition



template<typename ContainerAllocator>
std::ostream& operator<<(std::ostream& s, const ::wpi_jaco_msgs::HomeArmGoal_<ContainerAllocator> & v)
{
ros::message_operations::Printer< ::wpi_jaco_msgs::HomeArmGoal_<ContainerAllocator> >::stream(s, "", v);
return s;
}

} // namespace wpi_jaco_msgs

namespace ros
{
namespace message_traits
{



// BOOLTRAITS {'IsFixedSize': False, 'IsMessage': True, 'HasHeader': False}
// {'wpi_jaco_msgs': ['/home/hcilab/Documents/John/nri-authoring-environment/wpi_jaco/src/wpi_jaco_msgs/msg', '/home/hcilab/Documents/John/nri-authoring-environment/wpi_jaco/devel/share/wpi_jaco_msgs/msg'], 'std_msgs': ['/opt/ros/indigo/share/std_msgs/cmake/../msg'], 'actionlib_msgs': ['/opt/ros/indigo/share/actionlib_msgs/cmake/../msg'], 'geometry_msgs': ['/opt/ros/indigo/share/geometry_msgs/cmake/../msg']}

// !!!!!!!!!!! ['__class__', '__delattr__', '__dict__', '__doc__', '__eq__', '__format__', '__getattribute__', '__hash__', '__init__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', '_parsed_fields', 'constants', 'fields', 'full_name', 'has_header', 'header_present', 'names', 'package', 'parsed_fields', 'short_name', 'text', 'types']




template <class ContainerAllocator>
struct IsFixedSize< ::wpi_jaco_msgs::HomeArmGoal_<ContainerAllocator> >
  : FalseType
  { };

template <class ContainerAllocator>
struct IsFixedSize< ::wpi_jaco_msgs::HomeArmGoal_<ContainerAllocator> const>
  : FalseType
  { };

template <class ContainerAllocator>
struct IsMessage< ::wpi_jaco_msgs::HomeArmGoal_<ContainerAllocator> >
  : TrueType
  { };

template <class ContainerAllocator>
struct IsMessage< ::wpi_jaco_msgs::HomeArmGoal_<ContainerAllocator> const>
  : TrueType
  { };

template <class ContainerAllocator>
struct HasHeader< ::wpi_jaco_msgs::HomeArmGoal_<ContainerAllocator> >
  : FalseType
  { };

template <class ContainerAllocator>
struct HasHeader< ::wpi_jaco_msgs::HomeArmGoal_<ContainerAllocator> const>
  : FalseType
  { };


template<class ContainerAllocator>
struct MD5Sum< ::wpi_jaco_msgs::HomeArmGoal_<ContainerAllocator> >
{
  static const char* value()
  {
    return "5cc54d6dce7b985a5f2ef59749e9444c";
  }

  static const char* value(const ::wpi_jaco_msgs::HomeArmGoal_<ContainerAllocator>&) { return value(); }
  static const uint64_t static_value1 = 0x5cc54d6dce7b985aULL;
  static const uint64_t static_value2 = 0x5f2ef59749e9444cULL;
};

template<class ContainerAllocator>
struct DataType< ::wpi_jaco_msgs::HomeArmGoal_<ContainerAllocator> >
{
  static const char* value()
  {
    return "wpi_jaco_msgs/HomeArmGoal";
  }

  static const char* value(const ::wpi_jaco_msgs::HomeArmGoal_<ContainerAllocator>&) { return value(); }
};

template<class ContainerAllocator>
struct Definition< ::wpi_jaco_msgs::HomeArmGoal_<ContainerAllocator> >
{
  static const char* value()
  {
    return "# ====== DO NOT MODIFY! AUTOGENERATED FROM AN ACTION DEFINITION ======\n\
# Define the goal\n\
bool retract                                  # set to true to retract arm to a given position after moving home\n\
wpi_jaco_msgs/AngularCommand retractPosition  # position to which the arm should retract (only if retract is true)\n\
int16 numAttempts                                # attempts for moving to given joint pose (only used in motion planning versions)\n\
\n\
================================================================================\n\
MSG: wpi_jaco_msgs/AngularCommand\n\
bool position       # true for a position command, false for a velocity command\n\
bool armCommand     # true if this command includes arm joint inputs\n\
bool fingerCommand  # true if this command includes finger inputs\n\
bool repeat         # true if the command should be repeatedly sent over a short interval\n\
float32[] joints    # position (rad) or velocity (rad/s) arm command\n\
float32[] fingers   # position (rad) or velocity (rad/s) finger command\n\
";
  }

  static const char* value(const ::wpi_jaco_msgs::HomeArmGoal_<ContainerAllocator>&) { return value(); }
};

} // namespace message_traits
} // namespace ros

namespace ros
{
namespace serialization
{

  template<class ContainerAllocator> struct Serializer< ::wpi_jaco_msgs::HomeArmGoal_<ContainerAllocator> >
  {
    template<typename Stream, typename T> inline static void allInOne(Stream& stream, T m)
    {
      stream.next(m.retract);
      stream.next(m.retractPosition);
      stream.next(m.numAttempts);
    }

    ROS_DECLARE_ALLINONE_SERIALIZER;
  }; // struct HomeArmGoal_

} // namespace serialization
} // namespace ros

namespace ros
{
namespace message_operations
{

template<class ContainerAllocator>
struct Printer< ::wpi_jaco_msgs::HomeArmGoal_<ContainerAllocator> >
{
  template<typename Stream> static void stream(Stream& s, const std::string& indent, const ::wpi_jaco_msgs::HomeArmGoal_<ContainerAllocator>& v)
  {
    s << indent << "retract: ";
    Printer<uint8_t>::stream(s, indent + "  ", v.retract);
    s << indent << "retractPosition: ";
    s << std::endl;
    Printer< ::wpi_jaco_msgs::AngularCommand_<ContainerAllocator> >::stream(s, indent + "  ", v.retractPosition);
    s << indent << "numAttempts: ";
    Printer<int16_t>::stream(s, indent + "  ", v.numAttempts);
  }
};

} // namespace message_operations
} // namespace ros

#endif // WPI_JACO_MSGS_MESSAGE_HOMEARMGOAL_H