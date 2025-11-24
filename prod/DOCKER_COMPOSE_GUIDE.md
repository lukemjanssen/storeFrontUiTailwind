# 🐳 Docker Compose & YAML Complete Guide

## Table of Contents
1. [What is Docker Compose?](#what-is-compose)
2. [What is YAML?](#what-is-yaml)
3. [Your docker-compose.yml Explained](#your-file)
4. [YAML Syntax Rules](#yaml-syntax)
5. [Common Docker Compose Commands](#commands)
6. [Adding More Services](#adding-services)
7. [Real-World Examples](#examples)

---

## 1. What is Docker Compose? {#what-is-compose}

### The Simple Explanation

**Docker Compose** = A tool to run multiple Docker containers together as a single application.

### Why You Need It

Imagine your full application:
- **Frontend** (React on port 5173)
- **Backend** (Spring Boot on port 8080)  
- **Database** (MySQL on port 3306)
- **Cache** (Redis on port 6379)
- **Message Queue** (RabbitMQ on port 5672)

Without Docker Compose:
```bash
docker run ...  # 5 different commands
docker run ...  # Hard to remember
docker run ...  # Easy to make mistakes
docker run ...  # Difficult to share
docker run ...
```

With Docker Compose:
```bash
docker-compose up
# Done! Everything starts together
```

### How It Works

```
┌─────────────────────────────────────────────────────┐
│  docker-compose.yml (Your Configuration File)      │
│                                                     │
│  services:                                          │
│    - mysql                                          │
│    - backend                                        │
│    - frontend                                       │
└──────────────────┬──────────────────────────────────┘
                   │
                   │ docker-compose up
                   ▼
┌─────────────────────────────────────────────────────┐
│  Docker Compose reads the file and:                │
│  1. Creates a network                               │
│  2. Pulls images if needed                          │
│  3. Creates volumes                                 │
│  4. Starts containers in correct order              │
│  5. Links them together                             │
└─────────────────────────────────────────────────────┘
                   │
                   ▼
┌────────────┐  ┌────────────┐  ┌────────────┐
│   MySQL    │  │  Backend   │  │  Frontend  │
│ Container  │  │ Container  │  │ Container  │
│ Port 3306  │  │ Port 8080  │  │ Port 5173  │
└────────────┘  └────────────┘  └────────────┘
       │               │               │
       └───────────────┴───────────────┘
              Connected via network
```

---

## 2. What is YAML? {#what-is-yaml}

**YAML** = "YAML Ain't Markup Language"

It's a data format for configuration files. Like JSON, but **human-friendly**.

### YAML Basics

#### Key-Value Pairs
```yaml
name: eazystore
version: 1.0
port: 8080
```

Equivalent JSON:
```json
{
  "name": "eazystore",
  "version": "1.0",
  "port": 8080
}
```

#### Lists (Arrays)
```yaml
ports:
  - 8080
  - 3306
  - 5173
```

Equivalent JSON:
```json
{
  "ports": [8080, 3306, 5173]
}
```

#### Nested Objects
```yaml
database:
  host: localhost
  port: 3306
  credentials:
    username: admin
    password: secret
```

Equivalent JSON:
```json
{
  "database": {
    "host": "localhost",
    "port": 3306,
    "credentials": {
      "username": "admin",
      "password": "secret"
    }
  }
}
```

#### Comments
```yaml
# This is a comment
services:
  mysql:  # This is also a comment
    image: mysql:8.0  # And this
```

---

## 3. Your docker-compose.yml Explained {#your-file}

Let's break down every single line of your file:

```yaml
version: '3.8'
```
- **What it is**: Docker Compose file format version
- **Why**: Different versions support different features
- **Note**: This is now deprecated, you can remove it
- **Versions**: 3.8 is good, latest is 3.9 (or omit entirely)

---

```yaml
services:
```
- **What it is**: Container definitions start here
- **Think of it as**: The "apps" section
- **Each service**: Becomes one Docker container

---

```yaml
  mysql:
```
- **What it is**: Service name (you choose this)
- **Used for**: 
  - Container name reference
  - DNS hostname inside Docker network
  - Other containers can connect to `mysql:3306`

---

```yaml
    image: mysql:8.0
```
- **What it is**: Docker image to use
- **Format**: `image_name:tag`
- **Examples**:
  - `mysql:8.0` = MySQL version 8.0
  - `mysql:latest` = Latest MySQL
  - `postgres:15` = PostgreSQL 15
  - `redis:alpine` = Redis with Alpine Linux (smaller)

---

```yaml
    container_name: eazystore-mysql
```
- **What it is**: Custom container name
- **Without this**: Docker generates random name like `section7-mysql-1`
- **With this**: Container is always called `eazystore-mysql`
- **Useful for**: `docker exec -it eazystore-mysql bash`

---

```yaml
    environment:
      MYSQL_ROOT_PASSWORD: root123
      MYSQL_DATABASE: eazystore
      MYSQL_USER: eazystore_user
      MYSQL_PASSWORD: eazystore_pass
```
- **What it is**: Environment variables inside container
- **MySQL-specific**:
  - `MYSQL_ROOT_PASSWORD`: Required, sets root password
  - `MYSQL_DATABASE`: Auto-creates this database
  - `MYSQL_USER`: Auto-creates this user
  - `MYSQL_PASSWORD`: Password for the user
- **Alternative syntax**:
  ```yaml
  environment:
    - MYSQL_ROOT_PASSWORD=root123
    - MYSQL_DATABASE=eazystore
  ```

---

```yaml
    ports:
      - "3306:3306"
```
- **What it is**: Port mapping from host to container
- **Format**: `"HOST_PORT:CONTAINER_PORT"`
- **Breakdown**:
  ```
  "3306:3306"
   ││││  ││││
   ││││  │││└─ Container port (inside Docker)
   ││││  ││└── Delimiter
   ││││  │└─── Host port (your Mac)
   ││││  └──── Delimiter
   │││└─────── Opening quote
   ││└──────── Host port
   │└───────── Delimiter
   └────────── Container port
  ```
- **Example scenarios**:
  ```yaml
  - "3306:3306"   # Standard: localhost:3306 → container:3306
  - "3307:3306"   # Custom: localhost:3307 → container:3306
  - "80:8080"     # localhost:80 → container:8080
  ```

---

```yaml
    volumes:
      - mysql-data:/var/lib/mysql
      - ./eazystore/src/main/resources/sql:/docker-entrypoint-initdb.d
```
- **What it is**: Mount points for persistent data or files
- **Two types**:

**Named Volume** (persistent data):
```yaml
- mysql-data:/var/lib/mysql
  │           │
  │           └─ Path inside container
  └─ Named volume (Docker manages)
```
- **Purpose**: Database data persists even if container is deleted
- **Location**: Docker stores in `/var/lib/docker/volumes/`
- **Survives**: `docker-compose down` (not `docker-compose down -v`)

**Bind Mount** (direct file access):
```yaml
- ./eazystore/src/main/resources/sql:/docker-entrypoint-initdb.d
  │                                  │
  │                                  └─ Path inside container
  └─ Path on your Mac (relative to docker-compose.yml)
```
- **Purpose**: MySQL runs scripts in `/docker-entrypoint-initdb.d` on first startup
- **Your case**: Runs `schema.sql` and `data.sql` automatically
- **Access**: Files are shared, changes on Mac appear in container

---

```yaml
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "root", "-proot123"]
      interval: 10s
      timeout: 5s
      retries: 5
```
- **What it is**: Container health monitoring
- **Breakdown**:
  - `test`: Command to check if MySQL is ready
  - `interval`: Check every 10 seconds
  - `timeout`: If check takes >5s, it fails
  - `retries`: Try 5 times before marking unhealthy
- **Command explained**:
  ```bash
  mysqladmin ping -h localhost -u root -proot123
  # Pings MySQL server to see if it responds
  ```
- **Status**: `docker ps` shows `healthy` or `unhealthy`

---

```yaml
    networks:
      - eazystore-network
```
- **What it is**: Connect container to custom network
- **Purpose**: Containers on same network can talk to each other
- **Example**:
  ```
  Backend container can connect to: mysql:3306
  Frontend container can connect to: backend:8080
  ```

---

```yaml
volumes:
  mysql-data:
    driver: local
```
- **What it is**: Define named volumes
- **Purpose**: Tells Docker to create `mysql-data` volume
- **driver**: `local` = store on local disk (default)
- **Other drivers**: 
  - `nfs` = Network file system
  - `s3` = Amazon S3 (with plugin)

---

```yaml
networks:
  eazystore-network:
    driver: bridge
```
- **What it is**: Define custom network
- **driver: bridge**: Default Docker network type
- **What bridge does**: 
  - Containers can talk to each other
  - Containers can reach internet
  - Host can reach containers via port mapping
- **Other drivers**:
  - `host` = Container uses host network directly
  - `none` = No network access

---

## 4. YAML Syntax Rules {#yaml-syntax}

### ⚠️ Critical Rules

#### 1. Indentation Matters (Use Spaces, Not Tabs!)

✅ **Correct:**
```yaml
services:
  mysql:
    image: mysql:8.0
    ports:
      - "3306:3306"
```

❌ **Wrong (inconsistent indentation):**
```yaml
services:
  mysql:
   image: mysql:8.0  # Wrong! Only 1 space
    ports:  # Back to 4 spaces
      - "3306:3306"
```

**Rule**: Use 2 or 4 spaces consistently. Never mix!

#### 2. Colons Require Space After

✅ **Correct:**
```yaml
image: mysql:8.0
```

❌ **Wrong:**
```yaml
image:mysql:8.0  # No space after first colon
```

#### 3. Lists Start with Dash + Space

✅ **Correct:**
```yaml
ports:
  - "3306:3306"
  - "8080:8080"
```

❌ **Wrong:**
```yaml
ports:
  -"3306:3306"  # No space after dash
  - "8080:8080"
```

#### 4. Quotes (Optional but Recommended for Strings)

All these are valid:
```yaml
name: eazystore        # No quotes (fine)
name: 'eazystore'      # Single quotes (fine)
name: "eazystore"      # Double quotes (fine)
```

**When quotes are required:**
```yaml
password: "123"        # Looks like number, keep as string
version: "3.8"         # Decimal, keep as string
special: "yes"         # YAML keyword, quote it
```

---

## 5. Common Docker Compose Commands {#commands}

### Starting Services

```bash
# Start all services (background)
docker-compose up -d

# Start all services (foreground, see logs)
docker-compose up

# Start specific service
docker-compose up -d mysql

# Rebuild and start
docker-compose up -d --build
```

### Stopping Services

```bash
# Stop all services (containers still exist)
docker-compose stop

# Stop specific service
docker-compose stop mysql

# Stop and remove containers (data persists in volumes)
docker-compose down

# Stop, remove containers AND volumes (⚠️ deletes data!)
docker-compose down -v
```

### Viewing Status

```bash
# List running services
docker-compose ps

# View logs
docker-compose logs

# Follow logs (like tail -f)
docker-compose logs -f

# Logs for specific service
docker-compose logs -f mysql
```

### Executing Commands

```bash
# Open bash in container
docker-compose exec mysql bash

# Run MySQL CLI
docker-compose exec mysql mysql -uroot -proot123

# Run one-off command
docker-compose run mysql echo "Hello"
```

### Other Useful Commands

```bash
# Restart services
docker-compose restart

# Restart specific service
docker-compose restart mysql

# Pull latest images
docker-compose pull

# See what compose will do (dry run)
docker-compose config

# Remove stopped containers
docker-compose rm
```

---

## 6. Adding More Services {#adding-services}

### Example: Add Backend and Frontend to Your docker-compose.yml

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
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "root", "-proot123"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - eazystore-network

  backend:
    build: ./eazystore  # Build from Dockerfile
    container_name: eazystore-backend
    ports:
      - "8080:8080"
    environment:
      # Use 'mysql' as hostname (service name)
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/eazystore
      SPRING_DATASOURCE_USERNAME: eazystore_user
      SPRING_DATASOURCE_PASSWORD: eazystore_pass
    depends_on:
      mysql:
        condition: service_healthy  # Wait for MySQL to be ready
    networks:
      - eazystore-network

  frontend:
    build: ./eazystore-ui
    container_name: eazystore-frontend
    ports:
      - "5173:80"  # Vite builds to port 80 in container
    environment:
      # Use 'backend' as hostname
      VITE_BASE_API_URL: http://backend:8080/api/v1
    depends_on:
      - backend
    networks:
      - eazystore-network

volumes:
  mysql-data:
    driver: local

networks:
  eazystore-network:
    driver: bridge
```

---

## 7. Real-World Examples {#examples}

### Example 1: Development Environment

```yaml
services:
  # Database
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: dev
      POSTGRES_PASSWORD: dev123
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data

  # Cache
  redis:
    image: redis:alpine
    ports:
      - "6379:6379"

  # Backend API
  api:
    build: ./api
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://dev:dev123@postgres:5432/myapp
      REDIS_URL: redis://redis:6379
    depends_on:
      - postgres
      - redis

  # Frontend
  web:
    build: ./web
    ports:
      - "8080:80"
    depends_on:
      - api

volumes:
  postgres-data:
```

### Example 2: With Environment File

**docker-compose.yml:**
```yaml
services:
  mysql:
    image: mysql:8.0
    env_file:
      - ./config/mysql.env  # Load from file
    ports:
      - "3306:3306"
```

**config/mysql.env:**
```
MYSQL_ROOT_PASSWORD=root123
MYSQL_DATABASE=eazystore
MYSQL_USER=eazystore_user
MYSQL_PASSWORD=eazystore_pass
```

### Example 3: Multiple Compose Files

**Base config:**
```yaml
# docker-compose.yml
services:
  mysql:
    image: mysql:8.0
    ports:
      - "3306:3306"
```

**Development overrides:**
```yaml
# docker-compose.dev.yml
services:
  mysql:
    ports:
      - "3307:3306"  # Override port
```

**Run with:**
```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

---

## Summary

### Docker Compose:
- **Tool** for running multiple containers together
- **One file** defines entire application
- **One command** to start everything

### YAML:
- **Configuration format** (like JSON)
- **Human-readable**, uses indentation
- **Key-value pairs**, lists, nested objects

### Your docker-compose.yml:
- Defines **MySQL service**
- **Persistent data** with volumes
- **Networking** for container communication
- **Health checks** to ensure MySQL is ready
- **Auto-initialization** with SQL scripts

### Key Commands:
```bash
docker-compose up -d      # Start
docker-compose down       # Stop
docker-compose logs -f    # View logs
docker-compose ps         # List services
docker-compose exec       # Run commands
```

---

## Next Steps

1. **Verify Docker Hub email** (still needed for MySQL image!)
2. **Run**: `docker-compose up -d`
3. **Check status**: `docker-compose ps`
4. **View logs**: `docker-compose logs -f mysql`
5. **Connect**: `docker-compose exec mysql mysql -ueazystore_user -peazystore_pass`

Now you understand Docker Compose and YAML completely! 🎓
