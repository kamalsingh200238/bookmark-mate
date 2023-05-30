import Image from "next/image";
import DeleteButton from "./components/DeleteButton/DeleteButton";
import AllBookmarks from "./components/AllBookmarks"
import AddBookmark from "./components/AddBookmark";
export default function Home() {
  return (
    <>
      <main>Home Page</main>
      <AllBookmarks />
      <AddBookmark/>
      <DeleteButton id={"646dda3d54c2a15ad6a9c38a"} />
    </>
  );
}
