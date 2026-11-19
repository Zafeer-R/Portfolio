# How changes move

```
feature/* fix/* chore/* docs/*  -->  develop  -->  main  -->  production (Vercel)
   (local work, PR + CI)          (staging)     (release)     (auto deploy)
```

## Branches
- `main` is production. Every merge deploys to www.zafeerrangoonwala.com. No direct pushes.
- `develop` is staging, where finished work collects. Vercel gives it a stable preview URL
  (`portfolio-git-develop-zafeer-rs-projects.vercel.app`).
- Work branches start from `develop`: `feature/…`, `fix/…`, `chore/…`, `docs/…`, `refactor/…`, `test/…`, `perf/…`, `ci/…`.
  Experiments stay on their own branch (or local) until they are good enough for a PR.
- `hotfix/…` starts from `main` for urgent production fixes, then is merged back into `develop`.

## Pull requests
1. Branch from `develop`, push, and open a PR into `develop` (squash merge).
2. CI (`check` and `branch-policy`) and the Vercel preview must pass.
3. The PR is labeled from its branch name, and the labels become the release notes.

## Releasing
1. Open a PR from `develop` into `main` titled `Release vX.Y.Z` and merge it with a **merge commit**.
2. Tag the merge: `git checkout main && git pull && git tag vX.Y.Z && git push origin vX.Y.Z`.
   The Release workflow builds the tag and publishes a GitHub release with generated notes.
3. If `main` ends up ahead of `develop` (for example after a hotfix), open a PR from `main` into `develop`.

Versions: `v1.0.0` for the first release; bump the minor for new features and the patch for fixes.

## Rolling back
In Vercel, open Deployments, pick the last good production deployment and choose Promote to Production.
Then revert the bad change in git.

## Checks
```
npm ci
npm run lint
npm run build
```
