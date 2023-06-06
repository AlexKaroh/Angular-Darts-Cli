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
  playersScore: GameHistory = {};
  startedScore?: number;
  winner!: string | null;

  constructor(private playersService: PlayerService) {}

  selectMode(mode: string | null) {
    this.selectedMode = mode;
    if (mode) {
      if (mode === '501') {
        this.startedScore = GAME_501_START_VALUE;
      } else {
        this.startedScore = GAME_301_START_VALUE;
      }

      for (const player of this.players) {
        this.playersScore[player.name] = this.startedScore;
      }
    }
  }

  makeMove(
    multiply: number,
    throwScore: number,
    player: PlayersData,
    stepPoints: GameHistory
  ) {
    const playerScore = this.playersScore[player.name];

    if (this.selectedMode === '501') {
      if (
        playerScore < throwScore ||
        playerScore - throwScore === DEAD_END_VALUE ||
        (playerScore - throwScore === GAME_501_WIN_VALUE &&
          multiply !== Mupltiplicator.X2)
      ) {
        stepPoints[player.name] = playerScore;
      } else {
        stepPoints[player.name] = playerScore - throwScore;

        if (stepPoints[player.name] === GAME_501_WIN_VALUE) {
          this.setWinner(player.name);
        }
      }
    } else {
      if (playerScore + throwScore > GAME_301_WIN_VALUE) {
        stepPoints[player.name] = playerScore;
      } else {
        stepPoints[player.name] = playerScore + throwScore;
        if (stepPoints[player.name] === GAME_301_WIN_VALUE) {
          this.setWinner(player.name);
        }
      }
    }
  }

  checkWinner() {
    if (
      this.gameHistory.length === FIRST_COUNT_OF_MOVES_TO_CHECK_WINNER ||
      this.gameHistory.length === SECOND_COUNT_OF_MOVES_TO_CHECK_WINNER
    ) {
      let winner: PlayersData | null = null;
      let minScore = Number.MAX_VALUE;

      for (const player of this.players) {
        const playerScore = this.playersScore[player.name];

        if (playerScore < minScore) {
          minScore = playerScore;
          winner = player;
        } else if (playerScore === minScore) {
          winner = null;
        }
      }

      if (winner) {
        this.setWinner(winner.name);
      } else if (
        this.gameHistory.length === SECOND_COUNT_OF_MOVES_TO_CHECK_WINNER &&
        !winner
      ) {
        this.setWinner('DRAW!');
      }
    }
  }

  checkToZero(stepPoints: GameHistory) {
    for (const player of this.players) {
      const playerScore = this.playersScore[player.name];
      for (const opponent of this.players) {
        if (
          player.name !== opponent.name &&
          this.playersScore[opponent.name] === playerScore &&
          playerScore > GAME_301_START_VALUE
        ) {
          this.playersScore[player.name] = GAME_301_START_VALUE;
          stepPoints[player.name] = GAME_301_START_VALUE;
        }
      }
    }
  }

  get gameHistory() {
    return this.playersMoves.getValue();
  }

  set gameHistory(vlaue) {
    this.playersMoves.next(vlaue);
  }

  get players() {
    return this.playersService.playersData.getValue();
  }

  set players(vlaue) {
    this.playersService.playersData.next(vlaue);
  }

  setWinner(player: string | null) {
    this.winner = player;
  }
}
