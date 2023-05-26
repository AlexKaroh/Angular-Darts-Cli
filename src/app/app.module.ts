import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/Header/header.component';
import { AddPlayerComponent } from './pages/AddPlayer/AddPlayer.component';
import { GameComponent } from './pages/Game/Game.component';
import { LogoComponent } from './components/Logo/logo.component';
import { GameOptionsComponent } from './pages/GameOptions/GameOptions.component';

@NgModule({
  declarations: [
    GameOptionsComponent,
    HeaderComponent,
    AddPlayerComponent,
    GameComponent,
    LogoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [HeaderComponent]
})
export class AppModule { }
