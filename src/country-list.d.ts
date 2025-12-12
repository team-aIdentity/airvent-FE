declare module "country-list" {
  export interface Country {
    code: string;
    name: string;
  }

  export function getData(): Country[];
  export function getNameList(): Record<string, string>;
  export function getCodeList(): Record<string, string>;
  export function getName(code: string): string | undefined;
  export function getCode(name: string): string | undefined;
  export function getNames(): string[];
  export function getCodes(): string[];
  export function overwrite(countries: Country[]): void;
}
