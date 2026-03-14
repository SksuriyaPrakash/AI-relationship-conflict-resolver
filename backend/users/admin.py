from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, CoupleProfile

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ["email", "username", "first_name", "last_name", "phone", "is_staff"]
    search_fields = ["email", "username", "first_name", "last_name"]
    ordering = ["-date_joined"]
    
    # Expose custom fields in django admin detail view
    fieldsets = UserAdmin.fieldsets + (
        (None, {"fields": ("phone", "occupation", "language_preference", "invite_token")}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {"fields": ("phone", "occupation", "language_preference", "invite_token")}),
    )

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(CoupleProfile)


