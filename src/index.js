require("dotenv").config();
const app = require("./server");

const PORT = app.get("port");

// CONECTION
app.listen(PORT, () => {
    console.log("conectado en el puerto ", PORT);
});