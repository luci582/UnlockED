#!/bin/bash

# UnlockED Docker Build and Deploy Script
# Usage: ./deploy.sh [dev|prod]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
    print_success "Docker is running"
}

# Check if docker-compose is available
check_compose() {
    if ! command -v docker-compose > /dev/null 2>&1; then
        print_error "docker-compose is not installed. Please install it and try again."
        exit 1
    fi
    print_success "docker-compose is available"
}

# Environment setup
setup_env() {
    if [ ! -f .env ]; then
        print_warning ".env file not found. Creating from template..."
        if [ -f .env.example ]; then
            cp .env.example .env
            print_success "Created .env file from template"
            print_warning "Please update the .env file with your actual values"
        else
            print_error ".env.example not found. Please create .env file manually"
            exit 1
        fi
    else
        print_success ".env file exists"
    fi
}

# Build and start services
build_and_start() {
    local environment=${1:-dev}
    
    print_status "Building and starting UnlockED application in $environment mode..."
    
    if [ "$environment" = "prod" ]; then
        print_status "Building production images..."
        docker-compose build --no-cache
        
        print_status "Starting services in production mode..."
        docker-compose up -d
    else
        print_status "Building development images..."
        docker-compose build
        
        print_status "Starting services in development mode..."
        docker-compose up -d
    fi
    
    print_success "Services started successfully!"
}

# Wait for services to be healthy
wait_for_services() {
    print_status "Waiting for services to be healthy..."
    
    # Wait for database
    print_status "Waiting for database..."
    until docker-compose exec postgres pg_isready -U unlocked_user -d unlocked > /dev/null 2>&1; do
        printf "."
        sleep 2
    done
    print_success "Database is ready"
    
    # Wait for backend
    print_status "Waiting for backend..."
    until curl -f http://localhost:3001/api/health > /dev/null 2>&1; do
        printf "."
        sleep 2
    done
    print_success "Backend is ready"
    
    # Wait for frontend
    print_status "Waiting for frontend..."
    until curl -f http://localhost/health > /dev/null 2>&1; do
        printf "."
        sleep 2
    done
    print_success "Frontend is ready"
}

# Run database migrations and seed
setup_database() {
    print_status "Setting up database..."
    
    # Generate Prisma client
    docker-compose exec backend npx prisma generate
    
    # Run migrations
    docker-compose exec backend npx prisma db push
    
    # Seed database
    docker-compose exec backend npm run db:seed
    
    # Add workload data to preserve our workload tags
    print_status "Adding workload data to courses..."
    docker-compose exec backend node add-workload-data.js || {
        print_warning "add-workload-data.js not found, creating it..."
        docker-compose exec backend sh -c 'cat > add-workload-data.js << '"'"'EOF'"'"'
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function addWorkloadData() {
  try {
    console.log("📚 Adding workload data to courses...");
    const courses = await prisma.course.findMany();
    
    const workloadMappings = [
      { titleContains: "COMP1511", effortLevel: "moderate" },
      { titleContains: "COMP2521", effortLevel: "heavy" }, 
      { titleContains: "COMP1521", effortLevel: "heavy" },
      { titleContains: "COMP3900", effortLevel: "very-heavy" },
      { titleContains: "COMP6080", effortLevel: "heavy" },
      { titleContains: "MATH1131", effortLevel: "very-heavy" },
      { titleContains: "MATH1081", effortLevel: "heavy" },
      { titleContains: "PSYC1001", effortLevel: "moderate" },
      { titleContains: "MGMT1001", effortLevel: "light" },
      { titleContains: "ACCT1501", effortLevel: "moderate" },
      { titleContains: "FINS1613", effortLevel: "moderate" },
      { titleContains: "ARTS1000", effortLevel: "light" },
      { titleContains: "ECON1101", effortLevel: "moderate" },
    ];
    
    for (const course of courses) {
      let effortLevel = "moderate";
      const mapping = workloadMappings.find(m => course.title.includes(m.titleContains));
      if (mapping) {
        effortLevel = mapping.effortLevel;
      } else {
        const diff = course.difficulty?.toLowerCase();
        if (diff === "beginner") effortLevel = "light";
        else if (diff === "intermediate") effortLevel = "moderate";
        else if (diff === "advanced") effortLevel = "heavy";
        else {
          const options = ["light", "moderate", "heavy"];
          effortLevel = options[Math.floor(Math.random() * options.length)];
        }
      }
      
      let existingOutcomes = {};
      try {
        if (course.learningOutcomes && typeof course.learningOutcomes === "string") {
          existingOutcomes = JSON.parse(course.learningOutcomes);
        } else if (course.learningOutcomes && typeof course.learningOutcomes === "object") {
          existingOutcomes = course.learningOutcomes;
        }
      } catch (e) {
        existingOutcomes = {};
      }
      
      await prisma.course.update({
        where: { id: course.id },
        data: { 
          learningOutcomes: JSON.stringify({
            ...existingOutcomes,
            effortLevel: effortLevel
          })
        }
      });
      
      console.log(`✅ Updated ${course.title}: ${effortLevel} workload`);
    }
    
    console.log("🎉 Workload data added successfully!");
  } catch (error) {
    console.error("❌ Error adding workload data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

addWorkloadData();
EOF'
        docker-compose exec backend node add-workload-data.js
    }
    
    print_success "Database setup completed with workload data"
}

# Show service status
show_status() {
    print_status "Service Status:"
    docker-compose ps
    
    echo ""
    print_status "Access URLs:"
    echo "🌐 Frontend: http://localhost"
    echo "🔗 Backend API: http://localhost:3001/api"
    echo "💾 Database: localhost:5432"
    echo "🔴 Redis: localhost:6379"
    
    echo ""
    print_status "Health Checks:"
    echo "Frontend: curl http://localhost/health"
    echo "Backend: curl http://localhost:3001/api/health"
}

# Stop services
stop_services() {
    print_status "Stopping services..."
    docker-compose down
    print_success "Services stopped"
}

# Clean up
cleanup() {
    print_warning "This will remove all containers, networks, and volumes!"
    read -p "Are you sure? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "Cleaning up..."
        docker-compose down -v --remove-orphans
        docker system prune -f
        print_success "Cleanup completed"
    else
        print_status "Cleanup cancelled"
    fi
}

# Main script
main() {
    local command=${1:-help}
    
    case $command in
        "dev")
            check_docker
            check_compose
            setup_env
            build_and_start "dev"
            wait_for_services
            setup_database
            show_status
            ;;
        "prod")
            check_docker
            check_compose
            setup_env
            build_and_start "prod"
            wait_for_services
            setup_database
            show_status
            ;;
        "start")
            check_docker
            docker-compose up -d
            show_status
            ;;
        "stop")
            stop_services
            ;;
        "restart")
            stop_services
            sleep 2
            docker-compose up -d
            show_status
            ;;
        "status")
            show_status
            ;;
        "logs")
            docker-compose logs -f
            ;;
        "logs-backend")
            docker-compose logs -f backend
            ;;
        "logs-frontend")
            docker-compose logs -f frontend
            ;;
        "logs-db")
            docker-compose logs -f postgres
            ;;
        "shell-backend")
            docker-compose exec backend sh
            ;;
        "shell-db")
            docker-compose exec postgres psql -U unlocked_user -d unlocked
            ;;
        "cleanup")
            cleanup
            ;;
        "help"|*)
            echo "UnlockED Docker Deployment Script"
            echo ""
            echo "Usage: $0 [command]"
            echo ""
            echo "Commands:"
            echo "  dev         - Build and start in development mode"
            echo "  prod        - Build and start in production mode"
            echo "  start       - Start existing services"
            echo "  stop        - Stop all services"
            echo "  restart     - Restart all services"
            echo "  status      - Show service status and URLs"
            echo "  logs        - Show logs for all services"
            echo "  logs-backend - Show backend logs"
            echo "  logs-frontend - Show frontend logs"
            echo "  logs-db     - Show database logs"
            echo "  shell-backend - Open shell in backend container"
            echo "  shell-db    - Open database shell"
            echo "  cleanup     - Remove all containers and volumes"
            echo "  help        - Show this help message"
            ;;
    esac
}

# Run main function with all arguments
main "$@"
