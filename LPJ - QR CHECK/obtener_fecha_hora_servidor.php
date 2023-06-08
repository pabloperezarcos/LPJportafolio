<?php
$hostname = "localhost";
$database = "carnesag_lpj_form"; 
$username = "carnesag_lpj_usuario"; 
$password = "Lpjportafolio23";

$conexion = mysqli_connect($hostname, $username, $password, $database);

// Verifica si la conexi¨®n fue exitosa
if (!$conexion) {
  die('Error al conectar a la base de datos: ' . mysqli_connect_error());
}

// Obtiene la fecha y hora actual del servidor MySQL
$resultado = mysqli_query($conexion, 'SELECT NOW() AS fecha_hora');
if ($fila = mysqli_fetch_assoc($resultado)) {
  $fechaHora = $fila['fecha_hora'];

  // Devuelve el texto del c¨®digo QR
  echo $fechaHora;
} else {
  echo 'Error al obtener la fecha y hora del servidor.';
}

// Cierra la conexi¨®n a la base de datos
mysqli_close($conexion);
?>
