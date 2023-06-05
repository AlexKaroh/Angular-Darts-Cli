import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameHistory } from 'src/interfaces/game-history';
import { IPlayersData } from 'src/interfaces/players-data';
import { PlayerService } from './players.service';
import { ThrowNumberType } from 'src/types/throw-number.type';
import { FormGroup } from '@angular/forms';
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
  playersScore: { [key: string]: number } = {};
  startedScore?: number;
  winner!: string | null;

  constructor(private playersService: PlayerService) { }

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
    player: IPlayersData,
    stepPoints: any
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
      } else if (
        playerScore > GAME_301_START_VALUE &&
        Object.values(stepPoints).some(
          (score) => score === playerScore + throwScore
        )
      ) {
        stepPoints[player.name] = GAME_301_START_VALUE;
      } else {
        stepPoints[player.name] = playerScore + throwScore;
        if (stepPoints[player.name] === GAME_301_WIN_VALUE) {
          this.setWinner(player.name);
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
