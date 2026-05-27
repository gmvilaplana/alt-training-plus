# alt-training-plus

A hands-on workshop repo where each teammate adds their own **Team Card** to a
shared gallery using **Claude Code in VS Code**, then opens a pull request.

The goal isn't the card. The goal is the **flow**: clone → branch → change → commit → PR → merge.

---

## What you'll need

- Node.js 20+ and `npm`
- `git` configured with your name and email
- VS Code with the **Claude Code** extension installed
- Access to this repo (ask the facilitator if you don't have it yet)

## 1. Clone and run the site locally

```bash
git clone https://github.com/gmvilaplana/alt-training-plus.git
cd alt-training-plus
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`) — you should see the
team gallery with the existing cards.

## 2. Create your branch

Always start from an up-to-date `main`:

```bash
git checkout main
git pull
git checkout -b feat/your-name-card
```

## 3. Add your card

Open the project in VS Code, open Claude Code, and ask it to add your card.
A prompt that works well:

> Add a new card for me to `src/data/teamCards.ts`. My name is **[NAME]**,
> my role is **[ROLE]**, and my skill/phrase is **[SKILL]**. Use an
> accent color of **[HEX]** and the emoji **[EMOJI]**.

Or edit `src/data/teamCards.ts` directly — append a new entry to the
`teamCards` array. The `TeamCard` type at the top of the file documents
every field.

Save, switch to the browser, and confirm your card appears in the gallery.

## 4. Commit and push

```bash
git status                # see what changed
git diff                  # review the change
git add src/data/teamCards.ts
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
├── App.tsx                  # page layout
├── components/
│   └── TeamCardView.tsx     # how a card looks
├── data/
│   └── teamCards.ts         # ← the only file you need to edit
├── index.css                # global styles + Tailwind theme tokens
└── main.tsx                 # React entry point
```

## Stack

- [Vite](https://vite.dev) (dev server + build)
- [React 19](https://react.dev) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
