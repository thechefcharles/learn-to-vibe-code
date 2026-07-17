---
name: deploy-to-prod
description: Deploy to production on Vercel with verification
---

# Deploy to Production

Deploy the latest commit to production on Vercel and verify the deployment is healthy.

## Steps

1. Verify no uncommitted changes (`git status`)
2. Check that latest commit is on main branch
3. Trigger Vercel deployment (push to main automatically deploys)
4. Wait for Vercel build to complete (~2-3 min)
5. Verify deployment: 
   - Check Vercel dashboard for success
   - Run health check: `curl https://learntovibecode.com/api/health`
   - Spot-check: visit `/course/0` and verify content loads
6. Monitor error logs for 5 minutes post-deploy
7. Post summary of deployment (URL, commit hash, any issues)

## Usage

```bash
/deploy-to-prod
```

## When to use

- Before going live with new features
- After major bug fixes
- Regular production deployments (typically weekly)
- Post-security audit fixes

## Verification criteria

✓ Vercel build succeeds  
✓ Health check returns 200  
✓ Course pages load  
✓ No error logs spike  
✓ No rate-limit rejections  
