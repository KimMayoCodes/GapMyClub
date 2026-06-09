from django.contrib import admin
from .models import Club, ShotSession, Shot


@admin.register(Club)
class ClubAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "club_type",
        "average_distance",
        "shortest_distance",
        "longest_distance",
        "user",
    )

    list_filter = ("club_type",)
    search_fields = ("name", "notes")
    ordering = ("club_type", "name")

@admin.register(ShotSession)
class ShotSessionAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "session_date",
        "location",
        "user",
    )

    list_filter = ("session_date", "location")
    search_fields = ("name", "location", "notes")
    ordering = ("-session_date",)

@admin.register(Shot)
class ShotAdmin(admin.ModelAdmin):
    list_display = (
        "club",
        "session",
        "carry_distance",
        "total_distance",
        "created_at",
    )

    list_filter = ("club", "session")
    search_fields = ("club__name", "session__name", "notes")
    ordering = ("club", "created_at")

