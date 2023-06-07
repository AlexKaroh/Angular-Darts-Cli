import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Mupltiplicator } from 'src/enums/mupltiplicator';
import { GameHistory } from 'src/interfaces/game-history';
import { PlayerMove } from 'src/interfaces/player-move';

const GAME_301_START_VALUE = 0;
const GAME_301_WIN_VALUE = 301;

const GAME_501_START_VALUE = 501;
const GAME_501_WIN_VALUE = 0;

const FIRST_LIMIT_OF_MOVES_TO_CHECK_WINNER = 19;
const SECOND_LIMIT_OF_MOVES_TO_CHECK_WINNER = 29;

const START_THROW_VALUE = 0;
const GAME_HISTORY_STARTED_VALUE = 0;
const DEAD_END_VALUE = 1;

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private playersMoves = new BehaviorSubject<GameHistory[]>([]);
  gameMode = ['501', '301'];
  selectedMode: string | null = null;
  winner: string | null = null;
  startedScore: number | null = null;

  constructor() {}

  get gameHistory$() {
    return this.playersMoves.asObservable();
  }

  get gameHistory() {
    return this.playersMoves.getValue();
  }

  set gameHistory(vlaue) {
    this.playersMoves.next(vlaue);
  }

  public makeMove(moves: PlayerMove[]) {
    const totalScorePlayers: GameHistory = {};
    let lastMultiplicatorIsDouble = false;
    let lastValue: number;

    moves.forEach((playerMove) => {
      const playerName = playerMove.name;
      let throwScore = START_THROW_VALUE;

      lastValue = this.gameHistory.length > GAME_HISTORY_STARTED_VALUE
        ? (totalScorePlayers[playerName] =
            this.gameHistory.at(-1)![playerName])
        : (totalScorePlayers[playerName] = this.startedScore as number);

      playerMove.throw.forEach((throwValue) => {
        throwScore = throwValue.points * throwValue.multiply;
        if (this.selectedMode === '501') {
          totalScorePlayers[playerName] -= throwScore
        } else {
          totalScorePlayers[playerName] += throwScore
        }
      });
    });
    for (const playerName of Object.keys(totalScorePlayers)) {
      const playerScore = totalScorePlayers[playerName];
    
      if (playerScore < 0 || playerScore === DEAD_END_VALUE || (playerScore === GAME_501_WIN_VALUE && throwValue ???)) {
        totalScorePlayers[playerName] = lastValue!;
      }
    }
    this.selectedMode === '501'? this.checkWinnerWhenLimitOfThrows(totalScorePlayers): console.log(1);
    this.gameHistory.push(totalScorePlayers);
  }



  private checkWinnerWhenLimitOfThrows(totalScorePlayers: GameHistory) {
      if (
        this.gameHistory.length === FIRST_LIMIT_OF_MOVES_TO_CHECK_WINNER ||
        this.gameHistory.length === SECOND_LIMIT_OF_MOVES_TO_CHECK_WINNER
      ) {
        let winner: string | null = null;
        let minScore: number = Number.MAX_VALUE;

        for (const playerName of Object.keys(totalScorePlayers)) {
          const playerScore = totalScorePlayers[playerName];

          if (playerScore < minScore) {
            minScore = playerScore;
            winner = playerName;
          } else if (playerScore === minScore) {
            winner = null;
          }
        }

        if (winner) {
          this.setWinner(winner);
        } else if (
          this.gameHistory.length === SECOND_LIMIT_OF_MOVES_TO_CHECK_WINNER &&
          !winner
        ) {
          this.setWinner('DRAW!');
        }
      }
  }

  public selectMode(mode: string | null) {
    this.selectedMode = mode;
    if (mode) {
      if (mode === '501') {
        this.startedScore = GAME_501_START_VALUE;
      } else {
        this.startedScore = GAME_301_START_VALUE;
      }
    }
  }

  public restartGame() {
    this.gameHistory = [];
    this.winner = null;
  }

  public setWinner(player: string | null) {
    this.winner = player;
  }
}
