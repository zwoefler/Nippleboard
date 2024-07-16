# Nippleboard

A soundboard that plays sounds from either local storage or a Supabase cloud database.

## ✨ Features
- Toggle between local storage or Supabase cloud store
- Basic search feature to locate sounds by name.

## 🛠 Install & Use

**Prerequisites:**
- `node`
- `.env` file with `VITE_APP_SUPABASE_URL` and `VITE_APP_SUPABASE_ANON_KEY`

Find the settings in the Supabase project.
Project Settings > API:
- URL
- Project API keys > `anon` `public`

```ENV
VITE_APP_SUPABASE_URL=<SUPABASE-URL>
VITE_APP_SUPABASE_ANON_KEY=<SUPABASE_ANON_KEY>
```

**🚂 Getting Started:**
```SHELL
git clone https://github.com/zwoefler/nippleboard.git
cd nippleboard

npm install
npm run dev
```

**Note**: Uses Supabase storage to store sounds.
🚧 TODO: DOCS OR SCRIPT FOR SUPABASE SETUP

## 🤝🏽 Contributing
1. **📝 Update Changelog**:
- Format: `## [x.y.z-alpha] - Abbreviation DAY dd.mm.yyyy`
- One-liner summary of changes.
- List changes. Use tripple .md heading to prefix changes (e.g. `### Added` or `### Fixed`).

2. **🔖 Update `package.json`**:
- Bump the version.

3. **📬 Commit Changes**:
- Paste `CHANGELOG.md` entry. Remove "#"s:
```SHELL
git commit -am "<Paste changelog message>"
```

4. **🏷️ Tag and Push Changes**:
```SHELL
git tag -a x.y.z-alpha -m 'MVP Version x.y.z-alpha'
git push origin <BRANCH-NAME>
git push origin <TAG>
```

## Setup GitHub Action for Deployment to GitHub Pages
#### Step 1: Activate GitHub Pages
- Navigate to GitHub Repository Settings:
- Click on the Settings Tab
- Click Pages
- Select Source: GitHub Actions

#### Step 2: Set Branches to publish from
- In Settings:
- Click Environments
- Click "github-pages"
- Below the list in "Deployment branches and tags" "Add deployment branch or tag rule"
- Type "develop" (The branch used here)
- Click add rule

#### Step 3: Set Environment Variables / Secrets
- In Settings:
- Click "Secrets and variables" > Actions
- Click "New repository secret"
- Add ONE (VITE_APP_SUPABASE_URL) variable from your .env file and paste the content in the larger text field below
- Click "Add secret"
- Repeat for all your variables (VITE_APP_SUPABASE_ANON_KEY)

> Ensure these names match those used in your .github/workflows/deploy_to_github_pages.yaml file.

#### Step 4: Verify Workflow and Deployment
- Ensure `.github/workflows/deploy_to_github_pages.yaml` is present.