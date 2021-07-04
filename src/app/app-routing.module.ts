import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { AnasayfaComponent } from './Components/Anasayfa/Anasayfa.component';
import { ArabaComponent } from './Components/Araba/Araba.component';
import { GirisComponent } from './Components/Giris/Giris.component';
import { KategoriComponent } from './Components/Kategori/Kategori.component';
import { KullaniciComponent } from './Components/Kullanici/Kullanici.component';
import { MesajlarComponent } from './Components/Mesajlar/Mesajlar.component';


const routes: Routes = [
  {path:"",component:AnasayfaComponent},
  {path:"arabalar",component:ArabaComponent,canActivate:[AdminGuard]},
  {path:"kategoriler",component:KategoriComponent,canActivate:[AdminGuard]},
  {path:"girisyap",component:GirisComponent},
  {path:"kullanicilar",component:KullaniciComponent,canActivate:[AdminGuard]},
  {path:"mesajlar",component:MesajlarComponent,canActivate:[AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
