import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from "@ionic/angular";
import { addIcons } from "ionicons";
import { eyeOffOutline, eyeOutline } from "ionicons/icons";
import { AuthenticationService, IUser } from "../core/services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class RegisterPage implements OnInit {
  public registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10)]
    ),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    passwordcon: new FormControl('', [Validators.required]),
  });
  public passwordType = 'password';
  public passwordIcon = 'eye-outline';
  public passwordMismatchError: boolean = false;

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
    addIcons({eyeOutline, eyeOffOutline});
  }

  ngOnInit() {
  }

  public onToggleShowPassword(): void {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.passwordIcon = 'eye-off-outline';
    } else {
      this.passwordType = 'password';
      this.passwordIcon = 'eye-outline';
    }
  }

  public onSignUp(): void {
    const password = this.registerForm.get('password')?.value;
    const passwordcon = this.registerForm.get('passwordcon')?.value;
    if (password !== passwordcon) {
      this.passwordMismatchError = true;
      return;
    }
    this.passwordMismatchError = false;
    
    this.authenticationService.signUpWithEmailAndPassword(this.registerForm.value as unknown as IUser)
      .then((userCreated: boolean | unknown) => {
        console.log(userCreated);
        if(userCreated) {
          this.router.navigate(['cars']);
        }
      }).catch((error) => {
      console.log(error);
    })
  }

}
