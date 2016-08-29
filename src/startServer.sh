#!/usr/bin/env bash
source ~/HCI/therblig-motion-library/mico/wpi_jaco/devel/setup.sh
export PYTHONPATH=$PYTHONPATH:/home/mnm/HCI/therblig-motion-library/mico/wpi_jaco/src/mypak/scripts
python srv.py
