from django.contrib import admin
from .models import UserProfile, ContactSupport
from accounts import models


class UserProfileAdmin(admin.ModelAdmin):
    list_per_page = 100
    preserve_filters = True
    list_display = [f.name for f in UserProfile._meta.fields]


admin.site.register(UserProfile, UserProfileAdmin)


class CountryMasterOptions(admin.ModelAdmin):
    list_display = ('country_id', 'country_name', 'country_code')
    search_fields = ('country_id', 'country_name')


admin.site.register(models.CountryMaster, CountryMasterOptions)


class StateMasterOptions(admin.ModelAdmin):
    list_display = ('state_id', 'country', 'state_name', 'state_code')
    search_fields = ('state_id', 'state_name')


admin.site.register(models.StateMaster, StateMasterOptions)


class ContactSupportAdmin(admin.ModelAdmin):
    list_display = ('contact_email', 'feedback_email', 'admin_email')
    search_fields = ('contact_email', 'feedback_email')


admin.site.register(ContactSupport, ContactSupportAdmin)
# admin.site.register(ContactSupportSettings,ContactSupportSettingsAdmin)
