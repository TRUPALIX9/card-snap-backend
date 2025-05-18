declare module "pdf-poppler" {
  export interface ConvertOptions {
    format?: string;
    out_dir: string;
    out_prefix: string;
    page?: number | null;
    scale?: number;
  }

  export class PdfConverter {
    constructor();
    convert(filePath: string, options: ConvertOptions): Promise<void>;
  }
}
