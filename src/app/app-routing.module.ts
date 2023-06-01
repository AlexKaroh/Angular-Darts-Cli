import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPlayerComponent } from './components/AddPlayer/add-player.component';
import { GameComponent } from './components/Game/game.component.';
import { GameOptionsComponent } from './components/GameOptions/game-options.component';

const routes: Routes = [
  { path: 'addplayer', component: AddPlayerComponent },
  { path: 'game', component: GameComponent},
  { path: 'options', component: GameOptionsComponent},
  { path: '', redirectTo: '/options', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
