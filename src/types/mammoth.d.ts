declare module 'mammoth' {
  interface ConversionResult {
    value: string;
    messages: Array<{
      type: string;
      message: string;
    }>;
  }

  interface Options {
    convertImage?: (image: { arrayBuffer: () => Promise<ArrayBuffer> }) => Promise<{ src: string }>;
  }

  function extractRawText(options?: Options): Promise<ConversionResult>;
  function convertToHtml(buffer: Buffer, options?: Options): Promise<ConversionResult>;

  export { convertToHtml, extractRawText };
}
