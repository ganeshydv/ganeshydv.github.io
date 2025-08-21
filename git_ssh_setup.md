# 🔐 SSH Key Management & Git Configuration Guide

## 📋 Table of Contents
1. [SSH Key Generation](#-ssh-key-generation)
2. [Adding SSH Key to Git Platforms](#-adding-ssh-key-to-git-platforms)  
3. [SSH Config for Multiple Accounts](#-ssh-config-for-multiple-accounts)
4. [Testing SSH Connections](#-testing-ssh-connections)
5. [Host Key Issue Resolution](#️-host-key-issue-resolution)
6. [Security Best Practices](#-security-best-practices)
7. [Troubleshooting](#### Debug SSH connection
ssh -vvv git@github.com
```

---

## 📋 Quick Reference

### Essential Commands Cheat Sheet

#### Key Generation
```bash
# Modern Ed25519 key
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_work -C "work@company.com" -N ""

# Legacy RSA key  
ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa_work -C "work@company.com" -N ""
```

#### Key Management
```bash
# Copy public key (Windows)
cat ~/.ssh/id_ed25519_work.pub | clip

# List all keys
ls -la ~/.ssh/id_*

# Get key fingerprint
ssh-keygen -lf ~/.ssh/id_ed25519_work.pub

# Add key to SSH agent
ssh-add ~/.ssh/id_ed25519_work

# List loaded keys
ssh-add -l
```

#### Connection Testing
```bash
# Test specific account
ssh -T git@github.com-work

# Test with verbose output
ssh -vT git@bitbucket.org

# Test with specific key
ssh -i ~/.ssh/id_ed25519_work -T git@github.com
```

#### Git Operations
```bash
# Clone with specific account
git clone git@github.com-work:company/repo.git

# Change remote URL
git remote set-url origin git@github.com-personal:user/repo.git

# Check current remote
git remote -v
```

#### Host Key Management
```bash
# Remove problematic host
ssh-keygen -R github.com

# Add current host key
ssh-keyscan -H github.com >> ~/.ssh/known_hosts

# View known hosts
cat ~/.ssh/known_hosts
```

#### File Permissions
```bash
# Fix SSH directory permissions
chmod 700 ~/.ssh
chmod 600 ~/.ssh/config ~/.ssh/id_*
chmod 644 ~/.ssh/id_*.pub ~/.ssh/known_hosts
```

### Configuration Templates

#### Basic SSH Config
```bash
# ~/.ssh/config
Host github-work
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_work
    IdentitiesOnly yes

Host github-personal  
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_personal
    IdentitiesOnly yes
```

#### Corporate Environment Config
```bash
# ~/.ssh/config
Host *.company.com
    User git
    IdentityFile ~/.ssh/id_ed25519_work
    IdentitiesOnly yes
    
Host github.com-corp
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_work
    IdentitiesOnly yes
```

### Platform-Specific Links
- **GitHub SSH Settings**: https://github.com/settings/ssh/new
- **Bitbucket SSH Settings**: https://bitbucket.org/account/settings/ssh-keys/
- **GitLab SSH Settings**: https://gitlab.com/-/profile/keys

---

## 📖 Additional Resources

### Documentation Links
- [GitHub SSH Documentation](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- [Bitbucket SSH Documentation](https://support.atlassian.com/bitbucket-cloud/docs/set-up-an-ssh-key/)
- [GitLab SSH Documentation](https://docs.gitlab.com/ee/ssh/)
- [OpenSSH Manual](https://man.openbsd.org/ssh_config)

### Best Practice Articles
- [SSH Key Security Best Practices](https://wiki.mozilla.org/Security/Guidelines/OpenSSH)
- [Git with Multiple SSH Keys](https://gist.github.com/jexchan/2351996)

---

*💡 **Pro Tip**: Bookmark this guide and keep your SSH config organized. Regular maintenance prevents most SSH issues!*

*🔐 **Security Reminder**: Never share private keys and always verify host fingerprints through official channels.*oubleshooting)
8. [Quick Reference](#-quick-reference)

> **💡 Pro Tip**: This guide covers everything from basic SSH setup to advanced multi-account management. Perfect for developers working with multiple Git services!

---

## 🔑 SSH Key Generation

### Modern Key Generation (Recommended)
```bash
# Ed25519 - Modern, secure, fast (recommended)
ssh-keygen -t ed25519 -C "your-email@example.com"

# Ed25519 with specific filename for multiple accounts
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_work -C "work@company.com" -N ""
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_personal -C "personal@gmail.com" -N ""

# RSA 4096 - Legacy compatibility (if Ed25519 not supported)
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"
ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa_work -C "work@company.com" -N ""
```

### Key Generation Parameters
| Parameter | Purpose | Example Values |
|-----------|---------|----------------|
| `-t` | Key type | `ed25519` (recommended), `rsa` |
| `-b` | Key size (RSA only) | `4096` |
| `-f` | Output filename | `~/.ssh/id_ed25519_work` |
| `-C` | Comment/Label | Email address |
| `-N` | Passphrase | `""` for empty, or strong passphrase |

### Save the Key
- **Default location**: `~/.ssh/id_ed25519` (or `~/.ssh/id_rsa`)
- **Custom naming**: Use descriptive names for multiple accounts
- **Passphrase**: Recommended for enhanced security
- Press `Enter` to accept default location or specify custom path

### SSH Agent Management
```bash
# Start the SSH agent (if not running)
eval "$(ssh-agent -s)"

# Add your SSH private key to the ssh-agent
ssh-add ~/.ssh/id_ed25519
ssh-add ~/.ssh/id_ed25519_work
ssh-add ~/.ssh/id_ed25519_personal

# For RSA keys
ssh-add ~/.ssh/id_rsa
ssh-add ~/.ssh/id_rsa_work

# List loaded keys
ssh-add -l

# Remove all keys from agent
ssh-add -D
```

### Copy Public Key to Clipboard
```bash
# Windows (Git Bash)
cat ~/.ssh/id_ed25519.pub | clip
cat ~/.ssh/id_ed25519_work.pub | clip

# Linux
cat ~/.ssh/id_ed25519.pub | xclip -selection clipboard

# macOS
cat ~/.ssh/id_ed25519.pub | pbcopy

# View key content
cat ~/.ssh/id_ed25519_work.pub
```

### View Generated Keys
```bash
# List all SSH key files
ls -la ~/.ssh/id_*

# Get key fingerprint
ssh-keygen -lf ~/.ssh/id_ed25519_work.pub

# Example output: 256 SHA256:ABC123... work@company.com (ED25519)
```

---

## 🌐 Adding SSH Key to Git Platforms

### GitHub Setup
1. **Copy your public key:**
   ```bash
   cat ~/.ssh/id_ed25519.pub
   # or for work account: cat ~/.ssh/id_ed25519_work.pub
   ```

2. **Add to GitHub:**
   - Go to: [GitHub SSH Settings](https://github.com/settings/ssh/new)
   - Click **"New SSH key"**
   - **Title**: "Work Laptop - Windows" or "Personal Development"
   - **Key**: Paste the **public key** content
   - Click **"Add SSH key"**

### Bitbucket Setup
1. **Copy your public key:**
   ```bash
   cat ~/.ssh/id_ed25519_work.pub
   ```

2. **Add to Bitbucket:**
   - Go to: [Bitbucket SSH Settings](https://bitbucket.org/account/settings/ssh-keys/)
   - Click **"Add key"**
   - **Label**: "Development Machine - Ed25519"
   - **Key**: Paste the **public key** content
   - Click **"Add key"**

### GitLab Setup
1. **Copy your public key:**
   ```bash
   cat ~/.ssh/id_ed25519_work.pub
   ```

2. **Add to GitLab:**
   - Go to: **Preferences** → **SSH Keys**
   - **Title**: "Work Environment"
   - **Key**: Paste the **public key** content
   - **Expiration date**: Optional (recommended for security)
   - Click **"Add key"**

### Initial Connection Test
```bash
# Test GitHub connection
ssh -T git@github.com

# Test Bitbucket connection
ssh -T git@bitbucket.org

# Test GitLab connection
ssh -T git@gitlab.com

# Expected success message examples:
# GitHub: "Hi username! You've successfully authenticated..."
# Bitbucket: "logged in as username."
# GitLab: "Welcome to GitLab, @username!"
```

---

## ⚙️ SSH Config for Multiple Accounts

### Create SSH Config File
```bash
# Create or edit SSH config file
touch ~/.ssh/config
chmod 600 ~/.ssh/config
nano ~/.ssh/config
# or use: code ~/.ssh/config
```

### Multi-Account Configuration Example
```bash
# Personal GitHub Account
Host github.com-personal
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_personal
    IdentitiesOnly yes

# Work GitHub Account  
Host github.com-work
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_work
    IdentitiesOnly yes

# Work Bitbucket Account
Host bitbucket.org
    HostName bitbucket.org
    User git
    IdentityFile ~/.ssh/id_ed25519_work
    IdentitiesOnly yes

# Personal Bitbucket (alternative setup)
Host bitbucket-personal
    HostName bitbucket.org
    User git
    IdentityFile ~/.ssh/id_ed25519_personal
    IdentitiesOnly yes

# Company GitLab
Host gitlab.company.com
    HostName gitlab.company.com
    User git
    IdentityFile ~/.ssh/id_ed25519_work
    IdentitiesOnly yes
    Port 22
```

### SSH Config Parameters Explained
| Parameter | Purpose | Example Values |
|-----------|---------|----------------|
| `Host` | **Alias/Pattern** | `github.com-work`, `bitbucket.org` |
| `HostName` | **Real server address** | `github.com`, `bitbucket.org` |
| `User` | **SSH username** | Always `git` for Git operations |
| `IdentityFile` | **Path to private key** | `~/.ssh/id_ed25519_work` |
| `IdentitiesOnly` | **Restrict key usage** | `yes` (prevents key confusion) |
| `Port` | **SSH port** | `22` (default), `443` (alternative) |

### Using SSH Config for Git Operations
```bash
# Clone using specific SSH config
git clone git@github.com-work:company/project.git
git clone git@github.com-personal:username/project.git
git clone git@bitbucket-personal:username/project.git

# Change existing repo remote
git remote set-url origin git@github.com-work:company/project.git

# Check current remote
git remote -v
```

---

## 🚀 Testing SSH Connections

### Test Individual SSH Configurations
```bash
# Test default configurations
ssh -T git@github.com
ssh -T git@bitbucket.org
ssh -T git@gitlab.com

# Test specific account configurations
ssh -T git@github.com-work
ssh -T git@github.com-personal
ssh -T git@bitbucket-personal

# Test with verbose output for debugging
ssh -vT git@github.com-work
ssh -vvvT git@bitbucket.org  # Very verbose
```

### Expected Success Messages
```bash
# GitHub
Hi username! You've successfully authenticated, but GitHub does not provide shell access.

# Bitbucket  
logged in as username.

# GitLab
Welcome to GitLab, @username!
```

### Test with Specific Key (Bypass Config)
```bash
# Force specific key usage
ssh -i ~/.ssh/id_ed25519_work -T git@github.com
ssh -i ~/.ssh/id_ed25519_personal -T git@bitbucket.org

# Test connection on alternative port
ssh -T -p 443 git@ssh.github.com
```

---

## 🛠️ Host Key Issue Resolution

### Problem Overview
SSH connection to Bitbucket failed due to changed host fingerprint, blocking Git operations.

### Solution Steps Executed
### 1. Diagnose the Issue
```bash
# Check SSH directory contents
ls -la ~/.ssh/

# Check current known hosts
cat ~/.ssh/known_hosts
```
**Found**: `known_hosts` file containing outdated Bitbucket fingerprint

### 2. Examine Current State
```bash
# View problematic host key
cat .ssh/known_hosts
```
**Result**: Old RSA key from 2023 that no longer matched Bitbucket's current key

### 3. Remove Outdated Entry
```bash
# Safely remove old host key
ssh-keygen -R bitbucket.org
```
**Output**: Host key removed, backup created as `known_hosts.old`

### 4. Add Current Host Keys
```bash
# Retrieve and store new legitimate keys
ssh-keyscan -H bitbucket.org >> ~/.ssh/known_hosts

# Alternative: Manual verification (more secure)
ssh-keyscan bitbucket.org
```
**Result**: Three new host keys added (RSA, ECDSA, Ed25519)

### 5. Verify Resolution
```bash
# Confirm user authentication key
ssh-keygen -lf ~/.ssh/id_rsa.pub

# Test connection
ssh -T git@bitbucket.org
```
**Fingerprint**: SHA256:xuahsib...

---

## 🔧 Technical Explanation

### SSH Authentication Components
| Component | Purpose | Location |
|-----------|---------|----------|
| **Host Keys** | Server identity verification | `~/.ssh/known_hosts` |
| **User Keys** | Your identity proof | `~/.ssh/id_rsa` + `~/.ssh/id_rsa.pub` |

### Authentication Flow
1. **Server Identification**: Bitbucket sends its host key
2. **Local Verification**: System checks against stored fingerprints
3. **User Authentication**: Your public key sent to server
4. **Account Validation**: Server matches key to your Bitbucket account
5. **Access Granted**: Git operations proceed

### Root Cause
Bitbucket updated their SSH infrastructure, changing server host keys. Your local `known_hosts` file contained the previous fingerprint, causing the security mismatch error.

### Files Modified
- **Before**: `known_hosts` contained single outdated entry
- **After**: `known_hosts` contains current RSA, ECDSA, and Ed25519 keys
- **Backup**: Original saved as `known_hosts.old`

---

## 🔒 Security Best Practices

### Key Management Security
- ✅ **Use Ed25519** keys when possible (modern, secure)
- ✅ **Different keys** for work/personal accounts
- ✅ **Strong passphrases** for private keys (12+ characters)
- ✅ **Regular key rotation** (annually or per company policy)
- ✅ **Backup keys** securely (encrypted storage)
- ❌ **Never share** private keys
- ❌ **Don't commit** keys to repositories
- ❌ **Avoid email** transmission of keys

### SSH Configuration Security
- ✅ Use `IdentitiesOnly yes` to prevent key leakage
- ✅ Set proper file permissions:
  ```bash
  chmod 700 ~/.ssh
  chmod 600 ~/.ssh/config
  chmod 600 ~/.ssh/id_*
  chmod 644 ~/.ssh/id_*.pub
  chmod 644 ~/.ssh/known_hosts
  ```
- ✅ Use descriptive host aliases in config
- ✅ Regular config file reviews

### Host Verification Security
- ✅ **Verify fingerprints** through official channels
- ✅ **Investigate** unexpected host key changes
- ✅ **Keep known_hosts** updated
- ✅ **Document** legitimate host key changes
- ❌ **Don't disable** `StrictHostKeyChecking`

### File Structure Best Practices
```
~/.ssh/
├── config                      # SSH configuration (600)
├── known_hosts                 # Trusted host fingerprints (644)
├── id_ed25519_work            # Work private key (600)
├── id_ed25519_work.pub        # Work public key (644)
├── id_ed25519_personal        # Personal private key (600)
├── id_ed25519_personal.pub    # Personal public key (644)
└── known_hosts.old            # Backup of previous known_hosts
```

---

## 🚨 Troubleshooting

### Common SSH Issues

#### Permission Denied (publickey)
```bash
# Check if SSH agent is running
ssh-add -l

# Add your key to SSH agent
ssh-add ~/.ssh/id_ed25519
```

#### Bad Permissions
```bash
# Fix SSH directory permissions
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub
chmod 644 ~/.ssh/known_hosts
```

#### Key Not Found
```bash
# List available keys
ls -la ~/.ssh/

# Generate new key if needed
ssh-keygen -t ed25519 -C "your-email@example.com"
```

#### Connection Timeout
```bash
# Test with verbose output
ssh -vT git@github.com

# Try different port (443 instead of 22)
ssh -T -p 443 git@ssh.github.com
```

### SSH Config for Multiple Accounts
Create `~/.ssh/config`:
```
# GitHub personal
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519

# GitHub work
Host github-work
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_work

# Bitbucket
Host bitbucket.org
    HostName bitbucket.org
    User git
    IdentityFile ~/.ssh/id_ed25519
```

### Useful Commands
```bash
# View SSH agent keys
ssh-add -l

# Remove all keys from agent
ssh-add -D

# Test connection with specific key
ssh -i ~/.ssh/id_ed25519 -T git@github.com

# Debug SSH connection
ssh -vvv git@github.com
```