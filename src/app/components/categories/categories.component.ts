
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesInterface, Product } from 'src/app/interfaces/product';
import { CategoriesService } from 'src/app/services/categories.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(private _CategoriesService:CategoriesService) { }

  categoriesData: CategoriesInterface[] = [];


  ngOnInit(): void {
    this._CategoriesService.getCategories().subscribe({
      next: (res) => {
        this.categoriesData = res.data;
      },
    })
  }


}
