import { Component } from '@angular/core';
import { CombinationService } from '../../../services/combination.service';
import { Router } from '@angular/router';
import { leadingComment } from '@angular/compiler';

@Component({
  selector: 'app-display-all-combinations',
  templateUrl: './display-all-combinations.component.html',
  styleUrl: './display-all-combinations.component.scss'
})
export class DisplayAllCombinationsComponent {
  
    combinations: number[][]= [];
    pageIndex: number = 0;
    pageSize: number = 10;
    options=[5,10,20]
    totalRecords: number=0;

    constructor(private combinationService: CombinationService, private router:Router) {}
  
    ngOnInit() {

      this.totalRecords = this.combinationService.totalCombinations;
      this.loadPage();
    }
  
    loadPage() {

      this.combinationService.getAll(this.pageIndex, this.pageSize).subscribe({
        next: (v) => this.combinations = v,
        error: (e) => console.error('Error on onSubmit: ',e)
      }) 
    }

    onPageChange(event: any)
    {
      this.pageIndex= event.page;
      this.pageSize= event.rows;
      this.loadPage();
    }

    navigateTo()
    {
      const len= this.combinations.length;
      
      this.router.navigate(['/combination-item'], {
        queryParams: { combination: this.combinations[len-1], 
        index: (this.pageSize * (this.pageIndex)) + len }
      });
    }
  
}
