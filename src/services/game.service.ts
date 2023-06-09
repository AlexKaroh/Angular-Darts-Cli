import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Mupltiplicator } from 'src/enums/mupltiplicator';
import { GameHistory } from 'src/interfaces/game-history';
import { PlayerMove } from 'src/interfaces/player-move';
import { Player } from 'src/interfaces/players-data';

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
  winners: string[] = [];
  isDraw = false;
  selectedMode: string;
  startedScore: number | null = null;

  constructor(private route: ActivatedRoute) {
    this.selectedMode = this.route.snapshot.params['type'];
    this.setStartedValues(this.selectedMode);
  }

  get players(): Player[] {
    return this.route.snapshot.data['players'];
  }

  get gameHistory$() {
    return this.playersMoves.asObservable();
  }

  get gameHistory() {
    return this.playersMoves.getValue();
  }

  public makeMove(moves: PlayerMove[]) {
    const totalScorePlayers: GameHistory = {};
    const isGameMode501 = this.selectedMode === '501';

    moves.forEach((playerMove) => {
      const playerName = playerMove.name;
      let throwScore = START_THROW_VALUE;
      let lastMultipy: number | null = null;

      totalScorePlayers[playerName] =
        this.gameHistory.length > GAME_HISTORY_STARTED_VALUE
          ? this.gameHistory.at(-1)![playerName]
          : (this.startedScore as number);

      playerMove.throw.forEach((throwValue) => {
        throwScore = throwValue.points * throwValue.multiply;
        if (isGameMode501 && throwScore !== START_THROW_VALUE) {
          totalScorePlayers[playerName] -= throwScore;
          lastMultipy = throwValue.multiply;
        } else {
          totalScorePlayers[playerName] += throwScore;
        }
      });
      if (isGameMode501) {
        this.holdScoreIfDirtWin(totalScorePlayers, playerName, lastMultipy);
      }
    });
    this.holdScoreIfOverThrow(totalScorePlayers);
    isGameMode501
      ? this.checkWinnerWhenLimitOfThrows(totalScorePlayers)
      : this.zeroScoreIfDuplicateThrow(totalScorePlayers);
    this.gameHistory.push(totalScorePlayers);
    this.checkWinner(totalScorePlayers);
  }

  private holdScoreIfDirtWin(
    totalScorePlayers: GameHistory,
    playerName: string,
    lastMultipy: number | null
  ) {
    if (
      totalScorePlayers[playerName] === GAME_501_WIN_VALUE &&
      lastMultipy !== Mupltiplicator.X2
    ) {
      totalScorePlayers[playerName] = this.gameHistory.at(-1)![playerName];
    }
  }

  private holdScoreIfOverThrow(totalScorePlayers: GameHistory) {
    for (const playerName of Object.keys(totalScorePlayers)) {
      const playerScore = totalScorePlayers[playerName];
      const isOverThrow =
        this.selectedMode === '501'
          ? playerScore < GAME_501_WIN_VALUE || playerScore === DEAD_END_VALUE
          : playerScore > GAME_301_WIN_VALUE;
      if (isOverThrow) {
        totalScorePlayers[playerName] = this.gameHistory.at(-1)![playerName];
      }
    }
  }

  private zeroScoreIfDuplicateThrow(totalScorePlayers: GameHistory) {
    for (const playerName of Object.keys(totalScorePlayers)) {
      const playerScore = totalScorePlayers[playerName];
      for (const opponentName of Object.keys(totalScorePlayers)) {
        const opponentScore = totalScorePlayers[opponentName];
        if (playerScore === opponentScore && opponentName !== playerName) {
          totalScorePlayers[opponentName] = GAME_301_START_VALUE;
        }
      }
    }
  }

  private checkWinner(totalScorePlayers: GameHistory) {
    const winValue =
      this.selectedMode === '501' ? GAME_501_WIN_VALUE : GAME_301_WIN_VALUE;
    for (const playerName of Object.keys(totalScorePlayers)) {
      if (totalScorePlayers[playerName] === winValue) {
        this.winners.push(playerName);
      }
    }
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
        this.winners.push(winner);
      } else if (
        this.gameHistory.length === SECOND_LIMIT_OF_MOVES_TO_CHECK_WINNER &&
        !winner
      ) {
        this.isDraw = true;
      }
    }
  }

  private setStartedValues(mode: string) {
    this.startedScore =
      mode === '501' ? GAME_501_START_VALUE : GAME_301_START_VALUE;
  }
}
