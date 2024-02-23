import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user-service/user.service';
import { User } from '../../user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  searchText: any = '';

  constructor(private userService: UserService,
		private router: Router,) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (res) => {
        this.users = res;
      },
      (err) => {
      }
    )
    console.log(this.users);
  }

  deleteUser(userId: string): void {
    this.userService.deleteUser(userId);
  }

  onEditUser(userId: string) {
    this.router.navigate(['user/user-upset', { id: btoa(userId) }]);
  }

  onClickOfAddUser() {
    this.router.navigate(['user/user-upset']);
  }

  onDeleteUser(index: number) {
    this.users.splice(index, 1);
  }
}
