const AbstractManager = require("../AbstractManager/AbstractManager");

class PostManager extends AbstractManager {
  constructor() {
    super({ table: "post" });
  }

  findAll() {
    return this.database.query(`SELECT * FROM ${this.table}`);
  }

  findByPK(id) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE Post_ID = ?`,
      [id]
    );
  }

  insert(post, userID) {
    return this.database.query(
      `INSERT INTO ${this.table} (Image, Title, Content, Visibility, User_ID) VALUES (?, ?, ?, ?, ?)`,
      [post.Image, post.Title, post.Content, post.Visibility, userID]
    );
  }

  update(post) {
    return this.database.query(
      `UPDATE ${this.table} SET Image = ?, Title = ?, Content = ?, Visibility = ? WHERE Post_ID = ?`,
      [post.Image, post.Title, post.Content, post.Visibility, post.Post_ID]
    );
  }

  updateWOImage(post) {
    return this.database.query(
      `UPDATE ${this.table} SET Title = ?, Content = ?, Visibility = ? WHERE Post_ID = ?`,
      [post.Title, post.Content, post.Visibility, post.Post_ID]
    );
  }

  delete(id) {
    return this.database.query(`DELETE FROM ${this.table} WHERE Post_ID = ?`, [
      id,
    ]);
  }
}

module.exports = PostManager;
