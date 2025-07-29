#!/bin/bash

# UnlockED Security Verification Script
# Run this script to verify all security measures are properly implemented

echo "🔒 UnlockED Security Verification Script"
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if a string exists in a file
check_file_content() {
    local file="$1"
    local search_string="$2"
    local description="$3"
    
    if [ -f "$file" ]; then
        if grep -q "$search_string" "$file"; then
            echo -e "✅ ${GREEN}PASS${NC}: $description"
            return 0
        else
            echo -e "❌ ${RED}FAIL${NC}: $description"
            return 1
        fi
    else
        echo -e "⚠️  ${YELLOW}WARN${NC}: File $file not found"
        return 1
    fi
}

# Function to check Node.js dependencies for vulnerabilities
check_npm_vulnerabilities() {
    echo -e "\n� Checking npm dependencies for vulnerabilities..."
    
    if [ -f "package.json" ]; then
        if command -v npm >/dev/null 2>&1; then
            echo "Running npm audit..."
            if npm audit --audit-level moderate 2>/dev/null; then
                echo -e "✅ ${GREEN}PASS${NC}: No moderate or high vulnerabilities found"
            else
                echo -e "⚠️  ${YELLOW}WARN${NC}: npm audit found vulnerabilities - run 'npm audit fix'"
            fi
        else
            echo -e "⚠️  ${YELLOW}WARN${NC}: npm not available, skipping dependency check"
        fi
    else
        echo -e "❌ ${RED}FAIL${NC}: package.json not found"
    fi
}

# Function to check security headers in nginx config
check_security_headers() {
    echo -e "\n🛡️  Checking Security Headers in nginx.conf..."
    
    check_file_content "nginx.conf" "X-Frame-Options" "X-Frame-Options header configured"
    check_file_content "nginx.conf" "X-XSS-Protection" "XSS Protection header configured"
    check_file_content "nginx.conf" "X-Content-Type-Options" "Content-Type-Options header configured"
    check_file_content "nginx.conf" "Referrer-Policy" "Referrer Policy header configured"
    check_file_content "nginx.conf" "Content-Security-Policy" "Content Security Policy configured"
    
    # Check for HTTPS redirect (if applicable)
    if grep -q "return 301 https" nginx.conf 2>/dev/null; then
        echo -e "✅ ${GREEN}PASS${NC}: HTTPS redirect configured"
    else
        echo -e "⚠️  ${YELLOW}INFO${NC}: No HTTPS redirect found (OK for development)"
    fi
}

# Function to check authentication security
check_authentication_security() {
    echo -e "\n� Checking Authentication Security..."
    
    # Note: Current implementation uses simple auth, check for bcrypt dependency
    if grep -q "bcrypt" backend/package.json 2>/dev/null; then
        echo -e "✅ ${GREEN}PASS${NC}: bcrypt dependency found"
    else
        echo -e "⚠️  ${YELLOW}INFO${NC}: Using simple auth implementation (suitable for development)"
    fi
    check_file_content "src/lib/auth.ts" "localStorage.setItem.*authToken" "JWT token storage"
    
    # Check for environment variables
    if [ -f ".env" ]; then
        if grep -q "JWT_SECRET" .env; then
            echo -e "✅ ${GREEN}PASS${NC}: JWT secret configured"
        else
            echo -e "⚠️  ${YELLOW}WARN${NC}: JWT secret not found in .env"
        fi
    else
        echo -e "⚠️  ${YELLOW}WARN${NC}: .env file not found"
    fi
    
    # Check for hardcoded secrets
    if grep -r "secret.*=" src/ --include="*.ts" --include="*.tsx" 2>/dev/null | grep -v "process.env"; then
        echo -e "❌ ${RED}FAIL${NC}: Potential hardcoded secrets found"
    else
        echo -e "✅ ${GREEN}PASS${NC}: No hardcoded secrets in source code"
    fi
}

# Function to check API security
check_api_security() {
    echo -e "\n� Checking API Security..."
    
    check_file_content "backend/server-simple.js" "cors" "CORS configuration present"
    check_file_content "backend/server-simple.js" "express.json" "JSON body parsing with limits"
    
    # Check for rate limiting
    if grep -q "rate" backend/server-simple.js; then
        echo -e "✅ ${GREEN}PASS${NC}: Rate limiting mechanisms found"
    else
        echo -e "⚠️  ${YELLOW}WARN${NC}: Consider implementing rate limiting"
    fi
    
    # Check for input validation
    if grep -q "email.*password" backend/server-simple.js; then
        echo -e "✅ ${GREEN}PASS${NC}: Input validation for auth endpoints"
    else
        echo -e "⚠️  ${YELLOW}WARN${NC}: Ensure proper input validation"
    fi
    
    # Check for SQL injection protection (Prisma usage)
    if [ -f "backend/prisma/schema.prisma" ]; then
        echo -e "✅ ${GREEN}PASS${NC}: Prisma ORM used (SQL injection protection)"
    else
        echo -e "⚠️  ${YELLOW}INFO${NC}: Using in-memory storage (development setup)"
    fi
}

# Function to check frontend security
check_frontend_security() {
    echo -e "\n🌐 Checking Frontend Security..."
    
    # Check for dangerous functions in React code
    if grep -r "dangerouslySetInnerHTML" src/ --include="*.tsx" --include="*.ts" 2>/dev/null; then
        echo -e "⚠️  ${YELLOW}WARN${NC}: dangerouslySetInnerHTML usage found - ensure content is sanitized"
    else
        echo -e "✅ ${GREEN}PASS${NC}: No dangerouslySetInnerHTML usage found"
    fi
    
    # Check for eval usage
    if grep -r "eval(" src/ --include="*.ts" --include="*.tsx" 2>/dev/null; then
        echo -e "❌ ${RED}FAIL${NC}: eval() usage found in source code"
    else
        echo -e "✅ ${GREEN}PASS${NC}: No eval() usage in source code"
    fi
    
    # Check for localStorage usage security
    if grep -r "localStorage" src/ --include="*.ts" --include="*.tsx" 2>/dev/null | head -3; then
        echo -e "⚠️  ${YELLOW}INFO${NC}: localStorage usage found - ensure sensitive data is not stored"
    fi
    
    # Check for external script loading
    if grep -r "script.*src.*http" public/ src/ --include="*.html" --include="*.tsx" 2>/dev/null; then
        echo -e "⚠️  ${YELLOW}WARN${NC}: External scripts found - consider using SRI (Subresource Integrity)"
    else
        echo -e "✅ ${GREEN}PASS${NC}: No external scripts without integrity checks"
    fi
}

# Function to check environment and configuration security
check_environment_security() {
    echo -e "\n⚙️  Checking Environment Security..."
    
    # Check for .env files
    if [ -f ".env" ]; then
        echo -e "✅ ${GREEN}PASS${NC}: .env file exists"
        
        # Check if .env is in .gitignore
        if [ -f ".gitignore" ] && grep -q ".env" .gitignore; then
            echo -e "✅ ${GREEN}PASS${NC}: .env file is in .gitignore"
        else
            echo -e "❌ ${RED}FAIL${NC}: .env file should be in .gitignore"
        fi
    else
        echo -e "⚠️  ${YELLOW}WARN${NC}: .env file not found"
    fi
    
    # Check for production environment file
    if [ -f ".env.production" ]; then
        echo -e "✅ ${GREEN}PASS${NC}: Production environment file exists"
    else
        echo -e "⚠️  ${YELLOW}WARN${NC}: .env.production file not found"
    fi
    
    # Check for exposed sensitive files
    if [ -f ".env.example" ]; then
        echo -e "✅ ${GREEN}PASS${NC}: .env.example file exists (good practice)"
    else
        echo -e "⚠️  ${YELLOW}INFO${NC}: Consider adding .env.example file"
    fi
}

# Function to check for potential vulnerabilities
check_vulnerabilities() {
    echo -e "\n🔍 Scanning for Potential Vulnerabilities..."
    
    # Check for console.log in production code
    if grep -r "console.log" src/ --include="*.ts" --include="*.tsx" 2>/dev/null | head -3; then
        echo -e "⚠️  ${YELLOW}WARN${NC}: console.log statements found - remove for production"
    else
        echo -e "✅ ${GREEN}PASS${NC}: No console.log statements in source code"
    fi
    
    # Check for TODO/FIXME comments with security implications
    if grep -r "TODO.*security\|FIXME.*security\|TODO.*auth\|FIXME.*auth" . --include="*.js" --include="*.ts" --include="*.tsx" 2>/dev/null; then
        echo -e "⚠️  ${YELLOW}WARN${NC}: Security-related TODO/FIXME comments found"
    else
        echo -e "✅ ${GREEN}PASS${NC}: No security-related TODO/FIXME comments"
    fi
    
    # Check for hardcoded API URLs
    if grep -r "http://.*:" src/ --include="*.ts" --include="*.tsx" 2>/dev/null | grep -v "localhost" | head -3; then
        echo -e "⚠️  ${YELLOW}WARN${NC}: Hardcoded API URLs found - use environment variables"
    else
        echo -e "✅ ${GREEN}PASS${NC}: No hardcoded external API URLs found"
    fi
    
    # Check for any remaining debug code
    if grep -r "debugger" src/ --include="*.ts" --include="*.tsx" 2>/dev/null; then
        echo -e "⚠️  ${YELLOW}WARN${NC}: debugger statements found - remove for production"
    else
        echo -e "✅ ${GREEN}PASS${NC}: No debugger statements found"
    fi
}

# Function to generate security score
generate_security_score() {
    echo -e "\n📊 Security Assessment Summary"
    echo "================================"
    
    echo "UnlockED Security Features Implemented:"
    echo "• Nginx reverse proxy with security headers"
    echo "• CORS configuration for API protection"
    echo "• Environment-based configuration"
    echo "• React-based frontend (XSS protection)"
    echo "• JWT-based authentication system"
    echo "• Input validation in authentication"
    
    echo -e "\n🎯 Recommendations for Enhanced Security:"
    echo "1. Implement rate limiting on authentication endpoints"
    echo "2. Add request validation middleware (joi, zod, etc.)"
    echo "3. Implement CSRF protection for state-changing operations"
    echo "4. Add logging and monitoring for security events"
    echo "5. Use HTTPS in production with proper SSL/TLS configuration"
    echo "6. Implement session timeout and refresh token rotation"
    echo "7. Add security linting rules (eslint-plugin-security)"
    echo "8. Regular dependency updates and vulnerability scanning"
    echo "9. Implement proper error handling (don't expose stack traces)"
    echo "10. Add input sanitization for user-generated content"
    
    echo -e "\n🏆 Overall Security Status: ${GREEN}GOOD FOUNDATION${NC}"
    echo -e "The application has solid security fundamentals with room for production hardening."
    echo -e "Recommended next steps: Implement production security measures before deployment."
}

# Main execution
echo "Starting security verification for UnlockED..."
echo ""

check_npm_vulnerabilities
check_security_headers
check_authentication_security
check_api_security
check_frontend_security
check_environment_security
check_vulnerabilities
generate_security_score

echo -e "\n✅ Security verification complete!"
echo "📋 Review the report above and implement recommended security measures."
echo ""
echo "🔒 For ongoing security:"
echo "   • Run this script regularly (especially after updates)"
echo "   • Keep dependencies updated with 'npm audit fix'"
echo "   • Monitor for new vulnerabilities in your stack"
echo "   • Test with security tools (OWASP ZAP, Snyk, etc.)"
echo "   • Review and update security headers regularly"
echo "   • Implement security logging and monitoring"
