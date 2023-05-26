import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPlayersData } from 'src/interfaces/IPlayersData';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  playersData$ = new BehaviorSubject<IPlayersData[]>([]);

  get PlayersData() {
    return this.playersData$.getValue()
  }

  set PlayersData(vlaue) {
    this.playersData$.next(vlaue);
  }

  constructor() {}
}
