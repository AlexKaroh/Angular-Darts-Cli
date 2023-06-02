import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GameMode } from 'src/enums/game-mode';
import { ThrowNumber } from 'src/enums/throw-number';
import { GameService } from 'src/services/game.service';
import { PlayerService } from 'src/services/players.service';
import { RouterService } from 'src/services/router.service';
import { MupltiplicatorType } from 'src/types/mupltiplicator.type';
import { Mupltiplicator } from 'src/enums/mupltiplicator';
import { ThrowNumberType } from 'src/types/throw-number.type';

const MISS_SHOT = 0;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit {
  scoreControl?: FormGroup;
  throwsNumber: ThrowNumberType[] = [ThrowNumber.FIRST, ThrowNumber.SECOND, ThrowNumber.THRIRD];
  possibleMultiplies: MupltiplicatorType[] = [Mupltiplicator.X1, Mupltiplicator.X2, Mupltiplicator.X3];
  multiplyValues: { [key : string]: number } = {};

  constructor( private playersService: PlayerService, public gameService: GameService, public routerService: RouterService, private fb: FormBuilder ) { }

  ngOnInit() {
    this.initForm();
    this.setMultiplyByDefaultValue();
  }

  get players() {
    return this.playersService.playersData.getValue();
  }

  set players(vlaue) {
    this.playersService.playersData.next(vlaue);
  }

  get gameHistory() {
    return this.gameService.playersMoves.getValue()
  }

  set gameHistory(vlaue) {
    this.gameService.playersMoves.next(vlaue);
  }

  setMultiply(playerName: string, multiplyIndex: number, throwIndex: number) {
    this.multiplyValues[`${playerName}${throwIndex}`] = this.possibleMultiplies[multiplyIndex];
  }

  setMultiplyByDefaultValue() {
    for (const player of this.players) {
      for (let i = 0; i < this.throwsNumber.length; i++) {
        this.multiplyValues[`${player.name}${i}`] = Mupltiplicator.X1;
      }
    }
  }

  getPoints() {
    const playersData = this.players;
    const gameHistory = this.gameService.gameHistory;
    const stepPoints: { [key: string]: number } = {};
    for (const player of playersData) {
      let totalThrowScore = 0;
      const playerScore = this.gameService.playersScore[player.name];
      for (let i = 0; i < this.throwsNumber.length; i++) {
        const throwValue = this.scoreControl?.value[`${player.name}${i}`] || MISS_SHOT;
        const multiplyValue = this.multiplyValues[`${player.name}${i}`];
        totalThrowScore += throwValue * multiplyValue;
        this.gameService.makeStep(playerScore, totalThrowScore, stepPoints, player, multiplyValue);
        this.multiplyValues[`${player.name}${i}`] = Mupltiplicator.X1;
      }
    }
    gameHistory.push(stepPoints);
    this.gameService.gameHistory = gameHistory;
    if (this.gameService.selectedMode === GameMode.FIRST) {
      this.gameService.checkWinner();
    }
   
    this.scoreControl?.reset();
  }

  private initForm() {
    const formGroupConfig: { [key: string]: string[] } = {};
    const playersData = this.players;

    for (const player of playersData) {
      for (let i = 0; i < this.throwsNumber.length; i++) {
        formGroupConfig[`${player.name}${i}`] = [''];
      }
    
    this.scoreControl = this.fb.group(formGroupConfig);
    }
 }
}
