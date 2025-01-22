import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [books,setbooks] = useState([]);
  const [title,setTitle] = useState("");
  const [newtitle,setNewtitle] = useState("");
  const [releaseYear,setReleaseyear] = useState(0);

  useEffect(() => {
    fetchbooks();
  }, []);

  const fetchbooks = async () => {
    try{
      const response = await fetch("http://127.0.0.1:8000/api/books/");
      const data = await response.json();
      setbooks(data);
    }catch (err){
      console.log(err);
    }

  }

  const addbook = async() =>{
    const bookData = {
      title,
      release_year : releaseYear,
    }
    try{
    const response = await fetch("http://127.0.0.1:8000/api/books/create/",{
      method: "POST",
      headers:{
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(bookData),
    });
    const data = await response.json()
    setbooks((prev) => [...prev,data])
  }catch(err){
    console.log(err);
  }


  }


  const updateTitle = async(pk,release_year) =>{
    const bookData = {
      title : newtitle,
      release_year : release_year,
    }
    try{
    const response = await fetch(`http://127.0.0.1:8000/api/books/${pk}`,{
      method: "PUT",
      headers:{
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(bookData),
    });
    const data = await response.json()
    setbooks((prev) => 
    prev.map((book) => {
      if(book.id===pk){
        return data;
      }else{
        return book;
      }
    })
    )
  }catch(err){
    console.log(err);
  }


  }

  const deleteBook = async(pk) =>{
    
    try{
    const response = await fetch(`http://127.0.0.1:8000/api/books/${pk}`,{
      method: "DELETE",
      
    });
    setbooks((prev) => prev.filter((book) => book.id!==pk));
  
  }catch(err){
    console.log(err);
  }


  }




  return (
    <>
      <h1>Book Website</h1>

      <div>
        <input type = "text" placeholder="Book Title..." onChange={(e) => setTitle(e.target.value)}/>
        <input type="number" placeholder = "Release date..." onChange={(e) => setReleaseyear(e.target.value)}/>
        <button onClick={addbook}>Add Book</button>
        </div>
        {books.map((book) =>(
          <div>
          <p>Title: {book.title}</p>
          <p>Release year: {book.release_year}</p>
          <input type = "text" placeholder="New Title..." onChange={(e) => setNewtitle(e.target.value)}/>
          <button onClick={() => updateTitle(book.id,book.release_year)}>Change Title</button>
          <button onClick={() => deleteBook(book.id)}>Delete Book</button>

      </div>
        ))}
    </>
  )
};

export default App
