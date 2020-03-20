const handleArticle = require('./../models/article');

const getArticle = async (ctx, next) => {
  ctx.type = 'json';
  let { pageSize, pageNo, keyword } = ctx.query;
  !keyword && await handleArticle.getCount().then(count => {
    handleArticle.getArticle(pageSize ? [(Number(pageNo)-1)*Number(pageSize), Number(pageSize)] : '').then(res => {
      ctx.body = {
        results: res,
        count: count[0]['COUNT(id)'] || 0,
        pageNo,
        pageSize
      };
    })
  });
  keyword && await handleArticle.searchArticle([keyword]).then(res => {
    ctx.body = res;
  })
  await next();
}

const getDetails = async (ctx, next) => {
  await next();
  let { id } = ctx.params;
  ctx.type = 'json';
  let data = await handleArticle.getDetails([id]);
  let { views } = data[0];
  views++;
  await handleArticle.pviews([views, id]);
  ctx.body = Object.assign({}, data[0], { views });
}

const getClassify = async (ctx, next) => {
  let { classify } = ctx.query;
  ctx.type = 'json';
  await handleArticle.getClassify([classify]).then(res => {
    ctx.body = res;
  })
  await next();
}

const addArticle = async (ctx, next) => {
  await next();
  let {title, content, classify, tags} = ctx.request.body;
  ctx.type = 'json';
  await handleArticle.addArticle([title, content, classify, tags]).then(() => {
    ctx.body = {
      msg: '新增成功'
    };
  }).catch(() => {
    ctx.body = {
      msg: '新增失败'
    };
  })
}

const updateArticle = async (ctx, next) => {
  await next();
  let {title, content, classify, tags, imageUrl, id} = ctx.request.body;
  !imageUrl && await handleArticle.updateArticle([title, content, classify, tags, id]).then(() => {
    ctx.body = {
      msg: '更新成功'
    }
  });
  imageUrl && await handleArticle.uploadArticleImage([imageUrl, id]).then(() => {
    ctx.body = {
      msg: '上传成功'
    }
  });
}

const deleteArticle = async (ctx, next) => {
  await next();
  let { id } = ctx.params;
  await handleArticle.deleteArticle([id]).then(() => {
    ctx.body = {
      msg: '删除成功!'
    }
  })
}

module.exports = {
  getArticle,
  getDetails,
  getClassify,
  addArticle,
  updateArticle,
  deleteArticle
}