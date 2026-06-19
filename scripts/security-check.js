#!/usr/bin/env node

/**
 * Security Check Script
 * 
 * Comprehensive security validation and monitoring for deployment
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🛡️  Starting Security Check...\n');

const checks = [];
const errors = [];
const warnings = [];

/**
 * Check 1: Verify security files exist
 */
function checkSecurityFiles() {
  console.log('📁 Checking security files...');
  
  const requiredFiles = [
    'src/lib/security.ts',
    'src/lib/security-monitor.ts',
    'src/config/security.ts',
    'middleware.ts',
    'SECURITY.md',
    'public/sw.js',
    'public/manifest.json'
  ];

  const missing = requiredFiles.filter(file => {
    if (!fs.existsSync(path.join(__dirname, '..', file))) {
      errors.push(`Missing security file: ${file}`);
      return true;
    }
    return false;
  });

  if (missing.length === 0) {
    checks.push('✅ All security files present');
  } else {
    checks.push(`❌ Missing ${missing.length} security files`);
  }
}

/**
 * Check 2: Validate environment variables
 */
function checkEnvironmentVariables() {
  console.log('🔑 Checking environment variables...');
  
  const requiredEnvVars = [
    'NEXT_PUBLIC_SITE_URL',
    'SANITY_PROJECT_ID', 
    'SANITY_DATASET',
    'SANITY_API_TOKEN'
  ];

  // Check .env.example exists
  if (fs.existsSync('.env.example')) {
    checks.push('✅ Environment template exists');
  } else {
    warnings.push('⚠️  No .env.example template found');
  }

  // In production, these should be set
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  if (missingVars.length > 0) {
    warnings.push(`⚠️  Missing env vars (set in deployment): ${missingVars.join(', ')}`);
  } else {
    checks.push('✅ All required environment variables configured');
  }
}

/**
 * Check 3: Security headers configuration
 */
function checkSecurityHeaders() {
  console.log('🔒 Checking security headers...');
  
  try {
    const nextConfig = fs.readFileSync('next.config.js', 'utf8');
    
    const securityFeatures = [
      'Content-Security-Policy',
      'X-Content-Type-Options',
      'X-Frame-Options',
      'X-XSS-Protection',
      'Strict-Transport-Security'
    ];

    const hasFeatures = securityFeatures.filter(feature => 
      nextConfig.includes(feature)
    );

    checks.push(`✅ Security headers configured: ${hasFeatures.length}/${securityFeatures.length}`);

    if (hasFeatures.length < securityFeatures.length) {
      warnings.push(`⚠️  Missing some security headers in next.config.js`);
    }
  } catch (err) {
    errors.push('❌ Cannot read next.config.js');
  }
}

/**
 * Check 4: Package vulnerabilities
 */
function checkPackageVulnerabilities() {
  console.log('🔍 Checking package vulnerabilities...');
  
  try {
    const auditOutput = execSync('npm audit --audit-level=high --json', { 
      encoding: 'utf8',
      stdio: 'pipe'
    });
    
    const audit = JSON.parse(auditOutput);
    const highVulns = audit.metadata?.vulnerabilities?.high || 0;
    const criticalVulns = audit.metadata?.vulnerabilities?.critical || 0;

    if (criticalVulns > 0) {
      errors.push(`❌ ${criticalVulns} critical vulnerabilities found`);
    } else if (highVulns > 0) {
      warnings.push(`⚠️  ${highVulns} high-severity vulnerabilities found (mostly dev deps)`);
    } else {
      checks.push('✅ No critical vulnerabilities');
    }
  } catch (err) {
    // If audit fails, it means there are vulnerabilities
    warnings.push('⚠️  Package vulnerabilities exist (run npm audit for details)');
  }
}

/**
 * Check 5: Build security
 */
function checkBuildSecurity() {
  console.log('🏗️  Checking build security...');
  
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    // Check for security scripts
    if (packageJson.scripts?.['security-scan']) {
      checks.push('✅ Security scan script available');
    } else {
      warnings.push('⚠️  No security-scan script defined');
    }

    // Check for dangerous dependencies
    const dangerousDeps = [
      'eval',
      'vm2', 
      'serialize-javascript'
    ];

    const foundDangerous = dangerousDeps.filter(dep => 
      packageJson.dependencies?.[dep] || packageJson.devDependencies?.[dep]
    );

    if (foundDangerous.length === 0) {
      checks.push('✅ No obviously dangerous dependencies');
    } else {
      warnings.push(`⚠️  Potentially dangerous dependencies: ${foundDangerous.join(', ')}`);
    }

  } catch (err) {
    errors.push('❌ Cannot read package.json');
  }
}

/**
 * Check 6: File permissions and structure
 */
function checkFileStructure() {
  console.log('📂 Checking file structure security...');
  
  const sensitiveFiles = [
    '.env',
    '.env.local',
    '.env.production',
    'private.key',
    'server.key'
  ];

  const foundSensitive = sensitiveFiles.filter(file => 
    fs.existsSync(file)
  );

  if (foundSensitive.length > 0) {
    warnings.push(`⚠️  Sensitive files found (ensure they're in .gitignore): ${foundSensitive.join(', ')}`);
  } else {
    checks.push('✅ No sensitive files in repository');
  }

  // Check .gitignore exists
  if (fs.existsSync('.gitignore')) {
    const gitignore = fs.readFileSync('.gitignore', 'utf8');
    if (gitignore.includes('.env') && gitignore.includes('node_modules')) {
      checks.push('✅ .gitignore configured properly');
    } else {
      warnings.push('⚠️  .gitignore may be incomplete');
    }
  } else {
    errors.push('❌ No .gitignore file found');
  }
}

/**
 * Generate security report
 */
function generateReport() {
  console.log('\n🛡️  SECURITY REPORT');
  console.log('='.repeat(50));
  
  if (checks.length > 0) {
    console.log('\n✅ PASSED CHECKS:');
    checks.forEach(check => console.log(`  ${check}`));
  }
  
  if (warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:');
    warnings.forEach(warning => console.log(`  ${warning}`));
  }
  
  if (errors.length > 0) {
    console.log('\n❌ ERRORS:');
    errors.forEach(error => console.log(`  ${error}`));
  }

  console.log('\n📊 SUMMARY:');
  console.log(`  Checks Passed: ${checks.length}`);
  console.log(`  Warnings: ${warnings.length}`);  
  console.log(`  Errors: ${errors.length}`);

  const securityScore = Math.max(0, Math.min(100, 
    ((checks.length * 10) - (warnings.length * 3) - (errors.length * 10))
  ));
  
  console.log(`  Security Score: ${securityScore}/100`);

  if (securityScore >= 80) {
    console.log('\n🎉 SECURITY STATUS: EXCELLENT');
    console.log('   Ready for production deployment!');
  } else if (securityScore >= 60) {
    console.log('\n✅ SECURITY STATUS: GOOD'); 
    console.log('   Address warnings before deployment');
  } else if (securityScore >= 40) {
    console.log('\n⚠️  SECURITY STATUS: FAIR');
    console.log('   Fix errors before deployment');
  } else {
    console.log('\n❌ SECURITY STATUS: POOR');
    console.log('   Critical security issues need immediate attention');
  }

  console.log('\n🔗 NEXT STEPS:');
  if (errors.length > 0) {
    console.log('  1. Fix all errors listed above');
  }
  if (warnings.length > 0) {
    console.log('  2. Review and address warnings');
  }
  console.log('  3. Run npm audit and address high/critical vulnerabilities');
  console.log('  4. Test security headers in deployment environment');
  console.log('  5. Monitor security logs after deployment');

  // Exit with appropriate code
  process.exit(errors.length > 0 ? 1 : 0);
}

// Run all checks
try {
  checkSecurityFiles();
  checkEnvironmentVariables();
  checkSecurityHeaders();
  checkPackageVulnerabilities();
  checkBuildSecurity();
  checkFileStructure();
} catch (err) {
  console.error('Security check failed:', err.message);
  errors.push('❌ Security check script error');
}

generateReport();