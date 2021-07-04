import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Araba } from 'src/app/Models/Araba';
import { Sonuc } from 'src/app/Models/Sonuc';
import { RentACarServiceService } from 'src/app/Services/RentACarService.service';
import { ArabalarDialogComponent } from '../Dialogs/arabalar-dialog/arabalar-dialog.component';



@Component({
  selector: 'app-Araba',
  templateUrl: './Araba.component.html',
  styleUrls: ['./Araba.component.scss']
})

export class ArabaComponent implements OnInit {



  displayedColumns: string[] = ['arabaMarka', 'arabaModel', 'arabaRenk', 'arabaKasaTipi', 'arabaYakit', 'arabaKm', 'arabaGorsel', 'arabaFiyat', 'arabaKategoriId', 'arabaKodu', 'Duzenle', 'Sil'];
  dataSource: any;

  arabadialogref: MatDialogRef<ArabalarDialogComponent>
  araba: Araba;


  constructor(public service: RentACarServiceService, public matdialog: MatDialog, public toastr: ToastrService) {

  }

  ngOnInit() {
    this.arabaliste();
  }

  arabaliste() {
    this.service.arabaliste().subscribe((veri: Araba[]) => {
      this.dataSource = new MatTableDataSource(veri);
      console.log(veri);
    })
  }

  arabaekle() {
    this.araba = new Araba();
    this.arabadialogref = this.matdialog.open(ArabalarDialogComponent, {
      width: "600px",
      data: {
        kayit: this.araba,
        islem: "ekle"
      }
    })

    this.arabadialogref.afterClosed().subscribe((veri: Araba) => {
      if (veri) {
        this.service.arabaekle(veri).subscribe((sonuc: Sonuc) => {
          if (sonuc.Islem == true) {
            this.toastr.success(sonuc.Mesaj);
            this.arabaliste()
          } else {
            this.toastr.success(sonuc.Mesaj);
            this.arabaliste()
          }
        })
      }
    })

  }


  arabaduzenle(kayit: Araba) {
    this.arabadialogref = this.matdialog.open(ArabalarDialogComponent, {
      width: "600px",
      data: {
        kayit: kayit,
        islem: "duzenle"
      }
    })

    this.arabadialogref.afterClosed().subscribe(d => {
      if (d) {
        kayit.arabaMarka = d.arabaMarka;
        kayit.arabaModel = d.arabaModel;
        kayit.arabaRenk = d.arabaRenk;
        kayit.arabaKasaTipi = d.arabaKasaTipi;
        kayit.arabaYakit = d.arabaYakit;
        kayit.arabaKm = d.arabaKm;
        kayit.arabaGorsel = d.arabaGorsel;
        kayit.arabaFiyat = d.arabaFiyat;
        kayit.arabaKategoriId = d.arabaKategoriId;
        kayit.arabaKodu = d.arabaKodu;    
        this.service.arabaduzenle(kayit).subscribe((s: Sonuc) => {
          console.log(s)
          if (s.Islem) {
            this.arabaliste();
          }
        });
      }
    });
  }


  arabasil(arabaid) {
    this.service.arabasil(arabaid).subscribe((sonuc: Sonuc) => {
      this.toastr.success(sonuc.Mesaj);
      this.arabaliste();
    })
  }
}

