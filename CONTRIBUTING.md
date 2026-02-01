# Contributing to ONEKA AI

Thank you for contributing to ONEKA AI! This document provides guidelines for contributing to the project to ensure a smooth collaborative development process.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Branch Naming Convention](#branch-naming-convention)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Code Review Guidelines](#code-review-guidelines)
- [Merge Strategy](#merge-strategy)
- [Testing Requirements](#testing-requirements)
- [Documentation Standards](#documentation-standards)

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have:

- Python 3.11+ installed
- Node.js 18+ installed
- PostgreSQL 15 with PostGIS extension
- Git configured with your GitHub account
- Repository cloned locally

### Initial Setup

```bash
# Clone the repository
git clone git@github.com:ONEKA-AI/oneka.git
cd oneka

# Install dependencies (backend)
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install -r requirements-dev.txt  # Development dependencies

# Install dependencies (frontend)
cd ../frontend
npm install

# Set up pre-commit hooks
cd ..
pre-commit install
```

---

## 🔄 Development Workflow

### 1. Sync with Main Branch

Always start by ensuring your local `main` branch is up to date:

```bash
git checkout main
git pull origin main
```

### 2. Create a Feature Branch

Create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
```

### 3. Make Your Changes

- Write clean, readable code
- Follow the project's coding standards
- Add tests for new functionality
- Update documentation as needed

### 4. Commit Your Changes

Make atomic commits with clear messages:

```bash
git add .
git commit -m "feat: add satellite tile caching mechanism"
```

### 5. Push to GitHub

```bash
git push origin feature/your-feature-name
```

### 6. Create a Pull Request

Open a pull request on GitHub following the [Pull Request Process](#pull-request-process).

---

## 🌿 Branch Naming Convention

Use descriptive branch names that follow this pattern:

```
<type>/<short-description>
```

### Branch Types

| Type        | Description                                    | Example                      |
| ----------- | ---------------------------------------------- | ---------------------------- |
| `feature/`  | New features or enhancements                   | `feature/ml-risk-scoring`    |
| `fix/`      | Bug fixes                                      | `fix/satellite-api-timeout`  |
| `docs/`     | Documentation updates                          | `docs/update-api-reference`  |
| `refactor/` | Code refactoring without functionality changes | `refactor/interop-layer`     |
| `test/`     | Adding or updating tests                       | `test/satellite-processing`  |
| `chore/`    | Maintenance tasks, dependency updates          | `chore/update-dependencies`  |
| `hotfix/`   | Urgent fixes for production issues             | `hotfix/database-connection` |

### Examples

✅ Good:

- `feature/add-ndvi-processing`
- `fix/postgresql-connection-leak`
- `docs/contributing-guidelines`
- `refactor/api-error-handling`

❌ Bad:

- `my-branch`
- `fix-stuff`
- `update`
- `john-working-branch`

---

## 💬 Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type

Must be one of:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code refactoring without functionality changes
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Maintenance tasks, dependency updates
- **ci**: CI/CD configuration changes

### Scope (Optional)

The scope should specify the area of the codebase:

- `backend`: Backend API changes
- `frontend`: Frontend UI changes
- `ml`: Machine learning model changes
- `satellite`: Satellite processing pipeline
- `db`: Database schema or queries
- `docs`: Documentation
- `infra`: Infrastructure/deployment

### Subject

- Use imperative mood ("add" not "added" or "adds")
- Don't capitalize first letter
- No period at the end
- Maximum 72 characters

### Body (Optional)

- Explain _what_ and _why_, not _how_
- Wrap at 72 characters
- Separate from subject with blank line

### Footer (Optional)

- Reference issues: `Closes #123` or `Fixes #456`
- Breaking changes: `BREAKING CHANGE: description`

### Examples

✅ Good:

```
feat(ml): add random forest classifier for risk prediction

Implemented Random Forest model with 15 engineered features
from satellite time-series data. Achieves 83% accuracy on
historical project dataset.

Closes #45
```

```
fix(satellite): handle cloud cover edge cases in NDVI calculation

Added validation for pixel values and proper NaN handling when
cloud coverage exceeds 80%. Prevents false positives in change
detection algorithm.

Fixes #78
```

```
docs: update API endpoint documentation

Added request/response examples for /predict endpoint and
clarified authentication requirements.
```

❌ Bad:

```
Updated stuff
```

```
Fixed bug
```

```
WIP
```

---

## 🔀 Pull Request Process

### Before Creating a PR

1. **Ensure your branch is up to date**:

   ```bash
   git checkout main
   git pull origin main
   git checkout your-branch
   git rebase main
   ```

2. **Run tests locally**:

   ```bash
   # Backend tests
   cd backend
   pytest

   # Frontend tests
   cd frontend
   npm test
   ```

3. **Run linters**:

   ```bash
   # Backend
   cd backend
   black .
   flake8 .

   # Frontend
   cd frontend
   npm run lint
   ```

### Creating the Pull Request

1. **Push your branch** to GitHub:

   ```bash
   git push origin your-branch-name
   ```

2. **Open a Pull Request** on GitHub

3. **Use the PR Template** (fill out all sections):

```markdown
## Description

Brief description of what this PR does.

## Type of Change

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Refactoring (no functional changes)

## Related Issues

Closes #(issue number)

## Changes Made

- Change 1
- Change 2
- Change 3

## Testing

Describe the tests you ran and how to reproduce them:

- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing performed

### Test Steps:

1. Step 1
2. Step 2
3. Expected result

## Screenshots (if applicable)

Attach screenshots for UI changes.

## Checklist

- [ ] My code follows the project's code style
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have updated the documentation accordingly
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally
- [ ] Any dependent changes have been merged and published

## Additional Notes

Any additional information reviewers should know.
```

### PR Title Format

Follow the same convention as commit messages:

```
<type>(<scope>): <description>
```

Examples:

- `feat(ml): implement S-curve anomaly detection`
- `fix(api): resolve CORS configuration issue`
- `docs: add satellite processing guide`

---

## 👀 Code Review Guidelines

### For Authors

- **Keep PRs focused**: One feature/fix per PR
- **Keep PRs small**: Ideally under 400 lines changed
- **Respond promptly**: Address review comments within 24 hours
- **Be open to feedback**: Code reviews improve code quality
- **Update the PR**: Push new commits addressing feedback

### For Reviewers

#### Review Checklist

- [ ] Code follows project conventions and style guide
- [ ] Changes are well-tested
- [ ] Documentation is updated (if needed)
- [ ] No unnecessary complexity
- [ ] Security considerations addressed
- [ ] Performance impact considered
- [ ] Error handling is appropriate
- [ ] Code is readable and maintainable

#### Review Comments

Use these prefixes for clarity:

- **REQUIRED**: Must be addressed before merging
- **SUGGESTION**: Optional improvement
- **QUESTION**: Seeking clarification
- **NIT**: Minor style/formatting preference

Example:

```
REQUIRED: This function needs error handling for null values

SUGGESTION: Consider using a more descriptive variable name

QUESTION: Why did we choose this approach over X?

NIT: Extra whitespace on line 45
```

#### Approval Process

- **At least 1 approval required** from another team member before merging
- **All conversations must be resolved** before merging
- **CI/CD checks must pass** (tests, linting, build)

### Review Response Time

- **Simple PRs** (< 50 lines): Review within 4 hours
- **Medium PRs** (50-200 lines): Review within 24 hours
- **Large PRs** (200+ lines): Review within 48 hours

---

## 🔀 Merge Strategy

### Merge Methods

We use **Squash and Merge** as the default strategy:

#### Squash and Merge (Default)

Use for most feature branches:

```bash
# GitHub will squash all commits into one when merging
# Keeps main branch history clean
```

**When to use**:

- Feature branches with multiple work-in-progress commits
- Bug fixes with iterative changes
- Most pull requests

**Benefits**:

- Clean, linear history on main
- Easy to revert if needed
- One commit per feature/fix

#### Rebase and Merge

Use for clean, well-crafted commit histories:

```bash
# Preserves individual commits from the PR
```

**When to use**:

- PRs with meaningful, atomic commits
- Each commit tells a story
- Commits are already clean and logical

**Requirements**:

- Each commit must pass tests independently
- Commits follow message guidelines
- No "fix typo" or "WIP" commits

#### Merge Commit (Avoid)

Only use for special cases (e.g., merging release branches).

### Before Merging

Ensure:

1. ✅ All CI/CD checks pass
2. ✅ At least 1 approval from team member
3. ✅ All review conversations resolved
4. ✅ Branch is up to date with main
5. ✅ No merge conflicts

### Merge Commit Message

When using Squash and Merge, GitHub will create a commit message. Edit it to follow our convention:

```
feat(satellite): add multi-layer NDVI processing (#123)

- Implemented Sentinel-2 data ingestion
- Added NDVI calculation with cloud masking
- Created tile generation pipeline
- Updated API to serve NDVI overlays

Co-authored-by: Team Member <email@example.com>
```

---

## 🧪 Testing Requirements

### Minimum Test Coverage

- **Backend**: 80% code coverage
- **Frontend**: 70% code coverage
- **Critical paths**: 95% coverage (ML models, satellite processing, data ingestion)

### Test Types

#### Unit Tests

Test individual functions/components:

```python
# Backend example
def test_calculate_ndvi():
    nir = np.array([0.8, 0.7])
    red = np.array([0.2, 0.3])
    expected = np.array([0.6, 0.4])
    result = calculate_ndvi(nir, red)
    np.testing.assert_array_almost_equal(result, expected)
```

```javascript
// Frontend example
test("renders project marker with correct risk color", () => {
  const project = { risk_score: 85, name: "Test Project" };
  render(<ProjectMarker project={project} />);
  const marker = screen.getByTestId("project-marker");
  expect(marker).toHaveClass("risk-critical");
});
```

#### Integration Tests

Test component interactions:

```python
def test_satellite_processing_pipeline():
    """Test end-to-end satellite data processing"""
    project_id = create_test_project()
    result = process_satellite_imagery(project_id)
    assert result.status == 'completed'
    assert result.ndvi_mean is not None
```

#### End-to-End Tests

Test complete user flows (use Playwright/Cypress):

```javascript
test("user can view project and satellite overlay", async ({ page }) => {
  await page.goto("/dashboard");
  await page.click('[data-testid="project-123"]');
  await expect(page.locator(".satellite-overlay")).toBeVisible();
});
```

### Running Tests

```bash
# Backend - all tests
cd backend
pytest

# Backend - with coverage
pytest --cov=. --cov-report=html

# Backend - specific test file
pytest tests/test_satellite.py

# Frontend - all tests
cd frontend
npm test

# Frontend - with coverage
npm test -- --coverage

# Frontend - watch mode
npm test -- --watch
```

---

## 📚 Documentation Standards

### Code Documentation

#### Python Docstrings

Use Google style docstrings:

```python
def calculate_risk_score(financial_progress: float, physical_progress: float) -> float:
    """Calculate project risk score based on progress indicators.

    Args:
        financial_progress: Percentage of budget disbursed (0-100)
        physical_progress: Percentage of physical completion (0-100)

    Returns:
        Risk score from 0 (low risk) to 100 (critical risk)

    Raises:
        ValueError: If progress values are outside 0-100 range

    Example:
        >>> calculate_risk_score(60.0, 10.0)
        75.5
    """
    if not (0 <= financial_progress <= 100) or not (0 <= physical_progress <= 100):
        raise ValueError("Progress values must be between 0 and 100")

    return (financial_progress - physical_progress) * 1.5
```

#### JavaScript/TypeScript JSDoc

```javascript
/**
 * Renders satellite overlay on 3D globe
 * @param {Object} layer - Layer configuration object
 * @param {string} layer.url - Tile URL template
 * @param {number} layer.opacity - Opacity value (0-1)
 * @param {string} layer.type - Layer type ('ndvi' | 'sar' | 'false-color')
 * @returns {CesiumImageryLayer} Configured imagery layer
 * @throws {Error} If layer type is not supported
 */
function addSatelliteOverlay(layer) {
  // Implementation
}
```

### README Updates

Update relevant README files when:

- Adding new features
- Changing API endpoints
- Modifying configuration
- Adding dependencies
- Changing deployment procedures

### API Documentation

Update API documentation (OpenAPI/Swagger) when:

- Adding new endpoints
- Modifying request/response schemas
- Changing authentication requirements
- Adding new error codes

---

## 🚫 What Not to Do

- ❌ Don't commit directly to `main` branch
- ❌ Don't force push to shared branches
- ❌ Don't commit sensitive data (API keys, passwords)
- ❌ Don't commit large binary files (use Git LFS)
- ❌ Don't merge your own PRs without review
- ❌ Don't leave commented-out code
- ❌ Don't ignore failing tests
- ❌ Don't merge with unresolved conversations

---

## 🆘 Getting Help

### Stuck on Something?

1. **Check documentation** in `/docs` folder
2. **Search existing issues** on GitHub
3. **Ask in team chat** (preferred for quick questions)
4. **Create a GitHub issue** for bugs or feature discussions
5. **Tag a team member** for domain-specific questions:
   - Backend/ML: @backend-lead
   - Frontend: @frontend-lead
   - DevOps: @devops-lead
   - Satellite processing: @gis-specialist

### Reporting Bugs

Use the bug report template when creating an issue:

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:

1. Go to '...'
2. Click on '....'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**

- OS: [e.g. Ubuntu 22.04]
- Python version: [e.g. 3.11.2]
- Browser: [e.g. Chrome 120]

**Additional context**
Any other context about the problem.
```

---

## 📝 Quick Reference

### Common Git Commands

```bash
# Update your main branch
git checkout main && git pull origin main

# Create and switch to new branch
git checkout -b feature/my-feature

# Stage all changes
git add .

# Commit with message
git commit -m "feat(scope): description"

# Push branch to GitHub
git push origin feature/my-feature

# Update branch with latest main
git checkout main && git pull origin main
git checkout feature/my-feature
git rebase main

# Squash last 3 commits
git rebase -i HEAD~3

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard all local changes
git reset --hard origin/main
```

---

## 🎯 Team Collaboration Best Practices

1. **Communicate early and often** - Discuss major changes before implementation
2. **Review others' code** - Share knowledge and catch issues
3. **Write descriptive commit messages** - Help others understand your changes
4. **Keep PRs small** - Easier to review and less risky to merge
5. **Resolve merge conflicts promptly** - Don't let branches get stale
6. **Update documentation** - Keep it in sync with code
7. **Run tests before pushing** - Catch issues early
8. **Be respectful in reviews** - Critique code, not people

---

## 📄 License

By contributing to ONEKA AI, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to ONEKA AI! Together, we're building infrastructure accountability for Kenya and beyond.** 🚀

_Questions? Contact the team at dev@oneka.co.ke_
