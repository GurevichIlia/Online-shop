import { ShopingCartService } from './../../shared/services/shoping-cart.service';
import { switchMap, map } from 'rxjs/operators';
import { TableService } from './../../shared/services/table.service';
import { ShopStateService } from './../../shared/services/shop-state.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/shared/interfaces';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.scss']
})
export class ShopingCartComponent implements OnInit {
  selectedProductsTableDataSource$: Observable<MatTableDataSource<Product>>;

  selectedProductsDisplayedColumns$: Observable<string[]>;
  selectedProductsListColumns$: Observable<{ columnDef: string; header: string; cell: any }[]>;

  totalAmount$: Observable<number>;
  constructor(
    private shopStateService: ShopStateService,
    private tableService: TableService,
    private shopingCartService: ShopingCartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.selectedProductsTableDataSource$ = this.shopStateService.getAddedToCardProducts$()
      .pipe(map(products => {

        const dataSource = new MatTableDataSource<Product>();
        const shownColumns: string[] = this.tableService.createTableColumns(products);

        this.selectedProductsDisplayedColumns$ = of(['ProdName', 'Price', 'images']);
        this.selectedProductsListColumns$ = of(this.tableService.getValueForColumns(['ProdName', 'Price', 'images']));

        dataSource.data = products;

        this.totalAmount$ = of(this.shopingCartService.calculateAmount(products))

        return dataSource;
      }));

  }

  goPayment() {
    this.router.navigate(['payment']);
  }

}
