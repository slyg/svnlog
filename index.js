/* 
    This module returns a curried module containing methods that are promises
*/

var     
    revisionsRange = require('./assets/revisionsRange'),
    lastNRevisions = require('./assets/lastNRevisions'),
    format = require('./assets/format'),
    Q = require('q')
;

module.exports = function(repoPath){

    return {
    
        getRevisions : function (startRevision, endRevision){

            var deferred = Q.defer();
        
            revisionsRange(startRevision, endRevision, repoPath)       // get raw log from svn
                .then(format)                               // formats with proper JS objects
                .then(deferred.resolve, deferred.reject)    // returns promise result
            ;
            
            return deferred.promise;
        },
        
        getLastRevisions : function(limit){

            var deferred = Q.defer();
        
            lastNRevisions(limit, repoPath)
                .then(format)
                .then(deferred.resolve, deferred.reject)
            ;
            
            return deferred.promise;
        }
        
    }
}

