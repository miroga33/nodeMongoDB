const mongoose = require("mongoose");

const { MONGODB_URI } = process.env;

mongoose
    .set('useFindAndModify', false)
    .set('useCreateIndex', true)
    .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(db => console.log("Conectado MongoDB"))
    .catch(err => console.log(err));

mongoose