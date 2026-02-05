# GitHub Basics - Handicraft Ecommerce Project

A quick guide for team members contributing to the **Handicraft-Ecommerce** MERN stack project.

---

## 1. Clone the Repository

```bash
git clone https://github.com/UdayDewani/Handicraft-Ecommerce.git
```

---

## 2. Move into the Project Folder

```bash
cd MERN-Ecommerce-Site
```

---

## 3. Create Your Own Branch & Verify

Create a branch with your name:

```bash
git checkout -b your-name
```

Verify you're on the correct branch:

```bash
git branch
```

> The `*` indicates your current branch.

---

## 4. Make Changes Only in Your Branch

> ⚠️ **Always check your branch before making changes!**

```bash
git branch
```

If not on your branch, switch to it:

```bash
git checkout your-name
```

**Project Structure:**
```
Handicraft-Ecommerce/
├── backend/      # Node.js/Express API
├── frontend/     # React application
└── README.md
```

---

## 5. Commit Your Changes

Stage your changes:

```bash
git add .
```

Commit with a descriptive message:

```bash
git commit -m "Added feature: your description here"
```

---

## 6. Push to Remote

Push your branch:

```bash
git push origin your-name
```

First time push? Use:

```bash
git push -u origin your-name
```

---

## Quick Commands

| Action | Command |
|--------|---------|
| Clone | `git clone https://github.com/UdayDewani/Handicraft-Ecommerce.git` |
| Create branch | `git checkout -b your-name` |
| Check branch | `git branch` |
| Stage changes | `git add .` |
| Commit | `git commit -m "message"` |
| Push | `git push origin your-name` |
| Pull updates | `git pull origin main` |
| Check status | `git status` |

---

## Rules

1. ❌ **Never push directly to `main` branch**
2. ✅ Always work on your own branch
3. ✅ Pull latest changes before starting work
4. ✅ Write clear commit messages
5. ✅ Test your code before pushing
