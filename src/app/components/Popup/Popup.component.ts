import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/services/game.service';
import { RouterService } from 'src/services/router.service';

@Component({
  selector: 'app-Popup',
  templateUrl: './Popup.component.html',
  styleUrls: ['./Popup.component.scss']
})
export class PopupComponent implements OnInit {

  constructor( public gameService: GameService, public routerService: RouterService ) { }

  ngOnInit() {
  }

}
