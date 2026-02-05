/**
 * Validates if a URL is a valid image URL
 * @param {string} url - The URL to validate
 * @returns {boolean} - Whether the URL is a valid image URL
 */
export const isValidImageUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  
  // Check if it's a valid URL
  try {
    new URL(url);
  } catch {
    return false;
  }
  
  // Check if URL ends with common image extensions or contains image indicators
  const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)(\?.*)?$/i;
  const isImageUrl = imageExtensions.test(url);
  
  // Also allow URLs from common image hosting services
  const imageHosts = [
    'imgur.com',
    'i.imgur.com',
    'cloudinary.com',
    'res.cloudinary.com',
    'unsplash.com',
    'images.unsplash.com',
    'ibb.co',
    'i.ibb.co',
    'postimg.cc',
    'i.postimg.cc',
    'githubusercontent.com',
    'raw.githubusercontent.com',
    'gyazo.com',
    'i.gyazo.com',
    'prnt.sc',
    'prntscr.com',
    'cdn.discordapp.com',
    'media.discordapp.net'
  ];
  
  const hasImageHost = imageHosts.some(host => url.toLowerCase().includes(host));
  
  return isImageUrl || hasImageHost;
};

/**
 * Checks image size by loading it
 * @param {string} url - The image URL
 * @param {number} maxSizeMB - Maximum size in MB (default: 5)
 * @returns {Promise<{valid: boolean, size?: number, error?: string}>}
 */
export const checkImageSize = (url, maxSizeMB = 5) => {
  return new Promise((resolve) => {
    if (!url) {
      resolve({ valid: false, error: 'No URL provided' });
      return;
    }

    const img = new Image();
    let sizeChecked = false;
    
    // Set a timeout in case the image takes too long to load
    const timeout = setTimeout(() => {
      if (!sizeChecked) {
        sizeChecked = true;
        resolve({ valid: false, error: 'Image load timeout' });
      }
    }, 10000);

    img.onload = () => {
      clearTimeout(timeout);
      if (sizeChecked) return;
      sizeChecked = true;
      
      // Create a canvas to check file size approximation
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      // Convert to data URL to estimate size
      try {
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        const sizeInBytes = Math.round((dataUrl.length * 3) / 4);
        const sizeInMB = sizeInBytes / (1024 * 1024);
        
        if (sizeInMB > maxSizeMB) {
          resolve({ 
            valid: false, 
            size: sizeInMB, 
            error: `Image too large (${sizeInMB.toFixed(2)}MB). Maximum allowed: ${maxSizeMB}MB` 
          });
        } else {
          resolve({ valid: true, size: sizeInMB });
        }
      } catch (error) {
        // If canvas fails (e.g., cross-origin), assume valid if dimensions are reasonable
        const isReasonableSize = img.width <= 4096 && img.height <= 4096;
        if (isReasonableSize) {
          resolve({ valid: true, size: 0 });
        } else {
          resolve({ 
            valid: false, 
            error: 'Image dimensions too large. Maximum: 4096x4096 pixels' 
          });
        }
      }
    };

    img.onerror = () => {
      clearTimeout(timeout);
      if (sizeChecked) return;
      sizeChecked = true;
      resolve({ valid: false, error: 'Failed to load image' });
    };

    // Start loading the image
    img.crossOrigin = 'anonymous';
    img.src = url;
  });
};

/**
 * Validates and checks image URL with size check
 * @param {string} url - The image URL
 * @param {number} maxSizeMB - Maximum size in MB
 * @returns {Promise<{valid: boolean, error?: string}>}
 */
export const validateImageUrl = async (url, maxSizeMB = 5) => {
  // First check if it's a valid image URL format
  if (!isValidImageUrl(url)) {
    return { 
      valid: false, 
      error: 'Invalid image URL. Please provide a direct link to an image (jpg, png, gif, webp, etc.)' 
    };
  }

  // Then check the actual image size
  const sizeCheck = await checkImageSize(url, maxSizeMB);
  return sizeCheck;
};
