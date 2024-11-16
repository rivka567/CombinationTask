import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CombinationService } from '../../../services/combination.service';

@Component({
  selector: 'app-display-combination-item',
  templateUrl: './display-combination-item.component.html',
  styleUrl: './display-combination-item.component.scss'
})
export class DisplayCombinationItemComponent {
  combination: number[] | null = null;
  combinationIndex: number=1;
  isNextDisabled: boolean = false;
  isPreviousDisabled: boolean = true;

  constructor(private router:Router, private route:ActivatedRoute, private combinationService:CombinationService) {      
  }

  ngOnInit(){ 

    this.route.queryParams.subscribe(params => {
      if(params['combination'])
        this.combination = params['combination'];
      if(params['index'])
        this.combinationIndex =parseInt(params['index']);
    });

    if(!this.combination)
      this.getCombination();

    this.updateButtonStates()
  }

  getCombination()
  {
    this.combinationService.getNext(this.combinationIndex).subscribe({
      next: (v) => this.combination = v,
      error: (e) => console.error('Error on onSubmit: ',e)
    }) 
  }

  updateButtonStates() {
    this.isPreviousDisabled = this.combinationIndex === 1;
    this.isNextDisabled = this.combinationIndex === this.combinationService.totalCombinations;
  }

  nextCombination()
  {
    if (this.combinationIndex < this.combinationService.totalCombinations) {
      this.combinationIndex++;
      this.getCombination();
      this.updateButtonStates();
    }
  }

  previousCombination()
  {
    if (this.combinationIndex > 1) {
      this.combinationIndex--;
      this.getCombination();
      this.updateButtonStates();
    }

  }

  navigateTo(url:string)
  {
    this.router.navigate([url]); 
  }
}
