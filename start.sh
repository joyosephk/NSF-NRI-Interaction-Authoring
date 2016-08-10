#!/bin/bash

SESSION=$USER
#create new session
tmux -2 new-session -d -s $SESSION

#create and name new windows
#editor pane
tmux new-window -t $SESSION:1  -n 'Editor' #name of pane is editor

#gulp pane
tmux new-window -t $SESSION:3 -n 'Gulp'

#terminal pane
tmux new-window -t $SESSION:2 -n "Commands"


#select the window for gulp
tmux select-window -t 3

#start gulp 
tmux send-keys "cd src && gulp" C-m

#start in the terminal window
tmux select-window -t 2
tmux split-window -h
tmux clock-mode -t 1
tmux select-pane -t 0
#most importantly, attach the window
tmux -2 attach-session -t $SESSION
