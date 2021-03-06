//* We need to tell TypeScript that when we write "import styles from './styles.scss'
//* we mean to load a module (to look for a './styles.scss.d.ts').
//* Failing otherwise in testing
declare module "*.scss" {
  const content: { [className: string]: string };
  export = content;
}
