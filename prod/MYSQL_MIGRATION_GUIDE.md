# Quick Migration Guide: H2 → MySQL

## Current Status
✅ H2 Database (file-based, development only)
❌ MySQL (production-ready, not yet configured)

## Steps to Switch to MySQL

### 1. Verify Docker Hub Account
Your email must be verified to pull MySQL image.
- Check email for Docker Hub verification link
- Click to verify

### 2. Start MySQL Container

```bash
cd /Users/admin/Documents/storeFrontUiTailwind/section7
docker-compose up -d
```

Verify it's running:
```bash
docker ps
# Should show: eazystore-mysql
```

### 3. Add MySQL Dependency

Edit `eazystore/pom.xml`, add after H2 dependency:

```xml
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <scope>runtime</scope>
</dependency>
```

### 4. Create MySQL Configuration

Create new file: `eazystore/src/main/resources/application-mysql.properties`

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
spring.jpa.properties.hibernate.highlight_sql=true

# Don't run SQL scripts (let Hibernate manage schema)
spring.sql.init.mode=never

# Logging
logging.pattern.console=%green(%d{HH:mm:ss.SSS}) %blue(%-5level) %red([%thread]) %yellow(%logger{15}) - %msg%n
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE
```

### 5. Run with MySQL

Option A: Command line
```bash
cd eazystore
mvn spring-boot:run -Dspring-boot.run.profiles=mysql
```

Option B: IntelliJ/Eclipse
- Edit run configuration
- Add VM options: `-Dspring.profiles.active=mysql`
- Run

### 6. Verify Connection

Check console output for:
```
HikariPool-1 - Starting...
HikariPool-1 - Start completed.
Hibernate: create table products ...
```

### 7. Test API

```bash
curl http://localhost:8080/api/v1/products
```

Should return product list from MySQL!

---

## Troubleshooting

### Error: "email must be verified"
→ Check Docker Hub email, click verification link

### Error: "Can't connect to MySQL server on 'localhost:3306'"
→ MySQL container not running:
```bash
docker-compose up -d
docker ps  # Verify running
```

### Error: "Access denied for user 'eazystore_user'"
→ Check credentials in `application-mysql.properties` match `docker-compose.yml`

### Error: "Unknown database 'eazystore'"
→ MySQL didn't create database. Recreate:
```bash
docker-compose down -v
docker-compose up -d
```

### Data Not Showing Up
→ First time, Hibernate will create empty tables. Insert data:
```bash
docker exec -i eazystore-mysql mysql -ueazystore_user -peazystore_pass eazystore < eazystore/src/main/resources/sql/data.sql
```

Or use MySQL Workbench/CLI to import.

---

## Comparison: H2 vs MySQL

| Aspect | H2 (Current) | MySQL (After Migration) |
|--------|--------------|-------------------------|
| **Storage** | File: `~/eazystore.mv.db` | Docker volume: `mysql-data` |
| **Connection** | `jdbc:h2:file:~/eazystore` | `jdbc:mysql://localhost:3306/eazystore` |
| **Port** | None (embedded) | 3306 |
| **Driver** | `org.h2.Driver` | `com.mysql.cj.jdbc.Driver` |
| **Dialect** | `H2Dialect` | `MySQLDialect` |
| **Use Case** | Development/Testing | Development/Production |
| **Performance** | Fast (in-memory option) | Optimized for concurrent access |
| **Data Persistence** | Single file | Proper database files |

---

## Switching Back to H2

If you want to go back:

```bash
mvn spring-boot:run
# Without profile, uses default application.properties (H2)
```

---

## Next Steps After Migration

1. **Add Indexes** for better query performance
2. **Configure Connection Pool** settings
3. **Set up Database Migrations** with Flyway/Liquibase
4. **Add Database Backups**
5. **Configure for Production** (proper passwords, SSL, etc.)

---

## Useful MySQL Commands

Connect to MySQL in container:
```bash
docker exec -it eazystore-mysql mysql -ueazystore_user -peazystore_pass eazystore
```

Inside MySQL:
```sql
-- Show all tables
SHOW TABLES;

-- Describe products table
DESCRIBE products;

-- Count products
SELECT COUNT(*) FROM products;

-- View all products
SELECT * FROM products;

-- Check database size
SELECT 
    table_schema AS 'Database',
    ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS 'Size (MB)'
FROM information_schema.tables
WHERE table_schema = 'eazystore';
```

Stop MySQL:
```bash
docker-compose down
```

Remove MySQL and data:
```bash
docker-compose down -v  # ⚠️ Deletes all data!
```
