import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GameMode } from 'src/enums/game-mode';
import { ThrowNumber } from 'src/enums/throw-number';
import { GameService } from 'src/services/game.service';
import { PlayerService } from 'src/services/players.service';
import { MupltiplicatorType } from 'src/types/mupltiplicator.type';
import { Mupltiplicator } from 'src/enums/mupltiplicator';
import { ThrowNumberType } from 'src/types/throw-number.type';

const MISS_SHOT = 0;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent implements OnInit {
  throwsNumber: ThrowNumberType[] = [
    ThrowNumber.FIRST,
    ThrowNumber.SECOND,
    ThrowNumber.THRIRD,
  ];
  possibleMultiplies: MupltiplicatorType[] = [
    Mupltiplicator.X1,
    Mupltiplicator.X2,
    Mupltiplicator.X3,
  ];
  scoreControl: FormGroup | any = this.fb.group({});

  constructor(
    private playersService: PlayerService,
    private gameService: GameService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    for (const player of this.players) {
      const playerFormArray = this.fb.array([]);

      for (let i = 0; i < this.throwsNumber.length; i++) {
        const pointsControl = this.fb.control('', [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
        ]);
        const multiplyControl = this.fb.control('', Validators.required);

        const throwFormGroup: any = this.fb.group({
          points: pointsControl,
          multiply: multiplyControl,
        });

        playerFormArray.push(throwFormGroup);
      }

      this.scoreControl.addControl(player.name, playerFormArray);
    }
  }

  getPoints() {
    console.log(this.scoreControl.value);
  }

  get players() {
    return this.playersService.playersData.getValue();
  }

  set players(vlaue) {
    this.playersService.playersData.next(vlaue);
  }

  get gameHistory() {
    return this.gameService.playersMoves.getValue();
  }

  set gameHistory(vlaue) {
    this.gameService.playersMoves.next(vlaue);
  }

  get winner() {
    return this.gameService.winner;
  }

  get startedScore() {
    return this.gameService.startedScore;
  }
}
