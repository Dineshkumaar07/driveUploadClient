import { useState } from "react";
import axios from "axios";
function App() {
  const [file, setFile] = useState("");
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true);
    if (file !== null) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("price", price);
      axios
        .post("http://localhost:3001/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          setLoading(false);
          alert("Image Uploaded Successfully");
        })
        .catch((err) => {
          alert("Image Uploading Failed!");
        });
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex items-center justify-center h-screen flex-col gap-9 ">
      {" "}
      <div className="flex flex-col gap-6 border-2 p-9 rounded-md">
        <h1 className="font-bold text-3xl tracking-wide">Upload Items</h1>
        <input
          type="file"
          name="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <label htmlFor="price">Price (Rs)</label>
        <input
          type="text"
          placeholder="Price"
          className="px-3 py-2"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          value={price}
        />
        <button
          onClick={handleClick}
          className="bg-purple-800 px-4 py-2 rounded-md text-white "
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;
