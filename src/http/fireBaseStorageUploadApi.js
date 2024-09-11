import imageCompression from 'browser-image-compression';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

export async function uploadImage(file, imgType) {
  const storage = getStorage();
  const uniqueName = uuidv4() + '-' + file.name;
  const paths = imagePaths(imgType);
  const results = [];

  async function uploadSingleImage(file, path, imgType) {
    const storageRef = ref(storage, path + uniqueName);
  
    let compressedFile = file;
    let quality = getQuality(imgType);
    let options = {
      maxSizeMB: getMaxSize(imgType),
      maxWidthOrHeight: getMaxWidthOrHeight(imgType),
      initialQuality: quality,
      useWebWorker: true,
    };
  
    try {
      let initialSizeMB = file.size / 1024 / 1024; // початковий розмір файлу в МБ
  
      if (imgType === 'productImgBig') {
        const maxSizeMB = 2;
        const minSizeMB = 1.5;
  
        if (initialSizeMB > maxSizeMB) {
          while (initialSizeMB > maxSizeMB) {
            // Зменшити якість, якщо розмір зображення перевищує максимальний розмір
            options.initialQuality = quality;
            
            compressedFile = await imageCompression(file, options);
            initialSizeMB = compressedFile.size / 1024 / 1024;
            quality -= 0.05; // Знижуємо якість
  
            if (quality <= 0.1) {
              throw new Error("Не вдалося зменшити розмір зображення до 2 МБ.");
            }
          }
  
          // Перевірка на розмір менше 1.5 МБ
          if (initialSizeMB < minSizeMB) {
            options.initialQuality = 1; // Встановлюємо максимальну якість
            compressedFile = await imageCompression(file, options);
          }
        } else if (initialSizeMB < minSizeMB) {
          // Якщо файл менше 1.5 МБ, нічого не робимо
          return new Promise((resolve, reject) => {
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
              (snapshot) => {
                // Handle the upload progress
              },
              (error) => {
                reject(error);
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  resolve({ name: uniqueName, url: downloadURL });
                });
              }
            );
          });
        }
      } else {
        compressedFile = await imageCompression(file, options);
      }
  
      const uploadTask = uploadBytesResumable(storageRef, compressedFile);
  
      return new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
          (snapshot) => {
            // Handle the upload progress
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve({ name: uniqueName, url: downloadURL });
            });
          }
        );
      });
  
    } catch (error) {
      console.error("Помилка під час компресії зображення:", error);
      throw error;
    }
  }

  if (imgType === 'productPreviewImg') {
    results.push(await uploadSingleImage(file, paths.preview, 'productPreviewImg'));
    results.push(await uploadSingleImage(file, paths.bigPreview, 'productImg'));
    results.push(await uploadSingleImage(file, paths.big, 'productImgBig'));
  } else if (imgType === 'productImg') {
    results.push(await uploadSingleImage(file, paths.preview, 'productImg'));
    results.push(await uploadSingleImage(file, paths.big, 'productImgBig'));
  } else {
    results.push(await uploadSingleImage(file, paths, imgType));
  }

  return results;
}

function imagePaths(imgType) {
  const paths = {
    categoryImg: 'categories/',
    subCategoriesImg: 'subCategories/',
    productPreviewImg: {
      preview: 'products/previews/',
      bigPreview: 'products/bigPreviews/',
      big: 'products/big/'
    },
    productImg: {
      preview: 'products/bigPreviews/',
      big: 'products/big/'
    }
  };

  return paths[imgType] || '';
}

function getQuality(imgType) {
  const qualities = {
    categoryImg: 0.7,
    subCategoriesImg: 0.7,
    productPreviewImg: 0.9,
    productImg: 0.9,
    productImgBig: 1,
  };

  return qualities[imgType] || 0.7;
}

function getMaxSize(imgType) {
  const sizes = {
    categoryImg: 0.1,
    subCategoriesImg: 0.3,
    productImg: 0.3,
    productPreviewImg: 0.5,
    productImgBig: 2, // Обмеження розміру для productImgBig
  };

  return sizes[imgType] || 1;
}
 
function getMaxWidthOrHeight(imgType) {
  const sizes = {
    categoryImg: 30,
    subCategoriesImg: 400,
    productImg: 500,
    productPreviewImg: 200,
    productImgBig: undefined, // Не обмежуємо розміри для productImgBig
  };

  return sizes[imgType] || 300;
}

export async function deleteImage(path) {
  const storage = getStorage();
  const storageRef = ref(storage, path);

  return deleteObject(storageRef);
}
