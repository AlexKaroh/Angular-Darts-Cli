import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameHistory } from 'src/interfaces/game-history';
import { PlayersData } from 'src/interfaces/players-data';
import { PlayerService } from './players.service';
import { Mupltiplicator } from 'src/enums/mupltiplicator';
import { PlayerMove } from 'src/interfaces/player-move';

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

  makeMove(moves: PlayerMove[]) {
    const totalScorePlayers: GameHistory = {};
    moves.forEach((playerMove) => {
      const playerName = playerMove.name;
      let totalScore = 0;

      if (this.gameHistory.length > 0) {
        totalScorePlayers[playerName] = this.gameHistory.at(-1)![playerName];
      } else {
        totalScorePlayers[playerName] = this.startedScore as number;
      }

      playerMove.throw.forEach((throwValue) => {
        totalScore += throwValue.points * throwValue.multiply;
      });


      if (this.selectedMode === '501') {
        totalScorePlayers[playerName] -= totalScore;
      } else {
        totalScorePlayers[playerName] += totalScore;
      }


    });

    this.gameHistory.push(totalScorePlayers);
    console.log(this.gameHistory);
  }
  

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
