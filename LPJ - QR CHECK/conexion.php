<?php
$hostname = "localhost"; // Cambia esto si tu base de datos está en un servidor remoto
$database = "carnesag_lpj_form"; // Reemplaza con el nombre de tu base de datos
$username = "carnesag_lpj_usuario"; // Reemplaza con el nombre de usuario de tu base de datos
$password = "Lpjportafolio23"; // Reemplaza con la contraseña del usuario de tu base de datos

$conexion = mysqli_connect($hostname, $username, $password, $database);

// Verificar la conexión
if (!$conexion) {
    die("Error al conectar con la base de datos: " . mysqli_connect_error());
}
?>