const AbstractManager = require("../AbstractManager/AbstractManager");

class companiesManager extends AbstractManager {
  constructor() {
    super({ table: "company" });
  }

  insert(company) {
    const query = `
        INSERT INTO ${this.table}
          (Company_ID, Name, URL, Logo, Phone, Email, Activity, Address)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?) `;
    const values = [
      company.Company_ID,
      company.Name,
      company.URL,
      company.Logo,
      company.Phone,
      company.Email,
      company.Activity,
      company.Address,
    ];
    return this.database.query(query, values);
  }

  update(company) {
    return this.database.query(
      `UPDATE ${this.table}
         SET Name = ?, URL = ?, Logo = ?, Phone = ?, Email = ?, Activity = ?, Address = ? 
         WHERE Company_ID = ?`,
      [
        company.Name,
        company.URL,
        company.Logo,
        company.Phone,
        company.Email,
        company.Activity,
        company.Address,
        company.id,
      ]
    );
  }
}

module.exports = companiesManager;
