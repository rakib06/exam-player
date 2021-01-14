from rest_framework.routers import DefaultRouter
from .views import UserViewSet, MyStudentViewSet

router = DefaultRouter()
router.register(r'', UserViewSet, base_name='users')
router.register(r'', MyStudentViewSet, base_name='code')
urlpatterns = router.urls
