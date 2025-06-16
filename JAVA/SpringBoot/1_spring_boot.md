## Spring Boot
- No Seperate Server Initialization
- No Seperate Servlet for handling API
- No Seperate JPA for DB operations



## Request Flow:
`Client → DTO (validations) → Controller → Service → Entity(Table) → Repository(DAO-for CRUD) → DB`

## ✅ **Key Concepts**

| Term   | Stands For            | Responsibility                         | Maps To DB? | Layer                 |
|--------|------------------------|-----------------------------------------|--------------|------------------------|
| DTO    | Data Transfer Object   | Moves data between layers or systems    | ❌ No         | Controller ↔ Service   |
| Model  | General term           | Depends on usage                        | Maybe         | Varies                 |
| Entity | Entity class (JPA)     | Maps Java object to DB table            | ✅ Yes        | Persistence Layer      |
| DAO    | Data Access Object     | Interface/class to access data source   | ❌ (works with Entity) | Repository Layer       |
