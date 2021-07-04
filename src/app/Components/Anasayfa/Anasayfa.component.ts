import { Component, OnInit } from '@angular/core';
import { Araba } from 'src/app/Models/Araba';
import { RentACarServiceService } from 'src/app/Services/RentACarService.service';

@Component({
  selector: 'app-Anasayfa',
  templateUrl: './Anasayfa.component.html',
  styleUrls: ['./Anasayfa.component.scss']
})
export class AnasayfaComponent implements OnInit {

  constructor(public service: RentACarServiceService) { }

 arabalar:Araba[];

  ngOnInit() { this.arabaliste();
  }

  arabaliste(){
    this.service.arabaliste().subscribe((d:Araba[])=>{
      this.arabalar=d;

    })
  }
  
}

