const responseFormatter = async (ctx, next) => {
  await next();
  if (ctx.body) {
    ctx.body = {
      code: 200,
      message: '操作成功',
      data: ctx.body
    }
  } else {
    console.log(err);
    ctx.throw(500, '操作失败');
  }
}

module.exports = responseFormatter;