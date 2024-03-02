import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesInterface } from 'src/app/interfaces/product';
import { CategoriesService } from 'src/app/services/categories.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories-details.component.html',
  styleUrls: ['./categories-details.component.scss']
})
export class CategoriesDetailsComponent implements OnInit {

  constructor(private _ActivatedRoute: ActivatedRoute,
    private _CategoriesService:CategoriesService) { }


    categoriesId: string | null = '';

  categoriesDetails: CategoriesInterface | null = null;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.categoriesId = params.get('id');
      },
    });

    this._CategoriesService.getCategoriesDetails(this.categoriesId).subscribe({
      next: (res) => {
        this.categoriesDetails = res.data;
      },
    });
  }

}
