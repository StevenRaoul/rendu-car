import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  constructor() { }

  uploadImage(file: File, filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const storage = getStorage();
      const storageRef = ref(storage, filePath);

      uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        }).catch((error) => {
          reject('Erreur lors de la récupération de l\'URL : ' + error.message);
        });
      }).catch((error) => {
        reject('Erreur d\'upload : ' + error.message);
      });
    });
  }
}
