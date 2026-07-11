import moongoose from "mongoose";
const conectDb = () => {
  moongoose.connect("mongodb://localhost:27017/contactApp", )
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Database connection error: ", err);
  });
};

export default conectDb;