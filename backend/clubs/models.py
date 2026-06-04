from django.conf import settings
from django.db import models


class Club(models.Model):
    class ClubType(models.TextChoices):
        DRIVER = "DRIVER", "Driver"
        WOOD = "WOOD", "Wood"
        HYBRID = "HYBRID", "Hybrid"
        IRON = "IRON", "Iron"
        WEDGE = "WEDGE", "Wedge"
        PUTTER = "PUTTER", "Putter"

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="clubs",
        null=True,
        blank=True,
    )

    name = models.CharField(max_length=50)
    club_type = models.CharField(
        max_length=20,
        choices=ClubType.choices,
    )

    average_distance = models.DecimalField(
        max_digits=5,
        decimal_places=1,
        null=True,
        blank=True,
    )

    shortest_distance = models.DecimalField(
        max_digits=5,
        decimal_places=1,
        null=True,
        blank=True,
    )

    longest_distance = models.DecimalField(
        max_digits=5,
        decimal_places=1,
        null=True,
        blank=True,
    )

    notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["club_type", "name"]

    def __str__(self):
        return f"{self.name} ({self.get_club_type_display()})"
    
class ShotSession(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="shot_sessions",
        null=True,
        blank=True,
    )

    name = models.CharField(max_length=100)
    session_date = models.DateTimeField()
    location = models.CharField(max_length=150, blank=True)
    notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-session_date"]

    def __str__(self):
        return f"{self.name} - {self.session_date.date()}"
    
class Shot(models.Model):
    club = models.ForeignKey(
        Club,
        on_delete=models.CASCADE,
        related_name="shots",
    )

    session = models.ForeignKey(
        ShotSession,
        on_delete=models.CASCADE,
        related_name="shots",
    )

    carry_distance = models.DecimalField(
        max_digits=5,
        decimal_places=1,
    )

    total_distance = models.DecimalField(
        max_digits=5,
        decimal_places=1,
        null=True,
        blank=True,
    )

    ball_speed = models.DecimalField(
        max_digits=5,
        decimal_places=1,
        null=True,
        blank=True,
    )

    club_speed = models.DecimalField(
        max_digits=5,
        decimal_places=1,
        null=True,
        blank=True,
    )

    launch_angle = models.DecimalField(
        max_digits=4,
        decimal_places=1,
        null=True,
        blank=True,
    )

    spin_rate = models.PositiveIntegerField(
        null=True,
        blank=True,
    )

    notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["club", "created_at"]

    def __str__(self):
        return f"{self.club.name} - {self.carry_distance} yards"
    
