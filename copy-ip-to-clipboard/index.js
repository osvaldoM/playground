const exec = require('child_process').exec;
      ncp = require("copy-paste");



var script = exec('sh getIp.sh',
        (error, stdout, stderr) => {
            //in case there is an error
            console.log(`${stderr}`);
            var regEx= /inet\s([\d|\.]+)/i;
            var ip = regEx.exec(stdout)[1];
            ncp.copy(ip,function(response){
                console.log(`coppied ${ip} to clipboard`);
                process.exit(1);
            });
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });