import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Kategori } from 'src/app/Models/Kategori';
import { Kullanici } from 'src/app/Models/Kullanici';
import { RentACarServiceService } from 'src/app/Services/RentACarService.service';



@Component({
  selector: 'app-kullanici-dialog',
  templateUrl: './kullanici-dialog.component.html',
  styleUrls: ['./kullanici-dialog.component.scss']
})
export class KullaniciDialogComponent implements OnInit {

  kullanici: Kullanici;

  kullanicilar:Kullanici[];

  kategoriler: Kategori[];

  form: FormGroup;

  dialogBaslik: string;

  islem: string;

  constructor(

    public formBuilder: FormBuilder,
    public service: RentACarServiceService,
    public dialogRef: MatDialogRef<KullaniciDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {

    this.islem = data.islem,
      this.kullanici = data.kayit

    if (this.islem == "ekle") {
      this.dialogBaslik = "Kullanıcı Ekle"
    } else {
      this.dialogBaslik = "Kullanıcı Düzenle"
    }
    this.kullaniciliste();
    this.form = this.kullaniciForm();

   }

   kullaniciliste() {
    this.service.kullaniciliste().subscribe((veri: Kullanici[]) => {
      this.kullanicilar = veri;
    })
  }

  kullaniciForm() {
    return this.formBuilder.group({
      kullaniciAdSoyad: [this.kullanici.kullaniciAdSoyad, [Validators.required]],
      kullaniciMail: [this.kullanici.kullaniciMail, [Validators.required]],
      kullaniciParola: [this.kullanici.kullaniciParola, [Validators.required]],
      kullaniciTel: [this.kullanici.kullaniciTel, [Validators.required]],
      kullaniciYetki: [this.kullanici.kullaniciYetki, [Validators.required]],

    });

  }

  ngOnInit() {
  }

}
