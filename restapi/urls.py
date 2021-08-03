from django.urls import path, re_path
from . import views
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'userdata', views.UserDataViewSet)

urlpatterns = [
        path('lead', views.LeadListCreate.as_view() ),
        path('maindata', views.MainDataListCreate.as_view() ),
        path('intakedata', views.IntakeDataListCreate.as_view() ),
        #path('userdata', views.UserDataListCreate.as_view() ),
        #path(r'^userdata/<int:request_id>', views.userdata_list),
        path('submitdata', views.SubmitDataListCreate.as_view() ),
        path('', views.test),
        #path('transformers', views.transformers),
]

urlpatterns += router.urls
