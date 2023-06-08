import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Player } from 'src/interfaces/players-data';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  _players: Player[] = [
    { name: 'Alex', email: '' },
    { name: 'Andrey', email: '' },
    { name: 'Vlados', email: '' },
  ];

  private playersData = new BehaviorSubject<Player[]>(this._players);

  constructor() {}

  public get players$() {
    return this.playersData.asObservable();
  }

  public addPlayer(player: Player) {
    const newPlayers = this.playersData.value.slice();
    newPlayers.push(player);
    this.updatePlayers(newPlayers);
  }

  public removePlayer(index: number) {
    const newPlayers = this.playersData.value.slice();
    newPlayers.splice(index, 1);
    this.updatePlayers(newPlayers);
  }

  public hasPlayer(name: string): boolean {
    return this.playersData.value.some((player) => player.name === name);
  }


  public updatePlayers(players: Player[]) {
    this.playersData.next(players);
  }
}
