import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlayerService } from 'src/services/players.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-GameOptions',
  templateUrl: './GameOptions.component.html',
  styleUrls: ['./GameOptions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameOptionsComponent {

  constructor(public playersService: PlayerService , private router: Router) { }

  redirectTo(route : string) {
    this.router.navigate([`/${route}`])
  }

}
