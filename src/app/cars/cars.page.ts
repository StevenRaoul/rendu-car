import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonImg, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonCol, IonRow, IonGrid } from '@ionic/angular/standalone';
import { getDatabase, ref, get } from 'firebase/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.page.html',
  styleUrls: ['./cars.page.scss'],
  standalone: true,
  imports: [IonGrid, IonRow, IonCol, IonButton, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, CommonModule]
})
export class CarsPage implements OnInit {

  cars: { brand: string, model: string, plate: string, frontpic: string, backpic: string, id: string }[] = []; // Tableau pour stocker les voitures (on ne garde que les modèles ici)

  constructor(private router: Router) {}

  async ngOnInit() {
    await this.loadCars(); 
  }

  async loadCars() {
    const database = getDatabase();
    const carsRef = ref(database, '/cars');

    try {
      const snapshot = await get(carsRef);
      if (snapshot.exists()) {
        const carsData = snapshot.val();
        this.cars = Object.values(carsData).map((car: any) => ({
          brand: car.brand,
          model: car.model,
          plate: car.plate,
          frontpic: car.frontpic,
          backpic: car.backpic,
          id: car.id,
        }));
      } else {
        console.log('Aucune voiture trouvée dans la base de données.');
      }
    } catch (error) {
      console.error('Erreur lors du chargement des voitures:', error);
    }
  }

  toAddCar() {
    this.router.navigate(['/addcar']);
  }

  toCar(id: string) {
    this.router.navigate(['/car', id]);
  }
}
