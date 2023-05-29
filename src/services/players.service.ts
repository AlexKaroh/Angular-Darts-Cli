import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPlayersData } from 'src/interfaces/IPlayersData';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  playersLength = 4;
  playersData$ = new BehaviorSubject<IPlayersData[]>([]);

  constructor() {}

  get PlayersData() {
    return this.playersData$.getValue()
  }

  set PlayersData(vlaue) {
    this.playersData$.next(vlaue);
  }

  removePlayer(index: number) {
    const playersData = this.PlayersData;
    playersData.splice(index, 1); 
    this.PlayersData = playersData; 
  }

  sortPlayersDataByName(searchVal : string) {
    this.PlayersData = this.PlayersData.sort(this.sortByName(searchVal));
  }

  private sortByName(searchVal : string) {
    return function(a : IPlayersData, b : IPlayersData) {
      const includeA = a.name.toLowerCase().split(searchVal.toLowerCase()).length - 1;
      const includeB = b.name.toLowerCase().split(searchVal.toLowerCase()).length - 1;
      if (includeA !== includeB) {
        return includeA < includeB ? 1 : -1;
      }
      return a.name.localeCompare(b.name);
    };
  }
}
