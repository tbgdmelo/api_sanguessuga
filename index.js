const handlebars = require("express-handlebars");
const express = require("express");
const router = require("./routes");
const app = express();

/*const cookieParser = require("cookie-parser");

const db = require("./app/models");

*/app.engine("handlebars", handlebars({
    helpers: require(`${__dirname}/app/views/helpers`),
}));

app.set("view engine", "handlebars");
app.set("views", `${__dirname}/app/views`);

app.use("/css", express.static(`${__dirname}/public/css`));
app.use("/webfonts", express.static(`${__dirname}/node_modules/@fortawesome/fontawesome-free/webfonts`));

app.use("/js", [
    express.static(__dirname + '/node_modules/jquery/dist/'),
    express.static(__dirname + '/node_modules/popper.js/dist/umd'),
    express.static(__dirname + '/node_modules/bootstrap/dist/js'),
    express.static(__dirname + '/public/js'),
]);

app.use(express.urlencoded({ extended: false }));
app.use(router);

app.listen(9000, function () {
    console.log("express iniciado na porta 9000");
})
