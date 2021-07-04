import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Kullanici } from 'src/app/Models/Kullanici';
import { Mesaj } from 'src/app/Models/Mesaj';
import { RentACarServiceService } from 'src/app/Services/RentACarService.service';
import { KullaniciDialogComponent } from '../kullanici-dialog/kullanici-dialog.component';

@Component({
  selector: 'app-mesajekle-dialog',
  templateUrl: './mesajekle-dialog.component.html',
  styleUrls: ['./mesajekle-dialog.component.scss']
})
export class MesajekleDialogComponent implements OnInit {

  kullanici: Kullanici;
  mesaj:Mesaj;

  kullanicilar:Kullanici[];

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
      this.mesaj = data.kayit

      this.dialogBaslik = "Mesaj Ekle"

    this.kullaniciliste();
    this.form = this.mesajForm();

   }

   kullaniciliste() {
    this.service.kullaniciliste().subscribe((veri: Kullanici[]) => {
      this.kullanicilar = veri;
    })
  }

  mesajForm() {
    return this.formBuilder.group({
      MesajAlanId: [this.mesaj.MesajAlanId, [Validators.required]],
      MesajIcerik: [this.mesaj.MesajIcerik, [Validators.required]],
      MesajKonu: [this.mesaj.MesajKonu, [Validators.required]]
    });

  }

  ngOnInit() {
  }
}
