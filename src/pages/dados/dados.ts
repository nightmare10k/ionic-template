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

  firestore = firebase.firestore();
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
    //Referencia para coleçao dados
    var docRef = this.firestore.collection("dados").doc(this.uid);

    docRef.get().then(doc => { //Solicita o documento
      
      if(doc.exists) { // verificar se existe o documento
        this.dados.setDados(doc.data()); //Se existir, pega os Dados
      }else{
        // Se não existir ele cria, este codigo sera modificado
        this.firestore.collection("dados").doc(this.uid).set(
          {'nome' : 'Hugo', 'telefone' : '2185474'}

        ).then(ref => {
          //Utiliza o mesmo dados acima, este codigo sera modificado
          this.dados.setDados({'nome' : 'Hugo', 'telefone': '2185474'});
        });
      }
    })

    this.downloadFoto();
    
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
      this.downloadFoto();
    });
  }
  downloadFoto(){
    let ref = 'usuario/'+this.uid+'.jpg'; //Pasta Servidor
    let gsReference = firebase.storage().ref().child(ref); // Referencia do arquivo no servidor

    gsReference.getDownloadURL().then( url =>{ //tenta baixar a foto do servidor
      this.dados.foto = url; //foto baixada com sucesso
    }).catch(() =>{ //foto nâo exixste, pega foto padrao
      this.dados.foto = "https://www.gazetadopovo.com.br/blogs/dias-da-vida/wp-content/themes/padrao/imagens/perfil-blog.png";
    })

  }

}
