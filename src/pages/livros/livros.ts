import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase'; //Passo1: importar
import { Livro } from '../../model/livro';

@IonicPage()
@Component({
  selector: 'page-livros',
  templateUrl: 'livros.html',
})
export class LivrosPage {
  //Passo 2: configuração firestone
  firestore = firebase.firestore();
  settings = {timestampsInSnapshots: true};

  //Armazenar Livros
  livros : Livro[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.firestore.settings(this.settings); // Passo 3 :Aplicar
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LivrosPage');
    this.listaLivro();
  }

  listaLivro(){
    var ref = firebase.firestore().collection("livro")

    ref.get().then(query => {
      //RequisiÇão ok
      query.forEach(doc => {
        //console.log(doc.data());
        let liv = new Livro(doc.data());
        //console.log(liv);
        this.livros.push(liv);
      });
      //console.log(this.livros);
    });
  }

  //Ir para paginas LivrosDetalhes e enviar o objeto livro
  detalhar(obj : Livro){
    this.navCtrl.push('LivroDetalhesPage', {'livro' : obj});
  }

}
