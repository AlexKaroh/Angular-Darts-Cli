import { ChangeDetectionStrategy, Component } from '@angular/core';
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

  constructor(private playersService: PlayerService) {}

  get players$() {
    return this.playersService.players$;
  }

  public removePlayer(index: number) {
    this.playersService.removePlayer(index);
  }
}
