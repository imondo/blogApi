const query = require('./index');

const addAbout = (value) => {
  let sql = 'insert into ABOUT_BLOG (title, content, classify, tags) values (?,?,?,?)';
  return query(sql, value);
}

const getAbout = () => {
  let sql = 'select * from ABOUT_BLOG';
  return query(sql)
}

const updateAbout = (value) => {
  let sql = 'update ABOUT_BLOG set title=?, content=?, classify=?, tags=? where id=?';
  return query(sql, value);
}

module.exports = {
  getAbout,
  addAbout,
  updateAbout
}