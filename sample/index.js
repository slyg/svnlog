var 
    inspect = require('eyes').inspector({maxLength: false}),
    conf = require('./conf.json')
;

svnlog = require('../index')(conf.repo);

/*
console.log("Grabbing logs from " + conf.startRev + " to " + conf.endRev + " on " + conf.repo);
svnlog.getRevisions(conf.startRev, conf.endRev).then(inspect);
*/

/*
console.log("Getting last 5 revisions on " + conf.repo);
svnlog.getLastRevisions(5).then(inspect);
*/