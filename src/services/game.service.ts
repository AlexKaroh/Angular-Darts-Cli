import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameHistory } from 'src/interfaces/game-history';
import { IPlayersData } from 'src/interfaces/players-data';
import { PlayerService } from './players.service';
import { GamemodeType } from 'src/types/game-mode.type';
import { GameMode } from 'src/enums/game-mode';
import { Mupltiplicator } from 'src/enums/mupltiplicator';

const GAME_301_START_VALUE = 0;
const GAME_301_WIN_VALUE = 301;

const GAME_501_START_VALUE = 501;
const GAME_501_WIN_VALUE = 0;

const DEAD_END_VALUE = 1;
const FIRST_COUNT_OF_MOVES_TO_CHECK_WINNER = 20;
const SECOND_COUNT_OF_MOVES_TO_CHECK_WINNER = 30;

@Injectable({
  providedIn: 'root'
})
export class GameService {
  gameHistory$ = new BehaviorSubject<GameHistory[]>([]);
  gameMode: GamemodeType[] = [GameMode.FIRST, GameMode.SECOND];
  selectedMode: number | null = null;
  playersScore: { [key: string]: number } = {};
  startedScore?: number;
  winner?: string | null;
  
  constructor( private playersService: PlayerService ) { }

  get gameHistory() {
    return this.gameHistory$.getValue()
  }

  set gameHistory(vlaue) {
    this.gameHistory$.next(vlaue);
  }

  setWinner(player: string | null) {
    this.winner = player;
  }

  selectMode(mode: GamemodeType){
    this.gameHistory = [];
    this.winner = undefined;

    if (mode === GameMode.FIRST) {
      this.selectedMode = GameMode.FIRST;
      this.startedScore = GAME_501_START_VALUE;
    } else {
      this.selectedMode = GameMode.SECOND;
      this.startedScore = GAME_301_START_VALUE;
    }

    for (const player of this.playersService.PlayersData) {
      this.playersScore[player.name] = this.startedScore;
    }
  }

  makeStep(playerScore: number, totalThrowScore: number, stepPoints: {[key: string]: number},player: IPlayersData, multiplyValue: number) {
    if (this.selectedMode === GameMode.FIRST) {
      if (playerScore < totalThrowScore || playerScore - totalThrowScore === DEAD_END_VALUE || playerScore - totalThrowScore === GAME_501_WIN_VALUE && multiplyValue !== Mupltiplicator.X2) {
        stepPoints[player.name] = this.playersScore[player.name];
        this.playersScore[player.name] = stepPoints[player.name];
      } else {
        stepPoints[player.name] = playerScore - totalThrowScore;
        this.playersScore[player.name] = stepPoints[player.name];

        if (stepPoints[player.name] === GAME_501_WIN_VALUE) {
          this.setWinner(player.name);
        }
      }
    } else {
          if ((playerScore + totalThrowScore) > GAME_301_WIN_VALUE) {
          stepPoints[player.name] = this.playersScore[player.name];
          this.playersScore[player.name] = stepPoints[player.name];
          } else if (playerScore > GAME_301_START_VALUE && (Object.values(stepPoints)).some(score => score === playerScore + totalThrowScore)) {
            stepPoints[player.name] = GAME_301_START_VALUE;
            this.playersScore[player.name] = stepPoints[player.name];
          } else {
            stepPoints[player.name] = playerScore + totalThrowScore;
            this.playersScore[player.name] = stepPoints[player.name];
            if (stepPoints[player.name] === GAME_301_WIN_VALUE) {
              this.setWinner(player.name);
            } 
          }
      }
  }


  checkWinner() {
    if (this.gameHistory.length === FIRST_COUNT_OF_MOVES_TO_CHECK_WINNER || this.gameHistory.length === SECOND_COUNT_OF_MOVES_TO_CHECK_WINNER) {
      let winner: IPlayersData | null = null;
      let minScore = Number.MAX_VALUE;
    
      for (const player of this.playersService.PlayersData) {
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
      } else if (this.gameHistory.length === SECOND_COUNT_OF_MOVES_TO_CHECK_WINNER && !winner) {
        this.setWinner('DRAW!');
      }
    }
  }
}