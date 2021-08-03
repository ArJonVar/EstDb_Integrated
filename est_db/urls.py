from django.contrib import admin
from django.urls import path, re_path, include
#from django.shortcuts import redirect

#def get_new_url(request):
    # Specify the port number, you could get this dynamically 
    # through a config file or something if you wish
    #new_port = '9001'

    # `request.get_host()` gives us {hostname}:{port}
    # we split this by colon to just obtain the hostname
    #hostname = request.get_host().split(':')[0]
    # Construct the new url to redirect to
    #url = 'http://' + hostname + ':' + new_port + '/'
    #return redirect(url)
                                    

urlpatterns = [
#    path('', views.index, name='index'),
    path('admin/', admin.site.urls),
    path('restapi/', include('restapi.urls')),
    path('site/', include('frontend.urls')),
    path('transformers/', include('transformers.urls')),
    re_path(r'/', include('frontend.urls')),
]

