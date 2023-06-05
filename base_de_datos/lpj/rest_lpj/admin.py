from django.contrib import admin
from rest_lpj.models import Empleados, Asistencias, Notas

# Register your models here.


@admin.register(Empleados)
class EmpleadoAdmin(admin.ModelAdmin):
    pass
    
@admin.register(Asistencias)
class AsistenciaAdmin(admin.ModelAdmin):
    pass

@admin.register(Notas)
class NotasAdmin(admin.ModelAdmin):
    pass