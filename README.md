# alt-training-plus

A hands-on workshop repo where each teammate adds their own **Team Card** to a
shared gallery using **Claude Code in VS Code**, then opens a pull request.

The goal isn't the card. The goal is the **flow**: clone → branch → change → commit → PR → merge.

---

## What you'll need

Before you start, make sure each of the items below is installed and working.
For every one we list **(a) the terminal command** if you're comfortable with
the CLI, and **(b) a prompt you can paste into Claude Code** if you'd rather
not touch the terminal.

> 💡 If you don't have Claude Code yet, do **section 3** first — you'll need
> it for the (b) prompts below.

---

### 1. Node.js 20+ and `npm`

**(a) Terminal**

```bash
node --version    # should print v20.x.x or higher
npm --version
```

If you don't have it or the version is too old:

- **macOS** (with Homebrew): `brew install node@20`
- **Windows**: download the LTS installer from <https://nodejs.org>
- **Linux** (Debian/Ubuntu): `curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt-get install -y nodejs`

**(b) Claude Code prompt**

> Check whether Node.js version 20 or higher and `npm` are installed on my
> system. Run `node --version` and `npm --version` and tell me the result.
> If Node is missing or older than 20, give me the exact command to install
> it on my OS (I'm on **[macOS / Windows / Linux]**).

---

### 2. `git` configured with your name and email

**(a) Terminal**

```bash
git --version                         # confirms git is installed
git config --global user.name         # should print your name
git config --global user.email        # should print your email
```

If either is empty, set them once:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@telus.com"
```

**(b) Claude Code prompt**

> Check whether `git` is installed and that `user.name` and `user.email` are
> configured globally. If anything is missing, set my git `user.name` to
> **"[Your Name]"** and `user.email` to **"[you@telus.com]"** with
> `git config --global`.

---

### 3. VS Code with the **Claude Code** extension

1. Install **VS Code** from <https://code.visualstudio.com> if you don't have it.
2. Open VS Code → **Extensions** sidebar (`Cmd`/`Ctrl` + `Shift` + `X`) →
   search **"Claude Code"** → click **Install**.
3. Open the Claude Code panel (sidebar icon or `Cmd`/`Ctrl` + `Shift` + `P`
   → **"Claude Code: Open"**) and sign in when prompted.

**(a) Terminal check (optional)**

```bash
code --list-extensions | grep -i claude    # should list the Claude Code extension
```

**(b) Claude Code prompt** *(once it's installed)*

> Confirm Claude Code is connected and authenticated in this workspace. If
> there's anything missing, walk me through fixing it.

---

### 4. GitHub access to this repo

You need:

- A GitHub account
- Access to `gmvilaplana/alt-training-plus` — ping the facilitator on Slack if you don't see the repo
- Optional but recommended: the **GitHub CLI** (`gh`) so you can open PRs without leaving the terminal

**(a) Terminal**

```bash
gh --version       # confirms gh is installed
gh auth status     # confirms you're logged in
```

If `gh` is missing:

- **macOS**: `brew install gh`
- **Windows**: `winget install --id GitHub.cli`
- **Linux**: see <https://github.com/cli/cli/blob/trunk/docs/install_linux.md>

Then log in:

```bash
gh auth login      # follow the prompts, pick HTTPS + browser auth
```

**(b) Claude Code prompt**

> Check whether the GitHub CLI (`gh`) is installed and that I'm authenticated
> by running `gh --version` and `gh auth status`. If `gh` is missing, give
> me the install command for **[macOS / Windows / Linux]** and then walk me
> through `gh auth login` step by step.

---

> ✅ Once all four are green, jump to **section 1. Clone and run the site locally** below.

## 1. Clone and run the site locally

```bash
git clone https://github.com/gmvilaplana/alt-training-plus.git
cd alt-training-plus
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`) — you'll land on the
**GM2 ALT Training** cover. Click **start activity** to jump to the team
gallery and see the existing cards.

## 2. Create your branch

Always start from an up-to-date `main`:

```bash
git checkout main
git pull
git checkout -b feat/your-name-card
```

## 3. Add your card

Every participant works on **their own file** — no shared array, no merge
conflicts. To add your card:

1. Copy `src/cards/_template.tsx` to `src/cards/<your-name>.tsx` (e.g.
   `src/cards/juan.tsx`).
2. Rename the exported component (e.g. `YourNameCard` → `JuanCard`).
3. Edit the contents freely — colors, gradients, emojis, GSAP, whatever
   you want. Just keep everything inside the `<article>` wrapper.
4. Save → your card auto-appears in the gallery (visit
   `/gallery/warm-up`).

A Claude Code prompt that works well:

> Create a new Team Card component for me at `src/cards/<my-slug>.tsx`.
> Use `src/cards/_template.tsx` as the base — copy it, rename the file,
> and rename the component.
>
> My name is **[NAME]**, my role is **[ROLE]**, and my skill/phrase is
> **[SKILL]**. Use a theme inspired by **[teal | navy | amber | peach |
> your own gradient]** with the emoji **[EMOJI]**. Feel free to use
> gradients or animations — keep it inside the `<article>` wrapper.

See `/gallery/warm-up` in the live site for the full prompt template and
tips.

## 4. Commit and push

```bash
git status                # see what changed
git diff                  # review the change
git add src/cards/your-name.tsx
git commit -m "Add team card for [your name]"
git push -u origin feat/your-name-card
```

## 5. Open a pull request

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
