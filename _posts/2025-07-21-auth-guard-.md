---
layout: post
title: "Auth Guard :"
date: 2025-07-21
categories: [frontend, angular]
tags: [typescript, frontend, networking]
author: "GGurkhude"
excerpt: "Learning notes on auth guard :"
original_path: "React_Angular/Angular/Angular_3.md"
---

# Auth Guard : 
### - Protect routes based on authentication status.
  - EX:
```ts
// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
```
   - USE: mention in path 
    - EX
       ```ts
       const roues:Routes=[{
        path: 'user',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        resolve: {
            initialData: initialDataResolver,
        },
        children: [
            {
                path: 'documentations',
                loadChildren: () => {
                    return import(
                        'app/modules/abc/abc.routes'
                    );
                },
            },
        ]},
        ]
       ```
# Interceptor : 
### - To automatically add the token to requests, you can use an HTTP interceptor.
 - EX:
```ts
// auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}
```

  - ### need to register this interceptor in Module 
```ts
  // app.module.ts
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class AppModule {}
```

# Provider:
### - A provider tells Angular how to create or obtain a value for a specific dependency, usually a service, and inject it where required
 - ### Types of Providers:
    ### 1.  `Class Providers`: 
    - These are the most common providers. 
    - They create an instance of a service by calling new on a specified class.
        ```ts
        providers: [
            { provide: AuthService, 
                useClass: AuthService 
            }
        ]
        
        ```
    - Same: `providers: [AuthService]`
    ### 2.  ` Value Providers:`
     - Value providers supply a static value, which can be useful for configuration values or constants.
        ```ts
            providers: [
              { provide: 'API_URL', useValue: 'https://api.example.com' }
            ]
        ```
    ### 3. `Factory Providers:`
    -  These allow you to create a service or dependency using a factory function. 
    - This is useful when the instance requires some logic to be created.
        ```ts
           providers: [
              {
                provide: AuthService,
                useFactory: (http: HttpClient) => new AuthService(http),
                deps: [HttpClient]
              }
            ]
        ```
    ### 4. `Existing Providers`:
    - This provider lets you provide one service as an alias for another. 
    - This is helpful when different parts of the application use different tokens or service names.
        ```ts
            providers: [
              { provide: BaseService, useExisting: AuthService }
            ]
        ```
### Configuring Providers:

### 1. Root-level (Singleton) Providers:
- By adding a service in the @Injectable decorator with { providedIn: 'root' }, the service is registered at the root injector level, meaning a single instance is shared across the entire app.
```ts
@Injectable({
  providedIn: 'root'
})
export class AuthService { }
```
### 2. Module-level Providers: 
- Services registered in a module (like AppModule or SharedModule) are available to components, directives, and pipes declared in that module and any modules that import it.
```ts
@NgModule({
  providers: [AuthService]
})
export class AppModule {}
```

### 3. Component-level Providers: 
- Services provided in the providers array of a component are unique to that component and its child components. This is useful when you want a service instance to be used only within a specific component scope.

```typescript
@Component({
  selector: 'app-login',
  providers: [AuthService]
})
export class LoginComponent {}
```