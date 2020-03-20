const jwt = require('jsonwebtoken');
const secret = require('./../config/secret.json');
const bcrypt = require('bcryptjs');
const handleUser = require('./../models/user');

const login = async (ctx, next) => {
  await next();
  let data = ctx.request.body;
  await handleUser.getUser().then(res => {
    let userInfo = res.find(v => { return v.username == data.username});
    ctx.type = 'json';
    if (userInfo != undefined) {
      if (!bcrypt.compareSync(data.password, userInfo.password)) {
        ctx.body = {
          success: false,
          msg: '密码不正确'
        }
      } else {
        const userToken = {
          username: userInfo.username,
          id: userInfo.id
        }
        const token = jwt.sign(userToken, secret.sign, {expiresIn: '1h'})  // 签发token
        ctx.body = {
          success: true,
          token: token, // 返回token
        }
      }
    } else {
      ctx.body = {
        success: false,
        msg: '用户不存在'
      }
    }
  })
}

const register = async (ctx, next) => {
  await next();
  let { username, password } = ctx.request.body;
  ctx.type = 'json';
  const salt = bcrypt.genSaltSync(10);
  const pass = bcrypt.hashSync(password, salt);
  await handleUser.addUser([username, pass]).then(() => {
    ctx.body = {
      msg: '注册成功'
    }
  }).catch((error) => {
    ctx.body = {
      msg: '注册失败'
    }
  })
}
module.exports = {
  login,
  register
}