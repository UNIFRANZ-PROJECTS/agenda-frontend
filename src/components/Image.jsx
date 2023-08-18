import { PhotoCamera } from '@mui/icons-material';
import { Card, CardMedia, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useRef } from 'react';
import Compressor from 'compressorjs';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        height: 200,
        width: 200,
        borderRadius: '10%',
    },
    icon: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        color: theme.palette.grey[500],
    },
}));

export const ComponentImage = ({ sendImage, fileImage, accept }) => {
    const fileInputRef = useRef();
    const classes = useStyles();

    const onFileInputChange = async ({ target }) => {
        if (target.files.length === 0) return;
        // setFile(URL.createObjectURL(target.files[0]));

        const compressedFile = await compressImage(target.files[0]);
        const base64 = await fileToBase64(compressedFile);
        sendImage({ base64: base64, urlImage: URL.createObjectURL(target.files[0]) });
    };

    const compressImage = (file) => {
        return new Promise((resolve, reject) => {
            new Compressor(file, {
                quality: 0.6,
                success(result) {
                    resolve(result);
                },
                error(err) {
                    reject(err);
                },
            });
        });
    };

    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                const base64String = reader.result.split(',')[1];
                resolve(base64String);
            };

            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    return (
        <>
            <input
                type="file"
                ref={fileInputRef}
                onChange={onFileInputChange}
                style={{ display: 'none' }}
                accept={accept}
            />
            <Card className={classes.root} onClick={() => fileInputRef.current.click()} sx={{ display: 'flex', justifyContent: 'center' }}>
                <CardMedia component="img" src={fileImage} alt="No Image" />
                <IconButton className={classes.icon}>
                    <PhotoCamera fontSize="small" />
                </IconButton>
            </Card>
        </>
    );
};

