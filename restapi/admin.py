from django.contrib import admin
from .models import * 

class TutorialAdmin(admin.ModelAdmin):
    fieldsets = [
            ("INFORMATION", {'fields': ["name", "email", "message", "created_at"]})
    ]

class UserDataAdmin(admin.ModelAdmin):
    list_display = ('authCode', 'userData', 'accessDate')

admin.site.register(Lead)
admin.site.register(UserData, UserDataAdmin)
