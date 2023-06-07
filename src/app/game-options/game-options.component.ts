import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlayerService } from 'src/services/players.service';
import { take } from 'rxjs/operators';
import { GameService } from 'src/services/game.service';

@Component({
  selector: 'app-gameoptions',
  templateUrl: './game-options.component.html',
  styleUrls: ['./game-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameOptionsComponent {
  constructor(
    private playersService: PlayerService,
    private gameService: GameService
  ) {
    this.selectedMode = null;
  }

  get players$() {
    return this.playersService.players$;
  }

  get selectedMode() {
    return this.gameService.selectedMode;
  }

  set selectedMode(value) {
    this.gameService.selectMode(value);
  }

  get gameModes() {
    return this.gameService.gameMode;
  }

  removePlayer(index: number) {
    this.players$.pipe(take(1)).subscribe((players) => {
      const removedArray = players.splice(index, 1);
      this.playersService.updatePlayers(removedArray);
    });
  }
}
