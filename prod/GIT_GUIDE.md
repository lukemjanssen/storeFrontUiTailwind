# 🎓 Complete Git Guide for Beginners

---

## 📚 Table of Contents

1. [What is Git?](#what-is-git)
2. [Basic Concepts](#basic-concepts)
3. [Setting Up Git](#setup)
4. [Basic Workflow](#basic-workflow)
5. [Branching](#branching)
6. [Merge vs Rebase vs Squash](#merge-rebase-squash)
7. [Git Squash Deep Dive](#squash)
8. [Common Scenarios](#scenarios)
9. [Troubleshooting](#troubleshooting)
10. [Best Practices](#best-practices)
11. [Quick Command Reference](#quick-reference)

---

## 1. What is Git? {#what-is-git}

**Git** is a **version control system** - it tracks changes to your code over time.

### Why Use Git?

**Without Git:**
```
my-project/
├── index.js
├── index-backup.js
├── index-old.js
├── index-final.js
├── index-final-final.js
└── index-actually-final.js  😰
```

**With Git:**
```
my-project/
├── index.js  (one file!)
└── .git/ (history of all changes)

git log shows:
- Version 1: Initial commit
- Version 2: Added search feature
- Version 3: Fixed bug
- Version 4: Added dark mode
```

---

## 2. Basic Concepts {#basic-concepts}

### The Three Areas

```
┌─────────────────────────────────────────────────────┐
│                Working Directory                    │
│  Your actual files (what you see in VS Code)       │
│  SearchBox.jsx, Header.jsx, etc.                   │
└──────────────────┬──────────────────────────────────┘
                   │ git add
                   ▼
┌─────────────────────────────────────────────────────┐
│                Staging Area (Index)                 │
│  Files ready to be committed                        │
│  Like a shopping cart before checkout               │
└──────────────────┬──────────────────────────────────┘
                   │ git commit
                   ▼
┌─────────────────────────────────────────────────────┐
│                Local Repository                     │
│  Permanent snapshot of your code                    │
│  Saved in .git folder                               │
└──────────────────┬──────────────────────────────────┘
                   │ git push
                   ▼
┌─────────────────────────────────────────────────────┐
│                Remote Repository                    │
│  GitHub/GitLab - backup in the cloud                │
└─────────────────────────────────────────────────────┘
```

### Key Terms

- **Repository (Repo)**: A project tracked by Git
- **Commit**: A snapshot of your code at a point in time
- **Branch**: A parallel version of your code
- **Remote**: A server hosting your repository (like GitHub)
- **HEAD**: Pointer to your current location in history

---

## 3. Setting Up Git {#setup}

### Initial Configuration

```bash
# Set your name (appears in commits)
git config --global user.name "Your Name"

# Set your email (appears in commits)
git config --global user.email "your.email@example.com"

# Set default branch name to 'main'
git config --global init.defaultBranch main

# Verify settings
git config --list
```

### Initialize a Repository

```bash
# Option 1: Start a new project
cd /Users/admin/Documents/my-new-project
git init  # Creates .git folder

# Option 2: Clone existing project
git clone https://github.com/username/repo-name.git
cd repo-name
```

---

## 4. Basic Workflow {#basic-workflow}

Let's say you modified `src/components/SearchBox.jsx`:

### Step-by-Step Example

```bash
# 1. Check what changed
git status

# Output:
# On branch main
# Changes not staged for commit:
#   modified:   src/components/SearchBox.jsx
```

This shows files in your **Working Directory** that changed.

```bash
# 2. See exactly what changed
git diff

# Output shows:
# - Lines removed (in red, prefixed with -)
# + Lines added (in green, prefixed with +)
```

Example diff:
```diff
- className="w-full px-4 py-3"
+ className="w-full px-4 py-3 text-gray-900 dark:text-gray-100"
```

```bash
# 3. Add file to staging area
git add src/components/SearchBox.jsx

# Or add all changed files
git add .

# Check status again
git status
# Output:
# Changes to be committed:
#   modified:   src/components/SearchBox.jsx
```

Now the file is in the **Staging Area** (ready to commit).

```bash
# 4. Commit the changes
git commit -m "Add dark mode text colors to SearchBox"

# Output:
# [main abc123] Add dark mode text colors to SearchBox
#  1 file changed, 2 insertions(+), 1 deletion(-)
```

This creates a permanent snapshot in your **Local Repository**.

```bash
# 5. View commit history
git log

# Output:
# commit abc123def456... (HEAD -> main)
# Author: Your Name <your.email@example.com>
# Date:   Mon Nov 10 14:30:00 2024
#
#     Add dark mode text colors to SearchBox
```

```bash
# 6. Push to remote (GitHub)
git push origin main

# Output:
# Counting objects: 3, done.
# Writing objects: 100% (3/3), done.
# To https://github.com/username/repo.git
#    old123..abc123  main -> main
```

Now your changes are backed up on **GitHub**!

---

## 5. Branching {#branching}

**Branches** let you work on features without affecting the main code.

### Visualization

```
main:     A --- B --- C
                       \
feature:                D --- E --- F
```

### Creating and Using Branches

```bash
# 1. See all branches
git branch
# Output:
# * main  (asterisk shows current branch)

# 2. Create new branch
git branch feature/search-improvements

# 3. Switch to new branch
git checkout feature/search-improvements
# Or create and switch in one command:
git checkout -b feature/search-improvements

# 4. Verify you're on the new branch
git branch
# Output:
# main
# * feature/search-improvements
```

### Real Example: Adding a Feature

```bash
# Create branch for new feature
git checkout -b feature/add-filters

# Make changes to ProductListings.jsx
# ... edit files ...

# Commit changes
git add src/components/ProductListings.jsx
git commit -m "Add price filter component"

# Make more changes
# ... edit more files ...

git add .
git commit -m "Add category filter"

# Push branch to GitHub
git push origin feature/add-filters
```

### Branch History

```
main:                A --- B --- C
                              \
feature/add-filters:           D --- E
                            (price) (category)
```

---

## 6. Merge vs Rebase vs Squash {#merge-rebase-squash}

These are three different ways to integrate changes from one branch into another. Each has its use case.

---

### 🔀 MERGE

**What it does:** Combines branches by creating a new merge commit.

**Use when:** 
- You want to preserve complete history
- Working on public/shared branches
- Want to see when features were integrated

#### Example Scenario: Feature Branch Merge

**Setup:**
```
main:     A --- B --- C
                   \
feature:            D --- E
```

**Command:**
```bash
git checkout main
git merge feature/add-search
```

**Result:**
```
main:     A --- B --- C ------- M
                   \           /
feature:            D --- E ---
```

Where M is a merge commit that says "Merged feature/add-search into main"

#### Real Example with Your Project:

```bash
# You're working on SearchBox improvements
git checkout -b feature/searchbox-improvements

# Make commits
git commit -m "Add search icon"
git commit -m "Add dark mode"
git commit -m "Add hover effects"

# Meanwhile, teammate updated main with ProductCard changes
# main:     A --- B --- C (ProductCard update)
#                    \
# feature:            D --- E --- F (SearchBox work)

# Merge feature into main
git checkout main
git merge feature/searchbox-improvements

# Result:
# main:     A --- B --- C ------- M
#                    \           /
# feature:            D --- E --- F

# History shows:
# - All individual commits (D, E, F)
# - When they were made
# - Merge commit (M) showing integration point
```

**Pros:**
- ✅ Complete history preserved
- ✅ Easy to see feature integration points
- ✅ Non-destructive (safe)

**Cons:**
- ❌ History can get cluttered with merge commits
- ❌ Not linear/clean

---

### 📐 REBASE

**What it does:** Moves your branch commits on top of another branch, rewriting history to be linear.

**Use when:**
- You want clean, linear history
- Working on local/private branches
- Need to update feature branch with latest main

#### Example Scenario: Update Feature Branch

**Setup:**
```
main:     A --- B --- C --- D (main moved forward)
                   \
feature:            E --- F (your work, now outdated)
```

**Command:**
```bash
git checkout feature/add-search
git rebase main
```

**Result:**
```
main:     A --- B --- C --- D
                             \
feature:                      E' --- F' (your work, now up to date)
```

Notice: E and F become E' and F' (new commits with different IDs, but same changes)

#### Real Example with Your Project:

```bash
# You're working on Login component
git checkout -b feature/login-page

# You make commits
git commit -m "Create Login component"
git commit -m "Add form validation"

# Meanwhile, main branch got updates (Header improvements)
# main:     A --- B --- C --- D (Header updated)
#                    \
# feature:            E --- F (Login work)

# Update your feature branch with latest main
git checkout feature/login-page
git rebase main

# Result:
# main:     A --- B --- C --- D
#                              \
# feature:                      E' --- F'

# Your Login commits now built on top of latest main
# It's like you started working AFTER the Header update
```

**How Rebase Works Step-by-Step:**
1. Git saves your commits (E, F) temporarily
2. Resets your branch to match main (at commit D)
3. Replays your commits (E, F) one by one on top
4. Creates new commits (E', F') with same changes but different IDs

**Pros:**
- ✅ Clean, linear history
- ✅ No merge commits
- ✅ Easy to follow

**Cons:**
- ❌ Rewrites history (changes commit IDs)
- ❌ Can't use on public/shared branches
- ❌ Need to force push after rebasing

**Force Push After Rebase:**
```bash
# Remote still has old commits (E, F)
# Local has new commits (E', F')
git push origin feature/login-page --force-with-lease
```

---

### 🎯 SQUASH

**What it does:** Combines multiple commits into one single commit.

**Use when:**
- Cleaning up messy commit history
- Before merging feature to main
- Want one commit per feature

#### Example Scenario: Clean Up Before Merge

**Setup:**
```
feature:  A --- B --- C --- D --- E --- F --- G
              WIP  Add  Fix  Add  Oops Typo Final
```

**Command:**
```bash
git rebase -i HEAD~6  # Interactive rebase last 6 commits
# In editor, change to:
pick B
squash C
squash D
squash E
squash F
squash G
```

**Result:**
```
feature:  A --- H
              (one clean commit with all changes)
```

#### Real Example with Your Project:

**Messy History:**
```bash
git log --oneline

abc123 Fix typo in comment
def456 Update hover color again
ghi789 Oops forgot to save file
jkl012 Fix dark mode colors
mno345 Add search icon
pqr678 WIP - SearchBox component
stu901 Add SearchBox structure
```

**Squash Process:**
```bash
# Squash last 7 commits
git rebase -i HEAD~7

# Editor opens, change to:
pick stu901 Add SearchBox structure
squash pqr678 WIP - SearchBox component
squash mno345 Add search icon
squash jkl012 Fix dark mode colors
fixup ghi789 Oops forgot to save file      # fixup = squash but discard message
fixup def456 Update hover color again
fixup abc123 Fix typo in comment

# Save, then edit combined message:
```

**New Commit Message:**
```
Add SearchBox component with full functionality

- Created reusable SearchBox component
- Added search icon with proper positioning
- Implemented dark mode styling with proper colors
- Added hover and focus states
- Optimized placeholder text
```

**Result:**
```bash
git log --oneline

xyz789 Add SearchBox component with full functionality
# (all 7 commits now one clean commit)
```

**Pros:**
- ✅ Very clean history
- ✅ One commit per feature
- ✅ Easy to review and understand

**Cons:**
- ❌ Loses granular commit history
- ❌ Rewrites history (need force push)
- ❌ Can't see individual steps taken

---

### 📊 Comparison Table

| Operation | History | Use Case | Safety | Result |
|-----------|---------|----------|--------|--------|
| **Merge** | Preserves all commits + merge commit | Public branches, preserve history | ✅ Safe | Branching history |
| **Rebase** | Linear history, rewrites commits | Update feature branch, clean history | ⚠️ Use on private branches | Linear history |
| **Squash** | Combines multiple commits into one | Clean up before merge | ⚠️ Use on private branches | Single commit |

---

### 🎬 Complete Workflow Scenarios

#### Scenario 1: Solo Developer, Clean History

```bash
# Day 1: Start feature
git checkout -b feature/shopping-cart
git commit -m "Add CartItem component"
git commit -m "Add Cart component"
git commit -m "Oops fix typo"
git commit -m "Add cart styling"

# Day 2: Squash before merging
git rebase -i HEAD~4  # Squash all into one
git checkout main
git merge feature/shopping-cart  # Fast-forward merge
# Result: main has ONE commit: "Add shopping cart feature"
```

**History:**
```
main: A --- B --- C (Add shopping cart feature)
```

---

#### Scenario 2: Team Project, Update Feature Branch

```bash
# You're working on Login page
git checkout -b feature/login

# You make commits
git commit -m "Add Login component"
git commit -m "Add form fields"

# Teammate merges Header update to main
# Need to update your branch

# Option A: Merge (preserves history)
git checkout feature/login
git merge main
# Creates merge commit

# Option B: Rebase (clean history)
git checkout feature/login
git rebase main
# Your commits now on top of latest main
```

**Merge Result:**
```
main:    A --- B --- C --- D
                  \         \
feature:           E --- F --- M (merge commit)
```

**Rebase Result:**
```
main:    A --- B --- C --- D
                             \
feature:                      E' --- F'
```

---

#### Scenario 3: Feature Ready for Production

**Your messy feature branch:**
```
feature: A --- B --- C --- D --- E --- F --- G --- H
         WIP  Add  Fix  Add  Oops More  Fix  Done
```

**Step 1: Squash commits**
```bash
git checkout feature/shopping-cart
git rebase -i HEAD~7  # Squash B through H into one
```

**After squash:**
```
feature: A --- I (Shopping cart feature complete)
```

**Step 2: Update with latest main**
```bash
git rebase main  # Put your feature on top of latest main
```

**Step 3: Merge to main**
```bash
git checkout main
git merge feature/shopping-cart  # Fast-forward merge
```

**Final result:**
```
main: A --- [other commits] --- I (Shopping cart feature)
```

Clean, linear, one commit per feature! ✨

---

#### Scenario 4: Collaborative Feature Branch

**Two developers working on same feature:**

```bash
# Developer A:
git checkout -b feature/product-page
git commit -m "Add product layout"
git push origin feature/product-page

# Developer B:
git checkout feature/product-page
git commit -m "Add product images"
git push origin feature/product-page

# Developer A wants latest changes:
git pull origin feature/product-page

# Use MERGE here (not rebase) because branch is shared!
# Rebase would rewrite B's commits and cause conflicts
```

**Rule:** Never rebase shared/public branches!

---

### 🎯 Decision Tree: Which One to Use?

```
Need to integrate changes?
│
├─ Is the branch public/shared by others?
│  ├─ YES → Use MERGE
│  └─ NO → Continue...
│
├─ Want to update feature branch with latest main?
│  └─ Use REBASE
│
├─ Want to clean up messy commits before merging?
│  └─ Use SQUASH (via rebase -i)
│
└─ Ready to merge feature to main?
   ├─ Want to preserve all commit details? → MERGE
   └─ Want one clean commit? → SQUASH then MERGE
```

---

### 💡 Best Practices

1. **Feature Branch Workflow:**
   ```bash
   # Start feature
   git checkout -b feature/new-feature
   
   # Make messy commits as you work
   git commit -m "WIP"
   git commit -m "Add component"
   git commit -m "Fix bug"
   
   # Before merging, clean up:
   git rebase -i HEAD~5  # Squash commits
   git rebase main       # Update with latest main
   
   # Merge to main
   git checkout main
   git merge feature/new-feature
   ```

2. **Keep main clean:**
   - Only merge complete features
   - One commit per feature (via squash)
   - Never commit directly to main

3. **Update feature branches regularly:**
   ```bash
   # Every few days, update your feature branch:
   git checkout feature/my-feature
   git rebase main  # or git merge main if branch is shared
   ```

4. **Use descriptive commit messages:**
   ```bash
   # After squashing, write detailed message:
   git commit -m "Add shopping cart feature
   
   - Created Cart component with item management
   - Added CartItem component for individual items
   - Implemented add/remove/update quantity
   - Added cart total calculation
   - Integrated with ProductCard component
   - Added responsive styling with dark mode support"
   ```

---

## 7. Git Squash Deep Dive {#squash}

### Step-by-Step Interactive Rebase

#### Step 1: View Your Commits

```bash
git log --oneline -10

# Output:
abc123 Fix final typo
def456 Update styling again
ghi789 Fix hover effect
jkl012 Add dark mode
mno345 Add icon
pqr678 Create SearchBox
```

#### Step 2: Start Interactive Rebase

```bash
# Squash last 6 commits
git rebase -i HEAD~6
```

An editor opens showing:

```bash
pick pqr678 Create SearchBox
pick mno345 Add icon
pick jkl012 Add dark mode
pick ghi789 Fix hover effect
pick def456 Update styling again
pick abc123 Fix final typo

# Commands:
# p, pick = use commit
# r, reword = use commit, but edit message
# e, edit = use commit, but stop for amending
# s, squash = use commit, but meld into previous
# f, fixup = like squash, but discard message
# d, drop = remove commit
```

#### Step 3: Mark Commits to Squash

Change to:

```bash
pick pqr678 Create SearchBox
squash mno345 Add icon
squash jkl012 Add dark mode
fixup ghi789 Fix hover effect
fixup def456 Update styling again
fixup abc123 Fix final typo
```

**Difference:**
- `squash` - keeps commit message (you can edit)
- `fixup` - discards commit message (for tiny fixes)

#### Step 4: Save and Close

- If using Vim: Press `Esc`, type `:wq`, press Enter
- If using nano: Press `Ctrl+X`, then `Y`, then Enter
- If using VS Code: Save and close file

#### Step 5: Edit Combined Message

Another editor opens:

```bash
# This is a combination of 6 commits.
# The first commit's message is:
Create SearchBox

# This is the 2nd commit message:
Add icon

# This is the 3rd commit message:
Add dark mode

# Please enter the commit message for your changes.
```

Delete all that and write:

```bash
Add SearchBox component with full functionality

- Created reusable SearchBox component
- Added search icon with SVG
- Implemented dark mode styling
- Added hover and focus effects
- Optimized responsive design
```

#### Step 6: Save and Done!

```bash
[detached HEAD abc123] Add SearchBox component with full functionality
 Date: Mon Nov 10 15:00:00 2024
 1 file changed, 50 insertions(+)
Successfully rebased and updated refs/heads/feature/searchbox.
```

#### Step 7: Force Push (if already pushed)

```bash
git push origin feature/searchbox --force-with-lease
```

---

## 8. Common Scenarios {#scenarios}

### Scenario 1: Made Changes, Want to Save Progress

```bash
# See what changed
git status

# Add all changes
git add .

# Commit with meaningful message
git commit -m "Add product filtering functionality"

# Push to GitHub
git push origin main
```

---

### Scenario 2: Undo Last Commit (Not Pushed Yet)

```bash
# Undo commit but keep changes
git reset --soft HEAD~1

# Now you can edit files and commit again
```

---

### Scenario 3: Discard All Local Changes

```bash
# ⚠️ Warning: This deletes your changes!
git checkout -- .

# Or for specific file:
git checkout -- src/components/SearchBox.jsx

# Or in newer Git:
git restore .
git restore src/components/SearchBox.jsx
```

---

### Scenario 4: See What You Changed Before Committing

```bash
# See changes not staged
git diff

# See changes staged (after git add)
git diff --staged

# See changes in specific file
git diff src/components/SearchBox.jsx
```

---

### Scenario 5: Forgot to Add Files to Last Commit

```bash
# Make changes to forgotten file
# Add it
git add forgotten-file.jsx

# Amend last commit (don't create new one)
git commit --amend --no-edit

# Or amend and change message:
git commit --amend -m "New message with forgotten file"
```

---

### Scenario 6: Create Feature Branch from Main

```bash
# Make sure main is up to date
git checkout main
git pull origin main

# Create new feature branch
git checkout -b feature/add-cart

# Work on feature...
git add .
git commit -m "Add shopping cart functionality"

# Push feature branch
git push origin feature/add-cart
```

---

### Scenario 7: Update Feature Branch with Latest Main

Your feature branch is behind main:

```
main:     A --- B --- C --- D --- E (latest)
                       \
feature:                F --- G (your work, outdated)
```

**Option A: Merge**
```bash
git checkout feature/add-cart
git merge main
```

Result:
```
main:     A --- B --- C --- D --- E
                       \           \
feature:                F --- G --- M (merge commit)
```

**Option B: Rebase**
```bash
git checkout feature/add-cart
git rebase main
```

Result:
```
main:     A --- B --- C --- D --- E
                                   \
feature:                            F' --- G' (rebased)
```

---

### Scenario 8: Stash Changes Temporarily

```bash
# You're working on feature but need to switch branches
git stash

# Do other work...
git checkout main
git pull origin main

# Come back and restore changes
git checkout feature/add-cart
git stash pop
```

---

### Scenario 9: Cherry-Pick Specific Commit

```bash
# Copy one specific commit from another branch

# Find commit ID
git log --oneline feature/other-branch

# Copy it to current branch
git cherry-pick abc123
```

---

## 9. Troubleshooting {#troubleshooting}

### "I committed to the wrong branch!"

```bash
# You're on main, but wanted to commit to feature branch

# 1. Create the branch (doesn't move commits yet)
git branch feature/my-feature

# 2. Reset main to before your commits
git reset --hard HEAD~1  # or HEAD~2 for 2 commits

# 3. Switch to feature branch
git checkout feature/my-feature

# Your commit is now on the feature branch!
```

---

### "I need to go back to an old version"

```bash
# See commit history
git log --oneline

# Output:
# abc123 Latest commit
# def456 Middle commit
# ghi789 Old commit

# Go back to old commit (temporary)
git checkout ghi789

# Look around, test things
# (you're in "detached HEAD" state)

# To make a new branch from here:
git checkout -b feature/from-old-version

# Or go back to latest:
git checkout main
```

---

### "Help! I broke everything!"

```bash
# See history of ALL your actions
git reflog

# Output:
# abc123 HEAD@{0}: commit: Add feature
# def456 HEAD@{1}: checkout: moving from main to feature
# ghi789 HEAD@{2}: commit: Previous work
# jkl012 HEAD@{3}: rebase: completed
# mno345 HEAD@{4}: commit: Before rebase

# Go back to any point
git reset --hard HEAD@{4}  # Before that bad rebase!
```

---

### "I have merge conflicts"

```bash
# After git merge shows conflicts:

# 1. See which files have conflicts
git status

# Output:
# Unmerged paths:
#   both modified:   src/components/ProductCard.jsx

# 2. Open conflicted file
# Look for:
<<<<<<< HEAD
const [sortBy, setSortBy] = useState("popularity");
=======
const [sortBy, setSortBy] = useState("price");
>>>>>>> feature/add-filters

# 3. Edit file to resolve
# Keep what you want, remove markers

# 4. Mark as resolved
git add src/components/ProductCard.jsx

# 5. Complete merge
git commit
```

---

### "I accidentally deleted a file"

```bash
# Restore deleted file
git checkout HEAD -- deleted-file.jsx

# Or in newer Git:
git restore deleted-file.jsx
```

---

### "Cancel a merge in progress"

```bash
# If merge conflicts are too complex:
git merge --abort

# Goes back to before merge started
```

---

### "Undo a rebase"

```bash
# Find where you were before rebase
git reflog

# Output:
# abc123 HEAD@{0}: rebase finished
# def456 HEAD@{1}: rebase started
# ghi789 HEAD@{2}: commit: before rebase

# Go back
git reset --hard HEAD@{2}
```

---

## 10. Best Practices {#best-practices}

### Commit Messages

**❌ Bad:**
```bash
git commit -m "update"
git commit -m "fix stuff"
git commit -m "changes"
git commit -m "asdf"
```

**✅ Good:**
```bash
git commit -m "Add dark mode toggle to Header component"
git commit -m "Fix search icon alignment in SearchBox"
git commit -m "Refactor ProductCard to use Price component"
```

**Format:**
```
<type>: <short description>

<detailed description if needed>

<why you made the change>
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `refactor:` Code improvement
- `style:` Formatting, styling
- `docs:` Documentation
- `test:` Adding tests
- `chore:` Maintenance

**Example:**
```bash
git commit -m "feat: Add search functionality to product listings

- Created SearchBox component with dark mode support
- Integrated with ProductListings component
- Added debouncing for performance (300ms delay)
- Added search icon with proper positioning

This allows users to quickly find products without
scrolling through the entire list. Improves UX significantly
for stores with many products."
```

---

### Branching Strategy

```
main (production-ready code)
  ├─ develop (integration branch)
      ├─ feature/search-box
      ├─ feature/shopping-cart
      ├─ feature/user-auth
      ├─ bugfix/cart-total
      └─ hotfix/critical-bug
```

**Branch Naming:**
- `feature/` - New features
- `bugfix/` - Bug fixes
- `hotfix/` - Critical fixes for production
- `refactor/` - Code improvements
- `docs/` - Documentation updates

**Examples:**
```bash
git checkout -b feature/add-wishlist
git checkout -b bugfix/fix-cart-calculation
git checkout -b hotfix/security-patch
git checkout -b refactor/optimize-images
git checkout -b docs/update-readme
```

---

### When to Commit

**✅ Commit when:**
- Feature is complete
- Bug is fixed
- Meaningful unit of work is done
- Before taking a break (save progress)
- Tests pass
- Code builds without errors

**❌ Don't commit:**
- Broken code that doesn't run
- Commented-out code everywhere
- Temporary debugging `console.log`
- `// TODO: fix this later`
- Generated files (node_modules, build folders)
- Sensitive data (.env with passwords)

---

### What to Commit (.gitignore)

Create a `.gitignore` file:

```bash
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
/coverage

# Production builds
/build
/dist
/.next

# Environment files
.env
.env.local
.env.production

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Java
target/
*.class
*.jar
*.war

# Database
*.db
*.sqlite
```

Check what's being tracked:
```bash
git status --ignored
```

---

### Workflow Best Practices

1. **Pull before you push:**
   ```bash
   git pull origin main
   git push origin main
   ```

2. **Small, frequent commits:**
   ```bash
   # Good:
   - "Add header component"
   - "Add header styling"
   - "Add header navigation"
   
   # Bad:
   - "Add entire website" (1000 lines changed)
   ```

3. **One feature per branch:**
   ```bash
   # Good:
   feature/add-search (only search functionality)
   
   # Bad:
   feature/everything (search + cart + auth + styling)
   ```

4. **Keep main stable:**
   - Never commit directly to main
   - Always use feature branches
   - Test before merging
   - Use pull requests for review

5. **Clean up after merge:**
   ```bash
   # After feature is merged to main
   git branch -d feature/add-search        # Delete local
   git push origin --delete feature/add-search  # Delete remote
   ```

---

## 11. Quick Command Reference {#quick-reference}

### Setup
```bash
git config --global user.name "Name"
git config --global user.email "email@example.com"
git init
git clone <url>
```

### Basic Workflow
```bash
git status                    # Check what changed
git diff                      # See exact changes
git diff --staged             # See staged changes
git add <file>                # Stage specific file
git add .                     # Stage all changes
git commit -m "message"       # Commit with message
git commit -am "message"      # Stage and commit (tracked files only)
git push origin <branch>      # Push to remote
git pull origin <branch>      # Get latest from remote
git fetch origin              # Download changes (don't merge)
```

### Branching
```bash
git branch                    # List branches
git branch <name>             # Create branch
git checkout <branch>         # Switch branch
git checkout -b <name>        # Create and switch
git switch <branch>           # Switch (newer command)
git switch -c <name>          # Create and switch (newer)
git merge <branch>            # Merge branch
git rebase <branch>           # Rebase current branch
git branch -d <branch>        # Delete branch (safe)
git branch -D <branch>        # Delete branch (force)
```

### History
```bash
git log                       # Full commit history
git log --oneline             # Compact history
git log --graph --all         # Visual history
git log --oneline -10         # Last 10 commits
git reflog                    # History of HEAD movements
git show <commit>             # Show commit details
git blame <file>              # Who changed each line
```

### Undo
```bash
git reset --soft HEAD~1       # Undo commit, keep changes staged
git reset --mixed HEAD~1      # Undo commit, keep changes unstaged
git reset --hard HEAD~1       # Undo commit, delete changes
git checkout -- <file>        # Discard changes to file
git restore <file>            # Discard changes (newer)
git restore --staged <file>   # Unstage file (newer)
git revert <commit>           # Undo commit (safe for pushed)
git commit --amend            # Modify last commit
git commit --amend --no-edit  # Add to last commit, keep message
```

### Stashing
```bash
git stash                     # Save changes temporarily
git stash save "message"      # Stash with message
git stash list                # List all stashes
git stash pop                 # Apply and remove stash
git stash apply               # Apply but keep stash
git stash drop                # Delete stash
git stash clear               # Delete all stashes
```

### Remote
```bash
git remote -v                 # Show remotes
git remote add origin <url>   # Add remote
git remote remove origin      # Remove remote
git push origin <branch>      # Push branch
git push -u origin <branch>   # Push and set upstream
git push --force-with-lease   # Force push (safer)
git push --force              # Force push (dangerous!)
git fetch origin              # Download changes
git pull origin <branch>      # Fetch and merge
```

### Squashing
```bash
git rebase -i HEAD~N          # Squash last N commits
git rebase -i main            # Squash all since main
git rebase --continue         # Continue after resolving
git rebase --abort            # Cancel rebase
```

### Merge/Rebase
```bash
git merge <branch>            # Merge branch
git merge --no-ff <branch>    # Always create merge commit
git merge --squash <branch>   # Squash merge
git rebase <branch>           # Rebase onto branch
git rebase --interactive      # Interactive rebase
git cherry-pick <commit>      # Copy specific commit
```

### Conflicts
```bash
git merge --abort             # Cancel merge
git rebase --abort            # Cancel rebase
git checkout --ours <file>    # Use our version
git checkout --theirs <file>  # Use their version
```

### Info
```bash
git status                    # Current status
git diff                      # Unstaged changes
git diff --staged             # Staged changes
git diff <branch>             # Compare with branch
git log                       # Commit history
git show <commit>             # Show commit
git branch -v                 # Branches with last commit
```

### Clean Up
```bash
git clean -n                  # Preview what will be deleted
git clean -fd                 # Delete untracked files/dirs
git gc                        # Garbage collection
git prune                     # Remove unreachable objects
```

---

## 🎓 Practice Exercise

Let's practice with your eazystore project:

```bash
# 1. Check current status
cd /Users/admin/Documents/storeFrontUiTailwind/section7
git status

# 2. Create a practice branch
git checkout -b practice/git-learning

# 3. Make a small change
# Edit SearchBox.jsx - change placeholder text

# 4. Check what changed
git status
git diff

# 5. Stage and commit
git add src/components/SearchBox.jsx
git commit -m "Update SearchBox placeholder text"

# 6. Make another change
# Add a comment in SearchBox.jsx

# 7. Commit again
git add src/components/SearchBox.jsx
git commit -m "Add clarifying comment"

# 8. View your commits
git log --oneline -2

# 9. Squash the two commits
git rebase -i HEAD~2
# Change second "pick" to "squash"
# Edit combined message

# 10. View result
git log --oneline -1

# 11. Push to GitHub
git push origin practice/git-learning

# 12. Go back to main
git checkout main

# 13. Delete practice branch
git branch -d practice/git-learning
git push origin --delete practice/git-learning
```

---

## 🚀 You're Ready!

You now understand:
- ✅ What Git is and why it's essential
- ✅ Basic Git workflow (add, commit, push)
- ✅ Branching and merging strategies
- ✅ **The key differences between Merge, Rebase, and Squash**
- ✅ When to use each integration strategy
- ✅ How to clean up commit history
- ✅ Common scenarios and troubleshooting
- ✅ Best practices for professional Git usage

### Next Steps:
1. Practice daily with your eazystore project
2. Create feature branches for all new work
3. Experiment with merge, rebase, and squash
4. Write meaningful commit messages
5. Keep your Git history clean and readable

Git becomes natural with practice. Don't worry about making mistakes - you can almost always undo them with `git reflog`! 🎉

---

## 📚 Additional Resources

- [Official Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Interactive Git Tutorial](https://learngitbranching.js.org/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Oh Shit, Git!?!](https://ohshitgit.com/) - Common mistakes and fixes

Remember: **Everyone makes Git mistakes. The key is learning how to fix them!** 💪
