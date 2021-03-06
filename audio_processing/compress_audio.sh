#!/usr/bin/env bash

# -af acompressor=threshold=-21dB:ratio=9:attack=200:release=1000


DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

#examples:
# ffmpeg-normalize input.mp3 -c:a libmp3lame -b:a 320k -o output.mp3
# ffmpeg-normalize *.mkv -c:a aac -b:a 192k

for input in "$DIR"/unprocessed/*.mp3; do
  ffmpeg-normalize  "${input}" -c:a libmp3lame -f --normalization-type peak --target-level 10  -o "${input/.mp3}.mp3"
done
