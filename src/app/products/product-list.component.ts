import {Component, OnDestroy, OnInit} from '@angular/core';
import {IProduct} from "./product";
import {ProductService} from "./product.service";
import {Subscription} from "rxjs";

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle: string = "Product List";
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  private _listFilter: string = "";

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  errorMessage: string = '';
  sub!: Subscription;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products
        this.filteredProducts = this.products;
      },
      error: errorMsg => this.errorMessage = errorMsg
    });
  }

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(value: string): IProduct[]{
    value = value.toLowerCase();
    return this.products.filter((product: IProduct) => product.productName.toLowerCase().includes(value));
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product list: ' + message;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
