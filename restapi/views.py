from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse
from .models import Lead, MainData, IntakeData, UserData, SubmitData
from .serializers import LeadSerializer, MainDataSerializer, IntakeDataSerializer, UserDataSerializer, SubmitDataSerializer
from rest_framework import generics
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from django.utils.decorators import method_decorator
from restapi.testScript import *
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.response import Response

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

@method_decorator(csrf_exempt, name='dispatch')
class UserDataViewSet(viewsets.ViewSet):
    queryset=UserData.objects.all()

    def list(self, request):
        serializer_class = UserDataSerializer(self.queryset, many=True)
        
        #debugging
        #log(message="get_request_1", data=request)
        #log(message='get_serializer_class', data=serializer_class)
        #log(message='get_serializer_class.data', data=serializer_class.data)

        return Response(serializer_class.data)

    def create (self, request):
        serializer=UserDataSerializer(data=request.data)

        #debugging
        #log(message='post_request_1', data=request)
        #log(message='post_serializer', data=serializer)
        
        if serializer.is_valid(raise_exception = True):
            serializer.save()
            log(message='post_serializer.data', data=serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None):
        user_data = auth_flow(reactAuthCode = UserData.objects.last())
        entry =  get_object_or_404(self.queryset, pk=pk)
        serializer_class= UserDataSerializer(entry)
        
        #debugging
        #log(message="get_request_1", data=request)
        #log(message='get_serializer_class', data=serializer_class)
        log(message='get_serializer_class.data', data=serializer_class.data)
        
        return Response(user_data)
        
    def partial_update(self, request, pk=None, *args, **kwargs):
        data_to_change={'userData': request.data.get("userData")}
        serialized = UserDataSerializer(request.user, data=data_to_change, partial=True)
        if serialized.is_valid():
            self.perform_update(serialized)
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    #def partial_update(self, request, pk=None):
     #   serialized = UserDataSerializer(request.user, data=request.data, partial=True)
      #  serialized.save()
       # return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
class SubmitDataListCreate(generics.ListCreateAPIView):
    queryset= SubmitData.objects.all()
    serializer_class = SubmitDataSerializer
