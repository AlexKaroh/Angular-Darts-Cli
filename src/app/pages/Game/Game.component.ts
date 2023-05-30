import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GameService } from 'src/services/game.service';
import { PlayerService } from 'src/services/players.service';
import { RouterService } from 'src/services/router.service';

enum ThrowNumber {
  FIRST = 1,
  SECOND,
  THRIRD,
}

type ThrowNumberType = typeof ThrowNumber[keyof typeof ThrowNumber];

@Component({
  selector: 'app-game',
  templateUrl: './Game.component.html',
  styleUrls: ['./Game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit {
  scoreControl?: FormGroup;
  throwsNumber: ThrowNumberType[] = [ThrowNumber.FIRST, ThrowNumber.SECOND, ThrowNumber.THRIRD];
  possibleMultiplies = [1, 2, 3];
  multiplyValues: { [key : string]: number } = {};

  constructor( public playersService: PlayerService, public gameService: GameService, public routerService: RouterService, private fb: FormBuilder ) { }

  ngOnInit() {
    this.initForm();
  }

  setMultiply(playerName: string, multiplyIndex: number, throwIndex: number) {
    this.multiplyValues[playerName + throwIndex] = this.possibleMultiplies[multiplyIndex];
  }

  makeStep() {
    const playersData = this.playersService.PlayersData;
    const gameHistory = this.gameService.gameHistory;
    const stepPoints: { [key: string]: number } = {};
  
    for (const player of playersData) {
      let totalScore = 0;
  
      for (let i = 0; i < this.throwsNumber.length; i++) {
        const throwValue = this.scoreControl?.value[`${player.name}${i}`] || 0;
        const multiplyValue = this.multiplyValues[`${player.name}${i}`] || 1;
        totalScore += throwValue * multiplyValue;
      }
  
      stepPoints[player.name] = totalScore;
    }

    gameHistory.push(stepPoints);

    this.gameService.gameHistory = gameHistory;

    console.log(this.gameService.gameHistory);
  }

  private initForm() {
    const formGroupConfig: { [key: string]: string[] } = {};
    const playersData = this.playersService.PlayersData;

    for (const player of playersData) {
      for (let i = 0; i < this.throwsNumber.length; i++) {
        formGroupConfig[`${player.name}${i}`] = [''];
      }
    
    this.scoreControl = this.fb.group(formGroupConfig);
    }
 }
}
