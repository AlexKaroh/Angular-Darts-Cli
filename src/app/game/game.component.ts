import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThrowNumber } from 'src/enums/throw-number';
import { GameService } from 'src/services/game.service';
import { MupltiplicatorType } from 'src/types/mupltiplicator.type';
import { Mupltiplicator } from 'src/enums/mupltiplicator';
import { ThrowNumberType } from 'src/types/throw-number.type';
import { PlayerMove } from 'src/interfaces/player-move';
import { PlayerThrow } from 'src/interfaces/player-throw';

const MAX_POSSIBLE_SCORE = 50;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GameService],
})
export class GameComponent implements OnInit {
  scoreForm: any = this.fb.group({} as FormGroup);

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

  constructor(private gameService: GameService, private fb: FormBuilder) {}

  get players() {
    return this.gameService.players;
  }

  get gameHistory$() {
    return this.gameService.gameHistory$;
  }

  get winners() {
    return this.gameService.winners;
  }

  get isDraw() {
    return this.gameService.isDraw;
  }

  get selectedMode() {
    return this.gameService.selectedMode;
  }

  get startedScore() {
    return this.gameService.startedScore;
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    for (const player of this.players) {
      const playerFormArray = this.fb.array([] as FormGroup[]);
      for (let i = 0; i < this.throwsNumber.length; i++) {
        const throwFormGroup = this.fb.group({
          points: this.fb.control('', [
            Validators.required,
            Validators.pattern('^[0-9]*$'),
            Validators.max(MAX_POSSIBLE_SCORE),
          ]),
          multiply: this.fb.control('', Validators.required),
        });
        playerFormArray.push(throwFormGroup);
      }
      this.scoreForm.addControl(player.name, playerFormArray);
    }
  }

  public makeMove() {
    if (this.scoreForm.invalid) {
      this.scoreForm.markAllAsTouched();
      return;
    }
    const moves: PlayerMove[] = [];
    for (let [playerName, formValue] of Object.entries(this.scoreForm.value)) {
      moves.push({ name: playerName, throw: formValue as PlayerThrow[] });
    }
    this.gameService.makeMove(moves);
    this.scoreForm.reset();
  }
}
