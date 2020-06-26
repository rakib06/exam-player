from rest_framework.routers import DefaultRouter
from users.views import MyStudentViewSet

router = DefaultRouter()
router.register(r'', MyStudentViewSet, base_name='student')
urlpatterns = router.urls
