# Docker Compose Quick Reference

## Your docker-compose.yml Visual Map

```yaml
services:                          # All your containers
  mysql:                          # ← Service name (becomes hostname)
    image: mysql:8.0              # ← What to run
    container_name: eazystore-mysql  # ← Custom name
    environment:                  # ← Variables inside container
      MYSQL_ROOT_PASSWORD: root123
      MYSQL_DATABASE: eazystore
    ports:                        # ← Port mapping
      - "3306:3306"               #   Host:Container
    volumes:                      # ← Data persistence
      - mysql-data:/var/lib/mysql           # Named volume
      - ./sql:/docker-entrypoint-initdb.d   # Bind mount
    networks:                     # ← Connect to network
      - eazystore-network

volumes:                          # Define named volumes
  mysql-data:

networks:                         # Define networks
  eazystore-network:
```

## Command Cheat Sheet

```bash
# Start everything
docker-compose up -d

# Stop everything
docker-compose down

# Stop and delete data
docker-compose down -v

# View running containers
docker-compose ps

# View logs
docker-compose logs -f

# Enter MySQL shell
docker-compose exec mysql mysql -ueazystore_user -peazystore_pass

# Restart
docker-compose restart

# Stop specific service
docker-compose stop mysql
```

## YAML Syntax Quick Rules

```yaml
# Key-value pairs
key: value

# Lists (use dash + space)
items:
  - item1
  - item2
  - item3

# Nested objects (use indentation)
parent:
  child1: value1
  child2: value2
    grandchild: value3

# Comments (use hash)
# This is a comment
key: value  # Inline comment
```

## Port Mapping Examples

```yaml
ports:
  - "3306:3306"    # Standard: localhost:3306 → container:3306
  - "8080:80"      # Map: localhost:8080 → container:80
  - "3307:3306"    # Different port: localhost:3307 → container:3306
```

## Volume Types

```yaml
volumes:
  # Named volume (Docker manages)
  - mysql-data:/var/lib/mysql
  
  # Bind mount (direct file access)
  - ./local/path:/container/path
  
  # Read-only bind mount
  - ./config:/app/config:ro
```

## Environment Variables

```yaml
# Inline
environment:
  KEY1: value1
  KEY2: value2

# List format
environment:
  - KEY1=value1
  - KEY2=value2

# From file
env_file:
  - ./config.env
```

## Service Dependencies

```yaml
services:
  backend:
    depends_on:
      - mysql              # Wait for mysql to start
      
  backend:
    depends_on:
      mysql:
        condition: service_healthy  # Wait until healthy
```

## Building from Dockerfile

```yaml
services:
  backend:
    build: ./backend        # Folder with Dockerfile
    
  backend:
    build:
      context: ./backend    # Folder
      dockerfile: Dockerfile.dev  # Custom name
```

## Networks Explained

```
┌─────────────────────────────────────────────┐
│  Docker Network: eazystore-network          │
│                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │  MySQL   │  │ Backend  │  │ Frontend │ │
│  │          │  │          │  │          │ │
│  │  :3306   │←─│connects  │←─│connects  │ │
│  │          │  │to mysql  │  │to backend│ │
│  └──────────┘  └──────────┘  └──────────┘ │
│                                             │
└─────────────────────────────────────────────┘
         │              │              │
         └──────────────┴──────────────┘
         Port mapping to host (your Mac)
         3306           8080           5173
```

## Your Application Flow

```
1. You run: docker-compose up -d

2. Docker Compose:
   - Creates network: eazystore-network
   - Creates volume: mysql-data
   - Pulls image: mysql:8.0
   - Creates container: eazystore-mysql
   - Mounts volumes
   - Maps ports
   - Starts container

3. MySQL Container:
   - Reads environment variables
   - Creates database 'eazystore'
   - Creates user 'eazystore_user'
   - Runs SQL scripts from /docker-entrypoint-initdb.d
   - Ready to accept connections

4. You can access:
   - From Mac: localhost:3306
   - From other containers: mysql:3306
```

## Troubleshooting

```bash
# Check if running
docker-compose ps

# See all logs
docker-compose logs

# See specific service logs
docker-compose logs mysql

# Follow logs in real-time
docker-compose logs -f mysql

# Check container details
docker-compose exec mysql env  # See environment variables
docker-compose exec mysql pwd  # See current directory

# Recreate containers
docker-compose up -d --force-recreate

# Rebuild images
docker-compose up -d --build
```

## Common Patterns

### Full-Stack Application
```yaml
services:
  database:
    # Database config
    
  backend:
    depends_on:
      - database
    # Backend config
    
  frontend:
    depends_on:
      - backend
    # Frontend config
```

### Development vs Production
```yaml
# Base: docker-compose.yml
services:
  mysql:
    image: mysql:8.0

# Override: docker-compose.dev.yml
services:
  mysql:
    ports:
      - "3307:3306"  # Different port for dev

# Run: docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

### With Secrets (Production)
```yaml
services:
  mysql:
    environment:
      MYSQL_ROOT_PASSWORD_FILE: /run/secrets/mysql_root_password
    secrets:
      - mysql_root_password

secrets:
  mysql_root_password:
    file: ./secrets/mysql_root_password.txt
```
