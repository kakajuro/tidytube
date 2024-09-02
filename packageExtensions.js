const fs = require("fs");
const path = require("path");
const { rimrafSync } = require("rimraf");
const { execSync } = require("child_process");
const zipdir = require("zip-dir");

let outputDir = path.join(__dirname, "dist");

let platforms = ["chrome", "firefox", "edge"];

async function packageExtension() {
  // Empty existing dist directory if there is one
  if (fs.existsSync(outputDir)) {
    try {
      rimrafSync(outputDir);
      console.log("Removed existing output directory sucessfully");
    } catch (error) {
      console.error("Error removing existing output directory: ${error}")
    }
  }

  fs.mkdirSync(outputDir);
  console.log("dist directory created");

  // Build for each platform
  for (let platform of platforms) {

    console.log(`Building for ${platform.toUpperCase()}...`)

    try {
      await execSync(`yarn app:${platform}`);
    } catch (error) {
      console.error(`Error building for ${platform.toUpperCase()}: ${error}`);
    }

    console.log(`Built for ${platform.toUpperCase()} sucessfully!`);

  }

  // Zip
  for (let platform of platforms) {
    console.log(`Attempting to zip: ${platform.toUpperCase()}...`);

    let inPath = path.join(__dirname, `/dist/${platform}_dist`);
    let outPath = path.join(__dirname, `/dist/${platform}_dist.zip`);

    try {
      await new Promise((resolve, reject) => {
        zipdir(inPath,
          {
            each: (filePath) =>
              console.log(
                filePath.replace(/^.*[\\/]/, ""),
                `added to ${platform.toUpperCase()} zip`
              ),
            saveTo: outPath,
          },
          (err) => {
            if (err) {
              reject(`An error occurred while zipping: ${err}`);
            } else {
              console.log(`Zipped: ${platform.toUpperCase()}`);
              resolve();
            }
          }
        );
      });

    // Remove unzipped builds
    rimrafSync(inPath);
    } catch (error) {
      console.error(`Error zipping for ${platform.toUpperCase()}: ${error}`);
    }

  }

  console.log("Finished building.")

}

packageExtension();