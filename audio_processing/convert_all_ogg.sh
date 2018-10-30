#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

for input in "$DIR"/*.ogg; do
  ffmpeg "${input/.ogg/.mp3}" -i $input -codec:a libmp3lame -qscale:a 1
done

# ffmpeg *.mp3 -i *.ogg -codec:a libmp3lame -qscale:a 1