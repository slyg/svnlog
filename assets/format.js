/*
    Formats raw xml logs to proper JS object.
    Returns a promise.
*/

var 
    Q = require('q'),
    async = require('async'),
    moment = require('moment'),
    t = ['bugfix', 'feature', 'optim', 'merge', 'revert', 'refactoring'],
    len = t.length
;

module.exports = function log(dataArray){

    var
        deferred        = Q.defer(),
        result          = []
    ;
    
    async.each(dataArray, function(item, next){
        
        result.push({
            revision : item.$.revision,
            msg : item.msg[0],
            date : moment(item.date[0]).format('LLLL'),
            dateFromNow : moment(item.date[0]).fromNow(),
            dateUTC : item.date[0],
            author : item.author[0],
            type : getTypeFrom(item.msg[0]),
            paths : getPathsFrom(item.paths[0].path)
        });
        
        next();
        
    }, function(err){
        if(err) deferred.reject(err);
        deferred.resolve(result)
    });
        
    return deferred.promise;
    
};

function getTypeFrom(dataString){

    var 
        type = 'unknown',
        i = len
    ;
    
    while(i--){ if(dataString.toLowerCase().indexOf(t[i]) != -1) type = t[i]; }
    return type;

}

function getPathsFrom(dataArray){

    var 
        paths = [],
        len = dataArray.length,
        item = {}
    ;
    
    while(len--){
        item = dataArray[len];
        paths.push({
            path : item._,
            kind : item.$.kind,
            action : item.$.action
        });
    }
    
    return paths;
    
}

