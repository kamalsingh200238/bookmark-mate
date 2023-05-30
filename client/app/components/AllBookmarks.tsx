"use client";
import { useState, useEffect } from "react";

interface Bookmark {
  _id: string;
  nameOfBookmark: string;
  urlOfBookmark: string;
}
const AllBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    async function getAllBookmarks() {
      const response = await fetch(`http://localhost:3333/api/v1/bookmarks`,
      {
        credentials:"include"
      });
      const data = await response.json();
      setBookmarks(data.bookmarks);
      console.log("this is getAllBookmarks", data);
    }
    getAllBookmarks();
  }, []);

  return (
    <div>
      <h1>All Bookmarks</h1>

      {!bookmarks || bookmarks.length<=0? "No bookmarks" : bookmarks.length>0 && bookmarks.map((bookmark)=>(
        <div key={bookmark._id}>
          <h1>{bookmark.nameOfBookmark}</h1>
          <p>{bookmark.urlOfBookmark}</p>

        </div>
      )) }
      
    </div>
  );
};

export default AllBookmarks;
