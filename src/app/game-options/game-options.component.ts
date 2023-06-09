import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { PlayerService } from 'src/services/players.service';

@Component({
  selector: 'app-game-options',
  templateUrl: './game-options.component.html',
  styleUrls: ['./game-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameOptionsComponent {
  selectedMode: string | null = null;
  gameModes = ['501', '301'];
  errorMessage: string = '';

  constructor(private playersService: PlayerService) {
    this.setErrorMessage().subscribe((errorMessage) => {
      this.errorMessage = errorMessage;
    });
  }

  setErrorMessage() {
    return this.players$.pipe(
      map((players) => {
        return players.length < 2 ? '* Add at least two players to start game' : '';
      })
    );
  }

  get players$() {
    return this.playersService.players$;
  }

  public removePlayer(index: number) {
    this.playersService.removePlayer(index);
  }
}
