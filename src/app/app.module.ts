import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AnasayfaComponent } from './Components/Anasayfa/Anasayfa.component';
import { HomeComponent } from './Components/home/home.component';
import { KategoriComponent } from './Components/Kategori/Kategori.component';
import { KategoriDialogComponent } from './Components/Dialogs/kategori-dialog/kategori-dialog.component';
import { ArabalarDialogComponent } from './Components/Dialogs/arabalar-dialog/arabalar-dialog.component';
import { ArabaComponent } from './Components/Araba/Araba.component';
import { GirisComponent } from './Components/Giris/Giris.component';
import { KullaniciComponent } from './Components/Kullanici/Kullanici.component';
import { KullaniciDialogComponent } from './Components/Dialogs/kullanici-dialog/kullanici-dialog.component';
import { MesajlarComponent } from './Components/Mesajlar/Mesajlar.component';
import { MesajekleDialogComponent } from './Components/Dialogs/mesajekle-dialog/mesajekle-dialog.component';
import { ToplumesajDialogComponent } from './Components/Dialogs/toplumesaj-dialog/toplumesaj-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    AnasayfaComponent,   
    
    HomeComponent,
    KategoriComponent,
    KategoriDialogComponent,
    ArabalarDialogComponent,
    ArabaComponent,
    GirisComponent,
    KullaniciComponent,
    KullaniciDialogComponent,
    MesajlarComponent,
    MesajekleDialogComponent,
    ToplumesajDialogComponent
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
