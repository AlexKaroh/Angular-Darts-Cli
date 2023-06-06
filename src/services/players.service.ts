import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PlayersData } from 'src/interfaces/players-data';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {

  _players: PlayersData[] = [
    { name: 'Alex', email: '' },
    { name: 'Andrey', email: '' },
    { name: 'Vlados', email: '' },
  ]

  private playersData = new BehaviorSubject<PlayersData[]>(this._players);

  constructor() {}

  public get players$() {
    return this.playersData.asObservable();
  }

  public addPlayer(player: PlayersData) {
    const currentPlayers = this.playersData.value;
    const newPlayers = [...currentPlayers, player];
    this.playersData.next(newPlayers);
  }

  public hasPlayer(name: string): boolean {
    const players = this.playersData.value;
    return players.some((player) => player.name === name);
  }

  public updatePlayers(players: PlayersData[]) {
    this.playersData.next(players);
  }
}
