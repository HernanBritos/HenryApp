const { Cohorte, User, Role, Group } = require("../db");
const { _getMultipleUsers: getMultipleUsers } = require("./userController");
const { _getMultipleGroups: getMultipleGroups } = require("./groupController");

const createCohorte = async (cohorte) => {
   try {
      let result = await Cohorte.create({
         ...cohorte,
         startDate: new Date(cohorte.startDate)
      });
      return result;
   } catch (error) {
      console.error(error);
   }
};

const deleteCohorteById = async (id) => {
   const cohorteId = await getEspecificCohorte(id);
   await cohorteId.destroy();
   return { message: "successfully removed" };
};

const upDateCohorte = async (cohorte) => {
   const result = await getEspecificCohorte(cohorte.id);
   try {
      return await result.update({
         ...cohorte,
         startDate: new Date(cohorte.startDate)
      });
   } catch (error) {
      console.error(error);
   }
};

const getAllCohortes = async () => {
   const cohortes = await Cohorte.findAll({
      include: [{ model: User, inclue: [Role] }, Group],
   });
   return cohortes;
};

const getEspecificCohorte = async (id) => {
   const cohorte = await Cohorte.findOne({
      where: { id },
      include: [{ model: User, inclue: [Role] }, Group],
   });

   if (!cohorte) {
      throw {
         name: "ApiFindError",
         type: "Cohorte Error",
         error: {
            message: `the cohorte with the id ${id} does not exist in the database`,
            type: "data not found",
            code: 404,
         },
      };
   }

   return cohorte;
};

const addUsersToCohorte = async (cohorteId, userId) => {
   const cohorte = await getEspecificCohorte(cohorteId);
   const users = await getMultipleUsers(userId);

   if (users.length > 0) {
      await cohorte.addUsers(users);
   }

   return await getEspecificCohorte(cohorteId);
};

const removeUsersOfCohorte = async (cohorteId, userId) => {
   const cohorte = await getEspecificCohorte(cohorteId);
   const users = await getMultipleUsers(userId);

   await cohorte.removeUsers(users);

   return await getEspecificCohorte(cohorteId);
};

const addGropusToCohorte = async (cohorteId, groupId) => {
   const cohorte = await getEspecificCohorte(cohorteId);
   const groups = await getMultipleGroups(groupId);

   if (groups.length > 0) {
      await cohorte.addGroups(groups);
   }

   return await getEspecificCohorte(cohorteId);
};

const removeGroupsOfCohorte = async (cohorteId, groupId) => {
   const cohorte = await getEspecificCohorte(cohorteId);
   const groups = await getMultipleGroups(groupId);

   await cohorte.removeGroups(groups);

   return await getEspecificCohorte(cohorteId);
};

module.exports = {
   createCohorte,
   deleteCohorteById,
   upDateCohorte,
   getAllCohortes,
   getEspecificCohorte,
   addUsersToCohorte,
   removeUsersOfCohorte,
   addGropusToCohorte,
   removeGroupsOfCohorte,
};
