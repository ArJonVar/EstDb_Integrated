from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponse
from .models import Lead, MainData, IntakeData, UserData, SubmitData
from .serializers import LeadSerializer, MainDataSerializer, IntakeDataSerializer, UserDataSerializer, SubmitDataSerializer
from rest_framework import generics
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http.response import JsonResponse 
from rest_framework.parsers import JSONParser
from rest_framework import status
import json
import logging
import logging.config
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from functools import wraps

from restapi.testScript import *


def test(request):
    #request_response = json.loads(request.body)
    #log.info("hello mars")
    #log.info(request_response)
    if request.method ==  "POST":
        log.info('hello mars')
        print('hello jupiter')
    return HttpResponse('test')

@api_view(['POST'])
@csrf_exempt
def transformers(request):
    queryset= UserData.objects.all()
    if request.method == 'POST':
        postData=JSONParser().parse(request) 
        serializer = UserDataSerializer(data = postData)
        if serializer.is_valid():
            serializer.save
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        #return HttpResponse('message')
    return HttpResponse('hello')

class LeadListCreate(generics.ListCreateAPIView):
    queryset= Lead.objects.all()
    serializer_class = LeadSerializer

class MainDataListCreate(generics.ListCreateAPIView):
    queryset= MainData.objects.all()
    serializer_class = MainDataSerializer

class IntakeDataListCreate(generics.ListCreateAPIView):
    queryset= IntakeData.objects.all()
    serializer_class = IntakeDataSerializer

@method_decorator(csrf_exempt, name='dispatch')
class UserDataListCreate(generics.ListCreateAPIView):
    log(data = UserData.objects.last())
    queryset= UserData.objects.all()
    serializer_class = UserDataSerializer

class SubmitDataListCreate(generics.ListCreateAPIView):
    queryset= SubmitData.objects.all()
    serializer_class = SubmitDataSerializer
