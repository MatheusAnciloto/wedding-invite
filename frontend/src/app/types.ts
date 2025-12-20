interface InviteGroup {
  id: string;
  family_name: string;
  guests: number;
  children: boolean;
}

interface GuestConfirmation {
  firstName: string;
  lastName: string;
  ageGroup: '0-4' | '5-8' | '9+';
}
