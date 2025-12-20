type AgeGroup = "0-4" | "5-8" | "Adulto";

interface GuestList {
  id: string;
  invite_id: string;
  first_name: string;
  last_name: string;
  age_range: AgeGroup
}

interface InviteGroup {
  id: string;
  family_name: string;
  guests: number;
  children: boolean;
  confirmed_guests: GuestList[];
}

interface GuestConfirmation extends Omit<GuestList, 'id'>{};
