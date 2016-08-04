#!/usr/bin/env bash
source ~/marshall/therblig-motion-library/mico/wpi_jaco/devel/setup.sh
export PYTHONPATH=$PYTHONPATH:/home/marshallm/marshall/therblig-motion-library/mico/wpi_jaco/src/mypak/scripts
python srv.py
