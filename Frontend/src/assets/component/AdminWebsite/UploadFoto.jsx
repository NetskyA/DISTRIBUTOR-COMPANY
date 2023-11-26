// FileUploader.js
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUploader = () => {
    const onDrop = useCallback((acceptedFiles) => {
        // Do something with the files
        console.log(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div className="text-2xl border-2 h-12 w-52 border-dashed border-primary rounded-lg" {...getRootProps()} >
            <div className="cover items-center mx-auto justify-center">
                <input {...getInputProps()} className="m-2" />
            </div>
            <p>{isDragActive ? <p className="text-center">Click</p> : <p className="text-2xl pt-1 text-center">+ Add photo</p>}</p>
        </div>
    );
};


export default FileUploader;
