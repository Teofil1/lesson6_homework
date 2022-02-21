import { User } from './models/user';
import { Component, OnInit } from '@angular/core';
import { LoadingIndicatorService } from './services/loading-indicator.service';
import { UserService } from './services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  users: User[] = [];

  isAddingMode: boolean = true;
  isUpdatingMode: boolean = false;

  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    job: new FormControl('', Validators.required),
  });

  constructor(private userService: UserService, public loadingIndicator: LoadingIndicatorService) {}

  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe((response: any) => {
        this.users = response.data;
      })
      
  }

  changeMode(){
    this.isAddingMode = !this.isAddingMode;
    this.isUpdatingMode = !this.isUpdatingMode;
  }

  showAddingUser() {
    this.changeMode();
    this.form.patchValue({
      id: '',
      name: '',
      job: '',
    })
  }

  showUpdatingUser(user: User) {
    this.changeMode();
    this.form.patchValue({
      id: user.id,
      name: user.first_name,
      job: user.job,
    })
  }

  onSubmit(){
    if(this.isAddingMode){
    this.userService.addUser(this.form.value)
      .subscribe((data: any) => {
        this.users.push({
          "id": data.id,
          "first_name": data.name,
          "job": data.job
        });
      })
    } else {
    this.userService.updateUser(this.form.value)
      .subscribe((data: any) => {
        const updatedUser = this.users.find(user => user.id == data.id);
        if(updatedUser){
          updatedUser.first_name = data.name;
          updatedUser.job = data.job;
        }
      });
    }
    if(this.isUpdatingMode){
      this.showAddingUser();
    }
  }

  deleteUser(user: User) {
    if(confirm("Are you sure to delete user with id: " + user.id + "?")) {
      this.userService.deleteUser(user)
      .subscribe((data: any) => {
        const userIndex = this.users.indexOf(user);
        this.users.splice(userIndex, 1);
      });
      this.showAddingUser();
    }
  }

}
