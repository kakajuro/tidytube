#!/bin/sh

# Get version from manifest file
version=$(cat ../public/chrome_manifest.json | grep version | grep -v manifest | tr -d '"' | tr -d ',' | tr -d ':' | tr -d " " | sed -E "s/^[a-zA-z:]*//")

# Remove previous data if any
echo Setting up...
rm -rf tidytubesource *.zip
mkdir tidytubesource

cd ..

# In root directory, copy all needed files
echo Copying files...
cp -r public tools/tidytubesource
cp -r src tools/tidytubesource
cp tools/README.md tools/tidytubesource
cp $(ls -pa | grep -v / | grep -v md | grep -v txt | grep -v "^[.]") tools/tidytubesource # Copies all files I want from root dir (all files except md and txt files and dotfiles)

# Zip the source
echo Zipping...
cd tools
tar.exe acf tidytubesource_v$version.zip -C tidytubesource .
echo Complete.
