const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/

const checkPw = ( password ) => {
    return passwordRegex.test(password);
}

module.exports = {
    checkPw
}