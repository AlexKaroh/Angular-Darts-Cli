import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IGameHistory } from 'src/interfaces/IGameHistory';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  gameMode = [501, 301];
  gameHistory$ = new BehaviorSubject<IGameHistory[]>([]);
  selectedMode?: number;

  constructor() { }

  get gameHistory() {
    return this.gameHistory$.getValue()
  }

  set gameHistory(vlaue) {
    this.gameHistory$.next(vlaue);
  }

  selectMode(mode: number){
    this.selectedMode = mode;
  }
}
