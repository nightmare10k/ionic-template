import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { Dados } from '../../model/dados';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireStorage} from 'angularfire2/storage';


@IonicPage()
@Component({
  selector: 'page-dados',
  templateUrl: 'dados.html',
})
export class DadosPage {

  firebase = firebase.firestore();
  uid : string;
  dados : Dados = new Dados();

  imagem : any; // Recebe a imagem do Formulario



  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseauth : AngularFireAuth,
    public storage : AngularFireStorage) {

      this.uid = this.firebaseauth.auth.currentUser.uid

  }

  ionViewDidLoad() {
    
  }

  enviarArquivo(event){
    this.imagem = event.srcElement.files[0];
    this.upload();
  }

  //Enviar o arquivo para o servidor
  upload(){
      // Diretorio + caminho da img no servidor
    let ref = firebase.storage().ref().child(`usuario/${(this.uid)}.jpg`);
       //Executar upload
    ref.put(this.imagem).then(resp => {
      // Se sucesso, pegar a url para download da img
      ref.getDownloadURL().then(url=>{
        //console.log(url); // url para download 
        this.dados.foto = url;
      }).catch(err =>{
        console.log(err); //Houve algum erro
      })
    });
  }

}
