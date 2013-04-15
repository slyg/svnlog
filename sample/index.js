var 
    svnlog = require('../index'),
    inspect = require('eyes').inspector({maxLength: false}),
    conf = require('./conf.json')
;

console.log("Grabbing logs from " + conf.startRev + " to " + conf.endRev + " on " + conf.repo);

svnlog(conf.startRev, conf.endRev, conf.repo).then(inspect);