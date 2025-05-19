declare module "pdf-poppler" {
  export interface ConvertOptions {
    format?: string; // "png", "jpeg", etc.
    out_dir: string; // folder to output to
    out_prefix: string; // output file prefix
    page?: number | null; // page number to render
    scale?: number; // optional DPI scale
    resolution?: number; // optional DPI resolution
  }

  export class PdfConverter {
    constructor(filePath: string);
    convert(options: ConvertOptions): Promise<void>;
  }
}
