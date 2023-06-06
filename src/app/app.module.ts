import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/app.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { GameComponent } from './components/game/game.component';
import { LogoComponent } from './components/logo/logo.component';
import { GameOptionsComponent } from './components/game-options/game-options.component';
import { StepCounterPipe } from 'src/pipes/step-counter.pipe';
import { PopupComponent } from './components/popup/popup.component';

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
