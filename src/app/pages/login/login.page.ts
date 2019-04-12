import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;

  constructor() { }

  ngOnInit() { }

  public registrar() {
    this.slides.slideNext();
  }

  public cancelar() {
    this.slides.slidePrev();
  }
}
