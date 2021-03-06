var pemFile = __dirname +  '/../dist/aws/you-pem-file.pem';
var paramDataSet = require(__dirname + '/../server/config/parameters');

module.exports = function(env) {
    var parameters = paramDataSet.get(env);

    return require('gulp-ssh')({
        ignoreErrors: false,
        sshConfig: {
            host: parameters.server.host,
            port: 22,
            username: 'ubuntu',
            privateKey: require('fs').readFileSync(pemFile)
        }
    });
};
