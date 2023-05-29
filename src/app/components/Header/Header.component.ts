import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent {
  links = [
    { name: 'Add player', routerLink: '/addplayer' },
    { name: 'Options', routerLink: '/options' },
    { name: 'Game', routerLink: '/game' }
  ];
}
