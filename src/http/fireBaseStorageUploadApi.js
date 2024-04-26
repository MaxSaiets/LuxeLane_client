import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

export async function uploadImage(file, path) {
  const storage = getStorage();
  const uniqueName = uuidv4() + '-' + file.name;
  const storageRef = ref(storage, path + uniqueName);

  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on('state_changed', 
      (snapshot) => {
        // Handle the upload progress
      }, 
      (error) => {
        // Handle unsuccessful uploads
        reject(error);
      }, 
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve({ name: uniqueName, url: downloadURL });
        });
      }
    );
  });
}

export async function deleteImage(path) {
    const storage = getStorage();
    const storageRef = ref(storage, path);
  
    return deleteObject(storageRef);
}