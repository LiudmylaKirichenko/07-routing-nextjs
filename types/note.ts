export interface Note {
  id: number;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNewNote {
  title: string;
  content: string;
  tag: NoteTag;
}

export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
