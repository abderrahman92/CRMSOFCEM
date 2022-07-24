
module.exports =(sequelize,Sequelize)=>{
  const Action = sequelize.define("actions",{
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    date_action: {
      type: Sequelize.DATE,
    },
    description: {
      type: Sequelize.STRING
    },
    nom_interlocuteur: {
      type: Sequelize.STRING
    },
    type_action:{
      type: Sequelize.STRING
    },
    nom_societe: {
      type: Sequelize.STRING
    },
    date_rdv: {
      type: Sequelize.DATE,
    }
    
  });
  return Action;
};
