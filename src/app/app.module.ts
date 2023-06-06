import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/app.component';
import { AddPlayerComponent } from './add-player/add-player.component';
import { GameComponent } from './game/game.component';
import { LogoComponent } from './logo/logo.component';
import { GameOptionsComponent } from './game-options/game-options.component';
import { StepCounterPipe } from 'src/pipes/step-counter.pipe';
import { PopupComponent } from './popup/popup.component';

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
