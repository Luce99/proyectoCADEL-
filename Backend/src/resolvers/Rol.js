const rolService = require("../services/Avance");
const rolResolvers = {
  Query: {
    getRoles: async (parent, args) => {
      let roles = rolService.getRoles();
      return roles;
    },
  },
};

module.exports = { rolResolvers };
