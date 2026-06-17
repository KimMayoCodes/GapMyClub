from rest_framework import serializers
from .models import Club, ShotSession, Shot


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

class ShotSerializer(serializers.ModelSerializer):
    club_name = serializers.CharField(source="club.name", read_only=True)
    club_type = serializers.CharField(source="club.club_type", read_only=True)
    club_type_display = serializers.CharField(
        source="club.get_club_type_display",
        read_only=True,
    )
    session_name = serializers.CharField(source="session.name", read_only=True)

    class Meta:
        model = Shot
        fields = [
            "id",
            "club",
            "club_name",
            "club_type",
            "club_type_display",
            "session",
            "session_name",
            "carry_distance",
            "total_distance",
            "ball_speed",
            "club_speed",
            "launch_angle",
            "spin_rate",
            "notes",
            "created_at",
        ]
        read_only_fields = [
            "id",
            "club_name",
            "club_type",
            "club_type_display",
            "session_name",
            "created_at",
        ]

