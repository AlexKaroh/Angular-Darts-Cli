import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/services/players.service';
import {Router} from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { GameService } from 'src/services/game.service';

@Component({
  selector: 'app-GameOptions',
  templateUrl: './GameOptions.component.html',
  styleUrls: ['./GameOptions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameOptionsComponent implements OnInit {
  findControl?: FormControl;

  constructor( public playersService: PlayerService, public gameService: GameService, private router: Router ) { }

  ngOnInit() {
    this.findControl = new FormControl('');
    this.findControl.valueChanges.pipe(
      debounceTime(300)
    ).subscribe((searchVal) => this.playersService.sortPlayersDataByName(searchVal))
  }

  redirectTo(route : string) {
    this.router.navigate([`/${route}`])
  }
}
