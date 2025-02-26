## How Testing Works in Angulat ?

### - Jasmine: in built testing framework which executes test cases

### - Each test case is independent of each other : local storage remains common

### - TestBed is used to create test module/component/service


## 1. Component Testing - TestBed:

### Things to remember while testing

- Creating component using test Bed
- Injecting All providers/dependecies/modules/components/services
- Mocking providers/dependecies/modules/components/services
- Differet ways of mocking - 
   - while running test cases :`spyOn` - this **requires instance** of service/component
   - Before running test cases :`useValue,useClass`
- utilizing `HttpClientTestingModule` to check if any HTTP Request is made in functions
- **Get component instance**: Using `TestBed.createComponent(ComponentUsedInModule).componentInstance`
- **Get service instances**: using `TestBed.Inject(ServiceusedInModule)`
- **Fixture**:  `TestBed.createComponent(ComponentUsedInModule)`
- **To rerender HTML changes**: using  **detectChanges()** of Fixture `TestBed.createComponent(ComponentUsedInModule).detectChanges()` 
- **Get HTML DOM**: using `TestBed.createComponent(ComponentUsedInModule).debugElement`

## Creating Instance of Component, Service, HTML DOM, HTTP Mock
```ts
desribe(()=>{
    let someService:SomeService;
    let someComponent:SomeComponent;
    let httpMock:HttpTestingController;
    let fixture: ComponentFixture<SomeComponent>;
    let debugElement: DebugElement; //this will give access to DOM
    beforeEach(async()=>{
        await TestBed.configureTestingModule({
            imports:[HttpClientTestingModule],
            declarations:[SomeComponent],
            providers:[SomeService] //not mocking here can mock usig SpyOn when needed
        }).compileComponents();//this will create instance of components and will call constructor and ngOnit if OnIt is implemented by component

        httpMock=TestBed.inject(HttpTestingController);//mock http : verify() in afterEach to check any http request is made in test
        someService=TestBed.inject(SomeService);//access service to set/call/mock specific methods or properites
        fixture= TestBed.createComponent(SomeComponent);//this returns fixture(?)
        someComponent=fixture.componentInstance;  //access Component to set/call/mock specific methods
        debugElement=fixture.debugElement;  //can access HTML-DOM to check if element is visible or not
    })
    afterEach(()=>{
        httpMock.verify(); // this will check if any http request is made during call if there is any test will fail
        //use httptesingmodule will still call but will mock it so always use expect in method if http is being made
    })
   
})
```

##  Mocking - service: can be Done in different ways

### 1. In module it self : TO replace Object 
```ts
//directly mock - this will replace original class instance
Class MockSomeClass{
     method1(a,b):Observable<SomeType>{
         return '';
     }
}
 
describe('comonent',()=>{
   let service:SomeType;
   beforeEach(async()=>{
     await TestBed.configureTestingModule({
         imports:[
             HttpClientTestingModule,  //to mocks all http requests,
             RouterTestingModule, //to mocks internal page routing,
             OtherTestingModules
         ],
         declaration:[CustomComponents],
         providers:[
             //dependency
             {
                 provide:SomeService,
                 useValue:{
                     method1: (a,b)=>{
                         return 'value'
                     }
                 },
             },{
                 provide:SomeService2,
                 useClass:MockSomeClass
             }
         ]
     }).compileComponent(); //this will call constructor and ngOnInit() if OnInit is implemented by compoment
    
   })
})
```
### 2. In Test case: This can be used to mock specific method/property instead of complete Object

```ts
describe('SomeComponent',()=>{
    let someService:SomeService;
    let someComponent:SomeComponent;
    let fixture:ComponentFixture<SomeComponent>;
    let httpMock:HttpTestingController;
    let debugElement:DebugElement;
    
    beforeEach(async()=>{
        await TestBed.configureTestingModule({
            imports:[HttpClientTestingModule],//check if any HTTP request is made in fucntion = need to call verify() after each test
            providers:[SomeService],//if SomeService had dependencies use UseClass 
            declarations:[SomeCompent]
        }).compileComponents();
        someService=TestBed.ineject(SomeServive);
        httpMock=TestBed.inject(HttpTestingController);
        fixture = TestBed.createComponent(SomeComponent);
        someComponent = fixture.componentInstance;
        debugElement=fixture.debugElement;
        fixture.detectChanges();
    })

    afterEach(()=>{
        httpMock.verify();
    })

    it('someTest case',async(done)=>{
        //check html element is present
        const ele1 = debugElement.query(By.css('#id')).nativeElement;
        expect(ele1.textContent).toContain('1');

        // //call some service method
        // someService.method1();

        //mock some service method
        spyOn(someService,'method1').and.returnValue(of(['MockData']));

        //call component method to check if ui changes or data or property changes

        component.method1();
        expect(component.property).toBeTrue();

    })
})
```