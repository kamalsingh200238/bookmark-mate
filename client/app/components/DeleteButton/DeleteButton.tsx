"use client";

async function deleteBookmark(id: string) {
  const response = await fetch(`http://localhost:3333/api/v1/bookmarks/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  const responseData = await response.json();
  console.log("response", response, "data", responseData);

  if (response.ok) {
    alert("Bookmark deleted");
  } else {
    alert("Bookmark not deleted");
  }
}

export default function DeleteButton({ id }: { id: string }) {
  return (
    <button
      aria-label="Delete bookmark"
      className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-400"
      onClick={() => deleteBookmark(id)}
    >
      Delete
    </button>
  );
}
