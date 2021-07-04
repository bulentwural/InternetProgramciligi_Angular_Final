import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Kullanici } from 'src/app/Models/Kullanici';
import { Mesaj } from 'src/app/Models/Mesaj';
import { RentACarServiceService } from 'src/app/Services/RentACarService.service';

@Component({
  selector: 'app-toplumesaj-dialog',
  templateUrl: './toplumesaj-dialog.component.html',
  styleUrls: ['./toplumesaj-dialog.component.scss']
})
export class ToplumesajDialogComponent {

  kullanici: Kullanici;
  mesaj:Mesaj;

  kullanicilar:Kullanici[];

  form: FormGroup;

  dialogBaslik: string;

  islem: string;

  constructor(

    public formBuilder: FormBuilder,
    public service: RentACarServiceService,
    public dialogRef: MatDialogRef<ToplumesajDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {

    this.islem = data.islem,
      this.mesaj = data.kayit

      this.dialogBaslik = "Toplu Mesaj Gönder"

    this.form = this.mesajForm();

   }

   
  mesajForm() {
    return this.formBuilder.group({
      MesajIcerik: [this.mesaj.MesajIcerik, [Validators.required]],
      MesajKonu: [this.mesaj.MesajKonu, [Validators.required]]
    });

  }

  
}
