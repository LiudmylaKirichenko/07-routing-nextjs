import axios from "axios";
import type { Note, CreateNewNote } from "@/types/note";

interface FetchNotesPesponse {
  notes: Note[];
  totalPages: number;
}

interface Params {
  page: number;
  perPage: number;
  search?: string;
}

const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const BASE_URL = "https://notehub-public.goit.study/api";
const NOTES_URL = `${BASE_URL}/notes`;

export async function fetchNotes(
  page: number = 1,
  searchValue: string = "",
  perPage: number = 12
): Promise<FetchNotesPesponse> {
  const params: Params = {
    page,
    perPage,
  };

  if (searchValue) {
    params.search = searchValue;
  }

  const response = await axios.get<FetchNotesPesponse>(`${NOTES_URL}`, {
    params,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return response.data;
}

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await axios.get<Note>(`${NOTES_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return response.data;
};

export async function createNote(note: CreateNewNote): Promise<Note> {
  const response = await axios.post<Note>(`${NOTES_URL}`, note, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return response.data;
}

// export async function deleteNote(id: number): Promise<Note> {
//   const response = await axios.delete<Note>(`${NOTES_URL}/${id}`, {
//     headers: {
//       Authorization: `Bearer ${API_KEY}`,
//     },
//   });
//   return response.data;
// }
export async function deleteNote(id: number): Promise<{ message: string }> {
  const response = await axios.delete(`${NOTES_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return response.data;
}
