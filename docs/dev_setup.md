# Dev Setup

## Run development locally:
**Prerequisites**
WORKING FROM: SUPABASE REPO
1. Clone the Supabase repo: `git clone git@github.com:supabase/supabase.git`
2. Change into: `cd supabase/docker`
3. Setup environmnet variables: `cp .env.example .env`
4. Spin up supabase: `docker compose --file docker-compose.yml up` 

Supabase is accessable at `http://localhost:8000`
Copy the ANON_KEY from the `.env` file.

WORKING FROM: THIS REPO:
Add VITE_APP_SUPABASE_URL and VITE_APP_SUPABASE_ANON_KEY to `.env.development`
`.env.development` is loaded by default.

```env
VITE_APP_SUPABASE_URL=http://localhost:8000
VITE_APP_SUPABASE_KEY=<ANON_KEY_FROM_SUPABASE_ENV>
```

WORKING FROM: Supabase URL
After spinning up Supabase visit `http://localhost:8000` in your browser.

Goto "Authentication":
1. "Add User" in top roght corner
2. Click "Create New User"
3. Give it an email, password and autoconfirm user

Create Sounds Storage:
1. Click "Storage" in the left panel
2. Create a bucket "sounds"
3. Inside that bucket create a folder "sounds"
4. Add policies... TODO

