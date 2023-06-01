import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPlayersData } from 'src/interfaces/players-data';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  playersData = new BehaviorSubject<IPlayersData[]>([
    { name: 'Alex', email: '' },
    { name: 'Andrey', email: '' },
    { name: 'Vlados', email: '' },
  ]);

  constructor() {}

  get players() {
    return this.playersData.getValue();
  }

  set players(vlaue) {
    this.playersData.next(vlaue);
  }
}
