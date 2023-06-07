import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Mupltiplicator } from 'src/enums/mupltiplicator';
import { GameHistory } from 'src/interfaces/game-history';
import { PlayerMove } from 'src/interfaces/player-move';

const GAME_301_START_VALUE = 0;
const GAME_301_WIN_VALUE = 301;

const GAME_501_START_VALUE = 501;
const GAME_501_WIN_VALUE = 0;

const FIRST_COUNT_OF_MOVES_TO_CHECK_WINNER = 19;
const SECOND_COUNT_OF_MOVES_TO_CHECK_WINNER = 29;

const START_THROW_VALUE = 0;
const DEAD_END_VALUE = 1;


@Injectable({
  providedIn: 'root',
})
export class GameService {
  playersMoves = new BehaviorSubject<GameHistory[]>([]);
  gameMode = ['501', '301'];
  selectedMode: string | null = null;
  winner: string | null = null;
  startedScore: number| null = null;


  constructor() {}

  get gameHistory() {
    return this.playersMoves.getValue();
  }

  set gameHistory(vlaue) {
    this.playersMoves.next(vlaue);
  }

  makeMove(moves: PlayerMove[]) {
    const totalScorePlayers: GameHistory = {};
    moves.forEach((playerMove) => {
      const playerName = playerMove.name;
      let throwScore = START_THROW_VALUE;

      if (this.gameHistory.length > 0) {
        totalScorePlayers[playerName] = this.gameHistory.at(-1)![playerName];
      } else {
        totalScorePlayers[playerName] = this.startedScore as number;
      }

      playerMove.throw.forEach((throwValue) => {
        throwScore = throwValue.points * throwValue.multiply;

        if (this.selectedMode === '501') {
          if (
            totalScorePlayers[playerName] < throwScore ||
            totalScorePlayers[playerName] - throwScore === DEAD_END_VALUE ||
            (totalScorePlayers[playerName] - throwScore ===
              GAME_501_WIN_VALUE &&
              throwValue.multiply !== Mupltiplicator.X2)
          ) {
            totalScorePlayers[playerName] = totalScorePlayers[playerName];
          } else {
            totalScorePlayers[playerName] -= throwScore;
          }
        } else {
          if (totalScorePlayers[playerName] + throwScore > GAME_301_WIN_VALUE) {
            totalScorePlayers[playerName] = totalScorePlayers[playerName];
          } else {
            totalScorePlayers[playerName] += throwScore;
          }
        }
        this.checkWinnerWhenThrow(totalScorePlayers, playerName);
      });

    });

    this.checkWinnerWhenLimitOfThrows(totalScorePlayers);
    this.gameHistory.push(totalScorePlayers);
  }

  checkWinnerWhenThrow (totalScorePlayers: GameHistory, playerName: string) {
    if (
      (totalScorePlayers[playerName] === GAME_301_WIN_VALUE &&
        this.selectedMode === '301') ||
      (totalScorePlayers[playerName] === GAME_501_WIN_VALUE &&
        this.selectedMode === '501')
    ) {
      this.setWinner(playerName);
    }
  }

  checkWinnerWhenLimitOfThrows(totalScorePlayers: GameHistory) {
    if (this.selectedMode === '501') {
      if (
        this.gameHistory.length === FIRST_COUNT_OF_MOVES_TO_CHECK_WINNER ||
        this.gameHistory.length === SECOND_COUNT_OF_MOVES_TO_CHECK_WINNER
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
          this.gameHistory.length === SECOND_COUNT_OF_MOVES_TO_CHECK_WINNER &&
          !winner
        ) {
          this.setWinner('DRAW!');
        }
      }
    }
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

  setWinner(player: string | null) {
    this.winner = player;
  }
}
