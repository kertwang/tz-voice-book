#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

for input in "$DIR"/*.m4a; do
  ffmpeg "${input/.m4a/.mp3}" -i $input -codec:a libmp3lame -qscale:a 1
done

# ffmpeg *.mp3 -i *.ogg -codec:a libmp3lame -qscale:a 1