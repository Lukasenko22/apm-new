import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IProduct} from "../model/product";
import {ProductService} from "../services/product.service";
import {Subscriber, Subscription} from "rxjs";
import {isNull} from "@angular/compiler/src/output/output_ast";
import {isEmpty} from "rxjs/operators";

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product detail'
  product: IProduct | undefined;
  sub!: Subscription;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) {

  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pageTitle += `: ${id}`;
    this.sub = this.productService.getProductById(id).subscribe({
      next: product => {
        this.product = product;
      },
      error: errorMsg => this.errorMessage = errorMsg
    });
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
