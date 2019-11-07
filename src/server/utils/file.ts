const fs = require("fs");

function getFileTo(file, absPath, filename) {
  console.log(absPath);
  filename = filename || file.name;
  return new Promise((resolve, reject) => {
    try {
      const reader = fs.createReadStream(file.path);
      let filePath = absPath + filename;
      const upStream = fs.createWriteStream(filePath);
      reader.pipe(upStream);
      resolve(0);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  getFileTo
};
