import { CloudUpload } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import {useDropzone, type DropEvent} from "react-dropzone";
import Cropper, { type ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

type Props = {
  uploadPhoto: (file: Blob) => void
  loading: boolean
}

async function getFilesFromEvent(
  event: DropEvent
): Promise<Array<File | DataTransferItem>> {
  if (Array.isArray(event)) return [];

  if ('dataTransfer' in event && event.dataTransfer) {
    if (event.type !== 'drop') {
      return Array.from(event.dataTransfer.items).filter(
        (item) => item.kind === 'file'
      );
    }

    return Array.from(event.dataTransfer.files);
  }

  const input = event.target as HTMLInputElement | null;
  return Array.from(input?.files ?? []);
}

export default function PhotoUploadWidget({uploadPhoto, loading}: Props) {
    const [files, setFiles] = useState<object & { preview: string; }[]>([]);
    const cropperRef = useRef<ReactCropperElement>(null);

    useEffect(() =>{
      return () => {
        files.forEach(file => URL.revokeObjectURL(file.preview))
      }
    }, [files]);

    const onCrop = useCallback(() => {
      const cropper = cropperRef.current?.cropper;
      cropper?.getCroppedCanvas().toBlob(blob =>{
        uploadPhoto(blob as Blob);
      })
    }, [uploadPhoto])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    getFilesFromEvent,
    useFsAccessApi: false,
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file as Blob)
      })));
    },
  });

  return (
    <Grid container spacing={3}>
        <Grid size={4}>
            <Typography variant="overline" color="secondary">Step 1 - Add photo</Typography>
            <Box {...getRootProps()}
                sx={{border: 'dashed 3px #eee',
                        borderColor: isDragActive ? 'green' : '#eee',
                        borderRadius:'5px',
                        paddingTop: '30px',
                        textAlign: 'center',
                        height:'280px'
                    }}
            >
                <input {...getInputProps()} />
                <CloudUpload sx={{fontSize:80}} />
                <Typography variant="h5">Drop image here</Typography>
            </Box>
        </Grid>
        <Grid size={4}>
            <Typography variant="overline" color="secondary">Step 2 - Resize image</Typography>
            {files[0]?.preview && 
                <Cropper 
                    src={files[0]?.preview}
                    style={{height:300, width: '90%'}}
                    aspectRatio={1}
                    preview={'.img-preview'}
                    guides={false}
                    viewMode={1}
                    background={false}
                     ref={cropperRef}
                />
            
            }
        </Grid>
        <Grid size={4}>
            {files[0]?.preview && (
                <>
                    <Typography variant="overline" color="secondary">Step 3 - Preview & upload</Typography>
                    <div 
                        className="img-preview"
                        style={{width:300, height: 300, overflow: 'hidden'}}
                    />
                    <Button 
                      sx={{my:2, width: 300}}
                      onClick={onCrop}
                      variant="contained"
                      color="secondary"
                      disabled={loading}
                    >
                      Upload
                    </Button>
                </>
            )}
        </Grid>
    </Grid>
  )
}
