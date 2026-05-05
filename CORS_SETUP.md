# 🔒 CORS Setup (1 Minute)

## What You Need to Do

In your Sanity dashboard, you need to add CORS origins so your website can access the CMS.

### Steps:

1. **In your Sanity dashboard** (where you are now)
2. **Click "API"** in the left sidebar (you're already there!)
3. **Click "CORS origins"** in the left menu
4. **Click "+ Add CORS origin"** button
5. **Add these two origins**:

   **First origin:**
   - Origin: `http://localhost:3001`
   - ✅ Check "Allow credentials"
   - Click "Save"

   **Second origin:**
   - Origin: `http://localhost:3000`
   - ✅ Check "Allow credentials"
   - Click "Save"

### Why?
- `localhost:3001` = Your website
- `localhost:3000` = Sanity Studio admin interface

---

**After adding CORS origins, you're done with Sanity setup!** ✅

Let me know when you've added the CORS origins and I'll continue with the implementation!