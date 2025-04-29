import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, onSnapshot, orderBy, query } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { MissionData } from '../interfaces/mission-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private firebaseConfig = {
    apiKey: "AIzaSyCOD0ImdRcKolunHF6Ah5Qh59VqcjTcm14",
    authDomain: "flairx-56351.firebaseapp.com",
    projectId: "flairx-56351",
    storageBucket: "flairx-56351.firebasestorage.app",
    messagingSenderId: "904274842394",
    appId: "1:904274842394:web:9403694e00e1489f6c52a3"
  };
  private app = initializeApp(this.firebaseConfig);
  private db = getFirestore(this.app);

  private missionSubject = new BehaviorSubject<string[]>([]);
  missions$ = this.missionSubject.asObservable();

  private dataSubject = new BehaviorSubject<MissionData[]>([]);
  data$ = this.dataSubject.asObservable();

  async getMissions() {
    try {
      const missionsRef = collection(this.db, 'Missions');
      onSnapshot(missionsRef, (missionsSnap) => {
        const missions: string[] = [];
        missionsSnap.forEach((doc) => {
          missions.push(doc.id);
        });
        this.missionSubject.next(missions);
      });
    } catch (error) {
      console.error(error);
    }
  }

  getData(missionName: string) {
    try {
      const dataRef = collection(this.db, missionName);
      onSnapshot(dataRef, (dataSnap) => {
        const data: MissionData[] = [];
        dataSnap.forEach((doc) => {
          const missionData: MissionData = doc.data() as MissionData;
          missionData.date = new Date(Number(doc.id));
          data.push(missionData);
        });
        this.dataSubject.next(data);
      });
    } catch (error) {
      console.error(error);
    }
  }
  constructor() { }
}
