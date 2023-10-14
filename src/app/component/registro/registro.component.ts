import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Users} from "../../clases/Users";
import {Storage} from "@ionic/storage-angular";
import {Platform, ToastController} from "@ionic/angular";
import * as Constants from '../../constants';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent  implements OnInit {
  contactForm!: FormGroup;
  TAG = 'PrincipalPage';
  users: Users[] = [];
  passwordVisible = false;
  constructor(private storage: Storage, private platform: Platform, private fb: FormBuilder, private toast: ToastController) {
    this.contactForm = this.initForm();
  }

  async ngOnInit(){
    await this.storage.create();

  }

  initForm(): FormGroup {
     return this.fb.group({
      name: ['', [Validators.required, this.nameValidator]],
      lastname: ['', [Validators.required, this.lastnameValidator]],
      username: ['', [Validators.required, this.usernameValidator]],
      pass: ['', [Validators.required, this.passwordValidator]],
      email: ['', [Validators.required, Validators.email, this.emailValidator]],
    });
  }


  //////////////////////////////////////////////////////// NAME VALIDACIONES
  nameValidator(control: AbstractControl) {
    const name = control.value;
    if (name && ( /[^a-zA-Z]/.test(name))) {
      return { 'invalidname': true };
    }
    return null;
  }
  onNameInput() {
    const control = this.contactForm.get('name');
    if (control) {
      control.markAsTouched();
    }
  }
  nameIsValid() {
    const control = this.contactForm.get('name');
    return !(control) || control.touched && !control.errors;
  }
  nameIsInvalid() {
    const control = this.contactForm.get('name');
    return !(control) || control.touched && control.invalid;
  }
  nameHasError(type: string) {
    const control = this.contactForm.get('name');
    return !(control) || control.touched && control.hasError(type);
  }

  //////////////////////////////////////////////////////// LASTNAME VALIDACIONES
  lastnameValidator(control: AbstractControl) {
    const lastname = control.value;
    if (lastname && ( /[^a-zA-Z]/.test(lastname))) {
      return { 'invalidLastname': true };
    }
    return null;
  }
  onlastnameInput() {
    const lastnameControl = this.contactForm.controls['lastname'];
    lastnameControl.markAsTouched();
  }
  lastnameIsValid() {
    const lastnameControl = this.contactForm.controls['lastname'];
    return lastnameControl.touched && lastnameControl.valid;
  }
  lastnameIsInvalid() {
    const control = this.contactForm.get('lastname');
    return !(control) || control.touched && control.invalid;
  }
  lastnameHasError(errorType: string) {
    const lastnameControl = this.contactForm.controls['lastname'];
    return lastnameControl.touched && lastnameControl.hasError(errorType);
  }

  //////////////////////////////////////////////////////// USERNAME VALIDACIONES
  onUsernameInput() {
    const usernameControl = this.contactForm.controls['username'];
    usernameControl.markAsTouched();
  }
  usernameIsValid() {
    const usernameControl = this.contactForm.controls['username'];
    return usernameControl.touched && usernameControl.valid;
  }
  usernameValidator(control: AbstractControl) {
    const username = control.value;
    if (username && (username.length < 4 || username.length > 20 || /[^a-zA-Z0-9_]/.test(username))) {
      return { 'invalidUsername': true };
    }
    return null;
  }
  usernameHasError(errorType: string) {
    const usernameControl = this.contactForm.controls['username'];
    return usernameControl.touched && usernameControl.hasError(errorType);
  }

  //////////////////////////////////////////////////////// PASSWORD VALIDACIONES
  get password() {
    return this.contactForm.get('pass');
  }
  passwordHasError(errorType: string) {
    const passwordControl = this.contactForm.controls['pass'];
    return passwordControl.touched && passwordControl.hasError(errorType);
  }
  passwordIsValid() {
    const passwordControl = this.contactForm.controls['pass'];
    return passwordControl.touched && passwordControl.valid;
  }
  passwordValidator(control: AbstractControl) {
    const pass = control.value;
    if (
      pass && (!/[A-Z]/.test(pass) || !/[a-z]/.test(pass) || !/\d/.test(pass) || pass.length < 8)
    ) {
      return { 'invalidPassword': true };
    }
    return null;
  }
  onPasswordInput() {
    const passwordControl = this.contactForm.controls['pass'];
    passwordControl.markAsTouched();
  }

  //////////////////////////////////////////////////////// EMAIL VALIDACIONES
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
      return { email: true };
    }
    return null;
  }

  async crearUser(){
    const newUser: Users = {
      name: this.contactForm.value.name,
      lastname: this.contactForm.value.lastname,
      username: this.contactForm.value.username,
      pass: this.contactForm.value.pass,
      email: this.contactForm.value.email
    };
    if (this.contactForm.valid) {
      this.users.push(newUser);
      await this.storage.set(Constants.KeyUser, this.users);
      this.contactForm.reset();
      const message = "Successful registration";
      this.mensaje(message, "success");
    } else {
      const message = "Incorrect data, please check form";
      this.mensaje(message, "danger");
    }
  }


  async mensaje(mensaje:string, color: string){
    this.toast.create({
      message: mensaje,
      color: color,
      duration: 2000,
      position: 'bottom',
    }).then(toast => {
      toast.present();
    });
  }
}
