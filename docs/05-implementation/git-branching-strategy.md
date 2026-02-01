# ONEKA AI: Git Branching Strategy

**Team Size**: 4 Developers  
**Date**: February 1, 2026  
**Version**: 1.0

---

## Branch Structure Overview

```
main (production)
  ├── staging (pre-production testing)
  │    ├── develop (integration branch)
  │    │    ├── feature/backend/sprint1-database-setup (Developer 1)
  │    │    ├── feature/ml/sprint1-satellite-setup (Developer 2)
  │    │    ├── feature/frontend/sprint1-nextjs-setup (Developer 3)
  │    │    └── feature/devops/sprint1-aws-infrastructure (Developer 4)
  │    │
  │    ├── bugfix/fix-scraper-timeout
  │    ├── hotfix/fix-production-crash
  │    └── release/v1.0.0
```

---

## Core Branches

### 1. `main` (Production Branch)

**Purpose**: Production-ready code  
**Protection**: 🔒 Heavily protected  
**Deployment**: Automatically deploys to production

**Rules:**

- ❌ No direct commits allowed
- ✅ Only accepts merges from `staging` or `hotfix/*` branches
- ✅ Requires 2+ approvals for merge
- ✅ All CI/CD checks must pass
- ✅ Must be tagged with version number after merge
- ✅ Auto-deploy to production AWS environment

**Merge Process:**

```bash
# Only merge from staging after thorough testing
git checkout main
git merge --no-ff staging -m "Release v1.0.0"
git tag -a v1.0.0 -m "MVP Launch - February 2026"
git push origin main --tags
```

---

### 2. `staging` (Pre-Production Branch)

**Purpose**: Final testing before production  
**Protection**: 🔒 Protected  
**Deployment**: Automatically deploys to staging environment

**Rules:**

- ❌ No direct commits allowed
- ✅ Only accepts merges from `develop` or `release/*` branches
- ✅ Requires 1+ approval for merge
- ✅ All CI/CD checks must pass
- ✅ Must pass QA testing before merging to main
- ✅ Auto-deploy to staging AWS environment

**Merge Process:**

```bash
# Merge develop into staging for release testing
git checkout staging
git merge --no-ff develop -m "Prepare release v1.0.0"
git push origin staging
```

---

### 3. `develop` (Integration Branch)

**Purpose**: Active development integration  
**Protection**: 🔐 Semi-protected  
**Deployment**: Automatically deploys to development environment

**Rules:**

- ❌ No direct commits allowed (except minor doc fixes)
- ✅ Accepts merges from `feature/*` branches
- ✅ Requires 1 approval for merge
- ✅ All tests must pass
- ✅ Daily integration point for all developers
- ✅ Auto-deploy to dev AWS environment

**Merge Process:**

```bash
# Merge feature branch into develop
git checkout develop
git merge --no-ff feature/backend/sprint1-database-setup
git push origin develop
```

---

## Development Branches

### 4. `feature/*` Branches

**Purpose**: New features and functionality  
**Naming Convention**: `feature/<area>/<sprint>-<description>`  
**Lifespan**: Created at sprint start, merged within 1-2 weeks  
**Base Branch**: `develop`  
**Merge Target**: `develop`

#### Naming Examples by Developer:

**Developer 1 (Backend Lead):**

- `feature/backend/sprint1-database-setup`
- `feature/backend/sprint2-ppip-scraper`
- `feature/backend/sprint3-entity-resolution`
- `feature/backend/sprint6-alert-system`
- `feature/api/sprint3-project-endpoints`
- `feature/api/sprint4-satellite-endpoints`

**Developer 2 (ML/Satellite Engineer):**

- `feature/ml/sprint1-satellite-setup`
- `feature/ml/sprint2-training-data`
- `feature/ml/sprint3-model-training`
- `feature/ml/sprint4-sentinel-processing`
- `feature/satellite/sprint4-multi-layer-analysis`
- `feature/ml/sprint6-prediction-pipeline`

**Developer 3 (Frontend Lead):**

- `feature/frontend/sprint1-nextjs-setup`
- `feature/frontend/sprint2-project-list`
- `feature/ui/sprint3-project-detail`
- `feature/ui/sprint4-cesium-3d-map`
- `feature/ui/sprint5-time-series-charts`
- `feature/ui/sprint6-alert-notifications`

**Developer 4 (DevOps/Full-Stack):**

- `feature/devops/sprint1-aws-infrastructure`
- `feature/devops/sprint2-lambda-scheduling`
- `feature/infra/sprint3-celery-queue`
- `feature/infra/sprint4-cdn-tile-delivery`
- `feature/devops/sprint6-authentication`
- `feature/infra/sprint7-production-setup`

**Creating a Feature Branch:**

```bash
# Always branch from latest develop
git checkout develop
git pull origin develop
git checkout -b feature/backend/sprint1-database-setup
git push -u origin feature/backend/sprint1-database-setup
```

**Merging Feature Branch:**

```bash
# Update with latest develop before merging
git checkout develop
git pull origin develop
git checkout feature/backend/sprint1-database-setup
git merge develop  # Resolve any conflicts
git push origin feature/backend/sprint1-database-setup

# Create Pull Request on GitHub
# After approval, merge to develop
```

---

### 5. `bugfix/*` Branches

**Purpose**: Fix bugs found in develop or staging  
**Naming Convention**: `bugfix/<issue-number>-<short-description>`  
**Lifespan**: 1-3 days  
**Base Branch**: `develop` or `staging`  
**Merge Target**: Same as base branch

#### Examples:

- `bugfix/42-scraper-timeout`
- `bugfix/89-cesium-marker-rendering`
- `bugfix/103-ndvi-calculation-error`
- `bugfix/156-api-pagination-bug`

**Creating a Bugfix Branch:**

```bash
git checkout develop
git pull origin develop
git checkout -b bugfix/42-scraper-timeout
git push -u origin bugfix/42-scraper-timeout
```

---

### 6. `hotfix/*` Branches

**Purpose**: Emergency fixes for production issues  
**Naming Convention**: `hotfix/<version>-<critical-issue>`  
**Lifespan**: Hours to 1 day  
**Base Branch**: `main`  
**Merge Target**: `main` AND `develop` (double merge)

#### Examples:

- `hotfix/1.0.1-database-connection-leak`
- `hotfix/1.0.2-api-auth-bypass`
- `hotfix/1.1.1-satellite-processing-crash`

**Creating and Merging Hotfix:**

```bash
# Branch from main for critical production fix
git checkout main
git pull origin main
git checkout -b hotfix/1.0.1-database-connection-leak

# Make fix and test thoroughly
git add .
git commit -m "Fix database connection pool leak"
git push origin hotfix/1.0.1-database-connection-leak

# After approval, merge to BOTH main and develop
git checkout main
git merge --no-ff hotfix/1.0.1-database-connection-leak
git tag -a v1.0.1 -m "Hotfix: Database connection leak"
git push origin main --tags

git checkout develop
git merge --no-ff hotfix/1.0.1-database-connection-leak
git push origin develop

# Delete hotfix branch
git branch -d hotfix/1.0.1-database-connection-leak
git push origin --delete hotfix/1.0.1-database-connection-leak
```

---

### 7. `release/*` Branches

**Purpose**: Prepare for production release  
**Naming Convention**: `release/v<major>.<minor>.<patch>`  
**Lifespan**: 1-3 days  
**Base Branch**: `develop`  
**Merge Target**: `staging`, then `main` and `develop`

#### Examples:

- `release/v1.0.0` (MVP Launch - End of Sprint 8)
- `release/v1.1.0` (Post-MVP updates)
- `release/v2.0.0` (Major feature release)

**Creating a Release Branch:**

```bash
# Branch from develop when sprint is complete
git checkout develop
git pull origin develop
git checkout -b release/v1.0.0

# Version bumps, final bug fixes, documentation updates only
# NO NEW FEATURES on release branch

# Update version numbers in package.json, __init__.py, etc.
# Update CHANGELOG.md
git add .
git commit -m "Prepare release v1.0.0"
git push origin release/v1.0.0

# Merge to staging for final testing
git checkout staging
git merge --no-ff release/v1.0.0
git push origin staging

# After QA approval on staging, merge to main
git checkout main
git merge --no-ff release/v1.0.0
git tag -a v1.0.0 -m "MVP Launch"
git push origin main --tags

# Merge back to develop to keep in sync
git checkout develop
git merge --no-ff release/v1.0.0
git push origin develop

# Delete release branch
git branch -d release/v1.0.0
git push origin --delete release/v1.0.0
```

---

## Sprint-Based Branch Workflow

### Sprint 1 Example (Week 1)

#### Monday (Sprint Start):

```bash
# All developers create their feature branches from develop

# Developer 1 (Backend)
git checkout develop && git pull
git checkout -b feature/backend/sprint1-database-setup
git push -u origin feature/backend/sprint1-database-setup

# Developer 2 (ML)
git checkout develop && git pull
git checkout -b feature/ml/sprint1-satellite-setup
git push -u origin feature/ml/sprint1-satellite-setup

# Developer 3 (Frontend)
git checkout develop && git pull
git checkout -b feature/frontend/sprint1-nextjs-setup
git push -u origin feature/frontend/sprint1-nextjs-setup

# Developer 4 (DevOps)
git checkout develop && git pull
git checkout -b feature/devops/sprint1-aws-infrastructure
git push -u origin feature/devops/sprint1-aws-infrastructure
```

#### Daily (Tuesday-Thursday):

```bash
# Each developer commits to their feature branch
git add .
git commit -m "Implement PostGIS database models"
git push origin feature/backend/sprint1-database-setup

# Pull latest develop to stay in sync (do this daily)
git checkout develop
git pull origin develop
git checkout feature/backend/sprint1-database-setup
git merge develop  # Resolve conflicts early
```

#### Friday (Sprint End):

```bash
# Create Pull Requests for completed features
# Each developer:
# 1. Push final commits
# 2. Create PR: feature/backend/sprint1-database-setup → develop
# 3. Request review from another developer
# 4. Address review comments
# 5. Merge to develop after approval

# Weekend: develop branch stabilizes with all Sprint 1 features
```

---

## Pull Request (PR) Guidelines

### PR Title Format:

```
[AREA] Brief description of changes

Examples:
[Backend] Implement PostGIS database models and migrations
[ML] Add Sentinel-2 NDVI processing pipeline
[Frontend] Create project list component with filtering
[DevOps] Set up AWS infrastructure with Terraform
[Bugfix] Fix scraper timeout on large PDF downloads
[Hotfix] Patch database connection pool leak
```

### PR Description Template:

```markdown
## Description

Brief summary of changes

## Related Sprint/Issue

Sprint 1, Task: Database Setup
Closes #42

## Type of Change

- [ ] New feature
- [ ] Bug fix
- [ ] Hotfix
- [ ] Documentation
- [ ] Refactoring
- [ ] Performance improvement

## Testing

- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed
- [ ] All tests passing

## Screenshots (if applicable)

[Add screenshots for UI changes]

## Checklist

- [ ] Code follows style guide
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings/errors
- [ ] Dependent PRs merged

## Deployment Notes

Any special deployment steps or environment variable changes
```

### PR Review Process:

1. **Developer creates PR** → Assign 1 reviewer (cross-functional: backend reviews frontend, etc.)
2. **Reviewer reviews within 4 hours** → Comments or approval
3. **Developer addresses comments** → Push updates
4. **Reviewer approves** → Green checkmark
5. **CI/CD passes** → All automated tests pass
6. **Developer merges** → Use "Squash and merge" or "Merge commit"
7. **Delete branch** → Branch automatically deleted after merge

---

## Branch Protection Rules

### `main` Branch Protection:

```yaml
Required before merge:
  - 2 approving reviews
  - All status checks pass (CI/CD)
  - Conversation resolved
  - Branch up to date with main

Restrictions:
  - No direct pushes
  - No force pushes
  - No deletions
  - Only admins can merge

Status checks:
  - Backend tests (pytest)
  - Frontend tests (jest)
  - Linting (black, eslint)
  - Security scan
  - Build successful
```

### `staging` Branch Protection:

```yaml
Required before merge:
  - 1 approving review
  - All status checks pass
  - Branch up to date with staging

Restrictions:
  - No force pushes
  - No deletions
```

### `develop` Branch Protection:

```yaml
Required before merge:
  - 1 approving review
  - All status checks pass

Restrictions:
  - No force pushes (except by admins)
```

---

## Git Workflow Commands Cheat Sheet

### Daily Developer Workflow:

```bash
# Morning: Start work
git checkout develop
git pull origin develop
git checkout feature/backend/sprint1-database-setup
git merge develop  # Get latest changes

# During day: Regular commits
git add src/models/project.py
git commit -m "Add Project model with PostGIS geometry field"
git push origin feature/backend/sprint1-database-setup

# Afternoon: Check if develop has updates
git fetch origin
git merge origin/develop  # Merge latest develop changes

# End of day: Push all work
git push origin feature/backend/sprint1-database-setup
```

### Creating and Merging Feature:

```bash
# Start new feature
git checkout develop
git pull origin develop
git checkout -b feature/backend/sprint2-ppip-scraper
git push -u origin feature/backend/sprint2-ppip-scraper

# Work on feature (multiple commits)
git add .
git commit -m "Implement PPIP scraper with BeautifulSoup"
git push

# Ready to merge
git checkout develop
git pull origin develop
git checkout feature/backend/sprint2-ppip-scraper
git merge develop  # Resolve conflicts locally
git push

# Create PR on GitHub: feature/backend/sprint2-ppip-scraper → develop
# After approval and CI passes:
# Click "Merge pull request" on GitHub
# Select "Squash and merge" or "Create a merge commit"
```

### Handling Merge Conflicts:

```bash
# Conflict detected during merge
git checkout feature/backend/sprint2-ppip-scraper
git merge develop

# CONFLICT in src/scraper/ppip.py
# Manually resolve conflicts in your editor
# Look for <<<<<<< HEAD, =======, >>>>>>> develop

# After resolving
git add src/scraper/ppip.py
git commit -m "Resolve merge conflict with develop"
git push
```

### Syncing Fork (if using forks):

```bash
# Add upstream remote (one time)
git remote add upstream git@github.com:ONEKA-AI/oneka.git

# Sync with upstream
git checkout develop
git fetch upstream
git merge upstream/develop
git push origin develop
```

---

## Branch Naming Conventions Summary

| Branch Type | Pattern                                 | Example                                  |
| ----------- | --------------------------------------- | ---------------------------------------- |
| **Feature** | `feature/<area>/<sprint>-<description>` | `feature/backend/sprint1-database-setup` |
| **Bugfix**  | `bugfix/<issue>-<description>`          | `bugfix/42-scraper-timeout`              |
| **Hotfix**  | `hotfix/<version>-<description>`        | `hotfix/1.0.1-database-leak`             |
| **Release** | `release/v<version>`                    | `release/v1.0.0`                         |

### Area Tags:

- `backend` - Backend API, database, data processing
- `ml` - Machine learning models and algorithms
- `satellite` - Satellite data processing
- `frontend` - React/Next.js frontend
- `ui` - User interface components
- `devops` - Infrastructure, deployment, CI/CD
- `infra` - Infrastructure as code
- `api` - API endpoints and integration
- `docs` - Documentation updates

---

## Commit Message Guidelines

### Format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code formatting (no logic change)
- `refactor`: Code restructuring (no behavior change)
- `test`: Adding or updating tests
- `chore`: Maintenance tasks (dependencies, build)
- `perf`: Performance improvements

### Examples:

```bash
git commit -m "feat(backend): implement PPIP web scraper with rate limiting"

git commit -m "fix(ml): correct NDVI calculation for edge pixels"

git commit -m "docs(readme): add installation instructions for PostGIS"

git commit -m "refactor(api): extract project validation logic to separate service"

git commit -m "test(scraper): add unit tests for tender URL extraction"

git commit -m "perf(satellite): optimize tile generation with parallel processing"
```

---

## Version Numbering (Semantic Versioning)

**Format**: `v<MAJOR>.<MINOR>.<PATCH>`

- **MAJOR**: Breaking changes (v2.0.0)
- **MINOR**: New features, backwards compatible (v1.1.0)
- **PATCH**: Bug fixes, backwards compatible (v1.0.1)

### Examples:

- `v1.0.0` - MVP Launch (End of Sprint 8)
- `v1.0.1` - Hotfix for database leak
- `v1.1.0` - Add export to Excel feature
- `v2.0.0` - Complete API redesign

---

## CI/CD Pipeline Triggers

### On Push to Feature Branches:

- Run unit tests
- Run linters (black, flake8, eslint)
- Build check
- Code coverage report

### On PR to Develop:

- All feature branch checks
- Integration tests
- Security vulnerability scan
- Build preview deployment

### On Merge to Develop:

- All PR checks
- Deploy to DEV environment
- Run smoke tests
- Notify team in Slack

### On Merge to Staging:

- All develop checks
- Deploy to STAGING environment
- Run full E2E tests
- Performance tests
- Notify QA team

### On Merge to Main:

- All staging checks
- Deploy to PRODUCTION
- Create GitHub release
- Generate changelog
- Notify stakeholders
- Monitor production metrics

---

## Emergency Procedures

### Rollback Production:

```bash
# If production deployment has critical bug

# Option 1: Revert to previous version
git checkout main
git revert HEAD
git push origin main  # Triggers rollback deployment

# Option 2: Redeploy previous tag
git checkout v1.0.0
# Manually trigger deployment

# Option 3: Create emergency hotfix (see hotfix section above)
```

### Fixing Broken Develop:

```bash
# If develop branch is broken and blocking everyone

# Option 1: Revert the breaking commit
git checkout develop
git revert <bad-commit-hash>
git push origin develop

# Option 2: Reset to last good commit (use carefully!)
git checkout develop
git reset --hard <last-good-commit>
git push origin develop --force  # Requires admin override

# Notify all developers immediately in Slack
```

---

## Tools and GitHub Settings

### Recommended GitHub Branch Settings:

1. **Navigate to**: Repository → Settings → Branches

2. **Add protection rule for `main`**:
   - Branch name pattern: `main`
   - ✅ Require pull request reviews before merging (2 approvals)
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Require conversation resolution before merging
   - ✅ Require signed commits
   - ✅ Include administrators
   - ✅ Restrict who can push to matching branches (admins only)
   - ✅ Allow force pushes: No one
   - ✅ Allow deletions: No

3. **Add protection rule for `staging`**:
   - Branch name pattern: `staging`
   - ✅ Require PR reviews (1 approval)
   - ✅ Require status checks
   - ✅ Allow force pushes: No one

4. **Add protection rule for `develop`**:
   - Branch name pattern: `develop`
   - ✅ Require PR reviews (1 approval)
   - ✅ Require status checks

### GitHub Actions for CI/CD:

Create `.github/workflows/ci.yml`:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [develop, staging, main]
  pull_request:
    branches: [develop, staging, main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Backend Tests
        run: pytest
      - name: Run Frontend Tests
        run: npm test
      - name: Lint Code
        run: black --check . && eslint .
```

---

## Summary: Branch Lifecycle at a Glance

```
Sprint Planning (Monday)
  ↓
Create feature branches from develop
  ↓
Daily work on feature branches (commit + push)
  ↓
Daily sync with develop (merge develop into feature)
  ↓
Feature complete → Create PR to develop
  ↓
Code review + approval
  ↓
Merge to develop → Auto-deploy to DEV
  ↓
Sprint complete → Create release branch
  ↓
Merge release to staging → Auto-deploy to STAGING
  ↓
QA testing on staging
  ↓
Merge staging to main → Auto-deploy to PRODUCTION
  ↓
Tag release (v1.0.0)
  ↓
Celebrate! 🎉
```

---

**Document Status**: Final v1.0  
**Last Updated**: February 1, 2026  
**Maintained By**: ONEKA AI Development Team  
**Questions?**: Ask in `#oneka-devops` Slack channel
