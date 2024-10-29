import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from '@angular/fire/storage';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) {}
  storage: AngularFireStorage = inject(AngularFireStorage);

  //IMAGENES
  async uploadImage(path: string, data_url: string) {
    return uploadString(ref(getStorage(), path), data_url, 'data_url').then(
      () => {
        return getDownloadURL(ref(getStorage(), path));
      }
    );
  }

  async subirImg(imagenCargada: any) {
    const filePath = `images/${Date.now()}_${imagenCargada.name}`; // Crear un nombre único para la imagen
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, imagenCargada);

    // Monitorear el progreso de la subida
    task.percentageChanges().subscribe((progress) => {
      let uploadProgress = progress ? progress : 0;
      console.log(`Progreso de subida: ${uploadProgress}%`);
    });

    // Obtener la URL de descarga cuando la imagen se suba completamente
    return await task.then((res) => {
      return getDownloadURL(res.ref);
    });
  }
}
