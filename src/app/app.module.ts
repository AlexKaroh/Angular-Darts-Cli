import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/Header/Header.component';
import { AddPlayerComponent } from './components/AddPlayer/AddPlayer.component';
import { GameComponent } from './components/Game/Game.component';
import { LogoComponent } from './components/Logo/Logo.component';
import { GameOptionsComponent } from './components/GameOptions/GameOptions.component';
import { StepCounterPipe } from 'src/pipes/stepCounter.pipe';
import { PopupComponent } from './components/Popup/Popup.component';

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
