#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"


for input in "$DIR"/wav/*.wav; do
  echo "$input"
  remove_freeze="${input//Freeze }"
  echo "${remove_freeze/.wav/.mp3}"
  ffmpeg "${remove_freeze/.wav/.mp3}" -i "$input" -codec:a libmp3lame -qscale:a 2

  # ffmpeg -i input.wav -codec:a libmp3lame -qscale:a 2 output.mp3
done

# ffmpeg *.mp3 -i *.ogg -codec:a libmp3lame -qscale:a 1
# rm -f "$DIR"/unprocessed/*.m4a