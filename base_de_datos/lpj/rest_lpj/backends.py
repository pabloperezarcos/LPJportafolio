from django.contrib.auth.backends import BaseBackend
from .models import Empleados


class EmpleadoBackend(BaseBackend):
    def authenticate(self, request, rut=None, password=None):
        try:
            print(f"rutempleado a consultar: {rutempleado}")

            empleado = Empleados.objects.get(rut=rutempleado)
            print(f"Contrasena almacenada: {empleado.password}")
            print(f"Contrasena enviada: {password}")

            if empleado.password == password:
                return empleado
            else:
                print("Las contrasenas no coinciden")
                print(f"Contrasena almacenada: {empleado.password}")
                print(f"Contrasena enviada: {password}")

        except Empleados.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            empleado = Empleados.objects.get(rut=user_id)
            return empleado
        except Empleados.DoesNotExist:
            return None
