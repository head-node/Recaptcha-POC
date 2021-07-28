//
import React from 'react';
import { Button } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles';
import InputUpload from './Upload/Upload';
// import NewSection from './NewSection';
// import { CheckboxInput } from './Checkbox';
// import { TextAreaInput } from './components/TextArea';



interface obj {
  id: number
  value: JSX.Element
}


const CSS_HANDLES = ['addButton', 'fileSection', 'deleteButton'] as const



const AddAnotherImage = () => {
  const handles = useCssHandles(CSS_HANDLES)

  const [fileSection, setFileSection] = React.useState<Array<obj>>([])



  const getNewId = () => {
    let id = 0;
    fileSection.map((item: obj) => {
      if (item.id > id) {
        id = item.id;
      }
    });

    id += 1;
    return id;
  }

  const deleteSection = (section_id: number) => {
    const filtered_arr = fileSection.filter(section => section.id !== section_id);
    setFileSection(filtered_arr)
  }

  const handleAddButtonClick = () => {



    const newElement = (
      <>
        <InputUpload pointer="#/properties/file" />
        <br /><br />
        {/* <CheckboxInput pointer="#/properties/agreement" label="I certify that I own the copyright or have permission to use the copyrights to these images." />
        <br /><br /> */}
      </>
    )



    const newObj = {
      id: getNewId(),
      value: newElement
    }


    setFileSection([...fileSection, newObj])

    console.log(fileSection)

  }

  return (
    <>
      {fileSection.map((item: obj) =>
        <div key={item.id} className={handles.fileSection}>
          <div className={handles.deleteButton}>
            <Button style={{ marginTop: "10px", backgroundColor: "#ff5c5c" }} onClick={() => deleteSection(item.id)} >DELETE</Button>
          </div>

          <div style={{ marginLeft: "60px" }}>{item.value}</div>


        </div>

      )}

      <Button style={{ marginLeft: "60px", marginTop: "10px" }} onClick={() => handleAddButtonClick()} className={handles.addButton}>ADD ANOTHER IMAGE</Button>
      <button style={{ borderRadius: "5px", border: "none", marginLeft: "20px", backgroundColor: "#10cfe8", width: "70px", height: "40px", marginTop: "15px", color: "white" }}>SUBMIT</button>
    </>
  );
};

export default AddAnotherImage;
