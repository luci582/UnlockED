#!/bin/bash

# UnlockED Docker Deployment Script

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
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

# Check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    print_success "Docker and Docker Compose are installed"
}

# Build and start the application
deploy() {
    print_status "Starting UnlockED deployment..."
    
    # Stop any existing containers
    print_status "Stopping existing containers..."
    docker-compose down --remove-orphans || true
    
    # Build and start services
    print_status "Building and starting services..."
    docker-compose up --build -d
    
    # Wait for services to be healthy
    print_status "Waiting for services to start..."
    sleep 10
    
    # Check service health
    if docker-compose ps | grep -q "healthy"; then
        print_success "Services are running and healthy!"
        echo ""
        print_status "Application URLs:"
        echo "  Frontend: http://localhost:80"
        echo "  Backend:  http://localhost:3001"
        echo "  Admin key: teamlockedin124"
        echo ""
        print_status "To view logs: docker-compose logs -f"
        print_status "To stop: docker-compose down"
    else
        print_warning "Services started but health check pending..."
        print_status "Check logs with: docker-compose logs"
    fi
}

# Clean up everything
cleanup() {
    print_status "Cleaning up containers and images..."
    docker-compose down --volumes --remove-orphans
    docker system prune -a -f
    print_success "Cleanup completed"
}

# Show logs
show_logs() {
    docker-compose logs -f
}

# Show status
show_status() {
    echo ""
    print_status "Container Status:"
    docker-compose ps
    echo ""
    print_status "Service Health:"
    docker-compose exec backend node -e "require('http').get('http://localhost:3001/api/test', (res) => { console.log('Backend:', res.statusCode === 200 ? 'Healthy' : 'Unhealthy') })" 2>/dev/null || echo "Backend: Not responding"
}

# Main script logic
case "${1:-deploy}" in
    "deploy")
        check_docker
        deploy
        ;;
    "cleanup")
        cleanup
        ;;
    "logs")
        show_logs
        ;;
    "status")
        show_status
        ;;
    "help")
        echo "UnlockED Docker Deployment Script"
        echo ""
        echo "Usage: $0 [command]"
        echo ""
        echo "Commands:"
        echo "  deploy  - Build and start the application (default)"
        echo "  cleanup - Stop and remove all containers and images"
        echo "  logs    - Show and follow application logs"
        echo "  status  - Show current status of services"
        echo "  help    - Show this help message"
        ;;
    *)
        print_error "Unknown command: $1"
        print_status "Use '$0 help' for usage information"
        exit 1
        ;;
esac
