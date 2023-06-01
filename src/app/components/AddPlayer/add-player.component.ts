import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PlayerService } from 'src/services/players.service';

const MAX_NAME_LENGTH = 20;

type ControlType = keyof['AddPlayerComponent']['FormGroup']

@Component({
  selector: 'app-addplayer',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPlayerComponent {
  playerDataControl: ControlType = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(MAX_NAME_LENGTH)]],
    email: ['', [Validators.email]]
  });

  constructor( private fb: FormBuilder , private playersService: PlayerService) {}
  
  addPlayer() {
    if (this.playerDataControl.invalid) {
      this.playerDataControl.markAllAsTouched();
      return;
    } else {
      const currentData = this.playersService.players;
      const name = this.playerDataControl.get('name')?.value;
      const email = this.playerDataControl.get('email')?.value;
      const newData = {
        name: name,
        email: email
      };

      currentData.push(newData);
      this.playersService.players = currentData;
      this.playerDataControl.reset();
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.playerDataControl.controls[controlName];
    if (control.errors) {
      if (control.errors['required']) {
        return 'This field is required';
      } else if (control.errors['email']) {
        return 'Invalid email format';
      } else {
        return 'Maximum length exceeded';
      }
    }
    return '';
  }

  isControlInvalid(controlName: ControlType): boolean {
    const control = this.playerDataControl.controls[controlName];
    return control.invalid && control.touched;
  }
}
