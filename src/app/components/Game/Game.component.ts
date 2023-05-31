import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Mupltiplicator } from 'src/enums/Mupltiplicator.enum';
import { ThrowNumber } from 'src/enums/ThrowNumber.enum';
import { GameService } from 'src/services/game.service';
import { PlayerService } from 'src/services/players.service';
import { RouterService } from 'src/services/router.service';
import { mupltiplicatorType } from 'src/types/mupltiplicator.type';
import { ThrowNumberType } from 'src/types/ThrowNumber.type';

@Component({
  selector: 'app-game',
  templateUrl: './Game.component.html',
  styleUrls: ['./Game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit {
  scoreControl?: FormGroup;
  throwsNumber: ThrowNumberType[] = [ThrowNumber.FIRST, ThrowNumber.SECOND, ThrowNumber.THRIRD];
  possibleMultiplies: mupltiplicatorType[] = [Mupltiplicator.X1, Mupltiplicator.X2, Mupltiplicator.X3];
  multiplyValues: { [key : string]: number } = {};

  constructor( public playersService: PlayerService, public gameService: GameService, public routerService: RouterService, private fb: FormBuilder ) { }

  ngOnInit() {
    this.initForm();
    this.gameService.setGameMode();
    this.setMultiplyByDefaultValue();
  }

  setMultiply(playerName: string, multiplyIndex: number, throwIndex: number) {
    this.multiplyValues[`${playerName}${throwIndex}`] = this.possibleMultiplies[multiplyIndex];
  }

  setMultiplyByDefaultValue() {
    for (const player of this.playersService.PlayersData) {
      for (let i = 0; i < this.throwsNumber.length; i++) {
        this.multiplyValues[`${player.name}${i}`] = Mupltiplicator.X1;
      }
    }
  }

  getPoints() {
    const playersData = this.playersService.PlayersData;
    const gameHistory = this.gameService.gameHistory;
    const stepPoints: { [key: string]: number } = {};
  
    for (const player of playersData) {
      let totalThrowScore = 0;
      const playerScore = this.gameService.playersScore[player.name];

      for (let i = 0; i < this.throwsNumber.length; i++) {
        const throwValue = this.scoreControl?.value[`${player.name}${i}`] || 0;
        const multiplyValue = this.multiplyValues[`${player.name}${i}`];
        totalThrowScore += throwValue * multiplyValue;
        this.gameService.makeStep(playerScore, totalThrowScore, stepPoints, player, multiplyValue);
        this.multiplyValues[`${player.name}${i}`] = Mupltiplicator.X1;
      }
    }
  
    gameHistory.push(stepPoints);
    this.gameService.gameHistory = gameHistory;
    this.gameService.checkWinner();
    this.scoreControl?.reset();
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
