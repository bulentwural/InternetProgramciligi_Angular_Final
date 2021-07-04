import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Araba } from 'src/app/Models/Araba';
import { Kategori } from 'src/app/Models/Kategori';
import { RentACarServiceService } from 'src/app/Services/RentACarService.service';

@Component({
  selector: 'app-arabalar-dialog',
  templateUrl: './arabalar-dialog.component.html',
  styleUrls: ['./arabalar-dialog.component.scss']
})
export class ArabalarDialogComponent implements OnInit {

  araba: Araba;
  kategoriler: Kategori[];

  form: FormGroup;

  dialogBaslik: string;

  islem: string;

  constructor(
    public formBuilder: FormBuilder,
    public service: RentACarServiceService,
    public dialogRef: MatDialogRef<ArabalarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.islem = data.islem,
      this.araba = data.kayit

    if (this.islem == "ekle") {
      this.dialogBaslik = "Araba Ekle"
    } else {
      this.dialogBaslik = "Araba Düzenle"
    }
    this.kategoriListe();
    this.form = this.arabaForm();

  }

  kategoriListe() {
    this.service.kategoriliste().subscribe((veri: Kategori[]) => {
      this.kategoriler = veri;
    })
  }

  arabaForm() {
    return this.formBuilder.group({
      arabaMarka: [this.araba.arabaMarka, [Validators.required]],
      arabaModel: [this.araba.arabaModel, [Validators.required]],
      arabaRenk: [this.araba.arabaRenk, [Validators.required]],
      arabaKasaTipi: [this.araba.arabaKasaTipi, [Validators.required]],
      arabaYakit: [this.araba.arabaYakit, [Validators.required]],
      arabaKm: [this.araba.arabaKm, [Validators.required]],
      arabaGorsel: [this.araba.arabaGorsel, [Validators.required]],
      arabaFiyat: [this.araba.arabaFiyat, [Validators.required]],
      arabaKategoriId: [this.araba.arabaKategoriId, [Validators.required]],
      arabaKodu: [this.araba.arabaKodu, [Validators.required]],

    });

  }

  ngOnInit() {
  }

}