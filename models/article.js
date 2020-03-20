const query = require('./index');
// 查询
const getArticle = (value) => {
  let sql = 'select * from ARTICLES order by createAt desc ' + (value ? `limit ${value[0]}, ${value[1]}` : '');
  return query(sql);
}

// 查询总条数
const getCount = () => {
  let sql = 'select COUNT(id) from ARTICLES';
  return query(sql);
}

// 查询文章详情
const getDetails = (value) => {
  let sql = 'select * from ARTICLES where id = ?';
  return query(sql, value);
}

// 查询文章分类
const getClassify = (value) => {
  let sql = 'select * from ARTICLES where classify=? order by createAt desc';
  return query(sql, value);
}

// 搜索文章标题
const searchArticle = (value) => {
  let sql = `select * from ARTICLES where (title like '%${value}%' or content like '%${value}%')`;
  return query(sql);
}

// 新增
const addArticle = (value) => {
  let sql = 'insert into ARTICLES (title, content, classify, tags) values (?,?,?,?)';
  return query(sql, value);
}

// 修改
const updateArticle = (value) => {
  let sql = 'update ARTICLES set title=?, content=?, classify=?, tags=? where id=?';
  return query(sql, value);
}

// 上传图片
const uploadArticleImage = (value) => {
  let sql = 'update ARTICLES set image_url=? where id=?';
  return query(sql, value);
}

// 删除
const deleteArticle = (value) => {
  let sql = 'delete from ARTICLES where id=?';
  return query(sql, value)
}

// 文章阅读量
const pviews = (value) => {
  let sql = 'update ARTICLES SET views=? where id=?';
  return query(sql, value);
}

module.exports = {
  getCount,
  getArticle,
  getDetails,
  getClassify,
  searchArticle,
  addArticle,
  updateArticle,
  deleteArticle,
  uploadArticleImage,
  pviews
};