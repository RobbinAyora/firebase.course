import { useEffect, useState } from 'react';
import './App.css';
import { Auth } from "./components/auth";
import { db, auth, storage }  from "./config/firebase";
import {getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from 'firebase/storage';

function App() {
  const [movieList, setMovieList] = useState([]);
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState('');

  const movieCollectionRef = collection(db, "movies");

  const [fileUpload,setFileUpload] = useState(null)

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
  };

  const updateMovieTitle = async (id, updatedTitle) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, {title: updatedTitle});
  };

  useEffect(() => {
    const getMovieList = async () => {
      try {
        const data = await getDocs(movieCollectionRef);
        const filterData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMovieList(filterData);
      } catch (err) {
        console.error(err);
      }
    };
    getMovieList();
  });

  const onSubmitMovie = async () => {
    try {
      await addDoc(movieCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try{
      await uploadBytes(filesFolderRef, fileUpload)
    }catch (err) {
      console.error(err)
    }
  
  }

  return (
    <div className="App">
      <Auth />
      <div>
        <input placeholder='Movie name..' onChange={(e)=>setNewMovieTitle(e.target.value)}/>
        <input placeholder='Date of release..' type='number' onChange={(e)=>setNewReleaseDate(e.target.value)}/>
        <input type='checkbox' checked={isNewMovieOscar} onChange={(e)=>setIsNewMovieOscar(e.target.checked)}/>
        <label>Received an Oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>

      <div>
        {movieList.map((movies, index) => (
          <div key={index}>
            <h1 style={{ color: movies.receivedAnOscar ? "green" : "red"}}>{movies.title}</h1>
            <p>Date: {movies.releaseDate}</p>
            <button onClick={() => deleteMovie(movies.id)}>Delete Movie</button>
            <input placeholder='New title' onChange={(e)=>setUpdatedTitle(e.target.value)}/>
            <button onClick={()=>updateMovieTitle(movies.id, updatedTitle)}>Update Title</button>
          </div>
        ))}
      </div>

      <input type='file' onChange={(e)=>setFileUpload(e.target.files[0])}/>
      <button onClick={uploadFile}>Submit file</button>
    </div>
  );
}

export default App;





