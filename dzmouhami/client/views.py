
from rest_framework.response import Response
from rest_framework import generics, status ,permissions
from django.shortcuts import get_object_or_404
from django.urls import reverse
from .models import *
from .serializers import *
from main.models import avocat ,client 
from rest_framework.views import APIView


from datetime import datetime
from django.core.mail import send_mail


#permettre de commenter
class CommentaireListCreateView(generics.ListCreateAPIView):
    queryset = commentaire.objects.all()
    serializer_class = CommentaireSerializer



#le detail de chaque commentaire ecris 
class CommentaireDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = commentaire.objects.all()
    serializer_class = CommentaireSerializer



#pour avoir la liste de tout les commentaires pour chaque avocat
class CommentaireParAvocatView(APIView):
    def get(self, request, avocat_id):
        # Récupérer tous les commentaires pour un avocat spécifique
        commentaires = commentaire.objects.filter(avocat_id=avocat_id)
        
        # Sérialiser les commentaires
        serializer = CommentaireSerializer(commentaires, many=True)
        
        return Response(serializer.data)









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
    




from django.db.models import Q

@api_view(['POST'])
def noter_avocat(request):
    try:
        id_avocat = request.data.get('idavocat')
        id_client = request.data.get('idclient')

        avocat_instance = avocat.objects.get(id=id_avocat)
        client_instance = client.objects.get(id=id_client)

        note_value = request.data.get('note', None)

        if note_value is not None and 0 <= note_value <= 5:
            # Vérifier si le client a déjà voté
            existing_note = Note.objects.filter(Q(avocat=avocat_instance) & Q(client=client_instance)).first()

            if existing_note:
                # Si le client a deja vote mettre a jour sa note
                existing_note.note = note_value
                existing_note.save()
            else:
                # Si le client n'a pas encore vote creer une nouvelle note
                note = Note.objects.create(avocat=avocat_instance, client=client_instance, note=note_value)

            # Calculer la moyenne des nouvelles notations
            nouvelles_notations = Note.objects.filter(avocat=avocat_instance)
            moyenne = nouvelles_notations.aggregate(models.Avg('note'))['note__avg']

            # Mettre à jour l'évaluation et sauvegarder l'avocat
            avocat_instance.evaluation = moyenne
            avocat_instance.nbrvotes=nouvelles_notations.count()
            avocat_instance.save()

            return Response({
                "detail": "Notation enregistrée avec succès.",
                "moyenne": moyenne,
                "nombre_clients_votes": nouvelles_notations.count()
            }, status=status.HTTP_201_CREATED)
        else:
            return Response({"detail": "La note doit être comprise entre 0 et 5."}, status=status.HTTP_400_BAD_REQUEST)

    except avocat.DoesNotExist:
        return Response({"detail": f"L'avocat avec l'ID {id_avocat} n'existe pas."}, status=status.HTTP_404_NOT_FOUND)
    except client.DoesNotExist:
        return Response({"detail": f"Le client avec l'ID {id_client} n'existe pas."}, status=status.HTTP_404_NOT_FOUND)
