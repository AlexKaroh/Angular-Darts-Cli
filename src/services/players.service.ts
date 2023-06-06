import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PlayersData } from 'src/interfaces/players-data';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  playersData = new BehaviorSubject<PlayersData[]>([
    { name: 'Alex', email: '' },
    { name: 'Andrey', email: '' },
    { name: 'Vlados', email: '' },
  ]);

  constructor() {}
}
