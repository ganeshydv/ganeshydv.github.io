
## Spring Boot Exception Handling
### @ControllerAdvice: Class Level
### @ExceptionHandler: Method Level

### Example

```java
// Custom Exection
class UserNotFoundException extends RuntimeExcetion{
    UserNotFoundException(String message){
        super(message);
    }
}

//Global Exception Handler
@ControllerAdvice
class GlobalExceptionHanlder{
   @ExceptionHandler(UserNotFoundException.class)
   public ResponseEntity<?> HandleUserException(UserNotFoundException ex){
      return ResponsEntity.status(500).body(Map.of("error",ex.getMessage()));
   }
}
```