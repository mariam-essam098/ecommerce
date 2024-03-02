import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsService } from 'src/app/services/brands.service';
import { CategoriesInterface } from 'src/app/interfaces/product';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, RouterLink],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent {
  constructor(private _BrandsService:BrandsService) { }

  brandsData: CategoriesInterface[] = [];
  pageSize: number = 0;
  curentPage: number = 1;
  total: number = 0;


  ngOnInit(): void {
    this._BrandsService.getBrands().subscribe({
      next: (res) => {
        this.brandsData = res.data;
        this.pageSize = res.metadata.limit;
        this.curentPage = res.metadata.currentPage;
        this.total = res.results;
      },
    })
  }

  pageChanged(event: any): void {
    this._BrandsService.getBrands(event).subscribe({
      next: (res) => {
        this.brandsData = res.data;
        this.pageSize = res.metadata.limit;
        this.curentPage = res.metadata.currentPage;
        this.total = res.results;
      },
    })
  }


}
