import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  showProgress = signal<boolean>(false);

  enableProgressBar() {
    this.showProgress.set(true);
  }

  disableProgressBar() {
    this.showProgress.set(false);
  }

  constructor() { }
}
