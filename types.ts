
export interface User {
  id: string;
  email: string;
  name: string;
}

export enum SummaryFormat {
  KeyTopics = "Key Topics (bullets)",
  DetailedParagraph = "Detailed Paragraph",
  Abstract = "Abstract (1-2 sentences)",
}

export interface SummaryResult {
  id: string;
  videoTitle: string;
  videoThumbnail: string;
  videoUrl: string;
  summary: string;
  format: SummaryFormat;
  createdAt: string;
}
