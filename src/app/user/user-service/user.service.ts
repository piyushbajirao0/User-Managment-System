import { Injectable } from '@angular/core';
import { User } from '../user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];
  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private dataArray: any = [{
    id: Math.random().toString(16).slice(2),
    firstName: "John",
    lastName: "Doe",
    address: "123 Main St",
    email: "john@example.com",
    phone: "1234567890"
  }]

  constructor() {    
    this.usersSubject.next([...this.dataArray]);
    console.log(this.users);
   }

  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  addUser(user: User) {
    this.getUsers().subscribe((res) => this.users = res);
    const existingUserIndex = this.users.findIndex(u => u.email === user.email);
    if (existingUserIndex !== -1) {
      return false;
    } else {
      this.users.push(user);
      this.usersSubject.next([...this.users]);
      return true;
    }
  }

  async editUser(user: User) {
    this.getUsers().subscribe((res) => this.users = res);
    const existingUserIndex = this.users.findIndex(u => u.id === user.id);
    if (existingUserIndex === -1) {
      console.error('User not found');
      return;
    }
    this.users[existingUserIndex] = user;
    this.usersSubject.next([...this.users]);
  }

  getUserById(userId: string): Observable<any> {
    var users: any = null;
    this.getUsers().subscribe((res) => {users = res});
    return users.find((o: any) => o.id == userId);
  }

  deleteUser(userId: string): void {
    this.users = this.users.filter(user => user.id !== userId);
    this.usersSubject.next([...this.users]);
  }
}
