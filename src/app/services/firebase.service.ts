import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from '@angular/fire/storage';
import { Usuario } from '../models/usuario';
import { Turno } from '../models/turno';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) {}
  storage: AngularFireStorage = inject(AngularFireStorage);

  async addUsuario(usuario: Usuario) {
    const colUsuarios = this.firestore.collection('usuarios');
    const doc = colUsuarios.doc();
    usuario.id = doc.ref.id;

    return await doc.set({ ...usuario });
  }

  async addTurno(turno: Turno) {
    const colturnos = this.firestore.collection('turnos');
    const doc = colturnos.doc();
    turno.id = doc.ref.id;

    return await doc.set({ ...turno });
  }

  async addLog(user: Usuario) {
    const colturnos = this.firestore.collection('logs');
    const id = Date.now().toString();
    const fecha_date = new Date();
    const doc = colturnos.doc(id);
    const dia = fecha_date.toLocaleDateString('es-ES', { weekday: 'long' });
    const tiempo = fecha_date.toLocaleTimeString('es-ES', {
      timeZone: 'America/Argentina/Buenos_Aires',
      hour12: false,
    });
    const fecha = fecha_date.toLocaleDateString();
    const log: any = {
      id: id,
      fecha: fecha,
      tiempo: tiempo,
      dia: dia,
      nombre: user.nombre,
      apellido: user.apellido,
      correo: user.mail,
      id_user: user.id,
    };

    return await doc.set(log);
  }

  async updateUsuario(usuario: Usuario) {
    const colUsuarios = this.firestore.collection('usuarios');
    const doc = colUsuarios.doc(usuario.id);

    return await doc.update({ ...usuario });
  }

  updateUser(usuario: Usuario) {
    return this.firestore
      .doc<Usuario>(`usuarios/${usuario.id}`)
      .update(usuario);
  }

  updateTurno(obj: Turno) {
    return this.firestore.doc(`turnos/${obj.id}`).update(obj);
  }

  getCollection(collection: 'usuarios' | 'turnos' | 'logs' = 'usuarios') {
    const col = this.firestore.collection(collection);
    return col;
  }

  getUser(userId: string) {
    return this.firestore.collection('usuarios').doc(userId).get();
  }

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
