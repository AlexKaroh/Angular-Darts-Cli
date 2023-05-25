import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

const MAX_NAME_LENGTH = 20;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular-Darts';
  playerDataControl?: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.playerDataControl = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(MAX_NAME_LENGTH)]],
      email: ['', [Validators.email]]
    });
  }

  isControlInvalid(controlName: string): string {
    const control = this.playerDataControl!.controls[controlName];
    const status = control.invalid && control.touched;
    const result = status ? 'invalid' : '';
    return result;
  }

  addPlayer() {
    console.log('Click ', this.playerDataControl?.status);
  }

}
