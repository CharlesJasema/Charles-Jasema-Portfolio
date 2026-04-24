# Setup Guide: Analytics & Donations

**Status**: ✅ Code Implemented - Just Need Your Account IDs  
**Time Required**: 1-2 hours  
**Difficulty**: Easy - Just follow the steps

---

## 🎉 What's Already Done

I've implemented the complete code for:
- ✅ Google Analytics tracking
- ✅ Download tracking
- ✅ Search tracking
- ✅ Donation buttons (Mobile Money + PayPal)
- ✅ Support page (/support)
- ✅ Analytics dashboard integration

**All you need to do**: Create accounts and add your IDs!

---

## Step 1: Google Analytics Setup (30 minutes)

### Create Account
1. Go to: https://analytics.google.com
2. Click "Start measuring"
3. Account name: "Charles Jasema Portfolio"
4. Click "Next"

### Create Property
1. Property name: "Charles Jasema Website"
2. Time zone: "Uganda (GMT+3)"
3. Currency: "Ugandan Shilling (UGX)"
4. Click "Next"

### Set Up Data Stream
1. Select "Web"
2. Website URL: `http://localhost:3001` (for testing) or your live domain
3. Stream name: "Charles Jasema Portfolio"
4. Click "Create stream"

### Get Your Measurement ID
1. You'll see a Measurement ID like: `G-XXXXXXXXXX`
2. **Copy this ID** - you'll need it next

### Add to Your Website
1. Create file: `.env.local` in your project root
2. Add this line:
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
   (Replace `G-XXXXXXXXXX` with your actual ID)
3. Save the file
4. Restart your dev server: `npm run dev`

### Test It Works
1. Open http://localhost:3001
2. Go to Google Analytics dashboard
3. Click "Realtime" in left sidebar
4. You should see yourself as an active user!

---

## Step 2: Flutterwave Setup (Mobile Money) (1 hour)

### Create Account
1. Go to: https://flutterwave.com/ug
2. Click "Get Started"
3. Select "Uganda"
4. Enter details:
   - Business name: Charles Jasema Music Ministry
   - Email: brocharles001@gmail.com
   - Phone: +256785446877
5. Verify email and phone

### Complete KYC (Know Your Customer)
1. Log in to dashboard
2. Go to "Settings" → "KYC"
3. Upload:
   - National ID or Passport
   - Proof of address (utility bill)
4. Add bank account details:
   - Bank name
   - Account number
   - Account name: Charles Jasema
5. Submit for review (takes 1-2 business days)

### Create Payment Link
1. After KYC approval, log in to dashboard
2. Click "Payment Links" in left sidebar
3. Click "Create Payment Link"
4. Enter details:
   - Name: "Support My Music Ministry"
   - Description: "Your donation helps me create more worship music and spread the gospel"
   - Amount: Select "Let customer choose" (or set minimum like UGX 5,000)
5. Enable payment methods:
   - ✅ MTN Mobile Money
   - ✅ Airtel Money
   - ✅ Bank Transfer
   - ✅ Card Payment
6. Customize:
   - Add your logo (optional)
   - Choose colors (optional)
7. Click "Create"
8. **Copy the payment link** - looks like: `https://flutterwave.com/pay/xxxxxxxxx`

### Add to Your Website
1. Open `.env.local` file
2. Add this line:
   ```
   NEXT_PUBLIC_FLUTTERWAVE_LINK=https://flutterwave.com/pay/xxxxxxxxx
   ```
   (Replace with your actual link)
3. Save the file
4. Restart dev server

### Test It Works
1. Open http://localhost:3001/support
2. Click "Donate via Mobile Money"
3. Should open your Flutterwave payment page
4. Try a test donation (you can refund it later)

---

## Step 3: PayPal Setup (International Donations) (30 minutes)

### Create Business Account
1. Go to: https://www.paypal.com/ug/business
2. Click "Sign Up"
3. Select "Business Account"
4. Enter details:
   - Business name: Charles Jasema Music Ministry
   - Email: brocharles001@gmail.com
   - Phone: +256785446877
5. Verify email

### Create Donate Button
1. Log in to PayPal
2. Go to: https://www.paypal.com/donate/buttons
3. Click "Create Donation Button"
4. Enter details:
   - Organization name: Charles Jasema Music Ministry
   - Donation type: One-time or Monthly (choose both)
   - Currency: USD (for international) or UGX
5. Customize button:
   - Button text: "Donate"
   - Button color: Choose your preference
6. Click "Create Button"
7. **Copy the button link** - looks like: `https://www.paypal.com/donate/?hosted_button_id=XXXXXXXXX`

### Add to Your Website
1. Open `.env.local` file
2. Add this line:
   ```
   NEXT_PUBLIC_PAYPAL_LINK=https://www.paypal.com/donate/?hosted_button_id=XXXXXXXXX
   ```
   (Replace with your actual link)
3. Save the file
4. Restart dev server

### Test It Works
1. Open http://localhost:3001/support
2. Click "Donate via PayPal"
3. Should open your PayPal donation page
4. Try a test donation

---

## Step 4: Update Mobile Money & Bank Details

### Edit Donation Component
1. Open: `src/components/DonationSection.tsx`
2. Find the `donationConfig` object (around line 20)
3. Update your details:

```typescript
const donationConfig = {
  // ... (Flutterwave and PayPal links are from .env.local)
  
  // Update these with your actual details:
  mobileMoneyDetails: {
    mtn: {
      name: 'MTN Mobile Money',
      number: '+256-785-446877', // Your MTN number
      accountName: 'Charles Jasema',
    },
    airtel: {
      name: 'Airtel Money',
      number: '+256-745-063600', // Your Airtel number
      accountName: 'Charles Jasema',
    },
  },
  
  bankDetails: {
    bankName: 'Your Bank Name', // e.g., 'Stanbic Bank Uganda'
    accountNumber: 'Your Account Number', // Your actual account number
    accountName: 'Charles Jasema',
    swiftCode: 'Your SWIFT Code', // For international transfers
  },
};
```

4. Save the file

---

## Step 5: Test Everything

### Test Analytics
1. Open http://localhost:3001
2. Navigate to different pages
3. Search for lyrics
4. Download a lyric
5. Go to Google Analytics → Realtime
6. You should see all your actions tracked!

### Test Donations
1. Open http://localhost:3001/support
2. Click "Donate via Mobile Money"
   - Should open Flutterwave page
   - Try a small test donation
3. Click "Donate via PayPal"
   - Should open PayPal page
   - Try a small test donation
4. Check your dashboards:
   - Flutterwave: https://dashboard.flutterwave.com
   - PayPal: https://www.paypal.com

### Test Tracking
1. Download a lyric
2. Go to Google Analytics
3. Click "Events" in left sidebar
4. You should see "download" event!

---

## 📊 What You'll See in Dashboards

### Google Analytics Dashboard
After a few days, you'll see:
- Total visitors
- Page views
- Geographic location (countries, cities)
- Traffic sources (Google, Facebook, Direct)
- Most popular pages
- Download counts
- Search queries
- Real-time visitors

### Flutterwave Dashboard
You'll see:
- Total donations received
- Number of donors
- Payment methods used (MTN, Airtel, Card)
- Transaction history
- Payout status
- Revenue reports

### PayPal Dashboard
You'll see:
- Total donations received
- Donor information (if they provide it)
- Transaction history
- Payout status
- Currency conversions

---

## 🎯 Your Complete .env.local File

After completing all steps, your `.env.local` file should look like this:

```env
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Flutterwave (Mobile Money)
NEXT_PUBLIC_FLUTTERWAVE_LINK=https://flutterwave.com/pay/xxxxxxxxx

# PayPal (International)
NEXT_PUBLIC_PAYPAL_LINK=https://www.paypal.com/donate/?hosted_button_id=XXXXXXXXX
```

**Important**: Never commit `.env.local` to Git! It's already in `.gitignore`.

---

## 🚀 After Setup

### Share Your Support Page
1. Your support page is at: `/support`
2. Share this link on:
   - Instagram bio
   - Twitter/X bio
   - Facebook about
   - TikTok bio
   - YouTube description
   - All social media

### Add to Other Pages
The donation section is already added to:
- ✅ Support page (`/support`)
- You can also add it to:
  - Music page (after song list)
  - Lyrics page (after downloading)
  - Homepage (bottom section)

### Monitor Your Analytics
1. Check Google Analytics daily
2. See which pages are popular
3. Track downloads
4. Understand your audience
5. Make data-driven decisions

### Thank Your Donors
1. Check Flutterwave/PayPal daily
2. Note donor information (if provided)
3. Send thank you messages
4. Acknowledge support on social media

---

## ✅ Checklist

### Google Analytics
- [ ] Created Google Analytics account
- [ ] Got Measurement ID
- [ ] Added to `.env.local`
- [ ] Restarted dev server
- [ ] Tested - saw myself in Realtime

### Flutterwave
- [ ] Created Flutterwave account
- [ ] Completed KYC verification
- [ ] Created payment link
- [ ] Added to `.env.local`
- [ ] Updated mobile money details in code
- [ ] Tested donation

### PayPal
- [ ] Created PayPal business account
- [ ] Created donate button
- [ ] Got donation link
- [ ] Added to `.env.local`
- [ ] Updated bank details in code
- [ ] Tested donation

### Final Steps
- [ ] All environment variables added
- [ ] Dev server restarted
- [ ] All features tested
- [ ] Support page working
- [ ] Ready to deploy!

---

## 🆘 Troubleshooting

### Analytics Not Tracking
**Problem**: Don't see visitors in Google Analytics  
**Solution**:
1. Check `.env.local` has correct Measurement ID
2. Restart dev server: `npm run dev`
3. Clear browser cache
4. Wait 24 hours (data can be delayed)

### Donation Button Not Working
**Problem**: Button doesn't open payment page  
**Solution**:
1. Check `.env.local` has correct payment link
2. Restart dev server
3. Check link format is correct
4. Test link directly in browser

### Mobile Money Details Not Showing
**Problem**: Don't see MTN/Airtel numbers  
**Solution**:
1. Check `src/components/DonationSection.tsx`
2. Verify you updated the `donationConfig` object
3. Save file and refresh browser

---

## 📞 Support Resources

### Google Analytics
- Help: https://support.google.com/analytics
- Dashboard: https://analytics.google.com

### Flutterwave
- Help: https://support.flutterwave.com
- Email: support@flutterwave.com
- Phone: +256 800 100 100
- Dashboard: https://dashboard.flutterwave.com

### PayPal
- Help: https://www.paypal.com/ug/smarthelp/home
- Phone: +256 800 200 200
- Dashboard: https://www.paypal.com

---

## 🎉 Success!

After completing this setup, you'll have:
- ✅ Google Analytics tracking all visitors
- ✅ Download tracking for lyrics
- ✅ Search tracking
- ✅ Mobile Money donations (MTN, Airtel)
- ✅ International donations (PayPal)
- ✅ Professional support page
- ✅ Complete analytics dashboard

**Next Step**: Deploy your website and start accepting donations!

---

**Status**: 🟢 Ready to Setup  
**Time**: 1-2 hours total  
**Cost**: FREE (only transaction fees when you receive donations)

**Start now! Follow the steps above and you'll be done in no time.** 🚀

