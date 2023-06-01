import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameService } from 'src/services/game.service';
import { RouterService } from 'src/services/router.service';

@Component({
  selector: 'app-Popup',
  templateUrl: './Popup.component.html',
  styleUrls: ['./Popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupComponent {

  constructor( public gameService: GameService, public routerService: RouterService ) { }

}
