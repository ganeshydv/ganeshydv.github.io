
## Structure :

### 1. Components 
  - Ts + HTML + CSS
  - cmd :ng generate component path_name

### 2. Service 
  - TO share same data or methods between components
  - Accessable to multiple components and Prserves STATE
  - i.e. if one component changes something will be 
    changed for others as well
  - CMD: ng generate service path_name

### 3. Module
  - can have multiple modules

### 4. Routes 
  - Used to map componets or modules to specific route

### 5. App Config
  - to Register routes and Components

### 6. BootStrap App
  - To Start app by loading Config and index Component : <router-outlet></router-outlet>- in built

## ========================================

## Structure:
1. Components [CSS+TS+HTML] --> Module
2. Routes[Components] + Module --> RoutingModule --> MainRoute --> Config --> bootstarp
gi
## ------------------------------------------

### Property Binding
  - to set valued dynamically 
  - <img alt="photo" [src]="imageURL">
  - [] : property binding syntax
  - in this can set value of src to property of imageURL from component class

### Event Handling
  - () : event binding syntax
  - import {Component} from '@angular/core';
    @Component({
        selector: 'app-root',
        template: `<button (click)="greet()">`,
        standalone: true,
    })
    class AppComponent {
        greet() {
            console.log('Hello, there 👋');
        }
    }

### Component Communication with
### @Input : data from parent to child
  - like PROPS in React
  - from parent to child

class UserComponent {
  @Input() occupation = '';
}
@Component({
  ...
  template: `<app-user occupation="Angular Developer"><app-user/>`
})
class AppComponent {}

### @Output : data from child to Parent
  - in child create eventEmitter and emit when need to send data to parent
  - create eventEmitter and emitMerhod in child
  - uses prperty binding syntax

### Two Way binding : [()] : Propery + Event Binding
  - For two-way data binding to work, the @Output() property must use the pattern, 
  inputChange, where input is the name of the @Input() property. For example, 
  if the @Input() property is size, the @Output() property must be sizeChange.
WX: 

export class SizerComponent {
  @Input() size!: number | string;
  @Output() sizeChange = new EventEmitter<number>();
  dec() {
    this.resize(-1);
  }
  inc() {
    this.resize(+1);
  }
  resize(delta: number) {
    this.size = Math.min(40, Math.max(8, +this.size + delta));
    this.sizeChange.emit(this.size);
  }
}

<div>
  <button type="button" (click)="dec()" title="smaller">-</button>
  <button type="button" (click)="inc()" title="bigger">+</button>
  <span [style.font-size.px]="size">FontSize: {{size}}px</span>
</div>
-- APP --
<app-sizer [(size)]="fontSizePx"></app-sizer>
<div [style.font-size.px]="fontSizePx">Resizable Text</div>

## =================================================

### @defer : to lazy load component
- viewport: Deferrable views have a number of trigger options. 
Add a viewport trigger so the content will defer load once it enters the viewport


@component({
    selector: 'app-root',
    teplate: '
    @defer (on viewport){
  <comments />   --> this is selector of ClassNameOFComponent
} @placeholder {
  <p>Future comments</p>
} @loading (minimum 2s) {
  <p>Loading comments...</p>
}',
imports: [ClassNameOFComponent]

})
class AppComponent{

}

==================================================

### Routing : Routes + providRouter + RouterOutlet

- 1. Create an app.route.ts file : app.routes.ts
import {Routes} from '@angular/router';
export const routes: Routes = [
    {
      path: '',
      component: HomeComponent,
    },
];

- 2. Add routing to provider : app.config.ts
import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};

- 3.  Import RouterOutlet in the component
import {RouterOutlet} from '@angular/router';
@Component({
  ...
  template: `
    <nav>
      <a href="/">Home</a>
      |
      <a href="/user">User</a>
    </nav>
    <router-outlet />
  `,
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent {}

- 4. Import RouterLink directive
...
import { RouterLink, RouterOutlet } from '@angular/router';
@Component({
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  ...
})

- 5. Add a routerLink to template
Add a routerLink to template
## ================================================

### Forms :
- type : 1. template-driven 
         2. reactive
- a] Templatate-Driven 
   - 1. Import FormsModule
   - 2. Add binding to the value of the input
    <label for="framework">
     Favorite Framework:
     <input id="framework" type="text" [(ngModel)]="favoriteFramework" />
    </label>

- b] Reactive Forms
    - 1. Import ReactiveForms module
    - 2. Create the FormGroup object with FormControls
    - 3. Link the FormGroup and FormControls to the form
    - 4. Add ngSubmit to the form

import {Component} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
    <form [formGroup]="profileForm" (ngSubmit)="handleSubmit()">
      <input type="text" formControlName="name" />
      <input type="email" formControlName="email" />
      <button type="submit">Submit</button>
    </form>

    <h2>Profile Form</h2>
    <p>Name: {{ profileForm.value.name }}</p>
    <p>Email: {{ profileForm.value.email }}</p>
  `,
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class AppComponent {
  profileForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
  });

  handleSubmit() {
    alert(this.profileForm.value.name + ' | ' + this.profileForm.value.email);
  }
}

## ==============================================
### Modules:
- 