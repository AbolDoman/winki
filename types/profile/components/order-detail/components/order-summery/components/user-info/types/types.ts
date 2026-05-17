export interface UserInfoItem {
  id: number;
  label: string;
  value: string | number;
}

export type UserInfoProps = Pick<UserInfoItem, 'label' | 'value'>;

export interface UserInfoSection {
  id: number;
  items: UserInfoItem[];
}
