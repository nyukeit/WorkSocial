const AbstractManager = require("../AbstractManager/AbstractManager");

class companiesManager extends AbstractManager {
  constructor() {
    super({ table: "companies" });
  }

  findAll() {
    return this.database.query(`SELECT * FROM ${this.table}`);
  }

  findByPK(id) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE Company_ID = ?`,
      [id]
    );
  }

  login(company) {
    return this.database.query(
      `SELECT * FROM  ${this.table} WHERE CompanyMail = ?`,
      [company.CompanyMail]
    );
  }

  insert(company) {
    const query = `
        INSERT INTO ${this.table}
          (Company_ID, CompanyName, CompanySlogan, CompanyActivity, CompanyAddress, CompanyUrl, CompanyMail, CompanyPhone, CompanyLogo, HashedPassword, CompanyDescription, Effectif)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) `;
    const values = [
      company.Company_ID,
      company.CompanyName,
      company.CompanySlogan,
      company.CompanyActivity,
      company.CompanyAddress,
      company.CompanyUrl,
      company.CompanyMail,
      company.CompanyPhone,
      company.CompanyLogo,
      company.HashedPassword,
      company.CompanyDescription,
      company.Effectif,
    ];
    return this.database.query(query, values);
  }

  update(company) {
    return this.database.query(
      `UPDATE ${this.table}
         SET CompanyName = ?, CompanySlogan = ?, CompanyActivity = ?, CompanyAddress = ?,
             CompanyUrl = ?, CompanyMail = ?, CompanyPhone = ?, CompanyLogo = ?,
             CompanyDescription = ?
         WHERE Company_ID = ?`,
      [
        company.CompanyName,
        company.CompanySlogan,
        company.CompanyActivity,
        company.CompanyAddress,
        company.CompanyUrl,
        company.CompanyMail,
        company.CompanyPhone,
        company.CompanyLogo,
        company.CompanyDescription,
        company.id,
      ]
    );
  }
}

module.exports = companiesManager;
