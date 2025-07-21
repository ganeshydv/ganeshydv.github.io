
@RestController
@RequestMapping("/api/users")
public class UserController{
    @Autowired
    private UserService userService;

    @RequestMapping(value="{id}",method=RequestMethod.GET)
    public User getUserById(@PathVaribale("id") int id){
        return this.userService.getUserById(id);
    }
}