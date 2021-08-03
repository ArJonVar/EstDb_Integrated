from django.db import models
from datetime import datetime

class Lead(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.CharField(max_length=300)
    created_at = models.DateTimeField(blank=True, auto_now_add=True)

class MainData(models.Model):
    mainData = models.JSONField

class IntakeData(models.Model):
    intakeData= models.JSONField

class UserData(models.Model):
    authCode= models.CharField(max_length=100, default='')
    userData= models.JSONField(default=list)
    accessDate = models.DateTimeField("Access Date", auto_now_add=True)

    def __str__(self):
        return self.authCode

class SubmitData(models.Model):
    submitData= models.JSONField
