/*
    Launches svn command line and returns result a js object.
    Returns a promise.
*/

var 
    Q = require('q'),
    svncl = require('./svncl')
;

module.exports = function lastNRevisions(limit, repo){
    
    var deferred = Q.defer();
        
    svncl('log', '--limit', limit, '--xml', '--verbose', repo).then(deferred.resolve, deferred.reject);
    
    return deferred.promise;
    
};