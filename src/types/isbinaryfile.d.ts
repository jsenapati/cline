declare module 'isbinaryfile' {
  export function isBinaryFile(buffer: Buffer | string): Promise<boolean>;
  export function isBinaryFileSync(buffer: Buffer | string): boolean;
}
