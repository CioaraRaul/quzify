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

export interface SubjectCategory {
  attempCount: number;
  categoryId: number;
  count: number;
  description: string;
  imageURL: string;
  name: string;
}
