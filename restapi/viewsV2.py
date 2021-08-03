from django.shortcuts import render
from django.http import HttpResponse
from .models import Lead, MainData, IntakeData, UserData, SubmitData
from .serializers import LeadSerializer, MainDataSerializer, IntakeDataSerializer, UserDataSerializer, SubmitDataSerializer
from rest_framework import generics
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from django.utils.decorators import method_decorator
from restapi.testScript import *


def test(request):
    return HttpResponse('test')

class LeadListCreate(generics.ListCreateAPIView):
    queryset= Lead.objects.all()
    serializer_class = LeadSerializer

class MainDataListCreate(generics.ListCreateAPIView):
    queryset= MainData.objects.all()
    serializer_class = MainDataSerializer

class IntakeDataListCreate(generics.ListCreateAPIView):
    queryset= IntakeData.objects.all()
    serializer_class = IntakeDataSerializer

@csrf_exempt
def userdata_list(request,request_id)
    entry = get_object_or_404(UserData, pk=request_id)

@method_decorator(csrf_exempt, name='dispatch')
class UserDataListCreate(generics.ListCreateAPIView):
    log(data = UserData.objects.last())
    queryset= UserData.objects.all()
    serializer_class = UserDataSerializer

class SubmitDataListCreate(generics.ListCreateAPIView):
    queryset= SubmitData.objects.all()
    serializer_class = SubmitDataSerializer
