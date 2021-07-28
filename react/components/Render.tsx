import React from 'react';
// interface sudhobject {
//   dataItem: JSX.Element;
// }
import { Button } from "vtex.styleguide"
function Render({ dataItem, id, handleDelete }: any) {

  return (
    <div>
      <Button onClick={() => handleDelete(id)}>Delete</Button>
      {dataItem}
    </div>
  );
}

export default Render;
