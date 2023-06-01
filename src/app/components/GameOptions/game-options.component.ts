import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/services/players.service';
import { FormControl } from '@angular/forms';
import { GameService } from 'src/services/game.service';
import { RouterService } from 'src/services/router.service';

@Component({
  selector: 'app-gameoptions',
  templateUrl: './game-options.component.html',
  styleUrls: ['./game-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameOptionsComponent implements OnInit {
  findControl?: FormControl;

  constructor( private playersService: PlayerService, public gameService: GameService, public routerService: RouterService ) { }

  get playersData() {
    return this.playersService.players;
  }

  set playersData(vlaue) {
    this.playersService.players = vlaue;
  }

  removePlayer(index: number) {
    const updatedArr = Array.from(this.playersData);
    updatedArr.splice(index, 1);
    this.playersData = updatedArr;
  }

  ngOnInit() {
    this.gameService.selectedMode = null;
    this.findControl = new FormControl('');
  }
}
