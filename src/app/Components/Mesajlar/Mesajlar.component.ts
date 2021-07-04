import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Kullanici } from 'src/app/Models/Kullanici';
import { Mesaj } from 'src/app/Models/Mesaj';
import { Sonuc } from 'src/app/Models/Sonuc';
import { RentACarServiceService } from 'src/app/Services/RentACarService.service';
import { MesajekleDialogComponent } from '../Dialogs/mesajekle-dialog/mesajekle-dialog.component';
import { ToplumesajDialogComponent } from '../Dialogs/toplumesaj-dialog/toplumesaj-dialog.component';

@Component({
  selector: 'app-Mesajlar',
  templateUrl: './Mesajlar.component.html',
  styleUrls: ['./Mesajlar.component.scss']
})
export class MesajlarComponent implements OnInit {

  admin:boolean;
  yetki:any;
  kullanicilar:Kullanici[];

  displayedColumns: string[] = ['mesajId', 'mesajGonderen', 'mesajAlan', 'mesajIcerik', 'mesajTarihi'];
  dataSource: any;

  mesajekledialoRref: MatDialogRef<MesajekleDialogComponent>;
  toplumesajdialoRref: MatDialogRef<ToplumesajDialogComponent>;
  mesaj: Mesaj;


  constructor(public service: RentACarServiceService, public matdialog: MatDialog, public toastr: ToastrService) {

  }

  ngOnInit() {
    this.yetki=localStorage.getItem("yetki")
    this.mesajliste();
    this.kullaniciListele();
    if(this.yetki="A"){
       this.admin=true;
       console.log(this.yetki)
       console.log(this.admin)
    }
    else if(this.yetki="U"){
      this.admin=false;
      console.log(this.yetki)
      console.log(this.admin)

    }
  }

kullaniciListele(){
  this.service.kullaniciliste().subscribe((veri:Kullanici[])=>{
    this.kullanicilar=veri;
  })
}


  mesajliste() {
    this.service.TumMesajlariListele().subscribe((veri: Mesaj[]) => {
      this.dataSource = new MatTableDataSource(veri);
    })
  }

  mesajekle() {
    this.mesaj = new Mesaj();
    this.mesajekledialoRref = this.matdialog.open(MesajekleDialogComponent, {
      width: "600px",
      data: {
        kayit: this.mesaj,
        islem: "ekle"
      }
    })

    this.mesajekledialoRref.afterClosed().subscribe((veri: Mesaj) => {
      if (veri) {
        var tarih= new Date().toString();
        this.mesaj.MesajAlanId = veri.MesajAlanId;
        this.mesaj.MesajGonderenId = parseInt(localStorage.getItem("uid"));
        this.mesaj.MesajIcerik=veri.MesajIcerik;
        this.mesaj.MesajKonu=veri.MesajKonu;
        this.mesaj.MesajTarihi=tarih;
        this.service.MesajEkle(this.mesaj).subscribe((sonuc: Sonuc) => {
          if (sonuc.Islem == true) {
            this.toastr.success(sonuc.Mesaj);
            this.mesajliste()
          } else {
            this.toastr.success(sonuc.Mesaj);
            this.mesajliste()
          }
        })
      }
    })

  }


  toplumesajekle() {
    this.mesaj = new Mesaj();
    this.toplumesajdialoRref = this.matdialog.open(ToplumesajDialogComponent, {
      width: "600px",
      data: {
        kayit: this.mesaj,
        islem: "ekle"
      }
    })

    this.toplumesajdialoRref.afterClosed().subscribe((veri: Mesaj) => {
      if (veri) {
this.kullanicilar.forEach(kullanici=>{
  var tarih= new Date().toString();
  this.mesaj.MesajAlanId=kullanici.kullaniciId;
  this.mesaj.MesajGonderenId = parseInt(localStorage.getItem("uid"));
  this.mesaj.MesajIcerik=veri.MesajIcerik;
  this.mesaj.MesajKonu=veri.MesajKonu;
  this.mesaj.MesajTarihi=tarih;
        this.service.MesajEkle(this.mesaj).subscribe((sonuc: Sonuc) => {
          if (sonuc.Islem == true) {
            this.toastr.success(sonuc.Mesaj);
            this.mesajliste()
          } else {
            this.toastr.success(sonuc.Mesaj);
            this.mesajliste()
          }
        })
})


      }
    })

  }

}
