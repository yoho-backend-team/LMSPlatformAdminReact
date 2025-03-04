import { Box, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Icon from 'components/icon';
import { handleMultipleFiles } from 'features/fileUpload';

const ImageUploader = ({ galleryImages, setGalleryImages }) => {
  const handleImageChange = async (event) => {
    const files = event.target.files;

    const data = new FormData()
    for(const file of files){
     data.append("files",file)
    }
    const response = await handleMultipleFiles(data)
    console.log(response)
    const gallery = response.data.data
    setGalleryImages([...galleryImages, ...gallery]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...galleryImages];
    updatedImages.splice(index, 1);
    console.log(process.env.REACT_APP_PUBLIC_API_URL+image.file, 'img');

    // Update galleryImages state
    setGalleryImages(updatedImages);
  };

  

  const CustomCloseButton = styled(IconButton)(({ theme }) => ({
    top: -80,
    boxShadow: theme.shadows[2],
    transform: 'translate(10px, -10px)',
    borderRadius: theme.shape.borderRadius,
    transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
    '&:hover': {
      transform: 'translate(7px, -5px)'
    }
  }));
  const ButtonStyled = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'center'
    }
  }));
  return (
    <Box>
      <ButtonStyled component="label" variant="contained" htmlFor="account-settings-gallery-image">
        Upload Images
        <input
          hidden
          type="file"
          accept="image/png, image/jpeg"
          multiple
          onChange={handleImageChange}
          id="account-settings-gallery-image"
        />
        <Icon icon="tabler:cloud-upload" style={{ marginLeft: '10px' }} />
      </ButtonStyled>

      {/* Display selected images as previews */}
      <div style={{ marginTop: '20px', marginBottom: '20px' }}>
        {galleryImages?.map((image, index) => (
          <Box key={index} style={{ display: 'inline-block', marginRight: '30px', marginTop: '20px', marginBottom: '20px' }}>
            <img src={process.env.REACT_APP_PUBLIC_API_URL+image.file} alt={`preview-${index}`} style={{ maxWidth: '100px', maxHeight: '100px' }} />
            <CustomCloseButton variant="contained" color="error" size="small" onClick={() => handleRemoveImage(index)}>
              <Icon icon="tabler:x" fontSize="1.25rem" />
            </CustomCloseButton>
          </Box>
        ))}
      </div>
    </Box>
  );
};

export default ImageUploader;
