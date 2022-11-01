const { connectDatabase } = require("./configs/database");
const app = require("./app");

connectDatabase();

var PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
