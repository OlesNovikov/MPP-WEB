import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';
import { User } from 'src/models/user';
import { HttpRequestService } from '../services/httpRequest.service';

const POST_LOGIN = gql`
query LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
        content {
            user {
                password,
                id,
                username,
                email,
                updatedAt,
                createdAt
            },
            token
        },
        status
    }
}
`

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  user: User = new User();
  errorAlert = { isActive: false, message: '' };
  private querySubscription: Subscription

  constructor(
    private httpService: HttpRequestService,
    private router: Router,
    private apollo: Apollo
  ) { 
      this.querySubscription = new Subscription();
  }

  ngOnInit(): void {
  }

  closeAlert() {
    this.errorAlert = { isActive: false, message: ''};
  }

  LogInUser(user: User) {
    this.querySubscription = this.apollo.watchQuery({
        query: POST_LOGIN,
        variables: {
            email: user.email,
            password: user.password
        }
    }).valueChanges.subscribe((data: any) => {
        console.log(data);
        console.log(data.data.loginUser.status);
    });
  }

//   LogInUser(user: User) {
//     this.httpService.post('login', user).subscribe(data => {
//       localStorage.setItem('userToken', data.token);
//       this.router.navigateByUrl('tasks');
//     },
//     (error) => {
//       console.log(error);
//       let message = ' ';
//       if (error.error.message) {
//         error.error.message.forEach((element: string) => {
//           message += element + '; ';
//         });
//       }
//       else {
//         message += 'Server connection aborted';
//       }

//       this.errorAlert = { isActive: true, message: message };
//     });
//   }

}
