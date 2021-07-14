import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { IRepos } from 'src/app/repos';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  private username : string = ""
  public user: any
  public repos: any = []
  routeSub! : Subscription
  userSub! : Subscription
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.username = params['username'];
      this.getUserDetails(this.username);
      this.getReposDetails(this.username);
    });
  }

  getUserDetails(username: string): void {
    this.userSub = this.userService
      .getUserDetails(username)
      .subscribe((data: IUser) => {
        this.user = data;
      })
  }

  getReposDetails(username: string): void {
    this.userSub = this.userService
      .getUserRepos(username)
      .subscribe((data: IRepos[]) => {
        data.length>0? this.repos = data.slice(0,8): this.repos = []
      })
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
