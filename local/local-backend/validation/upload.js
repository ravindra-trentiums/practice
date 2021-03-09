const fsDir = require('fs');
const fs = require('fs').promises;
const path = require('path');
module.exports = {
  uploadImage: uploadImage,
};
async function uploadImage(req, res, next, destination, columnName) {
  try {
    await createDirIfNotExist(destination);
    console.log(columnName)
    imageFormat = columnName.name.split('.');

    let format = [
      'jpg',
      'jpeg',
      'png',
      'gif',
      'webp',
      'JPG',
      'JPEG',
      'PNG',
      'GIF',
      'WEBP',
      'svg',
    ];
    if (
      format.includes(
        imageFormat[imageFormat.length - 1].toString().toLowerCase()
      )
    ) {
      let fileName =
        imageFormat[0] +
        '-' +
        Date.now() +
        '.' +
        imageFormat[imageFormat.length - 1];
      let fileDestination = destination + '/' + fileName;
      let file = await fs.open(fileDestination, 'w');
      await fs.writeFile(file, columnName.data, 'base64');
      return fileName;
    } else {
      res.status(400).send(
        ErrorBuilder.construct({
          type: 'VALIDATION:DEFAULT:BASE',
          metadata: {
            message: 'File format is not supported.',
          },
        })
      );
    }
  } catch (error) {
    // console.error(error, 'new');
    return null;
  }
}
function createDirIfNotExist(dir) {
    try {
        console.log(dir,"hell")
      if (!fsDir.existsSync(dir)) {
        fsDir.mkdirSync(dir);
      }
    } catch (error) {
      console.log(error,"hello");
    }
  
    return fsDir.existsSync(dir);
  }
