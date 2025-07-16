
# @Controller
```java
@Controller
public class GreetController {

    @GetMapping("/greet")
    @ResponseBody
    public String greet() {
        return "Hello!";
    }
}

@Controller
public class EmployeeController {

    @GetMapping("/employee")
    @ResponseBody
    public Employee getEmployee() {
        return new Employee(1L, "John");
    }
}

```
# @ResponseBody
- `@ResponseBody` tells Spring to write the method return value directly to the HTTP response body, instead of rendering a view (like JSP or Thymeleaf).

> The return value is usually serialized as JSON (or XML), depending on the `Accept header`.
- If you don’t use @ResponseBody, Spring assumes you want to return a view name, like greet.jsp.
- Not Needed in @RestController
# @RestController
- Combines `@Controller` + `@ResponseBody`
- Tells Spring:
   - This class handles HTTP requests
   - Return values from methods should be automatically serialized to JSON (or XML)

```java
//  @RestController
@RestController
public class GreeController{
    @GetMapping("/greet")
    public String greet(){
        return "Hello";
    }
}
//  @Controller
@Controller
public class GreetController {

    @GetMapping("/greet")
    @ResponseBody
    public String greet() {
        return "Hello!";
    }
}

```

### 🔁 `Without @RestController, you'd have to manually annotate class with @Controller and each method with @ResponseBody.`

# RequestMapping()
- Maps HTTP request to classes or Methods
- Can define:
   1. `Class level`: Base path 
   2. `Method Level`: Specific HTTP method + path 
```java
@RestController
@RequestMapping("/api")
public class GreetController {
    @GetMapping("/greet")
    public String greet(){
        return "Hello";
    }

    @RequestMapping("/v1/greet")
    public String greetV1(){
        return "Hello";
    }
     @RequestMapping(value="/v2/greet",Method=RequestMethod.GET)
    public String greetV2(){
        return "Hello";
    }
}
```
# @GetMapping
- Shortcut for: `@RequestMapping(method=Request.GET)`

## Summary

| Annotation       | Purpose                               | Used On     |
|------------------|----------------------------------------|-------------|
| `@RestController`| Marks class as a REST API controller   | Class       |
| `@RequestMapping`| Maps URL paths (any HTTP method)       | Class/Method|
| `@GetMapping`    | Maps GET requests (shortcut)           | Method      |

# Post Handling:
1. Create DTO(model) class
2. `@PostMapping()`: automatically maps to dto
3. Body Mapping: `@RequestBody`

```java
class GreetBodyDto{
    private String name;
    public void setName(String name){
        this.name=name;
    }
    public Sting getName(){
        return name;
    }

}
class GreetResponse{
    private String message;
    public void setMessage(String message){
        this.message=message;
    }
}

@RestController
class GreetController{
  @PostMapping("/greet")
  public GreetResponse greetUser(@RequestBody GreetBodyDto greetBody){
    GreetResponse response=newn GreetResponse();
    response.setMessage("Message Sent to user"+greetBody.getName());
    return response;
  }
}

```
# 🧭 Spring Boot Parameter Binding Annotations
## Path Variable (Path Param) + Request Param (Query param)
- Example 1:
```java
   @PostMapping("/greet/{name}")
    public GreetResponse greetUser(@RequestBody GreetRequest request,@PathVariable("name") String namePathParam,@RequestParam("id") int id) {
        String message= "Hello "+request.getName()+"!";
        GreetResponse response=new GreetResponse();
        response.setName(namePathParam);
        response.setId(id);
        response.setMessage(message);
        return response;
    }
```
- Example 2:

```java
    @GetMapping("/greet/v1/{name}")
    public GreetResponse greetUser2(@PathVariable String name,@RequestParam int id){
        String message= "Hello!";
        GreetResponse response=new GreetResponse();
        response.setName(name);
        response.setId(id);
        response.setMessage(message);
        return response;
    }
```

| Annotation      | Used to extract data from  | Example usage                          |
| --------------- | -------------------------- | -------------------------------------- |
| `@PathVariable` | URL **path**               | `/users/{id}` → `@PathVariable int id` |
| `@RequestParam` | Query **parameters**       | `/search?name=John` → `@RequestParam`  |
| `@PathParam`    | (JAX-RS) Path **segments** | Rarely used in Spring (more in JAX-RS) |

## Response JSON or xML
- Spring automatically supports content negotiation, allowing responses in different formats
(e.g., JSON, XML) based on Accept headers.
- Example
```java
@GetMapping(value = "/info", produces = { MediaType.APPLICATION_JSON_VALUE,
MediaType.APPLICATION_XML_VALUE })
public User getInfo() {
return new User(1L, "Alice");
}
```
-  Request Accept: application/json → JSON
-  Request Accept: application/xml → XML