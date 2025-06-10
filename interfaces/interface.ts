export interface SubjectItem {
  id: number;
  subject: string;
  count: number;
}

export interface SubjectsData {
  info: string;
  list: SubjectItem[];
}

export interface SubjectsResponse {
  status: number;
  message: string;
  data: SubjectsData;
}
