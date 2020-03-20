const jwt = require('jsonwebtoken');
const secret = require('./../config/secret.json');

const checkToken = async (ctx, next) => {
  let authorization = ctx.get('Authorization');
  if (authorization) {
    let token = authorization.split(' ')[1];
    try {
      let decoded = jwt.verify(token, secret.sign);
      // let deadline = new Date()/1000;
      // console.log(deadline, decoded)
      // if (decoded.exp <= deadline) {
      //   ctx.throw(401, 'token过期');
      // } else {
      //    await next();
      // }
    } catch(err) {
      ctx.throw(401, '权限验证失败');
    }
  } else {
    ctx.throw(401, '权限验证失败');
  }
  await next();
}

module.exports = checkToken;