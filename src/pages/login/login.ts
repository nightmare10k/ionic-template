import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, MenuController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild('usuario') email;
  @ViewChild('senha') password;
  
  constructor(public navCtrl: NavController,
  public toastCtrl: ToastController,
  public firebaseauth: AngularFireAuth) {
  }
  
  public login(): void {
  this.firebaseauth.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
  .then(() => {
  this.exibirToast('Login efetuado com sucesso');
  
  })
  .catch((erro: any) => {
  this.exibirToast(erro);
  });
  }
  
  public cadastrarUsuario(): void {
  this.firebaseauth.auth.createUserWithEmailAndPassword(this.email.value, this.password.value)
  .then(() => {
  this.exibirToast('Usuário criado com sucesso');
  
  })
  .catch((erro: any) => {
  this.exibirToast(erro);
  });
  }
  
  private exibirToast(mensagem: string): void {
  let toast = this.toastCtrl.create({ duration: 4000, position: 'botton' });
  toast.setMessage(mensagem);
  toast.present();
  }
}
