var mysql = require('mysql');

var conexion = mysql.createConnection({
    host: 'localhost',
    database: 'sakali',
    user: 'root',
    password: 'admin'
});
conexion.connect(function (error) {
    if (error) {
        throw error;
    } else {
        console.log('conexion exitosa');
    }
});
//mostrar
conexion.query('SELECT * from actor', function (error, results, fields){
    if (error)
        throw error;
    results.forEach(result => {
        console.log(result);
    });
})
//insertar
conexion.query('INSERT INTO actor (first_name, last_name) VALUES ("Adam", "Smith")', function(error, results){
    if(error) throw error;
    console.log('¡Registro Agregado!', results)

});
//actualizar
conexion.query('UPDATE actor SET first_name = "Steve", last_name = "Rogers" WHERE id=6 ', function(error, results){
    if(error)throw error;
    console.log('¡Registro Actualizado!', results);

});
//borrar
conexion.query('DELETE FROM actor WHERE actor_id = 100;', function (err, result, field) {
    if (err) throw err;
    console.log("Registro borrado: ", result);
});
conexion.end();