from rest_framework import serializers
from .models import Club, ShotSession


class ClubSerializer(serializers.ModelSerializer):
    club_type_display = serializers.CharField(
        source="get_club_type_display",
        read_only=True,
    )

    class Meta:
        model = Club
        fields = [
            "id",
            "user",
            "name",
            "club_type",
            "club_type_display",
            "average_distance",
            "shortest_distance",
            "longest_distance",
            "notes",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "user", "created_at", "updated_at"]

class ShotSessionSerializer(serializers.ModelSerializer):
    shots_count = serializers.IntegerField(
        source="shots.count",
        read_only=True,
    )

    class Meta:
        model = ShotSession
        fields = [
            "id",
            "user",
            "name",
            "session_date",
            "location",
            "notes",
            "shots_count",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "user", "created_at", "updated_at"]

