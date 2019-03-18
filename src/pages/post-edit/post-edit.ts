import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Post } from '../../model/post';
import firebase from 'firebase';

/**
 * Generated class for the PostEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post-edit',
  templateUrl: 'post-edit.html',
})
export class PostEditPage {
  
  firestore = firebase.firestore();
  post : Post;
  formGroup : FormGroup;


  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public formBuilder: FormBuilder) {

    this.post = this.navParams.get('post');
    this.form();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostEditPage');
  }

  form(){
    this.formGroup = this.formBuilder.group({
      uid: [this.post.uid, [Validators.required]],
      nome: [this.post.nome, [Validators.required]],
      mensagem: [this.post.mensagem, [Validators.required]]
    });
  }

  atualizar(){
    var ref = this.firestore.collection("post").doc(this.post.id);
    ref.update(this.formGroup.value).then(()=> {
      this.navCtrl.setRoot('HomePage');
    })
    .catch(function(error) {
      console.error("Error: ", error);
    });
  }

}
