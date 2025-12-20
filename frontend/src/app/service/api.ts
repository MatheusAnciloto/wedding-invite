export const getInvite = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invites/${id}`);

  if (!res.ok) {
    throw Error("Invite not found");
  }

  const data = await res.json();

  return data as InviteGroup;
};

export const confirmGuest = async (data: GuestConfirmation) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/guest`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!res.ok) {
    throw Error("Guest could not be confirmed");
  }

  const response = await res.json();

  return response;
};
