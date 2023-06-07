import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  links = [
    { name: 'Add player', routerLink: '/addplayer' },
    { name: 'Options', routerLink: '/options' },
  ];
}
