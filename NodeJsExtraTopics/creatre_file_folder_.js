const fs = require('fs');
const path = require('path');
const folderPath = path.join("/var2/www", 'files');


function createFileFolder() {
    // check if file or folder exists
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath,{recursive:true});
        console.log('Folder created successfully');
    } else {
        console.log('Folder already exists');
    }   
}

createFileFolder();