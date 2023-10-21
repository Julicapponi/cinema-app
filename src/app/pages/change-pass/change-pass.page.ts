import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.page.html',
  styleUrls: ['./change-pass.page.scss'],
})
export class ChangePassPage implements OnInit {
  contactForm!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.contactForm = this.initForm();
  }

  ngOnInit() {

  }

  initForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email, this.emailValidator]],
    });
  }

  //Email Validations
  emailHasError(type: string) {
    const control = this.contactForm.get('email');
    return !(control) || control.touched && control.hasError(type);
  }
  emailIsValid() {
    const control = this.contactForm.get('email');
    return !(control) || control.touched && !control.errors;
  }

  onEmailInput() {
    const control = this.contactForm.get('email');
    if (control) {
      control.markAsTouched();
    }
  }

  emailValidator(control: AbstractControl): ValidationErrors | null {
    // Declaración de la expresión regular para validar email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (control.value && !emailRegex.test(control.value)) {
      return {email: true};
    }
    return null;
  }

}
