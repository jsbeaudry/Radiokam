/* eslint-disable default-case */
import { firestore, firebase } from "./firebase";

export const uploadFile = file => {
  // Create the file metadata
  var metadata = {
    contentType: "image/jpeg"
  };
  var storageRef = firebase.storage().ref("images/");
  // Upload file and metadata to the object 'images/mountains.jpg'
  var uploadTask = storageRef.child(file.name).put(file, metadata);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    snapshot => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log("Upload is paused");
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log("Upload is running");
          break;
      }
    },
    error => {
      // Errors list: https://firebase.google.com/docs/storage/web/handle-errors
      console.log(error);
    },
    () => {
      // Upload completed successfully, now we can get the download URL

      storageRef
        .child(file.name)
        .getDownloadURL()
        .then(function(url) {
          // Insert url into an <img> tag to "download"
          console.log(url);
        })
        .catch(function(error) {
          console.log(error);
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
        });
    }
  );
};

export const Upload = async image => {
  //const ref = firebase.storage().ref();
  var storage = firebase.storage();
  // Create a storage reference from our storage service

  //var storageRef = storage.ref("images/" + image.name);
  // Create a child reference
  //var imagesRef = storageRef.child("images");

  //return await storageRef.put(image);

  const file = image[0];

  const name = "images/" + file.name;
  const metadata = {
    contentType: file.type
  };
  //console.log(file);
  return await storage.ref(name).put(file);
};

//////////////////Create/////////////////
export const onCreate = async (collect, object) => {
  let collection = firebase.firestore().collection(collect);
  return await collection.add(object);
};

//////////////////getall/////////////////
export const ongetAll = async collect => {
  let collection = firestore.collection(collect).orderBy("dateCreate", "desc");
  console.log(collection.get());
  return await collection.get();
};

//////////////////getOne/////////////////
export const ongetOne = async (collect, id) => {
  let collection = firestore.collection(collect).doc(id);
  return await collection.get();
};
export const ongetAllVisitors = async collect => {
  let collection = firestore.collection(collect);
  return await collection.get();
};

//////////////////update/////////////////
export const onUpdate = async (collect, id, object) => {
  let collection = firestore.collection(collect).doc(id);

  return await collection.update(object);
};
//////////////////delete one/////////////////
export const onDelete = async (collect, id) => {
  let collection = firestore.collection(collect).doc(id);

  return await collection.delete();
};

//////////////////delete all/////////////////
export const onDeleteAll = async collect => {
  let collection = firestore.collection(collect);

  return await collection.delete();
};
