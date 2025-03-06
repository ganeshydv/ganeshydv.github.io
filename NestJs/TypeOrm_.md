
## Onet-to-Many :
- ### User Entity (One User has Many Posts)
   ```ts
   import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
   import { Post } from "./Post";
   
   @Entity()
   export class User {
     @PrimaryGeneratedColumn()
     id: number;
   
     @Column()
     name: string;
   
     // One user can have many posts
     @OneToMany(() => Post, post => post.user) //params: 1. Related entitt 2. link Post back to USer 
     posts: Post[];
   }
   ```
## Many -to-one :
- ### Post Entity (Many Posts belong to One User)
    ```ts
    import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
    import { User } from "./User";
    
    @Entity()
    export class Post {
      @PrimaryGeneratedColumn()
      id: number;
    
      @Column()
      title: string;
    
      @Column()
      content: string;
    
      // Many posts belong to one user
      @ManyToOne(() => User, user => user.posts) //params : 1. type 2. links posts to User - reverse
      user: User;
    }
    ```
## Explanation of Decorators:
1. ### `@OneToMany(() => Post, post => post.user)`:

   - This is used in the User entity, indicating that one user can have many posts.
   - The function () => Post tells TypeORM the type of the related entity.
   - The post => post.user part establishes the inverse side of the relation, linking the post back to its associated user.

2. ### `@ManyToOne(() => User, user => user.posts)`:

   - This is in the Post entity, indicating that each post belongs to one user.
   - user => user.posts refers to the inverse side of the relationship, where posts are associated with the User.

3. `@JoinColumn() (Optional)`:

   - If you want more control over how the foreign key is named in the database, you can use @JoinColumn() on the owning side (i.e., the Post entity in this case). If you don’t use this, TypeORM will automatically manage the foreign key column.

## Foreign Key : Join Column
- **if  don't specify joincolumn() then typeOrm automatically manages foreign key column**
- ### User Entity (One User has Many Posts) 
    -  No changes needed in the One-to-Many side because the foreign key is managed on the Many-to-One side.
    - ```java
      import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
      import { Post } from "./Post";
      
      @Entity()
      export class User {
        @PrimaryGeneratedColumn()
        id: number;
      
        @Column()
        name: string;
      
        @OneToMany(() => Post, post => post.user)
        posts: Post[];
      }
      ```       
- ###  Post Entity (Many Posts belong to One User)
   - ```java
      import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
      import { User } from "./User";
      
      @Entity()
      export class Post {
        @PrimaryGeneratedColumn()
        id: number;
      
        @Column()
        title: string;
      
        @Column()
        content: string;
      
        @ManyToOne(() => User, user => user.posts)
        @JoinColumn({ name: "user_id" }) // Customizing the foreign key column name
        user: User;
      }
     ```
- ### Explanation:
    - @JoinColumn({ name: "user_id" }):
        - The foreign key column in the Post table will be named user_id instead of the default userId.
    - Owning Side:
        - The @ManyToOne side is the owning side, and this is where @JoinColumn() is used
- ### Tables :
     ```sql
       <!--  User Table: -->
       +----+------+
       | id | name |
       +----+------+
       | 1  | John |   
       +----+------+ 
       <!-- Post Table: -->
       +----+---------+---------+---------+
       | id | title   | content | user_id |
       +----+---------+---------+---------+
       | 1  | Post 1  | Content | 1       |
       | 2  | Post 2  | Content | 1       |
       +----+---------+---------+---------+
     ```
 - ### Fetching Relations
    1. **Fetch a User with Their Posts**:
         ```ts 
          const userRepository = getRepository(User);
         const user = await userRepository.findOne({
           where: { id: 1 },
           relations: ["posts"], // Load related posts
         });
         console.log(user);
         ```
    2. **Fetch a Post with Its User**:
         ```ts
         const postRepository = getRepository(Post);
         const post = await postRepository.findOne({
           where: { id: 1 },
           relations: ["user"], // Load the related user
         });
         console.log(post);
         ```
- ### Advanced Customization with @JoinColumn()
   - Composite Keys: 
       - Use @JoinColumn() for composite keys by specifying multiple columns:   
       ```ts
       @JoinColumn([
         { name: "user_id", referencedColumnName: "id" },
         { name: "user_type", referencedColumnName: "type" },
       ])
       ```
    - Bidirectional Relationships: 
       - You only need @JoinColumn() on the owning side. On the inverse side, just reference the owning side without @JoinColumn().