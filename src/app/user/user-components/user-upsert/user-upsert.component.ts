import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../user-service/user.service';
import { User } from '../../user.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-upsert',
  templateUrl: './user-upsert.component.html',
  styleUrls: ['./user-upsert.component.css']
})
export class UserUpsertComponent implements OnInit {
  private userId: string = "";
  userForm: any = FormGroup;
  submitted = false;
  isAddMode: boolean = false;

  constructor(private fb: FormBuilder, 
    private userService: UserService,
    private router: Router,
		public actvtd: ActivatedRoute,) {
  }
    
  ngOnInit(): void {
    this.actvtd.params.subscribe((params) => {
      this.userId = atob(params.id);
      this.isAddMode = this.userId ? true : false;
    });
    this.fetchFormBuilder();
  }
  
  fetchFormBuilder() {    
    this.userForm = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
    if (this.userId) {      
      this.onEdit(this.userId);
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  async onSubmit() { 
    this.submitted = true;
    if (this.userForm.valid) {
      const user: User = this.userForm.value;
      if (user.id) {
        this.userService.editUser(user);
      } else {
        const savedData: boolean = await this.userService.addUser({ ...user, id: Math.random().toString(16).slice(2)});
        if (savedData) {
          this.userForm.reset();
          this.goBack();
        } else {          
          alert('User with email already exists');
          return
        }
      }
    }
  }

  onEdit(userId: string) {
    const data: any = this.userService.getUserById(userId);
    this.userForm.patchValue(data);
  }

  goBack() {
    this.router.navigate(['user/user-list']);    
  }
}
