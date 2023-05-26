import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { IPlayersData } from 'src/interfaces/IPlayersData';
import { PlayerService } from 'src/services/players.service';

const MAX_NAME_LENGTH = 20;

@Component({
  selector: 'app-addplayer',
  templateUrl: './AddPlayer.component.html',
  styleUrls: ['./AddPlayer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPlayerComponent implements OnInit {
  playerDataControl?: FormGroup;

  constructor( private fb: FormBuilder , private playersService: PlayerService) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.playerDataControl = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(MAX_NAME_LENGTH)]],
      email: ['', [Validators.email]]
    });
  }

  addPlayer() {
    if (this.playerDataControl?.valid) {
      const currentData = this.playersService.PlayersData;
      const name = this.playerDataControl.get('name')?.value;
      const email = this.playerDataControl.get('email')?.value;
      const newData = {
        name: name,
        email: email
      };

      currentData.push(newData);
      this.playersService.PlayersData = currentData;
      this.playerDataControl.reset();
    } else {
      Object.keys(this.playerDataControl!.controls)
        .forEach(controlName => this.playerDataControl!.controls[controlName].markAsTouched());
      return;
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.playerDataControl!.controls[controlName];
    if (control.errors) {
      if (control.errors['required']) {
        return 'This field is required';
      } else if (control.errors['email']) {
        return 'Invalid email format';
      } else {
        return `Maximum length exceeded`
      }
    }
    return '';
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.playerDataControl!.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }
}
