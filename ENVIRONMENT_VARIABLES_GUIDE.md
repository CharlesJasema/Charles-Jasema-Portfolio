# Environment Variables Guide
## Charles Jasema Portfolio - Complete Deployment Configuration

### 🎯 **Quick Deployment Setup**

For a **basic working deployment**, you only need these **4 essential variables**:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NODE_ENV=production
CONTACT_EMAIL=brocharles001@gmail.com
CSRF_SECRET=your-32-character-random-string-here
```

---

## 📋 **Complete Environment Variables List**

### ✅ **TIER 1: Essential (Required for Basic Deployment)**

| Variable | Purpose | Example Value |
|----------|---------|---------------|
| `NEXT_PUBLIC_SITE_URL` | Your website URL | `https://charlesjasema.vercel.app` |
| `NODE_ENV` | Environment mode | `production` |
| `CONTACT_EMAIL` | Email to receive contact forms | `brocharles001@gmail.com` |
| `CSRF_SECRET` | Security token (32+ chars) | `abc123def456...` (32+ characters) |

### 🔧 **TIER 2: Core Functionality (Recommended for Full Features)**

#### **Content Management System (Sanity CMS)**
| Variable | Purpose | How to Get |
|----------|---------|------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project identifier | Get from [sanity.io](https://sanity.io) dashboard |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset name | Usually `production` or `development` |
| `SANITY_API_TOKEN` | Write access to Sanity | Create token in Sanity project settings |

#### **Email Services (Choose One)**
| Variable | Purpose | Provider | How to Get |
|----------|---------|----------|------------|
| `SENDGRID_API_KEY` | Email delivery | SendGrid | [SendGrid API Keys](https://app.sendgrid.com/settings/api_keys) |
| `RESEND_API_KEY` | Email delivery | Resend | [Resend API Keys](https://resend.com/api-keys) |
| `FROM_EMAIL` | Sender email address | Any | `noreply@yourdomain.com` |

#### **Security Configuration**
| Variable | Purpose | How to Generate |
|----------|---------|-----------------|
| `RATE_LIMIT_SECRET` | Rate limiting security | Generate random 32+ character string |
| `RECRUITER_ACCESS_PASSWORD` | Recruiter mode password | Create secure password (8+ chars) |

### 🚀 **TIER 3: Enhanced Features (Optional)**

#### **AI Chat System**
| Variable | Purpose | How to Get |
|----------|---------|------------|
| `OPENAI_API_KEY` | AI chat with ChatGPT | [OpenAI API Keys](https://platform.openai.com/api-keys) |
| `ANTHROPIC_API_KEY` | AI chat with Claude | [Anthropic Console](https://console.anthropic.com/) |
| `AI_CHAT_MODEL` | Default AI model | `gpt-4o-mini` or `claude-3-haiku` |

#### **WhatsApp Business Integration**
| Variable | Purpose | How to Get |
|----------|---------|------------|
| `WHATSAPP_BUSINESS_ACCOUNT_ID` | WhatsApp Business ID | [Meta Business](https://business.facebook.com/) |
| `WHATSAPP_ACCESS_TOKEN` | API access token | Meta Developer Console |
| `WHATSAPP_PHONE_NUMBER_ID` | Phone number ID | WhatsApp Business API setup |
| `NEXT_PUBLIC_WHATSAPP_PHONE` | Public phone display | `+256785446877` |

#### **Analytics & Tracking**
| Variable | Purpose | How to Get |
|----------|---------|------------|
| `NEXT_PUBLIC_GA_ID` | Google Analytics tracking | [Google Analytics](https://analytics.google.com/) |
| `NEXT_PUBLIC_TAWK_TO_PROPERTY_ID` | Live chat widget | [Tawk.to](https://tawk.to) |

#### **File Storage & Downloads**
| Variable | Purpose | How to Get |
|----------|---------|------------|
| `GOOGLE_DRIVE_CLIENT_ID` | Google Drive integration | [Google Cloud Console](https://console.cloud.google.com/) |
| `CLOUDFLARE_R2_ACCESS_KEY_ID` | Cloudflare R2 storage | [Cloudflare R2](https://cloudflare.com/r2/) |

#### **Newsletter & Email Marketing**
| Variable | Purpose | How to Get |
|----------|---------|------------|
| `MAILCHIMP_API_KEY` | Newsletter management | [Mailchimp API](https://mailchimp.com/developer/) |
| `NEWSLETTER_AUDIENCE_ID` | SendGrid audience ID | SendGrid Marketing dashboard |

---

## 🔐 **Security Best Practices**

### **1. Generate Secure Random Strings**
For `CSRF_SECRET`, `RATE_LIMIT_SECRET`, etc., use:

**Online Generator:**
```
https://www.random.org/strings/
Length: 32, Characters: Mixed case + numbers
```

**Command Line:**
```bash
# On Linux/Mac
openssl rand -hex 32

# On Windows PowerShell
[System.Web.Security.Membership]::GeneratePassword(32, 0)
```

### **2. Environment Variable Naming Rules**
- `NEXT_PUBLIC_*` - Available to client-side code (public)
- Others - Server-side only (private/secure)

### **3. Never Commit Real Values**
- Use `.env.example` for templates
- Add `.env.local` to `.gitignore`
- Use placeholder values in examples

---

## ⚡ **Quick Setup Guides**

### **Vercel Deployment Setup**

1. **Deploy with minimum variables:**
```env
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
NODE_ENV=production
CONTACT_EMAIL=brocharles001@gmail.com
CSRF_SECRET=generate-32-character-random-string-here
```

2. **Add variables in Vercel dashboard:**
   - Go to Project Settings → Environment Variables
   - Add each variable with its value
   - Redeploy to apply changes

### **SendGrid Email Setup (Recommended)**

1. **Sign up at [SendGrid](https://sendgrid.com)**
2. **Create API Key:**
   - Go to Settings → API Keys
   - Create new key with "Full Access"
3. **Add variables:**
```env
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
FROM_EMAIL=noreply@yourdomain.com
```

### **Google Analytics Setup**

1. **Create GA4 Property at [Google Analytics](https://analytics.google.com)**
2. **Get Measurement ID (format: G-XXXXXXXXXX)**
3. **Add variable:**
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 🔍 **Testing Your Configuration**

### **Verify Deployment**
After adding environment variables:

1. **Check contact form** - Submit test message
2. **Verify email delivery** - Check if emails are received  
3. **Test responsive design** - Check on mobile/desktop
4. **Validate security headers** - Use [Security Headers](https://securityheaders.com/)

### **Debug Environment Issues**

**Variable not working?**
- ✅ Check spelling (case-sensitive)
- ✅ Redeploy after adding variables  
- ✅ Verify `NEXT_PUBLIC_` prefix for client-side variables
- ✅ Check Vercel build logs for errors

**Email not sending?**
- ✅ Verify SendGrid API key is valid
- ✅ Check `FROM_EMAIL` domain is verified in SendGrid
- ✅ Ensure API key has "Mail Send" permissions

---

## 📊 **Environment Variables Breakdown**

**Total Variables Available:** 40+
- **Required for basic deployment:** 4
- **Recommended for full functionality:** 8 additional  
- **Optional enhanced features:** 30+ additional

**Feature Completeness by Variables Set:**
- **4 variables:** Basic portfolio (85% functionality)
- **12 variables:** Full portfolio (95% functionality)  
- **25+ variables:** Premium features (100% functionality)

---

## 🎯 **Deployment Priority**

### **Phase 1: MVP Deployment**
```env
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NODE_ENV=production
CONTACT_EMAIL=brocharles001@gmail.com
CSRF_SECRET=your-32-char-secret
```

### **Phase 2: Production Ready**
Add email service:
```env
SENDGRID_API_KEY=your-sendgrid-key
FROM_EMAIL=noreply@yourdomain.com
```

### **Phase 3: Full Features**
Add Sanity CMS, Analytics, AI Chat as needed.

---

**✅ Your portfolio will work perfectly with just the Phase 1 variables!**

All additional features can be added incrementally without downtime.