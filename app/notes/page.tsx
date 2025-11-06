"use client";

import css from "./page.module.css";
import { useState, useEffect } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import { useDebouncedCallback } from "use-debounce";
import { Toaster } from "react-hot-toast";

import SearchBox from "../../components/SearchBox/SearchBox";
import NoteForm from "../../components/NoteForm/NoteForm";
import Pagination from "../../components/Pagination/Pagination";
import NoteList from "../../components/NoteList/NoteList";
import Modal from "../../components/Modal/Modal";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["notes", searchQuery, currentPage],
    queryFn: () => fetchNotes(currentPage, searchQuery),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const totalPages = data?.totalPages ?? 0;

  const handleChange = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
  }, 1000);

  return (
    <div className={css.app}>
      <Toaster />
      <header className={css.toolbar}>
        <SearchBox onChange={handleChange} />

        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}

        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      <main>
        <section>
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <ErrorMessage />
          ) : data?.notes?.length ? (
            <NoteList notes={data.notes} />
          ) : null}
        </section>
      </main>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
