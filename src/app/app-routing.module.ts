import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPlayerComponent } from './pages/AddPlayer/AddPlayer.component';
import { GameComponent } from './pages/Game/Game.component';
import { GameOptionsComponent } from './pages/GameOptions/GameOptions.component';

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
