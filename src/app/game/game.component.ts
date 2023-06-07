import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThrowNumber } from 'src/enums/throw-number';
import { GameService } from 'src/services/game.service';
import { PlayerService } from 'src/services/players.service';
import { MupltiplicatorType } from 'src/types/mupltiplicator.type';
import { Mupltiplicator } from 'src/enums/mupltiplicator';
import { ThrowNumberType } from 'src/types/throw-number.type';
import { PlayerMove } from 'src/interfaces/player-move';
import { Player } from 'src/interfaces/players-data';
import { PlayerThrow } from 'src/interfaces/player-throw';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  constructor(
    private playersService: PlayerService,
    private gameService: GameService,
    private fb: FormBuilder
  ) {}

  get players$() {
    return this.playersService.players$;
  }

  get gameHistory$() {
    return this.gameService.gameHistory$;
  }

  get winner() {
    return this.gameService.winner;
  }

  get selectedMode() {
    return this.gameService.selectedMode;
  }

  get startedScore() {
    return this.gameService.startedScore;
  }

  ngOnInit() {
    this.gameService.restartGame();
    this.initForm();
  }

  private initForm() {
    this.playersService.players$.subscribe((players: Player[]) => {
      for (const player of players) {
        const playerFormArray = this.fb.array([] as FormGroup[]);
        for (let i = 0; i < this.throwsNumber.length; i++) {
          const throwFormGroup = this.fb.group({
            points: this.fb.control('', [
              Validators.required,
              Validators.pattern('^[0-9]*$'),
            ]),
            multiply: this.fb.control('', Validators.required),
          });
          playerFormArray.push(throwFormGroup);
        }
        this.scoreForm.addControl(player.name, playerFormArray);
      }
    });
  }

  public makeMove() {
    // if (this.scoreForm.invalid) {
    //   this.scoreForm.markAllAsTouched();
    //   return;
    // }
    const moves: PlayerMove[] = [];
    for (let [playerName, formValue] of Object.entries(this.scoreForm.value)) {
      moves.push({ name: playerName, throw: formValue as PlayerThrow[] });
    }
    this.gameService.makeMove(moves);
    this.scoreForm.reset();
  }
}
