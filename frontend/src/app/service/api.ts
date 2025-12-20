export const getInvite = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invites/${id}`);

  if (!res.ok) {
    throw Error("Invite not found");
  }

  const data = await res.json();

  return data as InviteGroup;
};
