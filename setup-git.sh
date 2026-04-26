#!/bin/bash

# ============================================
# Git Configuration Script
# ============================================
# This script helps you configure Git for this project

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

echo "=========================================="
echo "Git Configuration Setup"
echo "=========================================="
echo ""

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git is not installed. Please install Git first.${NC}"
    exit 1
fi

print_success "Git found: $(git --version)"
echo ""

# Configure user name
echo -n "Enter your Git user name (e.g., John Doe): "
read -r USER_NAME

if [ -z "$USER_NAME" ]; then
    print_warning "No name entered. Skipping user.name configuration."
else
    git config --global user.name "$USER_NAME"
    print_success "User name set to: $USER_NAME"
fi

echo ""

# Configure user email
echo -n "Enter your Git email (e.g., john@example.com): "
read -r USER_EMAIL

if [ -z "$USER_EMAIL" ]; then
    print_warning "No email entered. Skipping user.email configuration."
else
    git config --global user.email "$USER_EMAIL"
    print_success "User email set to: $USER_EMAIL"
fi

echo ""

# Configure default branch name
git config --global init.defaultBranch main
print_success "Default branch set to: main"

# Configure push behavior
git config --global push.default simple
print_success "Push behavior set to: simple"

# Enable color output
git config --global color.ui auto
print_success "Color UI enabled"

# Configure line endings (Linux/Mac)
git config --global core.autocrlf input
print_success "Line ending handling configured for Linux/Mac"

# Add helpful aliases
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.last 'log -1 HEAD'
git config --global alias.lg "log --oneline --graph --all --decorate"
print_success "Git aliases configured (co, br, ci, st, last, lg)"

echo ""
echo "=========================================="
print_success "Git configuration complete!"
echo "=========================================="
echo ""
echo "Current Git configuration:"
git config --global --list
echo ""
print_info "You can now use Git commands in this repository."
print_info "Common commands:"
echo "  git status     - Check repository status"
echo "  git add .      - Stage all changes"
echo "  git commit -m 'message' - Commit changes"
echo "  git push       - Push to remote repository"
echo "  git pull       - Pull from remote repository"
