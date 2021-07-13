export async function requestFollowers(username) {
  const url = `https://api.github.com/users/${username}/followers?per_page=6`;
  const response = await fetch(url)
  return response.json();
}

export async function requestFollowing(username) {
  const url = `https://api.github.com/users/${username}/following?per_page=6`;
  const response = await fetch(url);
  return response.json();
}