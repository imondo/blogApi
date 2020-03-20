const handleAbout = require('./../models/aboutBlog');

const getAbout = async (ctx, next) => {
  await next();
  await handleAbout.getAbout().then(res => {
    ctx.body = res[0] ? res[0] : [];
  })
}

const addAbout = async (ctx, next) => {
  await next();
  let { title, content, classify, tags } = ctx.request.body;
  await handleAbout.addAbout([title, content, classify, tags]).then(() => {
    ctx.body = {
      msg: '创建成功'
    }
  })
}

const updateAbout = async (ctx, next) => {
  await next();
  let { title, content, classify, tags, id } = ctx.request.body;
  await handleAbout.updateAbout([title, content, classify, tags, id]).then(() => {
    ctx.body = {
      msg: '更新成功'
    }
  })
}

module.exports = {
  getAbout,
  addAbout,
  updateAbout
}