const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const route = require("./routes/index");
const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: false, limit: '100mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use("/api", route.publicRoute);
app.use("/api/users", route.userRoute);

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"), function (err) {
        if (err) {
            res.status(500).send(err);
        }
    });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    // next(createError(404));
    return res.json({
        code: "Error",
        error: "Not Found",
    });
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;

