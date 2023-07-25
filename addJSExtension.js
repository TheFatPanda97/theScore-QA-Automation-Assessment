const fs = require('fs');
const path = require('path');

const buildDirectory = './build';

// Function to modify the content of JS files and add the .js extension to 'require' statements
function modifyFilesWithRequireJSExtension(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(directory, file);

      fs.stat(filePath, (statErr, stats) => {
        if (statErr) {
          console.error('Error getting file stats:', statErr);
          return;
        }

        if (stats.isDirectory()) {
          modifyFilesWithRequireJSExtension(filePath); // Recursively process subdirectories
        } else if (stats.isFile() && path.extname(file) === '.js') {
          fs.readFile(filePath, 'utf8', (readErr, data) => {
            if (readErr) {
              console.error('Error reading file:', readErr);
              return;
            }

            const modifiedData = data.replace(
              /require\("(\.\/[^"]*)"\);/g,
              (_match, capturedGroup) => `require("${capturedGroup}.js")`,
            );

            fs.writeFile(filePath, modifiedData, 'utf8', (writeErr) => {
              if (writeErr) {
                console.error('Error writing file:', writeErr);
                return;
              }
            });
          });
        }
      });
    });
  });
}

// Call the function with the build directory path
modifyFilesWithRequireJSExtension(buildDirectory);
