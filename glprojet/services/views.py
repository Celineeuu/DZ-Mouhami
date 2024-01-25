from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Rdv
from .serializers import RdvSerializer
from authentification.models import avocat
from datetime import datetime
from django.core.mail import send_mail



class RdvCreateView(APIView):
    serializer_class = RdvSerializer

    def post(self, request, *args, **kwargs):
        data = request.data

        print(f"Data received: {data}")
        date_string = data.get('jour')
        time_string = data.get('heure')

        print(f"Date string: {date_string}")
        print(f"Heure string: {time_string}")

        avocat_id = data.get('avocat')
        print(f"Valeur de l'ID d'avocat reçue : {avocat_id}")

        if avocat_id is None:
            return Response({"message": "Veuillez fournir un ID d'avocat valide."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Vérifiez si 'avocat_id' correspond à un avocat existant dans la base de données
            avocat_obj = avocat.objects.get(id=avocat_id)
        except avocat.DoesNotExist:
            return Response({"message": "L'ID de l'avocat spécifié n'existe pas."}, status=status.HTTP_400_BAD_REQUEST)

        if date_string is None or time_string is None:
            return Response({"message": "Veuillez entrer une date et une heure valides."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            date = datetime.strptime(date_string, "%Y-%m-%d").date()
            time = datetime.strptime(time_string, "%H:%M").time()

            print(f"Date: {date}")
            print(f"Heure: {time}")

            # Vérification si le créneau est déjà pris
            creneau_pris = Rdv.objects.filter(jour=date, heure=time, avocat=avocat_obj).exists()

            if creneau_pris:
                return Response({"message": "Ce créneau est déjà pris. Veuillez choisir un autre horaire."}, status=status.HTTP_400_BAD_REQUEST)

            # Création du rendez-vous dans la base de données
            rdv = Rdv.objects.create(
                avocat=avocat_obj,
                nom=data.get('nom'),
                prenom=data.get('prenom'),
                telephone=data.get('telephone'),
                sujet=data.get('sujet'),
                jour=date,
                heure=time
            )
            subject = 'Nouvelle demande de rendez-vous'
            message = f'Une nouvelle demande de rendez-vous a été créée par {rdv.nom} {rdv.prenom}.'
            from_email = 'aidadouaibia2003@gmail.com' 
            recipient_list = [avocat_obj.email]

            try:
                 send_mail(subject, message, from_email, recipient_list)
            except Exception as e:
                # Gérez l'erreur d'envoi de courrier électronique ici (par exemple, imprimez l'erreur)
                print(f"Erreur lors de l'envoi de l'e-mail : {e}")

            serializer = RdvSerializer(rdv)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
                           
        except ValueError:
            return Response({"message": "Format de date/heure invalide."}, status=status.HTTP_400_BAD_REQUEST)




#affichage des details sur le crenau pris (nom et prenom du client)
class DetailsClientRdvView(APIView):
    
    def get(self, request,id_avocat):
        rdv_details = Rdv.objects.filter(avocat_id=id_avocat).values('nom', 'prenom', 'telephone','sujet','jour', 'heure')
        return Response(rdv_details)