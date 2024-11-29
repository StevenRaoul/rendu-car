import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonLabel, IonList, IonInput } from '@ionic/angular/standalone';
import { getDatabase, ref, set, get } from 'firebase/database';
import { Router } from '@angular/router';


@Component({
  selector: 'app-addcar',
  templateUrl: './addcar.page.html',
  styleUrls: ['./addcar.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonLabel, IonList, IonInput, CommonModule, FormsModule, ReactiveFormsModule]
})
export class AddcarPage implements OnInit {
  newCar = { name: '', model: '' , plate: '', frontpic: '', backpic: ''};

  public registerForm = new FormGroup({
    brand: new FormControl('', [Validators.required]),
    model: new FormControl('', [Validators.required]),
    plate: new FormControl('', [Validators.required]),
    frontpic: new FormControl('', [Validators.required]),
    backpic: new FormControl('', [Validators.required]),
  });

  selectedFrontFile: File | null = null;
  selectedBackFile: File | null = null;

  constructor(private router: Router) { }

  ngOnInit() {  }

  

onFileChange(event: any, type: 'front' | 'back') {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    if (type === 'front') {
      this.selectedFrontFile = file;
      console.log('Image avant sélectionnée:', file);
    } else if (type === 'back') {
      this.selectedBackFile = file;
      console.log('Image arrière sélectionnée:', file);
    }
  } else {
    console.error('Veuillez sélectionner une image valide');
  }
}

  async addCar() {
    const { brand, model, plate } = this.registerForm.value;

    const database = getDatabase();
    const newCarId = new Date().getTime().toString();

    await set(ref(database, "/cars/" + newCarId), {
      brand: brand,
      model: model,
      plate: plate,
      frontpic: this.selectedFrontFile ? URL.createObjectURL(this.selectedFrontFile) : '',
      backpic: this.selectedBackFile ? URL.createObjectURL(this.selectedBackFile) : '',
      id: newCarId
    });

    const carRef = ref(database, "/cars/" + newCarId);
    const snapshot = await get(carRef);
    if (snapshot.exists()) {
      console.log('Voiture ajoutée:', snapshot.val());
    } else {
      console.log('Aucune donnée trouvée');
    }
    this.toCars();
  }

  toCars() {
    this.router.navigate(['/cars']);
  }
}
