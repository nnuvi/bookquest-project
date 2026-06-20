/*
import sharp from 'sharp';

/**
 * Preprocess the image using sharp for server-side processing.
 * Converts the image to grayscale and applies thresholding.
 *//*
const preprocessImage = async (buffer) => {
  try {
    // Convert the image to grayscale and apply a threshold filter
    const preprocessedBuffer = await sharp(buffer)
      .greyscale() // Convert to grayscale
      .threshold(128) // Binarize: Pixels above threshold become white, below become black
      .toBuffer();
    
    return preprocessedBuffer;
  } catch (error) {
    console.error('Error during image preprocessing:', error);
    throw error;
  }
};

export default preprocessImage;*/

  
 