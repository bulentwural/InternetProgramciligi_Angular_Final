import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Kullanici } from 'src/app/Models/Kullanici';
import { RentACarServiceService } from 'src/app/Services/RentACarService.service';

@Component({
  selector: 'app-Giris',
  templateUrl: './Giris.component.html',
  styleUrls: ['./Giris.component.scss']
})
export class GirisComponent implements OnInit {
  kullanicigiris: Kullanici;

  constructor(
    public service: RentACarServiceService,
    public router:Router
  ) {

  }



  ngOnInit() {
  }


  girisYap(email, sifre) {
    this.service.girisYap(email, sifre).subscribe((kullanici: Kullanici) => {
      if(kullanici!=null){
        this.kullanicigiris = kullanici;
        localStorage.setItem("yetki",JSON.stringify(kullanici.kullaniciYetki));
        localStorage.setItem("uid",kullanici.kullaniciId.toString());
        this.router.navigate([''])
      }
     

    })

  }

}
