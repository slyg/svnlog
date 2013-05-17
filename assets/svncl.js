/*
    Launches svn command line and returns result a js object.
    Returns a promise.
*/

var 
    parseString = require('xml2js').parseString,
    Q = require('q')
;

module.exports = function svncl(){

    var
        command         = Array.prototype.slice.call(arguments, 0),
        deferred        = Q.defer(),
        spawn           = require('child_process').spawn,
        svn             = spawn('svn', command),
        result          = ""
    ;
    
    svn.stdout.setEncoding('utf8');
    
    svn.stdout.on('data', function (data) { result += data; });
    
    svn.on('close', function (data) {
        
        parseString(result, function (err, obj) {
        
            if(err) deferred.reject(err);
            deferred.resolve(obj.log.logentry);
            
        });
        
    });
    
    svn.on('error', function (err) { deferred.reject(err); });
    
    return deferred.promise;
    
};

