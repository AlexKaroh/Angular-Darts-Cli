import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameService } from 'src/services/game.service';
import { RouterService } from 'src/services/router.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupComponent {

  constructor( public gameService: GameService, public routerService: RouterService ) { }

}
