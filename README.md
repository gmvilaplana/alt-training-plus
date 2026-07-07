# alt-training-plus

A hands-on workshop repo where each teammate adds their own **Team Card** to a
shared gallery using **Claude Code in VS Code**, then opens a pull request.

The goal isn't the card. The goal is the **flow**: clone → branch → change → commit → PR → merge.

---

## What you'll need

Work through these **seven steps in order** before the workshop starts. Each
one gives you two options: **(a)** a terminal command if you're comfortable
with the CLI, or **(b)** a prompt you can paste straight into the **Claude Code
app** and let it do the work.

> 💡 You already have the **Claude Code app** installed, so the (b) prompts work
> from step 1 — **step 6** just adds Claude Code to VS Code as an extension.
> Everything here targets macOS; not on a Mac? Ping the facilitator on Slack.

---

### 1. Install Homebrew

Homebrew is the package manager we'll use to install everything else.

**(a) Terminal**

```bash
brew --version   # prints a version if already installed
```

If it's missing, install it (then restart Terminal):

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

On Apple Silicon, run the two **Next steps** PATH commands the installer prints
at the end.

**(b) Claude Code prompt**

> Check whether Homebrew is installed on my Mac by running `brew --version`. If
> it's missing, install it with the official installer. On Apple Silicon, also
> run the two "Next steps" PATH commands it prints. When you're done, confirm
> `brew --version` works.

---

### 2. Install the GitHub CLI (`gh`)

`gh` lets you log in to GitHub and open pull requests without leaving the terminal.

**(a) Terminal**

```bash
brew install gh
gh --version
```

**(b) Claude Code prompt**

> Install the GitHub CLI on my Mac with `brew install gh`, then confirm it
> worked by running `gh --version`.

---

### 3. Log in to GitHub

Authenticate `gh` with your account. Pick **GitHub.com → HTTPS → Login with a
web browser** and follow the prompts.

**(a) Terminal**

```bash
gh auth login
gh auth status   # should show you as logged in
```

You'll also need access to `gmvilaplana/alt-training-plus` — ping the
facilitator on Slack if you can't see the repo.

**(b) Claude Code prompt**

> Log me in to GitHub from the terminal with `gh auth login`. Walk me through
> it choosing GitHub.com, HTTPS, and "Login with a web browser". When it's
> finished, run `gh auth status` to confirm I'm authenticated.

---

### 4. Check your `npm` and `git` versions

**(a) Terminal**

```bash
node --version   # want v20.x.x or higher
npm --version
git --version
```

Missing or too old? Install with Homebrew, then set your identity:

```bash
brew install node   # Node.js 20+ and npm
brew install git
git config --global user.name "Your Name"
git config --global user.email "you@telus.com"
```

**(b) Claude Code prompt**

> Check my Node.js, `npm`, and `git` versions. I want Node 20 or higher. If
> Node/npm or git are missing (or Node is too old), install them with Homebrew.
> Then set my git identity with `git config --global user.name` and
> `user.email`.

---

### 5. Install VS Code

VS Code is the editor we'll run Claude Code inside.

**(a) Terminal**

```bash
brew install --cask visual-studio-code
code --version
```

Prefer clicking? Download it from <https://code.visualstudio.com> instead.

**(b) Claude Code prompt**

> Install Visual Studio Code on my Mac with `brew install --cask
> visual-studio-code`, then confirm it worked by running `code --version`.

---

### 6. Add Claude Code to VS Code

You already have the Claude Code app — this step connects it to VS Code as an
extension so you can run it right inside the editor.

1. Open VS Code → **Extensions** sidebar (`Cmd` + `Shift` + `X`).
2. Search **"Claude Code"** → click **Install**.
3. Open the Claude Code panel and **sign in** when prompted.

```bash
code --list-extensions | grep -i claude    # optional check
```

---

### 7. Clone and run the site locally

**(a) Terminal**

```bash
git clone https://github.com/gmvilaplana/alt-training-plus.git
cd alt-training-plus
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`) — you'll land on the
**GM2 ALT Training** cover. Click **start activity** to jump to the team
gallery and see the existing cards.

**(b) Claude Code prompt**

> Clone the repo `https://github.com/gmvilaplana/alt-training-plus.git` into my
> current directory, `cd` into it, run `npm install`, and then start the dev
> server with `npm run dev`. Once it's running, tell me the local URL it's
> serving on so I can open it in the browser.

---

## 1. Create your branch

Always start from an up-to-date `main`:

```bash
git checkout main
git pull
git checkout -b feat/your-name-card
```

## 2. Add your card

Every participant works on **their own file** — no shared array, no merge
conflicts. To add your card:

1. Copy `src/cards/_template.tsx` to `src/cards/<your-name>.tsx` (e.g.
   `src/cards/juan.tsx`). The template already includes the required
   structure (aspect ratio, layered background, typography hierarchy,
   decorative element) — just personalize it.
2. Rename the exported component (e.g. `YourNameCard` → `JuanCard`).
3. Edit the contents freely — colors, gradients, GSAP, images, whatever
   you want. Just keep everything inside the single `<article>` root.
4. Save → your card auto-appears in the gallery (visit
   `/gallery/warm-up`).

Every card must satisfy these **visual requirements** (the template
ships with them — don't strip them out):

- Fixed aspect ratio (e.g. `aspect-[16/10]`)
- Background that covers the entire card surface
- Three typography levels: small uppercase eyebrow, dominant display name,
  one supporting line
- At least one decorative element (shape, gradient overlay, image, SVG…)
- Padding of `p-7` or more inside the `<article>`

The full prompt — including four reference styles (editorial photo,
vintage trading card, cyberpunk terminal, maximalist gradient) and a
copy-to-clipboard button — lives at **`/gallery/warm-up`** on the live
site. Use that as the source of truth.

## 3. Commit and push

```bash
git status                # see what changed
git diff                  # review the change
git add src/cards/your-name.tsx
git commit -m "Add team card for [your name]"
git push -u origin feat/your-name-card
```

## 4. Open a pull request

`gh pr create` works if you have the GitHub CLI:

```bash
gh pr create --title "Add team card for [your name]" --body "Adds my profile card to the gallery."
```

Otherwise open the GitHub web UI, click **Compare & pull request**, write a
one-line description, and request a review from the facilitator.

The facilitator merges. Vercel deploys. Your card is live.

---

## Project structure

```
src/
├── App.tsx                              # router with nested /gallery routes
├── pages/
│   ├── Home.tsx                         # GM2 ALT Training cover
│   └── gallery/
│       ├── GalleryLayout.tsx            # cover + tabs shell
│       ├── components/                  # Cover, AuthorChip, Tabs, Breadcrumbs
│       └── tabs/                        # Overview, Setup, YourFirstPR, WarmUpChallenge
├── components/
│   ├── HeroCard.tsx                     # paper card in the landing
│   └── CardGallery.tsx                  # auto-discovers src/cards/*.tsx
├── cards/                               # ← one file per participant
│   ├── _template.tsx                    # copy this to make yours
│   └── your-name.tsx                    # the only file YOU edit
├── index.css                            # global styles + Tailwind theme tokens
└── main.tsx                             # React entry point
```

## Stack

- [Vite](https://vite.dev) (dev server + build)
- [React 19](https://react.dev) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [React Router 6](https://reactrouter.com) for client-side routing
- [GSAP](https://gsap.com) + [@gsap/react](https://gsap.com/resources/React) for cover animations
- **Bebas Neue** (Google Fonts) for the display type on the cover
