//internal imports
const fs = require("fs");

exports.handleError = (statusCode, res, message) => {
    res.status(statusCode);
    res.send({ message });
    fs.appendFileSync('log.txt', `handle error-w-${message}-${new Date()}\n`);
}

const writeLog = (message) => {
    let date = new Date();
    fs.appendFileSync('log.csv', `${message}-${date}-${date.getMilliseconds()}\n`);
}

exports.logWriter = writeLog; 