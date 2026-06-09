from rest_framework import viewsets

from .models import Club, ShotSession
from .serializers import ClubSerializer, ShotSessionSerializer


class ClubViewSet(viewsets.ModelViewSet):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer

class ShotSessionViewSet(viewsets.ModelViewSet):
    queryset = ShotSession.objects.all()
    serializer_class = ShotSessionSerializer

