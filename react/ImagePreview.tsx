import React from 'react';

const ImagePreview = ({ image }: any) => {
  return (
    <div>
      { image ? (
        <img style={{ height: "150px", width: "250px" }} src={image} />
      ) : null

      }
    </div>

  )
};

export default ImagePreview;


