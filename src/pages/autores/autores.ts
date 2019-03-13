import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase'; //Passo1: importar
import { Autor } from '../../model/autor';

@IonicPage()
@Component({
  selector: 'page-autores',
  templateUrl: 'autores.html',
})
export class AutoresPage {
  //Passo 2: configuração firestone
  firestore = firebase.firestore();
  settings = {timestampsInSnapshots: true};

  //Armazenar Livros
  autores : Autor[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.firestore.settings(this.settings); // Passo 3 :Aplicar
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AutoresPage');
    this.listaAutores();
  }

  listaAutores(){
    var ref = firebase.firestore().collection("autor")

    ref.get().then(query => {
      //RequisiÇão ok
      query.forEach(doc => {
        //console.log(doc.data());
        let author = new Autor(doc.data());
        //console.log(liv);
        this.autores.push(author);
      });
      //console.log(this.autores);
    });
  }
}
