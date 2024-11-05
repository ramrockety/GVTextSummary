#!/bin/bash

# Capture the output of 'fnm env --use-on-cd' and evaluate it in the current shell environment
eval "$(fnm env --use-on-cd | Out-String | Invoke-Expression)"