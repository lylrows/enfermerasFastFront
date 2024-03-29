import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { IResolvedRouteData, ResolverHelper } from '../../../utils/resolver-helper';

import { FirebaseProfileModel } from './firebase-profile.model';
import { FirebaseAuthService } from '../firebase-auth.service';

//import { UserService } from '../../../user/user.service';


@Component({
  selector: 'app-firebase-profile',
  templateUrl: './firebase-profile.page.html',
  styleUrls: [
    './styles/firebase-profile.page.scss',
    './styles/firebase-profile.shell.scss'
  ]
})
export class FirebaseProfilePage implements OnInit {
  // ? Gather all component subscription in one place. Can be one Subscription or multiple (chained using the Subscription.add() method)
  subscriptions: Subscription;
  user: FirebaseProfileModel;
  image: string="";

  @HostBinding('class.is-shell') get isShell() {
    return (this.user && this.user.isShell) ? true : false;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public authService: FirebaseAuthService,
    //private userService: UserService
  ) {}

  ngOnInit() {
    
    this.getdata();
  }

  getdata(){
    this.subscriptions = this.route.data
    .pipe(
      // ? Extract data for this page
      switchMap((resolvedRouteData: IResolvedRouteData<FirebaseProfileModel>) => {
        //console.log('profile',ResolverHelper.extractData<FirebaseProfileModel>(resolvedRouteData.data, FirebaseProfileModel));
        return ResolverHelper.extractData<FirebaseProfileModel>(resolvedRouteData.data, FirebaseProfileModel);
      })
    )
    .subscribe({
      next: (state) => {
        this.user = state;
        //this.userService.usuario=state;
        ////console.log(this.userService.usuario);
        
        this.image = (this.user.image || "").split('=')[0];
        // if (typeof this.image === 'string') {
        //   this.image = (this.user.image || "").split('=')[0];
        //   //console.log(this.image);
        // } else {
        //   // 👇️ this runs
        //   //console.log('The variable does NOT store a string');
        // }
      },
      error: (error) => console.log(error)
    });
  }

  public async signOut(): Promise<void> {
    try {
      // * 1. Sign out on the native layer
      await this.authService.signOut()
      .then((result) => {
        // ? Sign-out successful
        // ? Replace state as we are no longer authorized to access profile page
        this.router.navigate(['firebase/auth/sign-in'], { replaceUrl: true });
      })
      .catch((error) => {
        console.log('userProfile - signOut() - error', error);
      });
    } finally {
      console.log('userProfile - signOut() - finally');
    }
  }

  // ? NOTE: Ionic only calls ngOnDestroy if the page was popped (ex: when navigating back)
  // ? Since ngOnDestroy might not fire when you navigate from the current page, use ionViewWillLeave to cleanup Subscriptions
  ionViewWillLeave(): void {
    this.subscriptions.unsubscribe();
  }
}
