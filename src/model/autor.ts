export class Autor{
    nome : string;
    email : string;
    telefone : string;
    foto : string;

    constructor(objFirebase: any){
        this.nome = objFirebase.nome;
        this.email = objFirebase.email;
        this.telefone = objFirebase.telefone;
        this.foto = objFirebase.foto;
    }
}