import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { PlayerService } from 'src/services/players.service';

const MAX_NAME_LENGTH = 20;

@Component({
  selector: 'app-addplayer',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPlayerComponent {
  playerDataControl: FormGroup = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.maxLength(MAX_NAME_LENGTH),
        this.validateDuplicates(),
      ],
    ],
    email: ['', [Validators.email]],
  });

  constructor(private fb: FormBuilder, private playersService: PlayerService) {}

  addPlayer() {
    if (this.playerDataControl.invalid) {
      this.playerDataControl.markAllAsTouched();
      return;
    } else {
      const newPlayers = Array.from(this.players);
      newPlayers.push({
        name: this.playerDataControl.get('name')?.value,
        email: this.playerDataControl.get('email')?.value,
      });
      this.players = newPlayers;
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
      } else if (control.errors['duplicate']) {
        return 'This player name is already taken';
      } else {
        return 'Maximum length exceeded';
      }
    }
    return '';
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.playerDataControl.controls[controlName];
    return control.invalid && control.touched;
  }

  private validateDuplicates(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (this.players.some((el) => el.name === value)) {
        return { duplicate: 'This player name is already taken' };
      }
      return null;
    };
  }

  get players() {
    return this.playersService.playersData.getValue();
  }

  set players(vlaue) {
    this.playersService.playersData.next(vlaue);
  }
}
