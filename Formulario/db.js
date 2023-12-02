const mysql = require('mysql2');

const conecction = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "",
          database: "alumnos",
          port: "3306"
});

conecction.connect((err) => {
          if (!err) {
                    console.log("La conexion exitosa");

          } else {
                    console.log("No se a conectado");
          }
})

module.exports = conecction;