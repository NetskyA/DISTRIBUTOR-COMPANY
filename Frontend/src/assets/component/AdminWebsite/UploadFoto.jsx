// FileUploader.js
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUploader = () => {
    const onDrop = useCallback((acceptedFiles) => {
        // Do something with the files
        console.log(acceptedFiles);
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
              // Use the reader.result, which is a base64-encoded string
              console.log('File Content:', reader.result);
      
              // You can save the file content or perform other actions here
              // For example, you can send the file to a server using an API
            };
            reader.readAsDataURL(file);
          });
    }, []);

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
        <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''} text-2xl border-2 h-12 w-52 border-dashed border-primary rounded-lg ms-4`}>
            <div className="cover items-center mx-auto justify-center">
                <input {...getInputProps()} className="m-2" />
            </div>
            <p>{isDragActive ? <p className="text-center">Click</p> : <p className="text-2xl pt-1 text-center">+ Add photo</p>}</p>
        </div>
    );
};


export default FileUploader;
