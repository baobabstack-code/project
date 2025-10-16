#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');
const srcDir = path.join(projectRoot, 'src');

function checkMissingImages() {
  console.log('🔍 Checking for missing images...');
  
  const imagePaths = [];
  
  function scanForImageReferences(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        scanForImageReferences(filePath);
      } else if (file.match(/\.(tsx?|jsx?)$/)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const imageMatches = content.match(/['"`]\/[^'"`]*\.(jpg|jpeg|png|webp|svg|gif)['"`]/g);
        
        if (imageMatches) {
          imageMatches.forEach(match => {
            const imagePath = match.slice(1, -1); // Remove quotes
            imagePaths.push(imagePath);
          });
        }
      }
    });
  }
  
  scanForImageReferences(srcDir);
  
  const missingImages = [];
  imagePaths.forEach(imagePath => {
    const fullPath = path.join(publicDir, imagePath);
    if (!fs.existsSync(fullPath)) {
      missingImages.push(imagePath);
    }
  });
  
  if (missingImages.length > 0) {
    console.log('❌ Missing images found:');
    missingImages.forEach(img => console.log(`   - ${img}`));
  } else {
    console.log('✅ All referenced images exist');
  }
  
  return missingImages;
}

function checkBundleSize() {
  console.log('📦 Checking bundle configuration...');
  
  const packageJsonPath = path.join(projectRoot, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Check for heavy dependencies
  const heavyDeps = ['moment', 'lodash', 'material-ui'];
  const foundHeavy = [];
  
  Object.keys(packageJson.dependencies || {}).forEach(dep => {
    if (heavyDeps.some(heavy => dep.includes(heavy))) {
      foundHeavy.push(dep);
    }
  });
  
  if (foundHeavy.length > 0) {
    console.log('⚠️  Heavy dependencies detected:');
    foundHeavy.forEach(dep => console.log(`   - ${dep}`));
    console.log('   Consider lighter alternatives');
  } else {
    console.log('✅ No heavy dependencies detected');
  }
}

function checkNextConfig() {
  console.log('⚙️  Checking Next.js configuration...');
  
  const nextConfigPath = path.join(projectRoot, 'next.config.js');
  const babelrcPath = path.join(projectRoot, '.babelrc');
  
  if (fs.existsSync(babelrcPath)) {
    console.log('⚠️  Custom Babel config detected - may slow down builds');
    console.log('   Consider removing .babelrc to use SWC');
  } else {
    console.log('✅ SWC compiler enabled (no .babelrc found)');
  }
  
  if (fs.existsSync(nextConfigPath)) {
    const config = fs.readFileSync(nextConfigPath, 'utf8');
    
    if (!config.includes('reactStrictMode')) {
      console.log('⚠️  React Strict Mode not enabled');
    } else {
      console.log('✅ React Strict Mode enabled');
    }
    
    if (!config.includes('formats:')) {
      console.log('⚠️  Modern image formats not configured');
    } else {
      console.log('✅ Modern image formats configured');
    }
  }
}

function main() {
  console.log('🚀 Running Baobab Stack Health Check\n');
  
  const issues = [];
  
  const missingImages = checkMissingImages();
  if (missingImages.length > 0) issues.push('Missing images');
  
  console.log('');
  checkBundleSize();
  
  console.log('');
  checkNextConfig();
  
  console.log('\n📊 Summary:');
  if (issues.length === 0) {
    console.log('✅ All checks passed!');
  } else {
    console.log('❌ Issues found:');
    issues.forEach(issue => console.log(`   - ${issue}`));
  }
}

main();