## Divide in 3 Parts:

### 1) Routing - module = { imports + controllers + Providers} i.e. use of inbuilt methods
```
-] Valdiations- 1) Pipe : Query and params Valdiations
                2) DTO : for BODY Valdiation
-] Interceptor- 
```
### 2) Configuration -
  - in main module i.e. AppModule : it is a ROOT module
    if isGlobal is set to true  then this module will be available for all other modules
  - configModule is used to add Configuration
  - db config + other config use Custom config files  

  - 1) const obj of config type
  - 2) validator class 
  - 3) registerAs (inbuilt method) - 
  `ConfigObject or ConfigFactory + ConfigModule.forRoot({load:[configFiles]})`
  - importing constants from ENV file or loading from another object
### 3) Database Connection
   - 2 ways: using
   ```
       1) DataSource - from typeorm (DataSource + DataSourceOptions)
       - used for MIGRATION + DB Connection
        -->to use/initialize 2 options: 1) DataSource.initialize() 
                                    or   2) TypeOrmModule.forRoot()
       2) TypeOrmModule + TypeOrmModuleOptions 
        -->to initialize : 1) TypeOrmModule.forRoot()
  ```
---
# [ general ways to connect DB in Global Scope]


- 1]  DataSource (TYPEORM) + DataSource.initialize() (this approach is general)
    : TYPEORM
    - perform CRUD using instance of DataSource

- 2] [Connection() = createConnection( {config obj} )]. getConnection()
    : TYPEORM
    - perform CRUD using instance of Connection 
- 3] DataSource directly

- Accesing using 
    1) Repository 
    2) EntityManager 
    3) DataSource 
    4) Connection
    5) queryBuilder
#
## [ To connect in Module Scope]:
```
      1]  DataSource + DataSourceOptions + TypeOrmModule.forRoot()
          : TYPEORM

      2]  TypeOrmModuleOptions + TypeOrmOptionsFactory + TypeOrmModule.forRoot()
          : @nestJs/typeorm

      3] TypeOrmModule.forRoot( { config details } ) : directly

      4] TypeOrmModule.forRootAsync ( {
        useClass:
        dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
      })

      5] TypeOrmModule.forRootAsync ( { 
        useFactory:(confiService:ConfigService)=>({ configObj}),
        inject:[ConfigService]

      })
```
-----------------

## 1] DataSource : [typeorm] module used for establishing connection between NestApp and DB 
- it can be used to connect DB with NestApp
- it registers Entity/Table and we can perform operation on these
   tables using 
  1) EntityManager 
  2) Repository  both are part of DataSource [typeorm]
  3) DataSource
  4) Connection
  5) Repository_ queryBuilder
(https://typeorm.io/data-source)
(https://typeorm.io/working-with-repository)
- to use DataSource to connect with DB 
1) create DataSourceOptions using DataSource- contains db Configuration
2) use this DataSourceOptions in TypeOrmModule.forRoot()

## 2] EntityManager: part of DataSource used to manage all Entities
## 3] Repository : part of DataSource used to manage Entity
- manage means CRUD operation on tables
## 4] ConfigService : to use env file varibales
- to access const values of Configuration we can use 

## always remember:
1) Entity is always seperate means you can first create entity/table 
    and then register it with Database connection or Module where you
    want to use
2) DB config can be done using 
    1) directly in  -> **TypeOrmModule.forRoot()** or
    2) **DataSource (TYPEORM) + DataSourceOptions (TYPEORM) +
     TypeOrmModule.forRoot()**  or 
    3) **DataSource (TYPEORM) + DataSource.initialize()** (this approach is general)
    4) **TypeOrmModuleOptions (nestJs/typeorm) + TypeOrmModule.forRoot()**
      -TypeOrmModuleOptions used to config DB
    5) use **directly TYPEORM** ( connection and createConnection ) in each service
      - this will create new instance if DB for each request-
3) always register Entity in 1) DB config 2) Module where to use
4) DTO : it is only for VALIDATION + TRANSFORMATION + Interceptor (in Response)
      - for Interceptor : use pipe + service in module
      - for transform use Include() and Exclude()
5) Controller : only for route handling
6) Entity: it is table also called Repository 
  - Entity is injected in service to perform CRUD on it i.e. table
7) each service can be enjected independently in each module but it will not be
 
----
## singleton service means for each module:
- SOLUTION : 
  1.  if you want to use the same object of service for all other 
  modules then you have to use MODULE instead of service ,means export 
  the service from module and use that module in each service so each 
  other module can have same service object
  {
    If you want to use the same instance of a service across multiple modules 
  in NestJS, you can achieve this by exporting the service from the module 
  where it's defined and then importing that module into the modules where
   you want to use the service. This way, you'll have a single shared 
   instance of the service across all the modules.
   }
  -By default, providers have a singleton scope within their module, 
  meaning a single instance is shared among all components within that module.

## DataSource vs Connection 
```
> EntityCondition  - to GET or Find DB
> FindOptionsWhere - to GET or Find one or many DB 
> deepPartial   - to UPDATE DB
> DTO  - for Validation/Swagger/Create/Update
```
------------------
## how to use one service in another service
1) Injectable 
2) use directly in constructor as usual
3) make sure to registern both services in same module
----------------