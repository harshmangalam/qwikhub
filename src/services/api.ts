const endpoint = "https://api.github.com";
export const fetchUser = async (username: string) => {
  const res = await fetch(`${endpoint}/users/${username}`);
  return [res.ok, await res.json()];
};

export const fetchRepos = async (username: string) => {
  const res = await fetch(`${endpoint}/users/${username}/repos`);
  return [res.ok, await res.json()];
};
