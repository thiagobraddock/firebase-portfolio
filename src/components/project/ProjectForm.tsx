import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

import { ThreeDots } from 'react-loader-spinner';
import { useAuth } from '../../context/AuthProvider';
import { db, app } from '../../firebase';

function ProjectForm() {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [tags, setTags] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { currentUser } = useAuth();
  const storage = getStorage(app);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!currentUser || !file) {
      return;
    }

    setUploading(true);
    const uniqueFileName = `${uuidv4()}-${file.name}`;
    const storageRef = ref(storage, `images/${uniqueFileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      null,
      (error) => {
        console.error(error);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const docData = {
            name,
            link,
            tags,
            image: downloadURL,
            userId: currentUser.uid,
          };

          addDoc(collection(db, 'projects'), docData);
          Swal.fire('Success', 'Project added successfully!', 'success');
          setUploading(false);
        });
      },
    );
    setName('');
    setLink('');
    setTags('');
    setFile(null);
  };

  return (
    <form onSubmit={ handleSubmit }>
      <input
        type="text"
        value={ name }
        onChange={ (e) => setName(e.target.value) }
        placeholder="Project name"
        required
      />
      <input
        type="url"
        value={ link }
        onChange={ (e) => setLink(e.target.value) }
        placeholder="Project link"
        required
      />
      <input
        type="text"
        value={ tags }
        onChange={ (e) => setTags(e.target.value) }
        placeholder="Project tags"
        required
      />
      <input
        type="file"
        onChange={ (e) => setFile(e.target.files ? e.target.files[0] : null) }
        required
      />
      <button disabled={ uploading } onClick={ handleSubmit }>
        {uploading ? 'Uploading...' : 'Add Project'}
      </button>
      {uploading && (
        <ThreeDots color="#00BFFF" height={ 80 } width={ 80 } />

      )}
    </form>
  );
}

export default ProjectForm;
