# Changelog

## [0.5.4-alpha] - Tue. 23.07.2024

Add Standard Button + Housekeeping

### ADDED
- Button component
- Added PauseButton Component

### IMPROVED
- Added Middleware function to upload sounds

### FIX
- Rmeoved Whitespaces


## [0.5.3-alpha] - Tue. 23.07.2024

Add "Clear Searchbar" button to clear the searchbar with X-button

### ADDED
- Button to clear search bar

## [0.5.2-alpha] - Wed. 17.07.2024

Add Login Link on Homepage

### ADDED
- Button that redirects to /login

## [0.5.1-alpha] - Wed. 17.07.2024

Sounds now reload after upload

### ADDED
- Reloading sounds from Supabase after upload
- "Loading Sounds..." message in Home View when Sounds are loaded

### FIX
- Upload issue - Function not imported
- Version and Description in package.json (After accidental delete)

### IMPROVED
- Updated Docs

## [0.5.0-alpha] - Tue. 16.07.2024

Deploy to GitHub Pages

### ADDED
- Docs for GitHub Actions Setup
- GitHub Actions workflow to deploy to GitHub Pages
- Make sure redirects on GitHub Pages work (GitHub Action)

### IMPROVED
- Typescript configuration and types missmatches and possible nullity

## [0.4.0-alpha] - Mon. 15.07.2024

Add Upload sound capability

### ADDED
- Upload button to upload sounds to Supabase
- UploadFileToStorage APi function

## [0.3.0-alpha] - Sat. 13.07.2024

Added Login page & only pulls sounds when logged in

### ADDED
- Login Page & functionality
- Redirect after login to Home Page

### FIX
- Only pulls sounds from Supabase when logged in


## [0.2.0-alpha] - Sat. 13.07.2024

Add download functionality for Supabase and local storage

### ADDED
- Download from local storage and Supabase storage bucket
- Update Dev Docs

### FIX
- Make local and remote download work in same view

---

## [0.1.3-alpha] - Sat. 13.07.2024

Updating README and Added dev docs

### UPDATED
- README.md includes .env file section to connect to supabase project

### ADDED
- docs/ directory with Devlopment roadmap

---

## [0.1.2-alpha] - Sat. 13.07.2024

Updating DOCS

### FIX
- Updating CHANGELOG.md to reflect updated released version

### ADDED
- Add README instruction on how to use the project

---

## [0.1.1-alpha] - Sat. 13.07.2024

Release MVP as v0.1.1-alpha

### CHANGED
- Removed unnecessary colors from Tailwind configuration to optimize styling.
- Formatted the `vite.config.ts` file for better code readability.

---

## [0.1.0-alpha] - Sat. 13.07.2024

Release MVP as v0.1.0-alpha

### ADDED
- Initial MVP release of the application.
- Ability to play sounds from either local storage or Supabase.
- Feature to toggle between local and Supabase storage sources.
- Basic search functionality implemented to search sounds by name.