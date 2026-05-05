# Production Webhook Setup Guide

This guide explains how to configure the Sanity webhook for instant content updates in production.

---

## What is a Webhook?

A webhook allows Sanity to notify your website immediately when content is published, triggering an instant cache revalidation instead of waiting 60 seconds.

**Without Webhook:** Changes appear in 60 seconds (ISR revalidation)  
**With Webhook:** Changes appear instantly (< 1 second)

---

## Prerequisites

1. ✅ Website deployed to production
2. ✅ Production URL available (e.g., `https://charlesjasema.com`)
3. ✅ Sanity project access (you have this)
4. ✅ Webhook secret configured in `.env.local` (you have this)

---

## Step-by-Step Setup

### Step 1: Get Your Production URL

Your production URL will be something like:
- `https://charlesjasema.com`
- `https://your-domain.vercel.app`
- `https://your-domain.netlify.app`

### Step 2: Construct Webhook URL

Your webhook URL format:
```
https://YOUR-DOMAIN.com/api/revalidate?secret=YOUR_SECRET
```

**Example:**
```
https://charlesjasema.com/api/revalidate?secret=cj-portfolio-webhook-secret-2026
```

**Your Secret (from .env.local):**
```
cj-portfolio-webhook-secret-2026
```

### Step 3: Configure in Sanity

1. **Go to Sanity Manage:**
   - Visit: https://www.sanity.io/manage
   - Select your project: `charles-jasema-portfolio`

2. **Navigate to API Settings:**
   - Click on "API" in the left sidebar
   - Scroll down to "Webhooks"
   - Click "Add Webhook"

3. **Configure Webhook:**
   
   **Name:**
   ```
   Production Revalidation
   ```

   **URL:**
   ```
   https://YOUR-DOMAIN.com/api/revalidate?secret=cj-portfolio-webhook-secret-2026
   ```
   *(Replace YOUR-DOMAIN.com with your actual domain)*

   **Dataset:**
   ```
   production
   ```

   **Trigger on:**
   - ✅ Create
   - ✅ Update
   - ✅ Delete

   **Filter (optional):**
   Leave empty to trigger on all document types, or use:
   ```groq
   _type in ["song", "musicVideo", "project", "blogPost", "lyrics"]
   ```

   **HTTP Method:**
   ```
   POST
   ```

   **HTTP Headers:**
   Leave empty (not needed)

   **API Version:**
   ```
   v2021-06-07
   ```

4. **Save Webhook:**
   - Click "Save"
   - Sanity will test the webhook
   - You should see a success message

### Step 4: Test the Webhook

1. **Edit Content in Sanity Studio:**
   - Go to https://YOUR-DOMAIN.com/admin
   - Edit any song, project, or blog post
   - Click "Publish"

2. **Check Your Website:**
   - Refresh the relevant page
   - Changes should appear **instantly** (< 1 second)
   - No need to wait 60 seconds!

3. **Verify in Sanity:**
   - Go back to Sanity Manage → API → Webhooks
   - Click on your webhook
   - Check "Recent deliveries"
   - You should see successful requests (200 status)

---

## Webhook Endpoint Details

### Endpoint: `/api/revalidate`

**Location:** `src/app/api/revalidate/route.ts`

**Method:** POST

**Query Parameters:**
- `secret` (required): Must match `SANITY_REVALIDATION_SECRET` in `.env.local`

**Request Body (from Sanity):**
```json
{
  "_type": "song",
  "_id": "abc123",
  "title": "My Song Title"
}
```

**Response:**
```json
{
  "revalidated": true,
  "message": "Revalidated successfully"
}
```

**Error Response:**
```json
{
  "message": "Invalid secret",
  "revalidated": false
}
```

---

## Content-Type Specific Revalidation

The webhook intelligently revalidates only the affected pages:

| Content Type | Pages Revalidated |
|--------------|-------------------|
| `song` | `/music`, `/` (home) |
| `musicVideo` | `/music` |
| `project` | `/portfolio`, `/` (home) |
| `blogPost` | `/blog`, `/` (home) |
| `lyrics` | `/lyrics` |

This ensures fast revalidation without rebuilding the entire site.

---

## Troubleshooting

### Webhook Not Triggering

**Check:**
1. Webhook URL is correct (no typos)
2. Secret matches `.env.local`
3. Website is deployed and accessible
4. Webhook is enabled in Sanity

**Test manually:**
```bash
curl -X POST "https://YOUR-DOMAIN.com/api/revalidate?secret=cj-portfolio-webhook-secret-2026" \
  -H "Content-Type: application/json" \
  -d '{"_type":"song","_id":"test"}'
```

Expected response:
```json
{"revalidated":true,"message":"Revalidated successfully"}
```

### Webhook Returns 401 Unauthorized

**Problem:** Secret doesn't match

**Solution:**
1. Check `.env.local` has correct `SANITY_REVALIDATION_SECRET`
2. Verify webhook URL includes correct secret parameter
3. Redeploy website if you changed the secret

### Webhook Returns 500 Error

**Problem:** Server error during revalidation

**Solution:**
1. Check server logs for errors
2. Verify all pages exist and are accessible
3. Check Sanity connection is working

### Changes Still Take 60 Seconds

**Problem:** Webhook not configured or failing

**Solution:**
1. Check webhook status in Sanity Manage
2. Look at "Recent deliveries" for errors
3. Verify webhook URL is correct
4. Test webhook manually (see above)

---

## Security Best Practices

### 1. Keep Secret Secure

- ✅ Never commit `.env.local` to Git
- ✅ Use different secrets for dev/staging/production
- ✅ Rotate secrets periodically (every 6 months)

### 2. Validate Requests

The webhook endpoint validates:
- ✅ Secret parameter matches environment variable
- ✅ Request method is POST
- ✅ Request body contains valid data

### 3. Rate Limiting

Consider adding rate limiting to prevent abuse:
```typescript
// Example: Limit to 100 requests per minute
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute
});
```

---

## Environment Variables

### Development (.env.local)
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=6omuzt9o
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token_here
SANITY_REVALIDATION_SECRET=cj-portfolio-webhook-secret-2026
NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

### Production (Vercel/Netlify)
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=6omuzt9o
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token_here
SANITY_REVALIDATION_SECRET=cj-portfolio-webhook-secret-2026
NEXT_PUBLIC_SITE_URL=https://charlesjasema.com
```

**Important:** Set these in your hosting platform's environment variables settings.

---

## Monitoring

### Check Webhook Status

1. **Sanity Manage:**
   - Go to API → Webhooks
   - Click on your webhook
   - View "Recent deliveries"
   - Check success/failure rates

2. **Server Logs:**
   - Check your hosting platform's logs
   - Look for `/api/revalidate` requests
   - Monitor for errors

3. **Performance:**
   - Track revalidation time
   - Monitor cache hit rates
   - Check page load times

---

## Alternative: Manual Revalidation

If you don't want to set up a webhook, you can manually trigger revalidation:

### Option 1: API Request
```bash
curl -X POST "https://YOUR-DOMAIN.com/api/revalidate?secret=cj-portfolio-webhook-secret-2026"
```

### Option 2: Browser
Visit in your browser:
```
https://YOUR-DOMAIN.com/api/revalidate?secret=cj-portfolio-webhook-secret-2026
```

### Option 3: Postman/Insomnia
- Method: POST
- URL: `https://YOUR-DOMAIN.com/api/revalidate?secret=cj-portfolio-webhook-secret-2026`
- Body: `{"_type":"song"}`

---

## Benefits of Webhook Setup

### Without Webhook (ISR Only)
- ⏱️ Changes appear in 60 seconds
- 🔄 Automatic revalidation every 60s
- 📊 Lower server load
- ✅ Good for most use cases

### With Webhook (ISR + Webhook)
- ⚡ Changes appear instantly (< 1 second)
- 🎯 Revalidation only when content changes
- 🚀 Better user experience
- ✅ Best for frequently updated content

---

## Next Steps

1. ✅ Deploy your website to production
2. ✅ Get your production URL
3. ✅ Configure webhook in Sanity (follow Step 3 above)
4. ✅ Test by publishing content
5. ✅ Monitor webhook deliveries
6. ✅ Enjoy instant updates!

---

## Support

If you encounter issues:

1. **Check Sanity Documentation:**
   - https://www.sanity.io/docs/webhooks

2. **Check Next.js ISR Documentation:**
   - https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration

3. **Review Server Logs:**
   - Check your hosting platform's logs for errors

4. **Test Manually:**
   - Use curl or Postman to test the endpoint

---

**Status:** ✅ Webhook endpoint ready  
**Action Required:** Configure webhook in Sanity after production deployment  
**Estimated Time:** 5 minutes

---

*Last Updated: May 5, 2026*
