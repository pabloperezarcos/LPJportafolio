from django.db import models
#from django.contrib.auth.models import AbstractUser

# Create your models here.

class Empleados(models.Model):
    rut = models.CharField(max_length=10, unique=True)
    nombre = models.CharField(max_length=20, null=False)
    ap_paterno = models.CharField(max_length=30, null=False)
    ap_materno = models.CharField(max_length=30, null=False)
    password = models.CharField(max_length=64, null=True)
    direccion = models.CharField(max_length=50, null=False)
    tipo_usuario = models.CharField(max_length=15, null=False)
    estado = models.CharField(max_length=15, null=False)
    last_login = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f'{self.rut} - {self.nombre} {self.ap_paterno}'


class Asistencias(models.Model):
    fecha_registro = models.DateField(auto_now_add=True)
    hora_entrada = models.DateTimeField(null=True, blank=True)
    hora_salida = models.DateTimeField(null=True, blank=True)
    empleado = models.ForeignKey('Empleados', on_delete=models.CASCADE)

    def _str_(self):
        return f'{self.fecha_registro} - {self.empleado.rut}'


class Notas(models.Model):
    titulo = models.CharField(max_length=20)
    contenido = models.CharField(max_length=200)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    empleado = models.ForeignKey('Empleados', on_delete=models.CASCADE)

    def _str_(self):
        return f'{self.titulo} - {self.empleado.rut}'
        
