
from rest_framework import serializers
from .models import Lead, MainData, IntakeData, UserData, SubmitData

class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = ('id', 'name', 'email', 'message')
        
class MainDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = MainData
        fields =('mainData')

class IntakeDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = IntakeData
        fields =('IntakeData')

class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserData
        fields =('pk', 'authCode', 'userData', 'accessDate')

    def update(self, instance, validated_data): 
        instance.name = validated_data.get('userData', instance.userData)
        instance.save()
        return instance

class SubmitDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubmitData
        fields =('id', 'submitData')
