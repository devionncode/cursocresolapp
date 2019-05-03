import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  // @ViewChild('meuSlides') slides: IonSlides;

  public formCadastro: FormGroup;
  public email: string;
  public senha: string;

  constructor(public formBuilder: FormBuilder,
              public toastCtrl: ToastController) { }

  ngOnInit() { 

    this.formCadastro = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, Validators.required],
      senha: [null, Validators.required]
    });

  }

  public registrar() {
    this.slides.slideNext();
  }

  public cancelar() {
    this.formCadastro.reset();
    this.slides.slidePrev();
  }

  public salvar() {

    let cadastros: Array<any> = new Array();
    let cadastrosStorage = localStorage.getItem('cadastros');

    if (cadastrosStorage) {
      cadastros = JSON.parse(cadastrosStorage);
    }

    cadastros.push(this.formCadastro.value);

    localStorage.setItem('cadastros', JSON.stringify(cadastros));

    this.cancelar();

    this.toastCtrl.create({
      message: 'Usuário salvo com sucesso!',
      duration: 3000
    }).then(toast => {
      toast.present();
    });
  }

  public entrar() {

    let cadastrosStorage = localStorage.getItem('cadastros');
    let cadastros: Array<any> = new Array();

    if (cadastrosStorage) {
      cadastros = JSON.parse(cadastrosStorage);
    }
    
    let achou = false;
    cadastros.forEach((cadastro, index) => {
      if (cadastro.email === this.email && cadastro.senha === this.senha) {
        achou = true;
        localStorage.setItem('logado', JSON.stringify(cadastro));
      }
    });

    if (achou) {

      this.toastCtrl.create({
        message: 'Login realizado com sucesso!',
        duration: 2000
      }).then(toast => {
        toast.present();
      });
      
    } else {

      this.toastCtrl.create({
        message: 'Login inválido!',
        duration: 2000
      }).then(toast => {
        toast.present();
      });

    }

  }

}
