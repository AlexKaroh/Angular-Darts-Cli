import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlayerService } from 'src/services/players.service';
import { take } from 'rxjs/operators';
import { GameService } from 'src/services/game.service';

@Component({
  selector: 'app-game-options',
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

  public removePlayer(index: number) {
    this.playersService.removePlayer(index);
  }
}
