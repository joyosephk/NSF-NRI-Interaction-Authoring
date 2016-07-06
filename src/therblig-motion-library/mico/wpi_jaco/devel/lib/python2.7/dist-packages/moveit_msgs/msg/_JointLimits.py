"""autogenerated by genpy from moveit_msgs/JointLimits.msg. Do not edit."""
import sys
python3 = True if sys.hexversion > 0x03000000 else False
import genpy
import struct


class JointLimits(genpy.Message):
  _md5sum = "8ca618c7329ea46142cbc864a2efe856"
  _type = "moveit_msgs/JointLimits"
  _has_header = False #flag to mark the presence of a Header object
  _full_text = """# This message contains information about limits of a particular joint (or control dimension)
string joint_name

# true if the joint has position limits
bool has_position_limits

# min and max position limits
float64 min_position
float64 max_position

# true if joint has velocity limits
bool has_velocity_limits

# max velocity limit
float64 max_velocity
# min_velocity is assumed to be -max_velocity

# true if joint has acceleration limits
bool has_acceleration_limits
# max acceleration limit
float64 max_acceleration
# min_acceleration is assumed to be -max_acceleration

"""
  __slots__ = ['joint_name','has_position_limits','min_position','max_position','has_velocity_limits','max_velocity','has_acceleration_limits','max_acceleration']
  _slot_types = ['string','bool','float64','float64','bool','float64','bool','float64']

  def __init__(self, *args, **kwds):
    """
    Constructor. Any message fields that are implicitly/explicitly
    set to None will be assigned a default value. The recommend
    use is keyword arguments as this is more robust to future message
    changes.  You cannot mix in-order arguments and keyword arguments.

    The available fields are:
       joint_name,has_position_limits,min_position,max_position,has_velocity_limits,max_velocity,has_acceleration_limits,max_acceleration

    :param args: complete set of field values, in .msg order
    :param kwds: use keyword arguments corresponding to message field names
    to set specific fields.
    """
    if args or kwds:
      super(JointLimits, self).__init__(*args, **kwds)
      #message fields cannot be None, assign default values for those that are
      if self.joint_name is None:
        self.joint_name = ''
      if self.has_position_limits is None:
        self.has_position_limits = False
      if self.min_position is None:
        self.min_position = 0.
      if self.max_position is None:
        self.max_position = 0.
      if self.has_velocity_limits is None:
        self.has_velocity_limits = False
      if self.max_velocity is None:
        self.max_velocity = 0.
      if self.has_acceleration_limits is None:
        self.has_acceleration_limits = False
      if self.max_acceleration is None:
        self.max_acceleration = 0.
    else:
      self.joint_name = ''
      self.has_position_limits = False
      self.min_position = 0.
      self.max_position = 0.
      self.has_velocity_limits = False
      self.max_velocity = 0.
      self.has_acceleration_limits = False
      self.max_acceleration = 0.

  def _get_types(self):
    """
    internal API method
    """
    return self._slot_types

  def serialize(self, buff):
    """
    serialize message into buffer
    :param buff: buffer, ``StringIO``
    """
    try:
      _x = self.joint_name
      length = len(_x)
      if python3 or type(_x) == unicode:
        _x = _x.encode('utf-8')
        length = len(_x)
      if python3:
        buff.write(struct.pack('<I%sB'%length, length, *_x))
      else:
        buff.write(struct.pack('<I%ss'%length, length, _x))
      _x = self
      buff.write(_struct_B2dBdBd.pack(_x.has_position_limits, _x.min_position, _x.max_position, _x.has_velocity_limits, _x.max_velocity, _x.has_acceleration_limits, _x.max_acceleration))
    except struct.error as se: self._check_types(struct.error("%s: '%s' when writing '%s'" % (type(se), str(se), str(_x))))
    except TypeError as te: self._check_types(ValueError("%s: '%s' when writing '%s'" % (type(te), str(te), str(_x))))

  def deserialize(self, str):
    """
    unpack serialized message in str into this message instance
    :param str: byte array of serialized message, ``str``
    """
    try:
      end = 0
      start = end
      end += 4
      (length,) = _struct_I.unpack(str[start:end])
      start = end
      end += length
      if python3:
        self.joint_name = str[start:end].decode('utf-8')
      else:
        self.joint_name = str[start:end]
      _x = self
      start = end
      end += 35
      (_x.has_position_limits, _x.min_position, _x.max_position, _x.has_velocity_limits, _x.max_velocity, _x.has_acceleration_limits, _x.max_acceleration,) = _struct_B2dBdBd.unpack(str[start:end])
      self.has_position_limits = bool(self.has_position_limits)
      self.has_velocity_limits = bool(self.has_velocity_limits)
      self.has_acceleration_limits = bool(self.has_acceleration_limits)
      return self
    except struct.error as e:
      raise genpy.DeserializationError(e) #most likely buffer underfill


  def serialize_numpy(self, buff, numpy):
    """
    serialize message with numpy array types into buffer
    :param buff: buffer, ``StringIO``
    :param numpy: numpy python module
    """
    try:
      _x = self.joint_name
      length = len(_x)
      if python3 or type(_x) == unicode:
        _x = _x.encode('utf-8')
        length = len(_x)
      if python3:
        buff.write(struct.pack('<I%sB'%length, length, *_x))
      else:
        buff.write(struct.pack('<I%ss'%length, length, _x))
      _x = self
      buff.write(_struct_B2dBdBd.pack(_x.has_position_limits, _x.min_position, _x.max_position, _x.has_velocity_limits, _x.max_velocity, _x.has_acceleration_limits, _x.max_acceleration))
    except struct.error as se: self._check_types(struct.error("%s: '%s' when writing '%s'" % (type(se), str(se), str(_x))))
    except TypeError as te: self._check_types(ValueError("%s: '%s' when writing '%s'" % (type(te), str(te), str(_x))))

  def deserialize_numpy(self, str, numpy):
    """
    unpack serialized message in str into this message instance using numpy for array types
    :param str: byte array of serialized message, ``str``
    :param numpy: numpy python module
    """
    try:
      end = 0
      start = end
      end += 4
      (length,) = _struct_I.unpack(str[start:end])
      start = end
      end += length
      if python3:
        self.joint_name = str[start:end].decode('utf-8')
      else:
        self.joint_name = str[start:end]
      _x = self
      start = end
      end += 35
      (_x.has_position_limits, _x.min_position, _x.max_position, _x.has_velocity_limits, _x.max_velocity, _x.has_acceleration_limits, _x.max_acceleration,) = _struct_B2dBdBd.unpack(str[start:end])
      self.has_position_limits = bool(self.has_position_limits)
      self.has_velocity_limits = bool(self.has_velocity_limits)
      self.has_acceleration_limits = bool(self.has_acceleration_limits)
      return self
    except struct.error as e:
      raise genpy.DeserializationError(e) #most likely buffer underfill

_struct_I = genpy.struct_I
_struct_B2dBdBd = struct.Struct("<B2dBdBd")
