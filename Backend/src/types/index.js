const { projectType } = require("./Project");
const { userType } = require("./user");
const { avancesType } = require("./Avance");
const { inscripcionType } = require("./Inscripcion");
const { rolType } = require("./Rol");

const types = [projectType, userType, avancesType, inscripcionType, rolType];
module.exports = {
  types,
};
