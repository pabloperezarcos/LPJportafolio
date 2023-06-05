
from rest_framework.routers import DefaultRouter
from rest_lpj.api.views import EmpleadosViewSet,AsistenciasViewSet,NotasViewSet,LoginViewSet,LogoutViewSet
from rest_framework import routers


router = routers.DefaultRouter()
router.register('empleados', EmpleadosViewSet)
router.register('asistencias', AsistenciasViewSet)
router.register('notas', NotasViewSet)
router.register(r'login', LoginViewSet, basename='login')
router.register(r'logout', LogoutViewSet, basename='logout')


