const mongoose = require("mongoose");

const dbConection = async () => {
  try {
    mongoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    
    throw new Error("ERROR a la hora de incializar BD");
  }
};

module.exports = { dbConection };
