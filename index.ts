import app from "./src/server";
import db from "./src/database";

const PORT = process.env.PORT || 5000;

app.post("/shorten", (req, res) => {});

app.listen(PORT, () => {
  console.log(`✔ server started on port ${PORT}`);
  db()
    .then(() => {
      console.log(`✔ database connected successfully`);
    })
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
});
