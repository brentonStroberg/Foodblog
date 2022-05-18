#!/bin/bash
echo "Stopping any existing node servers"
if pgrep myServer; then pkill node; fi
