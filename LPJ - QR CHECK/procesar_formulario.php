<?php
// Incluir el archivo de conexion a la base de datos
include("conexion.php");

// Obtener los datos del formulario
$nombre = $_POST['full_name'];
$email = $_POST['exampleInputEmail1'];
$mensaje = $_POST['message'];

// Preparar la consulta SQL para insertar los datos en la tabla correspondiente
$consulta = "INSERT INTO formulario (nombre, email, mensaje) VALUES ('$nombre', '$email', '$mensaje')";

// Ejecutar la consulta
if (mysqli_query($conexion, $consulta)) {
    echo "Los datos se han guardado correctamente en la base de datos.";
} else {
    echo "Error al guardar los datos: " . mysqli_error($conexion);
}

// Cerrar la conexi¨®n
mysqli_close($conexion);
?>
