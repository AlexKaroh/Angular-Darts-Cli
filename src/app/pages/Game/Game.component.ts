import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GameService } from 'src/services/game.service';
import { PlayerService } from 'src/services/players.service';

@Component({
  selector: 'app-game',
  templateUrl: './Game.component.html',
  styleUrls: ['./Game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit {

  constructor( public playersService: PlayerService, public gameService: GameService ) { }

  ngOnInit() {
  }

}
