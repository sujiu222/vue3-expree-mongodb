const josnwebtoken = require('jsonwebtoken');
const secret = 'kerwin';
const JWT = {
    generate(value, exprires) {
        return josnwebtoken.sign(value, secret, { expiresIn: exprires });
    },
    verify(token) {
        try {
            return josnwebtoken.verify(token, secret);
        } catch (e) {
            return false;
        }
    }
}

const token = JWT.generate({ name: 'kerwin' }, '10s');
// console.log(JWT.verify(token));
setTimeout(() => {
    console.log(JWT.verify(token));
}, 11000)
module.exports = JWT