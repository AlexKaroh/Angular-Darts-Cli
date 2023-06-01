import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/Header/app.component';
import { AddPlayerComponent } from './components/AddPlayer/add-player.component';
import { GameComponent } from './components/Game/game.component.';
import { LogoComponent } from './components/Logo/logo.component';
import { GameOptionsComponent } from './components/GameOptions/game-options.component';
import { StepCounterPipe } from 'src/pipes/step-counter.pipe';
import { PopupComponent } from './components/Popup/popup.component';

@NgModule({
  declarations: [
    StepCounterPipe,
    PopupComponent,
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
