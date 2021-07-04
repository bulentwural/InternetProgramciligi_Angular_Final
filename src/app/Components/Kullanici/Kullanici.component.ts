import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Kullanici } from 'src/app/Models/Kullanici';
import { Sonuc } from 'src/app/Models/Sonuc';
import { RentACarServiceService } from 'src/app/Services/RentACarService.service';
import { KullaniciDialogComponent } from '../Dialogs/kullanici-dialog/kullanici-dialog.component';



@Component({
  selector: 'app-Kullanici',
  templateUrl: './Kullanici.component.html',
  styleUrls: ['./Kullanici.component.scss']
})
export class KullaniciComponent implements OnInit {

  displayedColumns: string[] = ['kullaniciAdSoyad','kullaniciTel','kullaniciMail','kullaniciYetki','kullaniciParola','Duzenle', 'Sil'];
  dataSource: any;

  kullanicidialogref: MatDialogRef<KullaniciDialogComponent>
  kullanici: Kullanici;

  constructor(public service: RentACarServiceService, public matdialog: MatDialog, public toastr: ToastrService) 
  { 

  }

  ngOnInit() {
    this.kullaniciliste();
  }

  kullaniciliste() {
    this.service.kullaniciliste().subscribe((veri: Kullanici[]) => {
      this.dataSource = new MatTableDataSource(veri);
    })
  }


  kullaniciekle() {
    this.kullanici = new Kullanici();
    this.kullanicidialogref = this.matdialog.open(KullaniciDialogComponent, {
      width: "300px",
      data: {
        kayit: this.kullanici,
        islem: "ekle"
      }
    })

    this.kullanicidialogref.afterClosed().subscribe((veri: Kullanici) => {
      if (veri) {
        this.service.kullaniciekle(veri).subscribe((sonuc: Sonuc) => {
          if (sonuc.Islem == true) {
            this.toastr.success(sonuc.Mesaj);
            this.kullaniciliste()
          } else {
            this.toastr.success(sonuc.Mesaj);
            this.kullaniciliste()
          }
        })
      }
    })

  }


  kullaniciduzenle(kayit: Kullanici) {
    this.kullanicidialogref = this.matdialog.open(KullaniciDialogComponent, {
      width: "300px",
      data: {
        kayit: kayit,
        islem: "duzenle"
      }
    })

    this.kullanicidialogref.afterClosed().subscribe(d => {
      if (d) {

        kayit.kullaniciAdSoyad = d.kullaniciAdSoyad;
        kayit.kullaniciMail = d.kullaniciMail;
        kayit.kullaniciParola = d.kullaniciParola;
        kayit.kullaniciTel = d.kullaniciTel;
        kayit.kullaniciYetki = d.kullaniciYetki;  
        console.log(kayit)

        this.service.kullaniciduzenle(kayit).subscribe((s: Sonuc) => {
          this.dataSource.AlertUygula(s);
          if (s.Islem) {
            this.kullaniciliste();
          }
          else{
            this.kullaniciliste();

          }
        })
      }
    });
  }

  kullanicisil(kullaniciid) {
    this.service.kullanicisil(kullaniciid).subscribe((sonuc: Sonuc) => {
      this.toastr.success(sonuc.Mesaj);
      this.kullaniciliste();
    })
  }
}

