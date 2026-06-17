from rest_framework import viewsets

from .models import Club, ShotSession, Shot
from .serializers import ClubSerializer, ShotSessionSerializer, ShotSerializer


class ClubViewSet(viewsets.ModelViewSet):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer

class ShotSessionViewSet(viewsets.ModelViewSet):
    queryset = ShotSession.objects.all()
    serializer_class = ShotSessionSerializer

class ShotViewSet(viewsets.ModelViewSet):
    queryset = Shot.objects.all()
    serializer_class = ShotSerializer

    def get_queryset(self):
        queryset = Shot.objects.all()

        club_id = self.request.query_params.get("club")
        session_id = self.request.query_params.get("session")

        if club_id:
            queryset = queryset.filter(club_id=club_id)

        if session_id:
            queryset = queryset.filter(session_id=session_id)

        return queryset
    


