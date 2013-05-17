/*
    Launches svn command line and returns result a js object.
    Returns a promise.
*/

var 
    Q = require('q'),
    svncl = require('./svncl')
;

module.exports = function revisionsRange(revStart, revEnd, repo){

    var deferred = Q.defer();
        
    svncl('log', '-r', revStart + ':' + revEnd, '--xml', '--verbose', repo).then(deferred.resolve, deferred.reject);
    
    return deferred.promise;
    
};