const responseFormatter = async (ctx, next) => {
  await next();
  if (ctx.body) {
    ctx.body = {
      code: 200,
      message: '操作成功',
      data: ctx.body
    }
  } else {
    ctx.throw(500, '操作失败');
  }
}

module.exports = responseFormatter;