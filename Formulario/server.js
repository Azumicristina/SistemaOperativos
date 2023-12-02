//Requiriendo el módulo 'express', 'cors' y 'body-parser'
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//Requiriendo la conexión a BD gestor (MySQL)
const connection = require("./db");

//Creando una nueva aplicación Express.
const app = express();
const path = require("path");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/public", express.static(path.join(__dirname, "public")));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//* DEFINIR RUTAS
//? RUTA PRINCIPAL
app.get("/", (req, res) => {
          res.render("inicio", {
                    rutaActual: "/"
          });
});
//? RUTA DEL FORMULARIO
app.get("/form-estudiante", (req, res) => {
          res.render("pages/form", {
                    rutaActual: "/form-estudiante",
          });
});

//TODO: CREAR EL SERVIDOR CON UNA VARIABLE DE ENTORNO
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
          console.log('El servidor esta en el puerto ' + PORT);
});

//TODO: ENVIO DE DATOS DEL FORM A LA BASE DE DATOS

app.post("/procesar-formulario", async (req, res) => {
          console.log(req.body);

          for (const campo in req.body) {
                    if (req.body[campo] === undefined || req.body[campo] === '') {
                              res.send(`Error: El campo ${campo} está vacío o indefinido.`);
                              return;
                    }
          }
          const {
                    nombre_apellido,
                    correo,
                    curso,
                    dni,
                    celular,
                    direccion
          } = req.body;
          try {
                    const query =
                              "INSERT INTO estudiantes (nombre_apellido, correo, curso, dni, celular, direccion, fecha_registro) VALUES (?, ?, ?, ?, ?, ?, ?)";

                    connection.execute(query, [
                              nombre_apellido,
                              correo,
                              curso,
                              dni,
                              celular,
                              direccion,
                              new Date(),
                    ]);

                    res.render("inicio", {
                              rutaActual: "/"
                    });
          } catch (error) {
                    console.log("Error al intentar el ingreso a la base de datos ", error);
                    console.log(error);
                    res.send("Error al procesar el formulario")
          }
});