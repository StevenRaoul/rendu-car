import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { IonicModule } from "@ionic/angular";
import { initializeApp } from "firebase/app";
import { importProvidersFrom } from '@angular/core';

export const firebaseConfig = {
  apiKey: "AIzaSyDD377JSO3HpPHgZG8FrPYbOPqgbyTvlO0",
    authDomain: "rendu-car.firebaseapp.com",
    databaseURL: "https://rendu-car-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "rendu-car",
    storageBucket: "rendu-car.firebasestorage.app",
    messagingSenderId: "943217144387",
    appId: "1:943217144387:web:b1e7fc1dcb357e94921af6",
};

initializeApp(firebaseConfig);

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(IonicModule.forRoot({innerHTMLTemplatesEnabled: true})),
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
