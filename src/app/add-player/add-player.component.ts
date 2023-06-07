import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Player } from 'src/interfaces/players-data';
import { PlayerService } from 'src/services/players.service';

const MAX_NAME_LENGTH = 20;

@Component({
  selector: 'app-addplayer',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPlayerComponent {
  playerDataForm: FormGroup = this.fb.group({
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

  get players$() {
    return this.playersService.players$;
  }

  addPlayer() {
    if (this.playerDataForm.invalid) {
      this.playerDataForm.markAllAsTouched();
      return;
    } else {
      const name = this.playerDataForm.get('name')?.value;
      const email = this.playerDataForm.get('email')?.value;
      const newPlayer: Player = { name, email };

      this.playersService.addPlayer(newPlayer);
      this.playerDataForm.reset();
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.playerDataForm.controls[controlName];
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

  private validateDuplicates(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.playersService.hasPlayer(control.value)) {
        return { duplicate: 'This player name is already taken' };
      }
      return null;
    };
  }
}
