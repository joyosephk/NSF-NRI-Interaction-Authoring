// Generated by gencpp from file wpi_jaco_msgs/EStopRequest.msg
// DO NOT EDIT!


#ifndef WPI_JACO_MSGS_MESSAGE_ESTOPREQUEST_H
#define WPI_JACO_MSGS_MESSAGE_ESTOPREQUEST_H


#include <string>
#include <vector>
#include <map>

#include <ros/types.h>
#include <ros/serialization.h>
#include <ros/builtin_message_traits.h>
#include <ros/message_operations.h>


namespace wpi_jaco_msgs
{
template <class ContainerAllocator>
struct EStopRequest_
{
  typedef EStopRequest_<ContainerAllocator> Type;

  EStopRequest_()
    : enableEStop(false)  {
    }
  EStopRequest_(const ContainerAllocator& _alloc)
    : enableEStop(false)  {
    }



   typedef uint8_t _enableEStop_type;
  _enableEStop_type enableEStop;




  typedef boost::shared_ptr< ::wpi_jaco_msgs::EStopRequest_<ContainerAllocator> > Ptr;
  typedef boost::shared_ptr< ::wpi_jaco_msgs::EStopRequest_<ContainerAllocator> const> ConstPtr;

}; // struct EStopRequest_

typedef ::wpi_jaco_msgs::EStopRequest_<std::allocator<void> > EStopRequest;

typedef boost::shared_ptr< ::wpi_jaco_msgs::EStopRequest > EStopRequestPtr;
typedef boost::shared_ptr< ::wpi_jaco_msgs::EStopRequest const> EStopRequestConstPtr;

// constants requiring out of line definition



template<typename ContainerAllocator>
std::ostream& operator<<(std::ostream& s, const ::wpi_jaco_msgs::EStopRequest_<ContainerAllocator> & v)
{
ros::message_operations::Printer< ::wpi_jaco_msgs::EStopRequest_<ContainerAllocator> >::stream(s, "", v);
return s;
}

} // namespace wpi_jaco_msgs

namespace ros
{
namespace message_traits
{



// BOOLTRAITS {'IsFixedSize': True, 'IsMessage': True, 'HasHeader': False}
// {'wpi_jaco_msgs': ['/home/hcilab/Documents/John/nri-authoring-environment/wpi_jaco/src/wpi_jaco_msgs/msg', '/home/hcilab/Documents/John/nri-authoring-environment/wpi_jaco/devel/share/wpi_jaco_msgs/msg'], 'std_msgs': ['/opt/ros/indigo/share/std_msgs/cmake/../msg'], 'actionlib_msgs': ['/opt/ros/indigo/share/actionlib_msgs/cmake/../msg'], 'geometry_msgs': ['/opt/ros/indigo/share/geometry_msgs/cmake/../msg']}

// !!!!!!!!!!! ['__class__', '__delattr__', '__dict__', '__doc__', '__eq__', '__format__', '__getattribute__', '__hash__', '__init__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', '_parsed_fields', 'constants', 'fields', 'full_name', 'has_header', 'header_present', 'names', 'package', 'parsed_fields', 'short_name', 'text', 'types']




template <class ContainerAllocator>
struct IsFixedSize< ::wpi_jaco_msgs::EStopRequest_<ContainerAllocator> >
  : TrueType
  { };

template <class ContainerAllocator>
struct IsFixedSize< ::wpi_jaco_msgs::EStopRequest_<ContainerAllocator> const>
  : TrueType
  { };

template <class ContainerAllocator>
struct IsMessage< ::wpi_jaco_msgs::EStopRequest_<ContainerAllocator> >
  : TrueType
  { };

template <class ContainerAllocator>
struct IsMessage< ::wpi_jaco_msgs::EStopRequest_<ContainerAllocator> const>
  : TrueType
  { };

template <class ContainerAllocator>
struct HasHeader< ::wpi_jaco_msgs::EStopRequest_<ContainerAllocator> >
  : FalseType
  { };

template <class ContainerAllocator>
struct HasHeader< ::wpi_jaco_msgs::EStopRequest_<ContainerAllocator> const>
  : FalseType
  { };


template<class ContainerAllocator>
struct MD5Sum< ::wpi_jaco_msgs::EStopRequest_<ContainerAllocator> >
{
  static const char* value()
  {
    return "d240ad7bcf146ea2ed0786ad3ef05f32";
  }

  static const char* value(const ::wpi_jaco_msgs::EStopRequest_<ContainerAllocator>&) { return value(); }
  static const uint64_t static_value1 = 0xd240ad7bcf146ea2ULL;
  static const uint64_t static_value2 = 0xed0786ad3ef05f32ULL;
};

template<class ContainerAllocator>
struct DataType< ::wpi_jaco_msgs::EStopRequest_<ContainerAllocator> >
{
  static const char* value()
  {
    return "wpi_jaco_msgs/EStopRequest";
  }

  static const char* value(const ::wpi_jaco_msgs::EStopRequest_<ContainerAllocator>&) { return value(); }
};

template<class ContainerAllocator>
struct Definition< ::wpi_jaco_msgs::EStopRequest_<ContainerAllocator> >
{
  static const char* value()
  {
    return "bool enableEStop\n\
";
  }

  static const char* value(const ::wpi_jaco_msgs::EStopRequest_<ContainerAllocator>&) { return value(); }
};

} // namespace message_traits
} // namespace ros

namespace ros
{
namespace serialization
{

  template<class ContainerAllocator> struct Serializer< ::wpi_jaco_msgs::EStopRequest_<ContainerAllocator> >
  {
    template<typename Stream, typename T> inline static void allInOne(Stream& stream, T m)
    {
      stream.next(m.enableEStop);
    }

    ROS_DECLARE_ALLINONE_SERIALIZER;
  }; // struct EStopRequest_

} // namespace serialization
} // namespace ros

namespace ros
{
namespace message_operations
{

template<class ContainerAllocator>
struct Printer< ::wpi_jaco_msgs::EStopRequest_<ContainerAllocator> >
{
  template<typename Stream> static void stream(Stream& s, const std::string& indent, const ::wpi_jaco_msgs::EStopRequest_<ContainerAllocator>& v)
  {
    s << indent << "enableEStop: ";
    Printer<uint8_t>::stream(s, indent + "  ", v.enableEStop);
  }
};

} // namespace message_operations
} // namespace ros

#endif // WPI_JACO_MSGS_MESSAGE_ESTOPREQUEST_H
