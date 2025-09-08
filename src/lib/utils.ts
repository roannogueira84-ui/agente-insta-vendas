// src/lib/utils.ts
// util simples para juntar classes sem precisar instalar libs
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
