import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { getDatabase, ref, get } from 'firebase/database';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car',
  templateUrl: './car.page.html',
  styleUrls: ['./car.page.scss'],
  standalone: true,
  imports: [IonCardSubtitle, IonCardTitle, IonCardContent, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, CommonModule, FormsModule, ReactiveFormsModule]

})
export class CarPage implements OnInit {
  carId: string = '';
  car: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Récupérer l'ID de la voiture depuis les paramètres de l'URL
    this.carId = this.route.snapshot.paramMap.get('id')!;
    this.loadCarDetails();
  }

  async loadCarDetails() {
    const database = getDatabase();
    const carRef = ref(database, '/cars/' + this.carId);

    try {
      const snapshot = await get(carRef);
      if (snapshot.exists()) {
        this.car = snapshot.val(); // Récupère les détails de la voiture
      } else {
        console.log('Voiture non trouvée');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  }

  toCars() {
    this.router.navigate(['/cars']);
  }
}
