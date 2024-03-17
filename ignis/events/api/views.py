from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from events.models import Event
from .serializers import EventSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
class EventList(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    def get(self,request):
        event_list = Event.objects.all()
        serializer = EventSerializer(event_list,many=True)
        return  Response(serializer.data)

    def post(self, request):
        data = request.data.copy()
        data['user'] = request.user.id
        serializer = EventSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EventLike(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    def patch(self,request,event_id):
        try:
            event=Event.objects.get(pk=event_id)
        except:
            return Response({'error':'Event not found'},status=status.HTTP_404_NOT_FOUND)
        serializer=EventSerializer(event,data=request.data,partial=True)
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
