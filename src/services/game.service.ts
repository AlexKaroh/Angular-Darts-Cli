import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameHistory } from 'src/interfaces/game-history';
import { PlayersData } from 'src/interfaces/players-data';
import { PlayerService } from './players.service';
import { Mupltiplicator } from 'src/enums/mupltiplicator';

const GAME_301_START_VALUE = 0;
const GAME_301_WIN_VALUE = 301;

const GAME_501_START_VALUE = 501;
const GAME_501_WIN_VALUE = 0;

const DEAD_END_VALUE = 1;
const FIRST_COUNT_OF_MOVES_TO_CHECK_WINNER = 20;
const SECOND_COUNT_OF_MOVES_TO_CHECK_WINNER = 30;

@Injectable({
  providedIn: 'root',
})
export class GameService {
  playersMoves = new BehaviorSubject<GameHistory[]>([]);
  gameMode = ['501', '301'];
  selectedMode: string | null = null;
  startedScore?: number;
  winner!: string | null;

  constructor() {}

  selectMode(mode: string | null) {
    this.selectedMode = mode;
    if (mode) {
      if (mode === '501') {
        this.startedScore = GAME_501_START_VALUE;
      } else {
        this.startedScore = GAME_301_START_VALUE;
      }
    }
  }

  restartGame() {
    this.gameHistory = [];
    this.winner = null;
  }

  get gameHistory() {
    return this.playersMoves.getValue();
  }

  set gameHistory(vlaue) {
    this.playersMoves.next(vlaue);
  }

  setWinner(player: string | null) {
    this.winner = player;
  }
}
