import { useState, useEffect } from "react";
import { db,auth } from "../config/firebase"
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore"
import React from 'react'

function Moviesdata() {

  const [movieList, setMovielist] = useState([]);
  const moviecollectionRef = collection(db, "movies");

  const [newMovieTitle, setnewMovieTitle] = useState("");
  const [newMovieReleasedate, setnewMovieReleasedate] = useState(0);
  const [Ismoviereceiveoscur, setmoviereceiveoscur] = useState(false);
  const [updatedtitle, setupdatedtitle] = useState("");


  const getMovielist = async () => {
    try {
      const data = await getDocs(moviecollectionRef);
      const filtereData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(filtereData);
      setMovielist(filtereData);

    } catch (err) {
      console.error(err);
    }
  }

  const deletemovie = async (id) => {
    const moviedoc = doc(db, "movies", id);
    await deleteDoc(moviedoc);
    getMovielist();

  }


  useEffect(() => {
    getMovielist();
  }, []);

  const submitmovie = async () => {
    try {
      await addDoc(moviecollectionRef, {
        title: newMovieTitle,
        Releasedate: newMovieReleasedate,
        received_an_oscur: Ismoviereceiveoscur,
        userId:auth?.currentUser?.uid
      })
      getMovielist();
    } catch (err) {
      console.error(err);
    }
  }

  const updatemovietitle = async (id) => {
    const moviedoc = doc(db, "movies", id);
    await updateDoc(moviedoc, { title: updatedtitle });
    getMovielist();

  }


  return (

    <>

      <div>
        <input type="text" placeholder="movie name.."
          onChange={(e) => setnewMovieTitle(e.target.value)}
        />
        <input type="number" placeholder="movie release data..."
          onChange={(e) => setnewMovieReleasedate(Number(e.target.value))}
        />
        <input type="checkbox"
          checked={Ismoviereceiveoscur}
          onChange={(e) => setmoviereceiveoscur(e.target.checked)}
        />
        <label>Recieve an oscur</label>
        <button onClick={submitmovie}>Submit</button>
      </div>
      <div>
        {movieList.map((movie) => {
          return (
            <div key={movie.id}>
              <h1>{movie.title}</h1>
              <p>Date:{movie.Releasedate}</p>
              <button onClick={() => deletemovie(movie.id)}>Delete Movie</button>
              <input type="text" placeholder="new title...."
                onChange={(e) => setupdatedtitle(e.target.value)}
              />
              <button onClick={() => updatemovietitle(movie.id)}>Update</button>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Moviesdata
