import { Image as CanvasImage } from 'react-native-canvas'

/**
 * Binarize an image on a canvas.
 * @param {Object} canvas - The canvas element to draw on.
 * @param {string} uri - The URI of the image to be binarized.
 * @param {number} threshold - The threshold value for binarization (0-255).
 */
export const binarizeImageOnCanvas = async (canvas:any, uri:any, threshold = 128) => {
  if (!canvas || !uri) return;

  const ctx = canvas.getContext('2d');
  const image = new CanvasImage(canvas);
  image.src = uri;

  return new Promise<void>((resolve) => {
    image.addEventListener('load', () => {
      const { width, height } = image;
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(image, 0, 0, width, height);

      // Get pixel data
      const imageData = ctx.getImageData(0, 0, width, height);
      const { data } = imageData;

      // Apply threshold binarization
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        const binColor = avg > threshold ? 255 : 0;
        data[i] = binColor;       // Red channel
        data[i + 1] = binColor;   // Green channel
        data[i + 2] = binColor;   // Blue channel
      }

      // Update canvas with binarized data
      ctx.putImageData(imageData, 0, 0);
      resolve();
    });
  });
};


