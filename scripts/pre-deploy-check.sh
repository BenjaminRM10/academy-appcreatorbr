#!/bin/bash

# Pre-Deployment Checklist Script
# Run this before deploying to production

echo "🚀 AcademyBR - Pre-Deployment Check"
echo "===================================="
echo ""

ERRORS=0
WARNINGS=0

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ ERROR: .env.local not found"
    ERRORS=$((ERRORS + 1))
else
    echo "✅ .env.local found"
fi

# Check for required environment variables
echo ""
echo "Checking environment variables..."

check_env_var() {
    local var_name=$1
    local var_value=$(grep "^$var_name=" .env.local 2>/dev/null | cut -d '=' -f 2-)
    
    if [ -z "$var_value" ]; then
        echo "❌ ERROR: $var_name is missing"
        ERRORS=$((ERRORS + 1))
        return 1
    fi
    
    # Check for placeholder values
    if [[ "$var_value" =~ (placeholder|changeme|your_|tu_) ]]; then
        echo "⚠️  WARNING: $var_name contains placeholder value"
        WARNINGS=$((WARNINGS + 1))
        return 1
    fi
    
    # Check for test vs live keys
    if [[ "$var_name" =~ STRIPE ]] && [[ "$var_value" =~ _test_ ]]; then
        echo "⚠️  WARNING: $var_name is using TEST mode"
        WARNINGS=$((WARNINGS + 1))
        return 1
    fi
    
    echo "✅ $var_name is set"
    return 0
}

check_env_var "NEXT_PUBLIC_SUPABASE_URL"
check_env_var "NEXT_PUBLIC_SUPABASE_ANON_KEY"
check_env_var "SUPABASE_SERVICE_ROLE_KEY"
check_env_var "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
check_env_var "STRIPE_SECRET_KEY"
check_env_var "STRIPE_WEBHOOK_SECRET"
check_env_var "NEXT_PUBLIC_APP_URL"

# Check if debug route exists
echo ""
echo "Checking for security issues..."
if [ -d "src/app/(student)/student/debug" ]; then
    echo "❌ ERROR: /student/debug route still exists (security risk)"
    ERRORS=$((ERRORS + 1))
else
    echo "✅ Debug route removed"
fi

# Check if .gitignore includes .env files
if grep -q "\.env\.local" .gitignore 2>/dev/null; then
    echo "✅ .env.local in .gitignore"
else
    echo "⚠️  WARNING: .env.local not in .gitignore"
    WARNINGS=$((WARNINGS + 1))
fi

# Summary
echo ""
echo "===================================="
echo "Summary:"
echo "  Errors: $ERRORS"
echo "  Warnings: $WARNINGS"
echo ""

if [ $ERRORS -gt 0 ]; then
    echo "❌ DEPLOYMENT BLOCKED - Fix errors before deploying"
    exit 1
elif [ $WARNINGS -gt 0 ]; then
    echo "⚠️  REVIEW WARNINGS - You can deploy but should review issues"
    exit 0
else
    echo "✅ ALL CHECKS PASSED - Ready for deployment!"
    exit 0
fi
