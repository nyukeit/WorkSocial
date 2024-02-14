const models = require("../models");

const addUserToCompany = async (req, res) => {
  const companyId = req.body.Company_ID;
  const userId = req.body.User_ID;
  const role = req.body.Role;
  console.info(req.body.Company_ID);

  try {
    await models.company_user.addUsersToCompany(companyId, userId, role);
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Erreur lors de l'ajout de l'utilisateur à l'entreprise");
  }
};

const getUsersInCompany = async (req, res) => {
  const { companyID } = req.params;

  try {
    const users = await models.company_user.findAll({
      where: { companyID },
      include: [{ model: models.user, attributes: ["UserID", "Username"] }],
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(
        "Erreur lors de la récupération des utilisateurs dans l'entreprise"
      );
  }
};

const updateUserRoleInCompany = async (req, res) => {
  const { companyID, UserID } = req.params;
  const { Role } = req.body;
  console.info({ Role });

  try {
    await models.company_user.update(companyID, UserID, Role);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(
        "Erreur lors de la mise à jour du rôle de l'utilisateur dans l'entreprise"
      );
  }
};

const removeUserFromCompany = async (req, res) => {
  const { companyID, UserID } = req.params; // Extraire les valeurs de req.params
  console.info(companyID, UserID); // Assurez-vous que les valeurs sont correctement extraites

  try {
    await models.company_user.removeUserFromCompany(companyID, UserID); // Appeler la fonction removeUserFromCompany avec les valeurs extraites
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Erreur lors de la suppression de l'utilisateur de l'entreprise");
  }
};

module.exports = {
  addUserToCompany,
  getUsersInCompany,
  updateUserRoleInCompany,
  removeUserFromCompany,
};
