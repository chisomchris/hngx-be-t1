const { default: mongoose } = require("mongoose");

const connect = async (uri) => {
  const connectionString = process.env.DATABASE_URI || uri;
  if (!connectionString)
    return console.error("Connection string required");
  try {
    const connection = await mongoose.connect(connectionString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    if (connection) {
      console.log("connected to database");
      return connection;
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { connect };
