export interface IMenuItem {
  url: string;
  label: string;
}
export interface IMenuOptItem {
  options: IMenuItem[];
  label: string;
}

export interface UserI {
  balance: number;
}
