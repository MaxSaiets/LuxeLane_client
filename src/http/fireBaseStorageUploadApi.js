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
    const options = {
      maxSizeMB: getMaxSize(imgType),
      maxWidthOrHeight: getMaxWidthOrHeight(imgType),
      initialQuality: getQuality(imgType),
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
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
    results.push(await uploadSingleImage(file, paths.full, 'productImg'));
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
      full: 'products/big/'
    },
    productImg: 'products/big/',
  };

  return paths[imgType] || '';
};

function getQuality(imgType) {
  const qualities = {
    categoryImg: 0.7,
    subCategoriesImg: 0.7,
    productImg: 0.8,
    productPreviewImg: 0.9,
  };

  return qualities[imgType] || 0.7;
}

function getMaxSize(imgType) {
  const sizes = {
    categoryImg: 0.1,
    subCategoriesImg: 0.3,
    productImg: 0.3,
    productPreviewImg: 0.5,
  };

  return sizes[imgType] || 1;
}
 
function getMaxWidthOrHeight(imgType) {
  const sizes = {
    categoryImg: 30,
    subCategoriesImg: 400,
    productImg: 500,
    productPreviewImg: 200,
  };

  return sizes[imgType] || 300;
}

export async function deleteImage(path) {
  const storage = getStorage();
  const storageRef = ref(storage, path);

  return deleteObject(storageRef);
}
