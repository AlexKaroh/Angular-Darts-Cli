import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPlayerComponent } from './add-player/add-player.component';
import { GameComponent } from './game/game.component';
import { GameOptionsComponent } from './game-options/game-options.component';
import { gameGuard } from 'src/guards/game.guard';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { playersResolver } from 'src/resolvers/players.resolver';

const routes: Routes = [
  { path: 'addplayer', component: AddPlayerComponent },
  {
    path: 'game/:type',
    component: GameComponent,
    canActivate: [gameGuard],
    resolve: { players: playersResolver },
  },
  { path: 'options', component: GameOptionsComponent },
  { path: 'error', component: ErrorMessageComponent },
  { path: '', redirectTo: '/options', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
