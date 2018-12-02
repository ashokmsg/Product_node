var numberRegex=/^[0-9]*$/
exports.validateTitle= (value) =>
{
    return value == undefined ;
}

exports.validateDescription = (value) =>
{
    return value == undefined ;
}

exports.validateImage = (value) =>
{
    return value == undefined ;
}

exports.validatePrice = (value) =>
{
    return value == undefined || !numberRegex.test(value);
}


