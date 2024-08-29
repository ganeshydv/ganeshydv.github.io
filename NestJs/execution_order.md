## Order of Execution
```typescript
Middleware --> Guards --> Interceptors (Before) --> Pipes[can be global] --> Controller/Route Handler --> Interceptors (After) --> Exception Filters (can be any time)
```

General way:
pipes [Data_Transform_Validation]--> Guards [AuthN_AuthZ] --> Interceptor [Logger_modify_request]--> Middleware --> Controller --> Interceptor [Modify_Response]

## Order of instances creation

In a NestJS application, the lifecycle of modules, providers (which include services), controllers, and middleware is managed by the NestJS dependency injection system. Here's a simplified version of how it works:

1] Modules: When the application starts, NestJS instantiates all the modules. The modules in the imports array of a module are loaded first, because they might be needed by the providers or controllers in the module.

2] Providers: After all the modules have been instantiated, NestJS instantiates the providers (which include services). Providers are instantiated in the order they are needed by the dependency injection system. This means that if a provider depends on another provider, the dependency will be instantiated first.

3] Controllers: After all the providers have been instantiated, NestJS instantiates the controllers. Like with providers, controllers are instantiated in the order they are needed by the dependency injection system.

4] Middleware: Middleware in NestJS is not managed by the dependency injection system, and it does not have instances like modules, providers, and controllers do. Instead, middleware is a function that is executed for every incoming request. The configure method in a module is where you set up middleware. This method is called after all the modules, providers, and controllers have been instantiated.

So, in your AppModule, the imports array modules are loaded first, then the CustomLoggerService provider is instantiated, then the APP_FILTER provider is instantiated with CustomErrorFilter, and finally the configure method is called to set up middleware.

