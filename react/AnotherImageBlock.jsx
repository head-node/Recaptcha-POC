import React from 'react'
import Block from './Block'
export default function AnotherImageBlock() {
  const [blocks, addBlock] = React.useState([])
  const handleAdd = () => {
    addBlock([...blocks, 1])

  }
  const [url, setUrl] = React.useState([])
  const handleDelete = (pos) => {
    blocks.splice(pos, 1);
    url.splice(pos, 1)
    addBlock([...blocks])
    setUrl([...url])
  }

  return (
    <div>
      {blocks.length == 0 ? (<div style={{ display: "flex" }}>
        <p style={{ borderRadius: "5px", marginLeft: "120px", backgroundColor: "blue", width: "170px", height: "35px", display: "flex", justifyContent: "center", alignItems: "center", color: "white" }} onClick={handleAdd}>Add Another Image</p>
        <button style={{ borderRadius: "5px", marginLeft: "20px", backgroundColor: "blue", width: "70px", height: "35px", marginTop: "15px", color: "white" }} >Submit</button>
      </div>) : null
      }

      {
        blocks.map((item, id) => {
          return <Block id={id} url={url} setURL={setUrl} handleDelete={handleDelete} size={blocks.length} Add={handleAdd} />
        })
      }
    </div>
  )
}

