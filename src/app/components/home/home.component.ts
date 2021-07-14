import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public users : any = []
  public errorMsg :any = ""
  private userEndpoint = "https://api.github.com/users"
  private routeSub!: Subscription;
  private userSub!: Subscription;
  private usern = ""
  constructor(
    private userService : UserService,
    private router: Router,
    private activatedRoute : ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      let un = String(params.get("username"))
      console.log("username : ",un)
      this.usern = un
    })

    this.routeSub = this.activatedRoute.params.subscribe((params: Params)=>{
      if(params['username']){
        this.searchUser(params['username'])
      }else{
        this.searchUser()
      }
    })
  }

  searchUser(search?: string): void{
    this.errorMsg = ""
    this.users = []
    this.userSub = this.userService.getUsersList(search).subscribe(data => {
      console.log("data.length : ",data.length) 
      if(data.length){
        this.users = data
      } else {
        this.users = []
        this.users.push(data)
      }
    }, err => this.errorMsg = "User not found")
  }

  showUserDetails(username:string){
    this.router.navigate(['userdetails', username])
  }

  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
