import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CombinationService } from '../../../services/combination.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-combination-input',
  templateUrl: './combination-input.component.html',
  styleUrl: './combination-input.component.scss'
})
export class CombinationInputComponent {
  form!: FormGroup;
  totalCombinations: number | null = null;

  constructor(private fb: FormBuilder, private combinationService:CombinationService,
    private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm()
  {
    this.form = this.fb.group({
      value: [ null, [Validators.required, Validators.min(1), Validators.max(20)]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const val = this.form.value?.value;

      this.combinationService.start(val).subscribe({
        next: (v) => this.totalCombinations= v,
        error: (e) => console.error('Error on onSubmit: ',e),
    })  
     }
  }

  navigateTo()
  {
    this.router.navigate(['/combination-item']); 
  }
}
