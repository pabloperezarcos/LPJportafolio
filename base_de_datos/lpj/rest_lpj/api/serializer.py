

from rest_framework.serializers import ModelSerializer
from rest_lpj.models import Empleados, Asistencias, Notas
from rest_framework import serializers

class EmpleadosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empleados
        fields = '__all__'

class AsistenciasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asistencias
        fields = '__all__'

class NotasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notas
        fields = '__all__'
