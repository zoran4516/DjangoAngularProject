#!/bin/bash  
echo "This is a shell script"  
xmodmap -e "pointer = 1 25 3 4 5 6 7 8 9"
sudo sysctl fs.inotify.max_user_watches=524288
echo "cmmand 1 completed"
sudo sysctl -p --system
