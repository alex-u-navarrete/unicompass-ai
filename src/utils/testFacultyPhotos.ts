// Test script to verify faculty photo URLs
// Run this in the browser console to check photo status

import { verifyAllFacultyPhotos, FACULTY_PHOTOS } from './facultyPhotoVerifier';

export async function testFacultyPhotos() {
  console.log('🔍 Testing CSUSB Faculty Photo URLs...');
  console.log('=====================================');
  
  const results = await verifyAllFacultyPhotos();
  
  let validCount = 0;
  let invalidCount = 0;
  
  results.forEach(result => {
    if (result.isValid) {
      validCount++;
      console.log(`✅ ${result.facultyName}: Photo loaded successfully`);
    } else {
      invalidCount++;
      console.log(`❌ ${result.facultyName}: Photo failed to load`);
      if (result.fallbackUrl) {
        console.log(`   Fallback URL: ${result.fallbackUrl}`);
      }
    }
  });
  
  console.log('=====================================');
  console.log(`📊 Summary: ${validCount} valid, ${invalidCount} invalid photos`);
  console.log(`📈 Success Rate: ${((validCount / results.length) * 100).toFixed(1)}%`);
  
  return results;
}

// Function to test individual faculty photo
export async function testIndividualPhoto(facultyName: string) {
  console.log(`🔍 Testing photo for: ${facultyName}`);
  
  const facultyPhotos = FACULTY_PHOTOS[facultyName as keyof typeof FACULTY_PHOTOS];
  
  if (!facultyPhotos) {
    console.log(`❌ No photo data found for: ${facultyName}`);
    return false;
  }
  
  console.log(`Primary URL: ${facultyPhotos.primary}`);
  console.log(`Fallback URL: ${facultyPhotos.fallback}`);
  
  // Test primary URL
  try {
    const primaryResponse = await fetch(facultyPhotos.primary, { method: 'HEAD' });
    console.log(`Primary URL Status: ${primaryResponse.ok ? '✅ Valid' : '❌ Invalid'}`);
    
    if (primaryResponse.ok) {
      return true;
    }
  } catch (error) {
    console.log('Primary URL Error:', error);
  }
  
  // Test fallback URL
  try {
    const fallbackResponse = await fetch(facultyPhotos.fallback, { method: 'HEAD' });
    console.log(`Fallback URL Status: ${fallbackResponse.ok ? '✅ Valid' : '❌ Invalid'}`);
    
    return fallbackResponse.ok;
  } catch (error) {
    console.log('Fallback URL Error:', error);
    return false;
  }
}

// Function to get all faculty names
export function getAllFacultyNames(): string[] {
  return Object.keys(FACULTY_PHOTOS);
}

// Function to display photo URLs for debugging
export function displayPhotoUrls() {
  console.log('📸 CSUSB Faculty Photo URLs:');
  console.log('==============================');
  
  Object.entries(FACULTY_PHOTOS).forEach(([name, photos]) => {
    console.log(`\n👤 ${name}:`);
    console.log(`   Primary: ${photos.primary}`);
    console.log(`   Fallback: ${photos.fallback}`);
  });
}

// Export for use in browser console
if (typeof window !== 'undefined') {
  (window as any).testFacultyPhotos = testFacultyPhotos;
  (window as any).testIndividualPhoto = testIndividualPhoto;
  (window as any).getAllFacultyNames = getAllFacultyNames;
  (window as any).displayPhotoUrls = displayPhotoUrls;
} 