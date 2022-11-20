export const fetchUser = async (username: string) => {
  const res = await fetch(`https://api.github.com/users/${username}`);
  return [res.ok, await res.json()];
};
