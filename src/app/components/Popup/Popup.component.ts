import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameService } from 'src/services/game.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupComponent {

  constructor( private gameService: GameService) { }

  get winner() {
    return this.gameService.winner;
  }

  // TODO: MAKE THIS COMPONENT DUMB
}
