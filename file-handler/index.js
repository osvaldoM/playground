var fs = require('fs');
var args = process.argv.slice(2);

args.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
});

if(!args[0]){
    process.exit(1);
}
var toReplace=args[0];
var replacement=args[1] || '';

var walk = function(dir, done) {
    var results = [];
    fs.readdir(dir, function(err, list) {
      if (err) return done(err);
      var i = 0;
      (function next() {
        var file = list[i++];
        if (!file) return done(null, results);
        file = dir + '/' + file;
        fs.stat(file, function(err, stat) {
          if (stat && stat.isDirectory() && !file.includes('.git') && !file.includes('.idea') && !file.includes('lib')) {
            walk(file, function(err, res) {
              results = results.concat(res);
              next();
            });
          } else {
              if(!file.includes('.git') && !file.includes('.idea'))
                results.push(file);
            next();
          }
        });
      })();
    });
  };


  
function replace(someFile){
    fs.readFile(someFile, 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        // var regEx= new RegExp(toReplace, "gi")
//        var regEx= /data-i18n="([\w|\s]+)"\s*(.+>[\s\S]*)(.+)(<)/g
        var regEx= /data-i18n="([\w|\s]+)"\s*(.+>)(.+)(<)/g
        
        
        // var result = data.replace(regEx, replacement);
        var result = data.replace(regEx,"$2"+"[%$1%]"+"$4");
        fs.writeFile(someFile, result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });
}

walk(process.env.HOME+'/Desktop/projetcts/mopa-redesign', function(err, results) {
    if (err) throw err;
    // var regEx=/(html|css|js)$/i
    var regEx=/(html)$/i
    validFiles= results.filter(function(filename){
        return regEx.test(filename);
    })  
    console.log('running '+validFiles.toString());
    validFiles.forEach(function(val){
        replace(val);
    })
  });
