export interface Slide {
  content: string;
  notes?: string;
  metadata?: SlideMetadata;
}

export interface SlideMetadata {
  class?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  paginate?: boolean;
  header?: string;
  footer?: string;
  theme?: string;
}

export interface ParsedPresentation {
  slides: Slide[];
  globalMetadata: PresentationMetadata;
}

export interface PresentationMetadata {
  title?: string;
  theme?: string;
  paginate?: boolean;
  header?: string;
  footer?: string;
  marp?: boolean;
  size?: string;
}

export interface ConversionOptions {
  credentialsPath: string;
  useServiceAccount?: boolean;
  presentationName?: string;
  verbose?: boolean;
}