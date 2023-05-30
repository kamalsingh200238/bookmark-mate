"use client";
import { useState } from "react";
const AddBookmark = () => {
  const [nameOfBookmark, setNameOfBookmark] = useState("");
  const [urlOfBookmark, setUrlOfBookmark] = useState("");

  async function addBookmark(event:any) {
    event.preventDefault()
    try{
         const response = await fetch(`http://localhost:3333/api/v1/bookmarks`, {
        method: "POST",
        body: JSON.stringify({nameOfBookmark,urlOfBookmark }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      console.log("this is addBookmark component data", data);
    }catch(error){
        console.log(`AddBookmark error: ${error}`)
    }
   
  }
  return (
    <div>
      <form onSubmit={addBookmark}>
        <input
          type="text"
          placeholder="name of bookmark"
          value={nameOfBookmark}
          onChange={(event) => setNameOfBookmark(event.target.value)}
        />
        <input
          type="text"
          placeholder="url of bookmark"
          value={urlOfBookmark}
          onChange={(event) => setUrlOfBookmark(event.target.value)}
        />
        <button 
        className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-400" 
        type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddBookmark;
