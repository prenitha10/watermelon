import { useState } from "react";
import axios from "axios";

function RipenessAI() {
  const [data, setData] = useState("");
  const [val, setVal] = useState("Upload image to predict");
  const [fileName, setFilename] = useState("No file uploaded");
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5137/predict",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setVal(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFile(file);
    setFilename(file.name);
  };

  return (
    <div className="pl-40 pr-40 min-h-screen bg-background bg-cover flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-extrabold text-pink-900 mb-8">
        RipenessAI
      </h1>
      <p className="text-center text-lg font-medium text-pink-800 lg:text-2xl mb-8">
        RipenessAI is an innovative platform that uses advanced AI models to
        help you detect the ripeness of watermelons with precision. By analyzing
        shape, stem color, webbing patterns, and ground spots, RipenessAI
        ensures you pick the sweetest, juiciest watermelon every time—no
        guesswork needed!
      </p>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <label className="w-64 flex flex-col items-center px-4 py-6 bg-pink-50 text-pink-600 rounded-lg shadow-md tracking-wide uppercase border border-pink-300 cursor-pointer hover:bg-pink-200">
            <svg
              className="w-8 h-8 mb-2"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span className="mt-2 text-base leading-normal">Select a file</span>
            <input
              type="file"
              name="file"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        </div>
        <span className="text-pink-700 block mb-4">File Uploaded: {fileName}</span>
        <div className="flex justify-center">
          <button
            className="bg-gradient-to-r from-pink-900 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white font-bold py-2 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform"
            type="submit"
          >
            PREDICT
          </button>
        </div>
      </form>

      <div className="mt-16 mb-4 text-center">
        <span className=" text-3xl text-pink-800 font-extrabold">
          Detected Image is:
        </span>
        {val && (
          <div className="mt-4 text-pink-900 text-lg space-y-3">
            <div>Spot: {val.spot}</div>
            <div>Stem: {val.stem}</div>
            <div>Webbing: {val.webbing}</div>
            <div>Shape: {val.shape}</div>
            <div>Disease: {val.disease}</div>
            <div>Recommendation: {val.recommendation}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RipenessAI;
