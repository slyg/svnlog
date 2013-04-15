/* 
    This module returns a promise
*/

var     
    log = require('./assets/log'),
    format = require('./assets/format'),
    Q = require('q')
;

module.exports = function svnlog(startRevision, endRevision, repoPath){

    var deferred = Q.defer();

    log(startRevision, endRevision, repoPath)       // get raw log from svn
        .then(format)                               // formats with proper JS objects
        .then(deferred.resolve, deferred.reject)    // returns promise result
    ;
    
    return deferred.promise;

}

