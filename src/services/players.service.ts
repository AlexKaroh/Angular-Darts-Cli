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
    const currentPlayers = this.playersData.value;
    const newPlayers = [...currentPlayers, player];
    this.updatePlayers(newPlayers);
  }

  public hasPlayer(name: string): boolean {
    return this.playersData.value.some((player) => player.name === name);
  }

  public updatePlayers(players: Player[]) {
    this.playersData.next(players);
  }
}
