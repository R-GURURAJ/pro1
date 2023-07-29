
  import './App.css';
  import { useState } from 'react';
  import axios from 'axios';


  function App() {
    const  [file,SetPath]=useState('');
    const submitR =async()=>{
      try {
        const response = await axios.post('http://localhost:3333/insert', { file:file}, {
        // const response = await axios.post('http://localhost:3080/upload', { file:file}, {
          headers: {
            "Content-type":"multipart/form-data", // Replace with your actual encryption key
          }});
          console.log(response);
      } catch (error) {
        console.error(error); // Log any error that occurs during the request
      }
    };
    
    return (
      <>
      <input type="file" name='file' className='profile' onChange={(e)=>{
        const file=e.target.files[0];
        console.log(file);
        SetPath(file);
      }}/>
      <button className='btn2' onClick={submitR}>load</button>
      </>
    );
  }

  export default App;
