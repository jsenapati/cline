declare module 'globby' {
  interface Options {
    cwd?: string;
    absolute?: boolean;
    dot?: boolean;
    ignore?: string[];
    onlyFiles?: boolean;
    expandDirectories?: boolean;
    gitignore?: boolean;
  }

  function globby(patterns: string | string[], options?: Options): Promise<string[]>;
  function globbySync(patterns: string | string[], options?: Options): string[];

  export { globby, globbySync };
}
