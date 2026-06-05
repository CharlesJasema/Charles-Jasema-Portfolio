# SendGrid Email Service Setup Guide

**Status:** Email service code is ready ✅  
**Action Required:** Configure SendGrid account and add API key

---

## 🎯 Quick Overview

Your contact form already has full SendGrid integration implemented. You just need to:
1. Create a free SendGrid account (15 minutes)
2. Verify your sender email (10 minutes)
3. Get your API key (2 minutes)
4. Add it to your environment variables (2 minutes)
5. Test the contact form (5 minutes)

**Total Time:** ~30 minutes

---

## ✅ What's Already Done

The contact form (`src/app/api/contact/route.ts`) includes:
- ✅ Full SendGrid integration with error handling
- ✅ Admin email notification (HTML formatted)
- ✅ User confirmation email (branded)
- ✅ Graceful fallback if SendGrid not configured
- ✅ SendGrid package installed (`@sendgrid/mail`)

**You only need to configure the API key!**

---

## 📝 Step-by-Step Setup

### Step 1: Create SendGrid Account (5 minutes)

1. **Go to SendGrid:**
   - Visit: https://signup.sendgrid.com
   - Or: https://sendgrid.com and click "Start Free"

2. **Sign Up:**
   - Email: `brocharles001@gmail.com` (your existing email)
   - Password: Create a strong password
   - First Name: Charles
   - Last Name: Jasema
   - Company: Charles Jasema Portfolio (or "Freelance")
   - Website: charlesjasema.com

3. **Complete Registration:**
   - Verify your email (check inbox for SendGrid email)
   - Click verification link
   - Answer quick survey questions (optional)

---

### Step 2: Verify Sender Email (10 minutes)

**Why?** SendGrid requires sender verification to prevent spam.

1. **Navigate to Sender Authentication:**
   - Log in to SendGrid dashboard
   - Go to **Settings** → **Sender Authentication**
   - Click **Verify a Single Sender**

2. **Add Sender Details:**
   ```
   From Name:        Charles Jasema
   From Email:       brocharles001@gmail.com
   Reply To:         brocharles001@gmail.com
   Company Address:  (Your address)
   City:             (Your city)
   Country:          Uganda
   ```

3. **Verify Email:**
   - Click "Create"
   - Check `brocharles001@gmail.com` inbox
   - Click verification link in SendGrid email
   - Sender will show "Verified" in dashboard

**Alternative Domain Setup (Optional for later):**
If you want emails from `noreply@charlesjasema.com`:
- Go to **Domain Authentication** instead
- Follow DNS setup instructions
- Update `SENDGRID_FROM_EMAIL` to `noreply@charlesjasema.com`

---

### Step 3: Create API Key (2 minutes)

1. **Navigate to API Keys:**
   - Go to **Settings** → **API Keys**
   - Click **Create API Key**

2. **Configure API Key:**
   ```
   API Key Name:     Portfolio Contact Form
   API Key Type:     Full Access (or Restricted Access)
   ```

3. **Set Permissions (if Restricted Access):**
   - Mail Send: **Full Access** ✅
   - All others: No Access

4. **Copy API Key:**
   - Click "Create & View"
   - **IMPORTANT:** Copy the API key immediately
   - Format: `SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - Store it safely - you won't see it again!

---

### Step 4: Add API Key to Environment (2 minutes)

#### For Local Development:

1. **Open `.env.local`:**
   ```bash
   # Create file if it doesn't exist
   code .env.local
   ```

2. **Add SendGrid Configuration:**
   ```env
   # SendGrid Email Service
   SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   SENDGRID_FROM_EMAIL=brocharles001@gmail.com
   ```

3. **Save the file**

#### For Production (Vercel):

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/dashboard
   - Select your portfolio project

2. **Add Environment Variables:**
   - Go to **Settings** → **Environment Variables**
   - Click **Add New**

3. **Add Variables:**
   ```
   Name:  SENDGRID_API_KEY
   Value: SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
   
   ```
   Name:  SENDGRID_FROM_EMAIL
   Value: brocharles001@gmail.com
   ```

4. **Save and Redeploy:**
   - Click "Save"
   - Go to **Deployments** tab
   - Redeploy latest deployment to apply changes

---

### Step 5: Test Contact Form (5 minutes)

#### Local Testing:

1. **Start Development Server:**
   ```bash
   npm run dev
   ```

2. **Open Contact Form:**
   - Visit: http://localhost:3001/contact
   - Or click "Contact" in navigation

3. **Submit Test Message:**
   ```
   Name:    Test User
   Email:   your-personal-email@example.com (use your real email)
   Subject: Testing contact form
   Message: This is a test message to verify SendGrid integration.
   ```

4. **Verify Emails:**
   - Check `brocharles001@gmail.com` → Should receive admin notification
   - Check `your-personal-email@example.com` → Should receive confirmation
   - **Wait:** Emails may take 1-2 minutes to arrive

5. **Check Browser Console:**
   - Press F12 → Console tab
   - Look for: `"Email sent successfully to admin"`
   - No errors should appear

#### Production Testing (After Deployment):

1. **Visit Live Site:**
   - Go to your production URL
   - Navigate to Contact page

2. **Submit Real Test:**
   - Use your actual email
   - Submit a test message
   - Verify both emails arrive

3. **Monitor SendGrid Dashboard:**
   - Go to **Activity** → **Email Activity**
   - See sent emails in real-time
   - Check delivery status

---

## 🔍 Troubleshooting

### Issue: "Email sending error" in logs

**Cause:** API key not configured or invalid

**Solutions:**
1. Verify API key is correct in `.env.local`
2. Check for extra spaces or line breaks
3. Ensure SendGrid package is installed: `npm install @sendgrid/mail`
4. Restart dev server after adding `.env.local`

### Issue: Sender email not verified

**Error:** `The from address does not match a verified Sender Identity`

**Solutions:**
1. Complete Step 2: Verify sender email
2. Wait 5-10 minutes after verification
3. Check sender email matches exactly in `.env.local`
4. Try domain authentication instead of single sender

### Issue: Emails not arriving

**Possible Causes:**
1. Check spam/junk folder
2. Verify sender email in SendGrid
3. Check SendGrid activity dashboard for delivery status
4. Verify email quota (free tier: 100 emails/day)

### Issue: "Invalid API key"

**Solutions:**
1. Create a new API key (old one may have been revoked)
2. Ensure API key has "Mail Send" permission
3. Check for typos when copying API key
4. Verify no extra characters or spaces

---

## 📊 SendGrid Free Tier Limits

**What You Get for Free:**
- ✅ 100 emails per day
- ✅ Single sender verification
- ✅ Email activity tracking
- ✅ Basic analytics
- ✅ Email validation API
- ✅ No credit card required

**Usage Estimates:**
- Contact form submissions: ~5-20 per day
- Each submission sends 2 emails (admin + user)
- You'll use ~10-40 emails per day
- **Well within free tier!** ✅

**Upgrade If Needed:**
- Essentials Plan: $19.95/month (50,000 emails/month)
- Only needed if you get 100+ contact submissions daily

---

## 🎯 Email Templates

### Admin Notification Email (Already Implemented)

**What You'll Receive:**
```
Subject: Portfolio Contact: [User's Subject]
From: noreply@charlesjasema.com
Reply-To: user@example.com

HTML Email with:
- User's name and email (clickable)
- Service requested (if selected)
- Subject line
- Full message
- Submission timestamp
- Masked IP address
```

### User Confirmation Email (Already Implemented)

**What Users Receive:**
```
Subject: Thank you for contacting Charles Jasema
From: brocharles001@gmail.com

HTML Email with:
- Personal greeting
- Confirmation of message receipt
- Preview of their message
- Your contact information
- Professional branding
```

---

## 🚀 Next Steps After Setup

### Immediate:
1. ✅ Complete SendGrid setup (30 minutes)
2. ✅ Test contact form locally
3. ✅ Add API key to Vercel
4. ✅ Test on production

### Optional Enhancements:
- **Custom Domain:** Set up `noreply@charlesjasema.com`
- **Email Templates:** Create branded templates in SendGrid
- **Analytics:** Monitor email open rates
- **Webhooks:** Track email bounces and spam reports
- **Lists:** Collect emails for newsletter (separate setup)

---

## 📞 Quick Reference

### Important Links:
```
SendGrid Dashboard:     https://app.sendgrid.com
API Keys:               https://app.sendgrid.com/settings/api_keys
Sender Authentication:  https://app.sendgrid.com/settings/sender_auth
Email Activity:         https://app.sendgrid.com/email_activity
Documentation:          https://docs.sendgrid.com
```

### Environment Variables:
```env
SENDGRID_API_KEY=SG.xxxxxx...
SENDGRID_FROM_EMAIL=brocharles001@gmail.com
```

### Test Commands:
```bash
# Start dev server
npm run dev

# Visit contact form
http://localhost:3001/contact

# Check logs
# Terminal will show: "Email sent successfully to admin"
```

---

## ✅ Checklist

**Setup:**
- [ ] Created SendGrid account
- [ ] Verified email address
- [ ] Created API key with Mail Send permission
- [ ] Copied API key (starts with SG.)
- [ ] Added `SENDGRID_API_KEY` to `.env.local`
- [ ] Added `SENDGRID_FROM_EMAIL` to `.env.local`
- [ ] Restarted development server

**Testing:**
- [ ] Submitted test message via contact form
- [ ] Received admin notification email
- [ ] Received user confirmation email
- [ ] No errors in browser console
- [ ] No errors in terminal logs
- [ ] Verified emails in SendGrid Activity dashboard

**Production:**
- [ ] Added environment variables to Vercel
- [ ] Redeployed site
- [ ] Tested contact form on live site
- [ ] Verified emails arrive in production

---

## 🎉 You're Done!

Once completed, your contact form will be fully functional and professional.

**Remember:**
- Keep API key secure - never commit to Git
- Monitor SendGrid dashboard for delivery issues
- Free tier is sufficient for portfolio contact forms
- Upgrade only if you exceed 100 emails/day

**Questions?** Check SendGrid documentation or support.

---

**Created:** January 2025  
**Status:** Ready to implement ✅  
**Estimated Setup Time:** 30 minutes
