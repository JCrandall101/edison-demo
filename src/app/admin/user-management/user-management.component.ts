import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/class/user.obj';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users:User[] = [
    {
      firstName:'Jon',
      lastName:'Crandall',
      email:'crandall@ficonsulting.com',
      phoneNumber:'301-922-8804',
      password:'XXXX',
      isActive:true
    },
    {
      firstName:'Jon',
      lastName:'Hill',
      email:'hill@ficonsulting.com',
      phoneNumber:'###-###-####',
      password:'XXXX',
      isActive:false
    },
    {
      firstName:'Prachi',
      lastName:'Sinha',
      email:'sinha@ficonsulting.com',
      phoneNumber:'xxx-xxx-xxxx',
      password:'XXXX',
      isActive:true
    },
    {
      firstName:'John',
      lastName:'Tkacik',
      email:'john.tkacik@reeep.org',
      phoneNumber:'xxx-xxx-xxxx',
      password:'XXXX',
      isActive:true
    },
    {
      firstName:'Merja',
      lastName:'Laakso',
      email:'merja.laakso@reeep.org',
      phoneNumber:'xxx-xxx-xxxx',
      password:'XXXX',
      isActive:true
    }
  ];
  displayAdd:boolean = false;
  displayEdit:boolean = false;
  selectedUser:User;
  newUser:User={isActive:true};
  visible:boolean = true;

  constructor() { }

  ngOnInit() {
  }


  addUser(){
    this.displayAdd = false;
    this.users.push(this.newUser);
    this.newUser = {isActive:true};
    this.updateVisibility();
  }
  cancelUser(){
    this.newUser = {};
    this.displayAdd = false;
  }
  displayAddUser(){
    this.displayAdd = true;
  }

  editUser(user:User){
    console.log(user);
    this.selectedUser = user;
    this.displayEdit = true;
  }

  saveUser(){
    this.displayEdit = false;
  }
  deactivateUser(){
    this.selectedUser.isActive = !this.selectedUser.isActive;
    this.displayEdit = false;
  }

  //PrimeNG was having issue with Updating table content. Use this to refresh table
  updateVisibility(): void {
    this.visible = false;
    setTimeout(() => this.visible = true, 0);
  }

}
