import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  titulo:string = "Crear Producto";
  botonTitulo:string = "Crear";
  productoForm: FormGroup;
  id:string;
  constructor(private fb:FormBuilder, private router:Router, private toastr: ToastrService, private _productoService: ProductoService, private aRouter: ActivatedRoute) {



    this.productoForm = this.fb.group({
      producto: ['', [Validators.required, Validators.minLength(3)]],
      categoria: ['', [Validators.required, Validators.minLength(3)]],
      ubicacion: ['', [Validators.required, Validators.minLength(3)]],
      precio: ['', [Validators.required, Validators.minLength(1)]],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id')!;
   }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarProducto(){
    const PRODUCTO:Producto = {
      nombre:this.productoForm.get('producto')?.value,
      categoria:this.productoForm.get('categoria')?.value,
      ubicacion:this.productoForm.get('ubicacion')?.value,
      precio:this.productoForm.get('precio')?.value
    }

    if(this.id !== null){
      //editamos producto
      this._productoService.editarProducto(this.id, PRODUCTO)
      .subscribe(data =>{
        this.toastr.info('El producto fue actualizado con éxito!', 'Producto Actualizado!');
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.productoForm.reset();
      })
    }else{
      //agregamos producto
      
      console.log(PRODUCTO);
      this._productoService.guardarProducto(PRODUCTO)
      .subscribe(data =>{
      this.toastr.success('El producto fue registrado con éxito!', 'Producto Registrado!');
      this.router.navigate(['/']);
      
    }, error => {
      console.log(error);
      this.productoForm.reset();
    })
  }//fin else
    
  }

  esEditar(){
    if(this.id !==null){
      this.titulo = "Editar Producto"

      this.botonTitulo = "Actualizar";
      this._productoService.obtenerProducto(this.id)
      .subscribe(data=>{
        this.productoForm.setValue({
          producto:data.nombre,
          categoria:data.categoria,
          ubicacion:data.ubicacion,
          precio: data.precio,
        })
      })
    }
  }
}