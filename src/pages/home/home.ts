import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import firebase from 'firebase';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage } from 'angularfire2/storage';
import { Post } from '../../model/post';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
@IonicPage()
export class HomePage {

  firestore = firebase.firestore();
  formGroup : FormGroup;
  uid : string;
  posts : Post[] = [];

  constructor(public navCtrl: NavController,
  public menuCtrl : MenuController,
  public formBuilder : FormBuilder,
  public firebaseauth : AngularFireAuth,
  public storage : AngularFireStorage) {


    this.firebaseauth.authState.subscribe(user =>{
      if (user) {this.uid = user.uid}
    });
    this.menuCtrl.enable(true);
    this.form();

  }

  ionViewDidLoad(){
    this.getList();
  }

  form(){
    this.formGroup = this.formBuilder.group({
      uid: ['', [Validators.required]],
      nome: ['', [Validators.required]],
      mensagem: ['', [Validators.required]]
    })
  }

  getList(){

    var postRef = firebase.firestore().collection("post");

    postRef.get().then(query =>{
      query.forEach(doc => {
        let p = new Post();
        p.id = doc.id;
        p.setDados(doc.data());
        this.posts.push(p);
      });
      console.log(this.posts);
    });
  }
  //Cadastrar
  add(){

    //sera modificado
    this.formGroup.controls['uid'].setValue(this.uid);
    this.formGroup.controls['nome'].setValue('Hugo');

    // Tentar
    this.firestore.collection("post").add(
      this.formGroup.value
    ).then(ref => {
      console.log("Cadastro com sucesso");
      this.posts = [];
      this.getList();
    }).catch(err => {
      console.log(err.message);
    })
  }

  removerPost(id : string){

    this.firestore.collection('post').doc(id).delete().then(()=> {
      console.log("Documento Deletado");
      this.posts = [];
      this.getList();
    }).catch(function(error) {
      console.error("Error: ", error);
    })
  }

  editar(post : Post){
    this.navCtrl.push('PostEditPage', {'post' : post})
  }

}
