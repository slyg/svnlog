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

    log(startRevision, endRevision, repoPath)
        .then(format)
        .then(deferred.resolve, deferred.reject)
    ;
    
    return deferred.promise;

}

