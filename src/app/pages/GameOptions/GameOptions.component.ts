import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/services/players.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { GameService } from 'src/services/game.service';
import { RouterService } from 'src/services/router.service';

@Component({
  selector: 'app-GameOptions',
  templateUrl: './GameOptions.component.html',
  styleUrls: ['./GameOptions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameOptionsComponent implements OnInit {
  findControl?: FormControl;

  constructor( public playersService: PlayerService, public gameService: GameService, public routerService: RouterService ) { }

  ngOnInit() {
    this.findControl = new FormControl('');
    this.findControl.valueChanges.pipe(
      debounceTime(300)
    ).subscribe((searchVal) => this.playersService.sortPlayersByName(searchVal))
  }
}
