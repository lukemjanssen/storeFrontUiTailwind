# 🗄️ Complete Database Guide: MySQL + Hibernate + Spring Data JPA

## 📋 Table of Contents
1. [Architecture Overview](#architecture)
2. [The Entity Layer Explained](#entity-layer)
3. [The Repository Layer](#repository-layer)
4. [How Queries Work](#queries)
5. [MySQL Setup](#mysql-setup)
6. [Configuration Deep Dive](#configuration)
7. [Advanced Topics](#advanced)

---

## 1. Architecture Overview {#architecture}

### The Full Stack

```
┌────────────────────────────────────────────────────────┐
│  React Frontend (Port 5173)                            │
│  - Makes HTTP requests via Axios                       │
└──────────────────┬─────────────────────────────────────┘
                   │ HTTP Request
                   │ GET /api/v1/products
                   ▼
┌────────────────────────────────────────────────────────┐
│  ProductController (@RestController)                   │
│  - @GetMapping("/products")                            │
│  - Returns ResponseEntity<List<ProductDto>>            │
└──────────────────┬─────────────────────────────────────┘
                   │ Calls service
                   ▼
┌────────────────────────────────────────────────────────┐
│  ProductServiceImpl (@Service)                         │
│  - Business logic layer                                │
│  - productRepository.findAll()                         │
└──────────────────┬─────────────────────────────────────┘
                   │ Calls repository
                   ▼
┌────────────────────────────────────────────────────────┐
│  ProductRepository (interface)                         │
│  - extends JpaRepository<Product, Long>                │
│  - NO implementation code!                             │
│  - Spring generates at runtime                         │
└──────────────────┬─────────────────────────────────────┘
                   │ Spring Data JPA magic
                   ▼
┌────────────────────────────────────────────────────────┐
│  Spring Data JPA                                       │
│  - Creates proxy implementation                        │
│  - Delegates to JPA EntityManager                      │
└──────────────────┬─────────────────────────────────────┘
                   │
                   ▼
┌────────────────────────────────────────────────────────┐
│  Hibernate (JPA Implementation)                        │
│  - SessionFactory                                      │
│  - EntityManager                                       │
│  - Generates SQL from method names                     │
│  - Maps Java objects ↔ Database tables                 │
└──────────────────┬─────────────────────────────────────┘
                   │ SQL Commands
                   ▼
┌────────────────────────────────────────────────────────┐
│  JDBC Driver (MySQL Connector/J)                       │
│  - com.mysql.cj.jdbc.Driver                            │
│  - Translates to MySQL wire protocol                   │
└──────────────────┬─────────────────────────────────────┘
                   │ TCP/IP (Port 3306)
                   ▼
┌────────────────────────────────────────────────────────┐
│  MySQL Database Server                                 │
│  - InnoDB Storage Engine                               │
│  - Tables, Indexes, Transactions                       │
│  - Actual data on disk                                 │
└────────────────────────────────────────────────────────┘
```

---

## 2. The Entity Layer Explained {#entity-layer}

### Your Product Entity

```java
@Getter
@Setter
@Entity                          // ← JPA: This is a database entity
@Table(name = "PRODUCTS")        // ← Maps to PRODUCTS table
public class Product {
    
    @Id                          // ← Primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // ← Auto-increment
    @Column(name = "PRODUCT_ID", nullable = false)
    private Long id;
    
    @Column(name = "NAME", nullable = false, length = 250)
    private String name;
    
    // ... more fields
}
```

### What Each Annotation Does:

#### `@Entity`
- **Purpose**: Tells JPA "this class maps to a database table"
- **What Hibernate does**: 
  - Registers it in the EntityManager
  - Creates metadata about the class
  - Tracks instances for persistence

#### `@Table(name = "PRODUCTS")`
- **Purpose**: Specifies the actual table name in database
- **Without it**: Would use class name `Product` as table name
- **Why specify**: Your table is uppercase `PRODUCTS`, class is `Product`

#### `@Id`
- **Purpose**: Marks the primary key field
- **What Hibernate does**:
  - Uses this for entity identity
  - `equals()` and `hashCode()` based on this
  - Tracks entity in persistence context by ID

#### `@GeneratedValue(strategy = GenerationType.IDENTITY)`
- **Purpose**: Database auto-generates this value
- **Strategies available**:
  ```java
  IDENTITY  // ← Your choice: Database auto-increment
  SEQUENCE  // Use database sequence
  TABLE     // Hibernate manages sequence table
  AUTO      // Let Hibernate choose
  ```
- **How IDENTITY works**:
  ```
  1. You create: Product p = new Product()
  2. You set: p.setName("Sticker")
  3. You save: repository.save(p)
  4. Hibernate: INSERT INTO products (name, ...) VALUES ('Sticker', ...)
  5. Database: Auto-generates product_id = 123
  6. Hibernate: SELECT LAST_INSERT_ID() to get the ID
  7. Hibernate: Sets p.setId(123L)
  ```

#### `@Column(name = "NAME", nullable = false, length = 250)`
- **Purpose**: Maps field to column with constraints
- **Parameters**:
  - `name`: Column name (if different from field name)
  - `nullable`: SQL `NOT NULL` constraint
  - `length`: `VARCHAR(250)` in database
  - `precision`, `scale`: For `DECIMAL(10,2)`
  - `unique`: Adds unique constraint
  - `insertable`, `updatable`: Control if used in INSERT/UPDATE

### Field Type Mapping (Java → MySQL)

```java
// In Product.java
private Long id;              → BIGINT
private String name;          → VARCHAR(250)
private BigDecimal price;     → DECIMAL(10, 2)
private Integer popularity;   → INT
private Instant createdAt;    → TIMESTAMP
```

**Why these types?**

- `Long` (not `long`): Can be null, boxed type
- `BigDecimal` (not `double`): Precise decimal math for money
- `Instant`: Java 8+ date/time, timezone-aware
- `Integer`: Nullable integer

---

## 3. The Repository Layer {#repository-layer}

### Your Repository

```java
public interface ProductRepository extends JpaRepository<Product, Long> {
    // That's it! No implementation needed!
}
```

### What `JpaRepository<Product, Long>` Gives You

Spring generates ~18 methods automatically:

#### 1. **Find Methods**
```java
// Find all products
List<Product> products = repository.findAll();
// SQL: SELECT * FROM products

// Find by ID
Optional<Product> product = repository.findById(1L);
// SQL: SELECT * FROM products WHERE product_id = 1

// Find multiple by IDs
List<Product> products = repository.findAllById(List.of(1L, 2L, 3L));
// SQL: SELECT * FROM products WHERE product_id IN (1, 2, 3)

// Check if exists
boolean exists = repository.existsById(1L);
// SQL: SELECT COUNT(*) FROM products WHERE product_id = 1
```

#### 2. **Save Methods**
```java
// Save single
Product saved = repository.save(product);
// If ID is null: INSERT INTO products ...
// If ID exists:  UPDATE products SET ... WHERE product_id = ?

// Save multiple
List<Product> saved = repository.saveAll(productList);
// Batch INSERT or UPDATE
```

#### 3. **Delete Methods**
```java
// Delete by ID
repository.deleteById(1L);
// SQL: DELETE FROM products WHERE product_id = 1

// Delete entity
repository.delete(product);
// SQL: DELETE FROM products WHERE product_id = ?

// Delete all
repository.deleteAll();
// SQL: DELETE FROM products
```

#### 4. **Count Methods**
```java
long count = repository.count();
// SQL: SELECT COUNT(*) FROM products
```

### Custom Query Methods (You Can Add These!)

Spring Data JPA generates SQL from method names:

```java
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    // Find by name
    List<Product> findByName(String name);
    // SQL: SELECT * FROM products WHERE name = ?
    
    // Find by name containing (LIKE)
    List<Product> findByNameContaining(String keyword);
    // SQL: SELECT * FROM products WHERE name LIKE %keyword%
    
    // Find by price less than
    List<Product> findByPriceLessThan(BigDecimal maxPrice);
    // SQL: SELECT * FROM products WHERE price < ?
    
    // Find by popularity greater than and order by price
    List<Product> findByPopularityGreaterThanOrderByPriceAsc(Integer popularity);
    // SQL: SELECT * FROM products WHERE popularity > ? ORDER BY price ASC
    
    // Find top 10 by popularity
    List<Product> findTop10ByOrderByPopularityDesc();
    // SQL: SELECT * FROM products ORDER BY popularity DESC LIMIT 10
    
    // Custom query with @Query
    @Query("SELECT p FROM Product p WHERE p.price BETWEEN :min AND :max")
    List<Product> findByPriceRange(@Param("min") BigDecimal min, 
                                    @Param("max") BigDecimal max);
    // Note: This is JPQL (Java Persistence Query Language), not SQL
    // Hibernate translates to: SELECT * FROM products WHERE price BETWEEN ? AND ?
    
    // Native SQL query
    @Query(value = "SELECT * FROM products WHERE YEAR(created_at) = :year", 
           nativeQuery = true)
    List<Product> findByCreatedYear(@Param("year") int year);
    // Actual SQL, not JPQL
}
```

### Method Name Query Keywords

| Keyword | SQL Equivalent | Example |
|---------|----------------|---------|
| `findBy` | `SELECT ... WHERE` | `findByName(String name)` |
| `And` | `AND` | `findByNameAndPrice(String name, BigDecimal price)` |
| `Or` | `OR` | `findByNameOrDescription(String term)` |
| `LessThan` | `<` | `findByPriceLessThan(BigDecimal price)` |
| `GreaterThan` | `>` | `findByPopularityGreaterThan(Integer pop)` |
| `Between` | `BETWEEN` | `findByPriceBetween(BigDecimal min, BigDecimal max)` |
| `Like` | `LIKE` | `findByNameLike(String pattern)` |
| `Containing` | `LIKE %...%` | `findByNameContaining(String keyword)` |
| `StartingWith` | `LIKE ...%` | `findByNameStartingWith(String prefix)` |
| `EndingWith` | `LIKE %...` | `findByNameEndingWith(String suffix)` |
| `OrderBy` | `ORDER BY` | `findByNameOrderByPriceDesc(String name)` |
| `Top`, `First` | `LIMIT` | `findTop10ByOrderByPopularityDesc()` |
| `Distinct` | `DISTINCT` | `findDistinctByName(String name)` |
| `IsNull` | `IS NULL` | `findByUpdatedAtIsNull()` |
| `IsNotNull` | `IS NOT NULL` | `findByUpdatedAtIsNotNull()` |
| `In` | `IN (...)` | `findByIdIn(List<Long> ids)` |

---

## 4. How Queries Work {#queries}

### Example: `productRepository.findAll()`

Let's trace exactly what happens:

```java
// Your code
List<Product> products = productRepository.findAll();
```

#### Step-by-Step Execution:

**1. Spring creates a Proxy**
```java
// At startup, Spring does this:
ProductRepository repository = (ProductRepository) Proxy.newProxyInstance(
    classLoader,
    new Class[]{ProductRepository.class},
    new JpaRepositoryInvocationHandler()
);
```

**2. Method Invocation**
```java
// When you call findAll(), proxy intercepts:
InvocationHandler.invoke(proxy, method, args) {
    // method = "findAll"
    // args = []
}
```

**3. Spring Data JPA Processing**
```java
// Looks up query method
if (method.getName().equals("findAll")) {
    // Create JPA query
    Query query = entityManager.createQuery(
        "SELECT p FROM Product p"  // JPQL, not SQL!
    );
}
```

**4. Hibernate Translation**
```java
// Hibernate translates JPQL to SQL:
String sql = dialect.translate(jpql);
// Result:
// SELECT p.product_id, p.name, p.description, p.price,
//        p.popularity, p.image_url, p.created_at, p.created_by,
//        p.updated_at, p.updated_by
// FROM products p
```

**5. JDBC Execution**
```java
PreparedStatement stmt = connection.prepareStatement(sql);
ResultSet rs = stmt.executeQuery();
```

**6. Result Mapping**
```java
List<Product> products = new ArrayList<>();
while (rs.next()) {
    Product p = new Product();
    p.setId(rs.getLong("product_id"));
    p.setName(rs.getString("name"));
    p.setDescription(rs.getString("description"));
    p.setPrice(rs.getBigDecimal("price"));
    p.setPopularity(rs.getInt("popularity"));
    p.setImageUrl(rs.getString("image_url"));
    p.setCreatedAt(rs.getTimestamp("created_at").toInstant());
    p.setCreatedBy(rs.getString("created_by"));
    p.setUpdatedAt(rs.getTimestamp("updated_at") != null 
        ? rs.getTimestamp("updated_at").toInstant() : null);
    p.setUpdatedBy(rs.getString("updated_by"));
    products.add(p);
}
return products;
```

### SQL Logging

You already have this enabled:
```properties
spring.jpa.show-sql=true
```

When you call `findAll()`, you'll see in console:
```sql
Hibernate: 
    select
        p1_0.product_id,
        p1_0.created_at,
        p1_0.created_by,
        p1_0.description,
        p1_0.image_url,
        p1_0.name,
        p1_0.popularity,
        p1_0.price,
        p1_0.updated_at,
        p1_0.updated_by 
    from
        products p1_0
```

---

## 5. MySQL Setup {#mysql-setup}

### Prerequisites

1. **Verify Docker Hub Email** (you need this!)
2. Start MySQL container
3. Update Spring Boot configuration
4. Add MySQL dependency

### Step 1: Start MySQL with Docker Compose

You already have `docker-compose.yml`:

```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: eazystore-mysql
    environment:
      MYSQL_ROOT_PASSWORD: root123
      MYSQL_DATABASE: eazystore
      MYSQL_USER: eazystore_user
      MYSQL_PASSWORD: eazystore_pass
    ports:
      - "3306:3306"
    volumes:
      - mysql-data:/var/lib/mysql
      - ./eazystore/src/main/resources/sql:/docker-entrypoint-initdb.d
```

**What this does:**

- **`MYSQL_DATABASE`**: Creates `eazystore` database automatically
- **`MYSQL_USER`**: Creates application user
- **`ports`**: Maps host port 3306 → container port 3306
- **`volumes`**: 
  - `mysql-data`: Persistent storage
  - SQL scripts: Runs `schema.sql` and `data.sql` on first startup

**Start it:**
```bash
cd /Users/admin/Documents/storeFrontUiTailwind/section7
docker-compose up -d
```

### Step 2: Add MySQL Dependency to pom.xml

Add this after the H2 dependency:

```xml
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <scope>runtime</scope>
</dependency>
```

### Step 3: Create MySQL-specific application.properties

Create: `src/main/resources/application-mysql.properties`

```properties
spring.application.name=eazystore

# MySQL Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/eazystore?useSSL=false&serverTimezone=UTC
spring.datasource.username=eazystore_user
spring.datasource.password=eazystore_pass
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate for MySQL
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# SQL Initialization
spring.sql.init.mode=never
# Don't run schema.sql/data.sql - let Hibernate manage schema
```

### Run with MySQL profile:
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=mysql
```

---

## 6. Configuration Deep Dive {#configuration}

### Connection URL Breakdown

```
jdbc:mysql://localhost:3306/eazystore?useSSL=false&serverTimezone=UTC
│    │      │         │    │         │
│    │      │         │    │         └─ Parameters
│    │      │         │    └─ Database name
│    │      │         └─ Port
│    │      └─ Host
│    └─ Database type
└─ Protocol
```

### `spring.jpa.hibernate.ddl-auto`

This is **critical** - controls schema management:

| Value | What It Does | When to Use |
|-------|--------------|-------------|
| `none` | Hibernate does nothing | You manage schema manually |
| `validate` | Validates schema matches entities | Production (safest) |
| `update` | Updates schema to match entities | Development |
| `create` | Drops and creates schema | Testing |
| `create-drop` | Creates on start, drops on shutdown | Integration tests |

**Your current setup:**
```properties
spring.jpa.hibernate.ddl-auto=none
spring.sql.init.mode=always
```

This means:
- Hibernate doesn't touch schema
- Spring runs `schema.sql` and `data.sql` every time

**For MySQL, recommended:**
```properties
spring.jpa.hibernate.ddl-auto=update
spring.sql.init.mode=never
```

This means:
- Hibernate creates/updates tables from `@Entity` annotations
- Don't run SQL scripts (already in database)

### Data Initialization

**Current (H2):**
```properties
spring.sql.init.mode=always
spring.sql.init.schema-locations=optional:classpath:sql/schema.sql
spring.sql.init.data-locations=optional:classpath:sql/data.sql
spring.jpa.defer-datasource-initialization=true
```

**How it works:**
1. Spring Boot starts
2. Runs `schema.sql` (CREATE TABLE)
3. Hibernate initializes
4. Runs `data.sql` (INSERT)

**For MySQL (with Docker volume mount):**
```yaml
volumes:
  - ./eazystore/src/main/resources/sql:/docker-entrypoint-initdb.d
```

MySQL runs scripts in `/docker-entrypoint-initdb.d` on **first startup only**.

---

## 7. Advanced Topics {#advanced}

### Transaction Management

Spring automatically manages transactions for repository methods:

```java
@Service
public class ProductServiceImpl {
    
    @Transactional  // ← Not needed for simple cases
    public List<ProductDto> getProducts() {
        return productRepository.findAll()  // ← Already transactional!
            .stream()
            .map(this::transformToDTO)
            .collect(Collectors.toList());
    }
    
    @Transactional  // ← Needed for multiple operations
    public void updateProductPrice(Long id, BigDecimal newPrice) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Not found"));
        product.setPrice(newPrice);
        product.setUpdatedAt(Instant.now());
        productRepository.save(product);
        // Both operations in same transaction
    }
}
```

**What `@Transactional` does:**
```
1. Spring creates proxy around your service
2. Before method: BEGIN TRANSACTION
3. Execute method
4. If successful: COMMIT
5. If exception: ROLLBACK
```

### Lazy vs Eager Loading

Currently not applicable (no relationships), but important to know:

```java
@Entity
public class Order {
    @Id
    private Long id;
    
    @OneToMany(fetch = FetchType.LAZY)  // ← Default, loads when accessed
    private List<OrderItem> items;
    
    @ManyToOne(fetch = FetchType.EAGER)  // ← Loads immediately
    private Customer customer;
}
```

### N+1 Query Problem

If you had relationships:
```java
// BAD: N+1 queries
List<Order> orders = orderRepository.findAll();  // 1 query
for (Order order : orders) {
    order.getItems().size();  // N queries (one per order)
}

// GOOD: Join fetch
@Query("SELECT o FROM Order o JOIN FETCH o.items")
List<Order> findAllWithItems();  // 1 query with JOIN
```

### Connection Pooling

Spring Boot uses HikariCP by default:

```properties
# Default pool settings
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.connection-timeout=30000
```

**What this means:**
- App maintains pool of 5-10 database connections
- Reuses connections instead of creating new ones
- Much faster than creating connection per request

### Caching

Enable second-level cache for better performance:

```properties
spring.jpa.properties.hibernate.cache.use_second_level_cache=true
spring.jpa.properties.hibernate.cache.region.factory_class=org.hibernate.cache.jcache.JCacheRegionFactory
```

```java
@Entity
@Cacheable  // ← Cache this entity
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Product {
    // ...
}
```

---

## Summary

**Your application uses a 5-layer architecture:**

1. **Controller** → REST endpoints
2. **Service** → Business logic
3. **Repository** → Data access (auto-generated)
4. **Hibernate** → ORM (Java ↔ SQL)
5. **Database** → MySQL/H2

**Key concepts:**
- `@Entity` maps Java class to table
- `JpaRepository` gives you CRUD without code
- Hibernate generates SQL from method names
- Spring manages transactions automatically
- Connection pooling for performance

**To switch to MySQL:**
1. Verify Docker Hub email
2. `docker-compose up -d`
3. Add MySQL dependency to `pom.xml`
4. Update `application.properties`
5. Run application

That's it! You now understand the complete database layer of your application. 🎓
