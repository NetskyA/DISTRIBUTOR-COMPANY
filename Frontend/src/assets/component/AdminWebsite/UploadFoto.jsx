// FileUploader.js
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import client from '../../controller/client';
const FileUploader = ({setFoto,errorFoto}) => {
    const onDrop = async (acceptedFiles) => {
        // Do something with the files
        let data = acceptedFiles[0]
        setFoto(data); 
        errorFoto.current = false;     
        const formData = new FormData();
        formData.append('image', data);
        try {
          const response = await client.post('/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
          console.log('Image uploaded successfully:', response.data);
        } catch (error) {
          console.error('Error uploading image:', error);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
       onDrop,
       accept: {
        'image/jpeg': [],
        'image/png': [],
        'image/webp': [],
        'image/heic': [],
        'image/jfif': [],
     },});

    return (
        <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''} text-2xl border-2 h-14 w-52 border-dashed border-primary rounded-lg ms-4`}>
            <div className="cover items-center mx-auto justify-center">
                <input {...getInputProps()} className="m-2"/>
            </div>
            <p>{isDragActive ? <p className="text-center">Click</p> : 
            <div className="cover">
            <p className="text-2xl pt-3 text-center">Tambah Foto</p>
            </div>
            }</p>
        </div>
    );
};


export default FileUploader;
