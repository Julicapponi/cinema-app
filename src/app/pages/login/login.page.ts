import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Platform, PopoverController, ToastController} from "@ionic/angular";
import {Users} from "../../clases/Users";
import {Router} from "@angular/router";
import {Storage} from "@ionic/storage-angular";
import * as Constants from "../../constants";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  TAG = 'LoginPage';
  contactForm!: FormGroup;
  isLoadingLogin: boolean;
  passwordVisible = false;
  recommendedAvatars: string[] = [
    'https://ionicframework.com/docs/img/demos/avatar.svg',
    'assets/images/logo-1.jpg',
    'assets/images/logo-2.jpg',
    'assets/images/logo-3.png'
  ];

  selectedAvatar: string = 'URL_OPCION_POR_DEFECTO';
  isViewAvatars=false;
  iconStateAvatar= "create";

  constructor(private popoverController: PopoverController, private storage: Storage,private router: Router, private platform: Platform, private fb: FormBuilder, private toast: ToastController) {
    this.contactForm = this.initForm();
    this.selectedAvatar = this.recommendedAvatars[0];
    this.isLoadingLogin = false;
  }

  async ngOnInit(){
    await this.storage.create();
  }

  initForm(): FormGroup {
    return this.fb.group({
      username: ['', [Validators.required]],
      pass: ['', [Validators.required]],
    });
  }

  async login() {
    let usernameInput = this.contactForm.value.username;
    let passInput = this.contactForm.value.pass;
    this.isLoadingLogin = true;
    setTimeout(async () => {
      this.isLoadingLogin = false;
    }, 500);
    if (this.contactForm.valid) {
      let storedUsers: Users[];
      storedUsers = await this.storage.get(Constants.KeyUser);
      if (storedUsers) {
        for (const user of storedUsers) {
          if (usernameInput === user.username && passInput === user.pass) {
            const message = "User logged"
            this.dialogMessage(message, "success")
            this.router.navigate(['/principal'], {replaceUrl: true});
            return;
          } else {
            const message = "User or pass invalid"
            this.dialogMessage(message, "danger")
            continue;
          }
        }
      }
    } else {
      const message = "User or pass invalid"
      this.dialogMessage(message, "danger")
    }
  }

  async dialogMessage(message:string, color: string){
    this.toast.create({
      message: message,
      color: color,
      duration: 2000,
      position: 'bottom',
    }).then(toast => {
      toast.present();
    });
  }

  async openAvatarSelector() {
    this.isViewAvatars = true;
    if (this.iconStateAvatar.includes("create")){
      this.iconStateAvatar = "close";
    } else {
      this.isViewAvatars = false;
      this.iconStateAvatar = "create";
    }
  }

  selectAvatar(avatarUrl: string) {
    this.selectedAvatar = avatarUrl;
    this.isViewAvatars = false;
    this.iconStateAvatar = "create";
  }
}
