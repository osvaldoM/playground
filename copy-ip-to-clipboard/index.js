const exec = require('child_process').exec;
      ncp = require("copy-paste");



var script = exec('sh getIp.sh',
        (error, stdout, stderr) => {
            console.log(`${stdout}`);
            console.log(`${stderr}`);

            var regEx= /inet\s([\d|\.]+)/i;
            var ip = regEx.exec(stdout)[1];
            console.log(ip);
            ncp.copy(ip,function(response){
                console.log(response)
                console.log('coppied to clipboard');
                process.exit(1);
            });
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });