  import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
  import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
  } from '@angular/forms';
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
    scoreForm: any = this.fb.group([] as FormGroup[]);

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

    constructor(
      private playersService: PlayerService,
      private gameService: GameService,
      private fb: FormBuilder
    ) {}

    ngOnInit() {
      this.initForm();
      this.gameService.gameHistory = [];
      this.gameService.winner = null;
    }

    private initForm() {
      for (const player of this.players) {
        const playerFormArray = this.fb.array([] as FormGroup[]);

        for (let i = 0; i < this.throwsNumber.length; i++) {
          const pointsControl = this.fb.control('', [
            Validators.required,
            Validators.pattern('^[0-9]*$'),
          ]);
          const multiplyControl = this.fb.control('', Validators.required);

          const throwFormGroup = this.fb.group({
            points: pointsControl,
            multiply: multiplyControl,
          });

          playerFormArray.push(throwFormGroup);
        }

        this.scoreForm.addControl(player.name, playerFormArray);
      }
    }

    getPoints() {
      // if (this.scoreForm.invalid) {
      //   this.scoreForm.markAllAsTouched();
      //   return;
      // } else {
        const stepPoints: { [key: string]: number } = {};
        for(const player of this.players) {
          let playerTotalScore = 0;
          for (let i = 0; i < this.throwsNumber.length; i++) {
            const playerMultipy = ((this.scoreForm.controls[player.name] as FormGroup).controls[i]as FormGroup).controls['multiply'].value;
            const playerScore = ((this.scoreForm.controls[player.name]as FormGroup).controls[i] as FormGroup).controls['points'].value;
            playerTotalScore += playerMultipy * playerScore;
            this.gameService.makeMove(playerMultipy, playerTotalScore, player, stepPoints)
          }
        }
        this.gameService.playersScore = stepPoints;
        this.gameHistory.push(stepPoints);
        this.scoreForm.reset();
      // }
    }

    isFormValid(playerName: string, throwIndex: number, controlName: string) {
      const control =
        this.scoreForm.controls[playerName].controls[throwIndex].controls[controlName];
      return control.invalid && control.touched;
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
