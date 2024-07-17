import { Component, inject, Injector, OnInit,  } from '@angular/core';
import { BookService } from '../../../core/services/book.service';
import { IBook } from '../../../core/models/types';
import { BookCardComponent } from '../book-card/book-card.component';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';
import { TokenService } from '../../../core/services/token.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-book-pages',
  standalone: true,
  imports: [RouterLink,BookCardComponent,ReactiveFormsModule],
  templateUrl: './book-pages.component.html',
  styleUrl: './book-pages.component.css'
})
export class BookPagesComponent implements OnInit {
  toast = inject(ToastrService)
  books = inject(BookService);
  authService = inject(AuthService)
  bookdefaultdata : IBook [] = []
  book : IBook []=[]
  searchActive = false

  searchForm = new FormGroup({
    name: new FormControl(''),
    
  });


  ngOnInit(): void {
    this.loadData()
  }

  loadData(){
    this.books.getBooks().subscribe((resultado)=>{
      this.book = resultado.resultado as IBook[]
      this.bookdefaultdata = this.book
      this.defautlSearch()
      
    })
  }
  searchData(){
    this.searchActive = true
     const searchTerm = this.searchForm.value.name?? ''
    console.log('este es el termino de busqueda',searchTerm)

    if(!searchTerm){
       this.toast.error("El buscador no puede estar vacío")
       return
    }
    this.book = this.bookdefaultdata
   
    this.book =this.book.filter((book)=>{
      return book.nombre.toLowerCase().includes(searchTerm.toLowerCase()) 
    })

    if(this.book.length === 0){
      this.toast.error("No se encontraron resultados", "Error")
      return
    }
    console.log('Este es el libro',this.book)

  }

  reloadBooks(){

    this.loadData()
  }

  defautlSearch(){
    this.searchActive = false
    this.searchForm.reset()
  }

  logout(){
    this.authService.logout()
    this.toast.success('Sesión cerrada con éxito')
  }
}
