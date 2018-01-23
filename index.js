var path = require('path')
var argv = require('optimist').boolean('cors').argv
var co = require('co')
var OSS = require('ali-oss')
var config = require('./config')

if (!argv.s) {
    process.exit()
}

var client = new OSS({
    region: config.region,
    accessKeyId: config.accessKeyId,
    accessKeySecret: config.accessKeySecret
});

co(function*() {
    client.useBucket(config.bucket);
    let result = yield client.put(
        path.join(config.path, argv.s),
        path.resolve(process.cwd(), argv.s)
    );
    console.log('success!', result.url);
}).catch(function(err) {
    console.log(err);
});
