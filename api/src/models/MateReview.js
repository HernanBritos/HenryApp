//la calificación proporcionada de un compañero y un comentario opcional.

module.exports = (sequelize, DataTypes) =>
   sequelize.define("mate_review", {
      score: {
         type: DataTypes.INTEGER,
         allowNull: false,
        },
       commentary: {
       	  type: DataTypes.STRING,       	  
       }
   });
