import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlayerService } from 'src/services/players.service';
import { FormControl } from '@angular/forms';
import { GameService } from 'src/services/game.service';

@Component({
  selector: 'app-gameoptions',
  templateUrl: './game-options.component.html',
  styleUrls: ['./game-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameOptionsComponent {
  findControl = new FormControl('');

  constructor(
    private playersService: PlayerService,
    private gameService: GameService
  ) {
    this.selectedMode = null;
  }

  removePlayer(index: number) {
    const updatedArr = Array.from(this.players);
    updatedArr.splice(index, 1);
    this.players = updatedArr;
  }

  get players() {
    return this.playersService.playersData.getValue();
  }

  set players(vlaue) {
    this.playersService.playersData.next(vlaue);
  }

  get gameHistory() {
    return this.gameService.playersMoves.getValue();
  }

  set gameHistory(vlaue) {
    this.gameService.playersMoves.next(vlaue);
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
}
