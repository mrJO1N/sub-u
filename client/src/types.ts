export interface MenuItemI {
  url: string;
  label: string;
}

export interface whenAuthI {
  avatarProps?: {
    menu: MenuItemI[];
  };
}

export interface UserI {
  balance: number;
}
