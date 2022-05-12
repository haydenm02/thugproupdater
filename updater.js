if (process.argv.length != 3) {
    console.log("Please give ONLY the folder path!")
    console.log("Given:");
    for (i = 0; i < process.argv.length; i++) { console.log(process.argv[i]); }
    process.exit(0);
}

const path = require("path");

/*  Path seeminly defaults to the system? (tested on windows)
    WIN+WIN=WIN
> path.join("C:\\users", "hayden", "\\desktop")
'C:\\users\\hayden\\desktop'
    LIN+LIN=WIN
> path.join("/home", "hayden", "/desktop")
'\\home\\hayden\\desktop'
    WIN+LIN=WIN
> path.join("C:\\users", "hayden", "/desktop")
'C:\\users\\hayden\\desktop'
    LIN+WIN=WIN
> path.join("/users", "hayden", "\\desktop")
'\\users\\hayden\\desktop'
*/

const fs = require("fs");
const crc32 = require("crc-32");
const http = require("http");
const folderpath = process.argv[2];

if (!fs.existsSync(folderpath)) {
    console.log("Folder does not exist!\nFolder given: " + folderpath);
    process.exit(0);
}

console.log("Folder exists");

var fileList = {
    /*
    "path/on/disk": {
        "crc32": "abcdefg",
        "link": "/path/on/server",
        "version": "6.9.6.9 uwu"
    }
    */
}

var fileQueue = []
/*
    {
        "link": "http://dl.thugpro.com" + PATH ON SERVER,
        "location": PATH ON DISK
    }
*/

// Get the current THUG Pro version
getJSON("http://dl.thugpro.com/current.json", function (current) {
    // Get the data files related to the current version
    getJSON(`http://dl.thugpro.com/update/${current.release}/${current.version}/update.json`, function (update) {
        // Add them all to the file list
        console.log("Data_files len: " + Object.keys(update.data_files).length);
        console.log("Other_files len: " + Object.keys(update.other_files).length);
        for (datafile in update.data_files) {
            fileList[datafile] = update.data_files[datafile];
        }
        for (otherfile in update.other_files) {
            fileList[otherfile] = update.other_files[otherfile];
        }
        console.log("Files to verify: " + Object.keys(fileList).length);
        // And process them
        // Check if we already have an up-to-date version
        verifyFiles();
        console.log("Files to download: " + fileQueue.length);
        // Download missing or non-matching files
        processQueue(function () {
            console.log("That should be all!\nMake sure to disable auto-update (ctrl+alt+d) in the launcher gamepad settings\nAnd enjoy thug! <3");
        });
    });
});

// Queue files to download so we don't try to download all at once
function processQueue(callback) {

    // Check if we have finished the queue
    if (fileQueue.length == 0) {
        callback();
        return;
    }

    // Get the current file
    var curFile = fileQueue.pop();

    // Make the directory/ies if they do not exist
    if (!fs.existsSync(path.dirname(curFile.location))) fs.mkdirSync(path.dirname(curFile.location), { recursive: true });

    console.log("Downloading file:" + JSON.stringify(curFile));

    // Create the write stream for the file
    var writeStream = fs.createWriteStream(curFile.location);

    // And send the request for it
    var req = http.get(curFile.link);

    req.on("response", function (res) {
        var len = parseInt(res.headers['content-length'], 10);
        var downloaded = 0;
        res.on("data", function (chunk) {
            writeStream.write(chunk);
            downloaded += chunk.length;
            //console.log("Downloaded " + (downloaded / len * 100) + "%");
        });
        res.on("end", function () {
            // Get next file
            processQueue();
        });
        res.on("error", function (err) {
            console.log("Failed to download file: " + err);
            return;
        });
    });

    req.on("error", function (err) {
        console.log("Failed to download\n" + err);
        processQueue();
    });

    req.setTimeout(1000);

}

function verifyFiles() {
    for (file in fileList) {
        var filepath = path.join(folderpath, file);
        if (fs.existsSync(filepath)) {
            // File exists, check hash
            // Read the file, get the CRC32 hash of it (signed int)
            var filedata = crc32.buf(fs.readFileSync(filepath));

            // parse 2s complement if negative
            if (filedata < 0) {
                filedata = filedata >>> 0;
            }

            // Convert to a hex string and pad if necessary
            filedata = filedata.toString(16);
            while (filedata.length < 8) filedata = "0" + filedata;

            if (filedata == fileList[file].crc32) {
                //console.log("Hash matches! skipping");
            } else {
                console.log(filepath + " ||| Hash does not match! (" + filedata + "/" + fileList[file].crc32 + ")");
                fileQueue.push({
                    "link": "http://dl.thugpro.com" + fileList[file].link,
                    "location": filepath
                });
            }
        } else {
            // Add to download list
            console.log(filepath + " ||| File not found!");
            fileQueue.push({
                "link": "http://dl.thugpro.com" + fileList[file].link,
                "location": filepath
            });
        }
    }
}

function getJSON(url, callback) {
    http.get(url)
    .on("response", function (res) {
        var currentJson = "";
        var len = parseInt(res.headers['content-length'], 10);
        var downloaded = 0;
        res.on("data", function (chunk) {
            currentJson += chunk;
            downloaded += chunk.length;
            //console.log("Downloaded " + (downloaded / len * 100) + "%");
        });
        res.on("end", function () {
            callback(JSON.parse(currentJson));
        });
        res.on("error", function (err) {
            console.log("Failed to download current version file: " + err);
            process.exit(0);
        });
    })
    .on("error", function (err) {
        console.log("Failed to download\n" + err);
        process.exit(0);
    });
}