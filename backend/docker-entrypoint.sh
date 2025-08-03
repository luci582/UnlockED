#!/bin/sh

# Fix database permissions at startup (run as root)
if [ -d "/app/prisma" ]; then
    echo "Setting database permissions..."
    chown -R backend-user:backend-user /app/prisma
    chmod -R 755 /app/prisma
    find /app/prisma -name "*.db" -exec chmod 666 {} \; 2>/dev/null || true
fi

# Switch to backend-user and start the application
echo "Starting application as backend-user..."
exec su-exec backend-user npm start
