#!/bin/bash
echo "Stopping any existing node servers"
if pgrep node; then pkill node; fi
