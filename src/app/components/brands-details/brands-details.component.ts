import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesInterface } from 'src/app/interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { BrandsService } from 'src/app/services/brands.service';
@Component({
  selector: 'app-brands-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brands-details.component.html',
  styleUrls: ['./brands-details.component.scss']
})
export class BrandsDetailsComponent implements OnInit {

  constructor(private _ActivatedRoute: ActivatedRoute,
    private _BrandsService:BrandsService) { }


  brandsId: string | null = '';

  brandsDetails: CategoriesInterface | null = null;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.brandsId = params.get('id');
      },
    });

    this._BrandsService.getBrandsDetails(this.brandsId).subscribe({
      next: (res) => {
        this.brandsDetails = res.data;
      },
    });
  }

}
