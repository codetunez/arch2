var resolve = require('path').resolve;
var cp = require('child_process');
const { Console } = require('console');

cp.execSync("npm i -g nodemon");
console.log("Installed nodemon");

var library = resolve(__dirname, 'library/');
cp.exec('npm i', {cwd: library}, function(err, _stdout, stderr) {
    if(err) {
        throw new Error("Failed to install library", stderr);
    }
    console.info("Installed library")
    
    cp.exec('npm link', {cwd: library}, function(err, _stdout, stderr) {
        if(err) {
            throw new Error("Failed to establish library link", stderr);
        }
        console.info("Established library link")
    });
    
    var client = resolve(__dirname, 'client/');
    cp.exec('npm i --legacy-peer-deps', {cwd: client}, function(err, _stdout, stderr) {
        if(err) {
            throw new Error("Failed to install Client", stderr);
        }
        console.info("Installed Client")
        cp.exec('npm link library --legacy-peer-deps', {cwd: client}, function(err, _stdout, stderr) {
            if(err) {
                throw new Error("Failed linking library to client", stderr);
            }
            console.info("Linking library to client")
        });
    });
});

var middle = resolve(__dirname, 'middle/');
cp.exec('npm i', {cwd: middle}, function(err, _stdout, stderr) {
    if(err) {
        throw new Error("Failed to install library", stderr);
    }
    console.info("Installed middle")
});

var server = resolve(__dirname, 'server/');
cp.exec('npm i', {cwd: server}, function(err, _stdout, stderr) {
    if(err) {
        throw new Error("Failed to install server", stderr);
    }
    console.info("Installed server")
});




