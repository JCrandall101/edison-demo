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
  display:boolean = false;
  selectedUser:User;

  constructor() { }

  ngOnInit() {
  }

  editUser(user:User){
    console.log(user);
    this.selectedUser = user;
    this.display = true;
  }

  saveUser(){
    this.display = false;
  }
  deactivateUser(){
    this.selectedUser.isActive = !this.selectedUser.isActive;
    this.display = false;
  }

}
