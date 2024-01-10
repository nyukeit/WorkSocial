// PostManager.js
const AbstractManager = require("../AbstractManager/AbstractManager");

class PostManager extends AbstractManager {
  constructor() {
    super({ table: "post" });
  }

  findAll() {
    return this.database.query(`SELECT * FROM ${this.table}`);
  }

  find(id) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE Post_ID = ?`,
      [id]
    );
  }

  insert(post) {
    return this.database.query(
      `INSERT INTO ${this.table} (Image, Title, Content, Visibility, User_ID) VALUES (?, ?, ?, ?, ?)`,
      [post.Image, post.Title, post.Content, post.Visibility, post.User_ID]
    );
  }

  update(post) {
    return this.database.query(
      `UPDATE ${this.table} SET Image = ?, Title = ?, Content = ?, Visibility = ?, User_ID = ? WHERE Post_ID = ?`,
      [
        post.Image,
        post.Title,
        post.Content,
        post.Visibility,
        post.User_ID,
        post.Post_ID,
      ]
    );
  }

  delete(id) {
    return this.database.query(`DELETE FROM ${this.table} WHERE Post_ID = ?`, [
      id,
    ]);
  }
}

module.exports = PostManager;
