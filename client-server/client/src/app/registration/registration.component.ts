import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { Queries } from 'src/models/queries';
import { User } from 'src/models/user';
import { HttpRequestService } from '../services/httpRequest.service';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css'],
    providers: [HttpRequestService]
})

export class RegistrationComponent implements OnInit {
    user: User = new User();
    errorAlert = { isActive: false, message: '' };
    private querySubscription: Subscription;

    constructor(
        private httpService: HttpRequestService,
        private router: Router,
        private apollo: Apollo
    ) { 
        this.querySubscription = new Subscription();
    }

    ngOnInit(): void {
    }

    public closeAlert() {
        this.errorAlert = { isActive: false, message: '' };
    }

    registrateUser(user: User) {
        this.querySubscription = this.apollo.watchQuery({
            query: Queries.Register,
            variables: {
                username: user.username,
                email: user.email,
                password: user.password,
            }
        }).valueChanges.subscribe((response: any) => {
            const data = response.data.registerUser.content;
            if (data) {
                localStorage.setItem('userToken', data.token);
            }
        });
    }

    //   registrateUser(user: User) {
    //     this.httpService.post(`registration`, user).subscribe(data => {
    //       this.user = data.user;
    //       localStorage.setItem('userToken', data.token);
    //       this.router.navigateByUrl('tasks');
    //     },
    //     (error) => {
    //       console.log(error.error.message);
    //       let message = ' ';
    //       error.error.message.forEach((element: string) => {
    //         message += element + '; ';
    //       });
    //       this.errorAlert = { isActive: true, message: message };
    //     });
    //   }
}
