/*
    node filepath
    this script's file path
    arg1
    arg2
    ...
*/

if (process.argv.length != 3) {
    console.log("Please give ONLY the folder path!")
    console.log("Given:");
    for (i=0;i<process.argv.length;i++) { console.log(process.argv[i]); }
    process.exit(0);
}

const fs = require ("fs");
const folderpath = process.argv[2];

if (!fs.existsSync(folderpath)) {
    console.log("Folder does not exist!\nFolder given: " + folderpath);
    process.exit(0);
}

console.log("Folder exists");