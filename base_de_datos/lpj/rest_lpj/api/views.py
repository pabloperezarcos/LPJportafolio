
from rest_framework import status
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django.contrib.auth import authenticate, login, logout
from rest_lpj.models import Empleados, Asistencias, Notas
from rest_lpj.api.serializer import EmpleadosSerializer, AsistenciasSerializer, NotasSerializer
from rest_framework import viewsets
from rest_framework.decorators import action
from django.contrib.auth.hashers import check_password
from django.shortcuts import get_object_or_404
from rest_lpj.backends import EmpleadoBackend



class EmpleadosViewSet(viewsets.ModelViewSet):
    queryset = Empleados.objects.all()
    serializer_class = EmpleadosSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class AsistenciasViewSet(viewsets.ModelViewSet):
    queryset = Asistencias.objects.all()
    serializer_class = AsistenciasSerializer
   
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class NotasViewSet(viewsets.ModelViewSet):
    queryset = Notas.objects.all()
    serializer_class = NotasSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class LoginViewSet(viewsets.ViewSet):
    def login(self, request):
        # Obtener los datos de inicio de sesion del request
        rutempleado = request.data.get('rutempleado')
        passwordhash = request.data.get('passwordhash')

        # Realizar la autenticacion utilizando el backend personalizado
        empleado = authenticate(request, rut=rutempleado, password=passwordhash)

        if empleado is not None:
            # Establecer el atributo 'backend' en el usuario
            empleado.backend = 'rest_lpj.backends.EmpleadoBackend'
            # Realizar el inicio de sesion
            login(request, empleado)
            return Response({'message': 'Logged in successfully.'})
        else:
            return Response({'message': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutViewSet(ViewSet):
    @action(methods=['post'], detail=False)
    def logout(self, request):
        logout(request)
        return Response({'success': 'Cierre de sesion exitoso'}, status=status.HTTP_200_OK)






