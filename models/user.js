const query = require('./index');
// 查询
const getUser = () => {
  let sql = 'select * from `USERS`';
  return query(sql);
}

// 新增
const addUser = (value) => {
  let sql = 'insert into USERS (username, password) values (?,?)';
  return query(sql, value);
}


module.exports = {
  getUser,
  addUser
};