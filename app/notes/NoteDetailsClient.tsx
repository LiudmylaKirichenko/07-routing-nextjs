"use client";

import { useQuery } from "@tanstack/react-query";
// import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import css from "./NoteDetailsClient.module.css";
import Link from "next/link";

interface NoteDetailsClientProps {
  id: string;
}

const NoteDetailsClient = ({ id }: NoteDetailsClientProps) => {
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });
  if (isLoading) return <p>Loading...</p>;
  if (isError || !note) return <p>Note not found</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <span className={css.tag}>{note.tag}</span>
        </div>

        <p className={css.content}>{note.content}</p>

        <div className={css.date}>
          {new Date(note.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        <Link href="/notes" className={css.backLink}>
          ← Back to all notes
        </Link>
      </div>
    </div>
  );
};

export default NoteDetailsClient;
