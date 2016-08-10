#!/usr/bin/env bash
source ~/PycharmProjects/therblig-motion-library/mico/wpi_jaco/devel/setup.sh
export PYTHONPATH=$PYTHONPATH:/home/mnm/PycharmProjects/therblig-motion-library/mico/wpi_jaco/src/mypak/scripts
python srv.py
