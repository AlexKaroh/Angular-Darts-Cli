import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  gameMode = [501, 301];
  selectedMode?: number;

  constructor() { }

  selectMode(mode: number){
    this.selectedMode = mode;
  }

}
