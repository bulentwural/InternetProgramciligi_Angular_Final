import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Kategori } from '../Models/Kategori';
import { Araba } from '../Models/Araba';
import { Kullanici } from '../Models/Kullanici';
import { Mesaj } from '../Models/Mesaj';

@Injectable({
  providedIn: 'root'
})
export class RentACarServiceService {

  apiurl="https://localhost:44370/api/";

constructor(public http:HttpClient) { }

kategoriliste(){
  return this.http.get(this.apiurl+"kategoriliste");

}


kategoriekle(kat:Kategori){

return this.http.post(this.apiurl+"kategoriekle",kat);

}

kategoriduzenle(kat:Kategori){

  return this.http.put(this.apiurl+"kategoriduzenle",kat);
}
kategorisil(katid:number){

  return this.http.delete(this.apiurl+"kategorisil/"+katid);
}

arabaliste(){

  return this.http.get(this.apiurl+"arabaliste");
}

arabalistebykatid(katid:number){

  return this.http.get(this.apiurl+"arabalistebykatid/"+katid);
}

arabaekle(araba:Araba){
return this.http.post(this.apiurl+"arabaekle",araba);
}

arabaduzenle(araba:Araba){
  return this.http.put(this.apiurl+"arabaduzenle",araba);
}

arabasil(arabaid:number){

  return this.http.delete(this.apiurl+"arabasil/"+arabaid);
}

kullaniciliste(){
  return this.http.get(this.apiurl+"kullaniciliste");
}

kullaniciekle(kullanici:Kullanici){

  return this.http.post(this.apiurl+"kullaniciekle",kullanici);

}

kullaniciduzenle(kullanici:Kullanici){
  return this.http.put(this.apiurl+"kullaniciduzenle",kullanici);
}

kullanicisil(kullaniciid:number){
  return this.http.delete(this.apiurl+"kullanicisil/"+kullaniciid);
}

kullanicibyid(kullaniciid:number){

  return this.http.get(this.apiurl+"kullanicibyid/"+kullaniciid);
}


girisYap(mail: string, sifre: string) {
  return this.http.get(this.apiurl + "girisyap/" + mail + "/" + sifre)
}

TumMesajlariListele(){
  return this.http.get(this.apiurl+"mesajliste")
}

AlanMesajlariListele(mesajalanId:number){
  return this.http.get(this.apiurl+"mesajalanbyid/"+mesajalanId)
}
MesajByIdiListele(mesajId:number){
  return this.http.get(this.apiurl+"mesajbyid/"+mesajId)
}

MesajEkle(mesaj:Mesaj){
  return this.http.post(this.apiurl+"mesajekle",mesaj)
}
}
