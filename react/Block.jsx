import React, { useState } from 'react'

export default function Block({ Add, id, size, handleDelete, setURL, url }) {
  // const [url, setURL] = useState(null);
  const myRef = React.useRef(null);
  const handleUpload = () => {
    // url[id] = (URL.createObjectURL(event.target.files[0]))
    // setURL([...url])
    let newUrl = (URL.createObjectURL(event.target.files[0]))
    changeUrl(id, newUrl)
  }

  const changeUrl = (id, newUrl) => {
    url[id] = newUrl
    setURL([...url])
  }


  const changeImage = () => {
    console.log(id)
    myRef.current.click();
  }
  return (
    <div >
      <p style={{ borderRadius: "5px", marginLeft: "1030px", backgroundColor: "red", width: "170px", height: "35px", display: "flex", justifyContent: "center", alignItems: "center", color: "white" }} onClick={() => { handleDelete(id) }}>Delete</p>
      <div style={{ margin: "auto", width: "88%", backgroundColor: "#F3F3F4", marginTop: "15px" }}>
        {!url[id] ? (<input required type="file" style={{ margin: "15px 60px" }} onChange={handleUpload}></input>) :
          <div >
            <input id="upload" required type="file" ref={myRef} onClick={changeImage} style={{ display: "none", margin: "15px 60px" }} onChange={handleUpload}></input>
            <p style={{ margin: "0px 60px", padding: "15px 0px", color: "#FF5C5C" }} onClick={changeImage}>Change this file</p>
          </div>}
        {url[id] !== undefined ? <img style={{ width: "250px", height: "150px", marginLeft: "60px" }} src={url[id]} /> : null}
        <div style={{ margin: "15px" }}>
          <input required style={{ margin: "0px 0px 15px 60px" }} type="checkbox"></input><label style={{ marginLeft: "10px" }}>I agree to the terms</label>
        </div>

        <label style={{ marginLeft: "60px" }}>Project Details</label>
        <textarea required style={{ marginLeft: "60px", width: "89.9%", height: "100px", marginBottom: "15px", marginTop: "7px" }} type="text"></textarea>
      </div>

      {id == size - 1 ? (<div style={{ display: "flex" }}>
        <p style={{ borderRadius: "5px", marginLeft: "120px", backgroundColor: "blue", width: "170px", height: "35px", display: "flex", justifyContent: "center", alignItems: "center", color: "white" }} onClick={Add}>Add Another Image</p>
        <button style={{ borderRadius: "5px", marginLeft: "20px", backgroundColor: "blue", width: "70px", height: "35px", marginTop: "15px", color: "white" }} >Submit</button>
      </div>) : null}

    </div>
  )
}
