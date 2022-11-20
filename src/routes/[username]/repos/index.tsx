import { component$, Resource } from "@builder.io/qwik";
import { Link, RequestHandler, useEndpoint, useLocation } from "@builder.io/qwik-city";
import { ChevLeftIcon } from "~/icons/chev-left";

import { fetchRepos } from "~/services/api";
import { RepoCard } from "./repo-card";

export default component$(() => {
  const endpointData = useEndpoint();
  const location = useLocation()

  return (
    <Resource
      value={endpointData}
      onPending={() => <div>Loading...</div>}
      onRejected={() => <div>Error</div>}
      onResolved={(repos: any) => (
        <section>
            <Link href={`/${location.params.username}`} class="flex items-center space-x-2">
                <ChevLeftIcon/>
                <h2 class="text-xl font-normal">Repos</h2>
            </Link>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {repos.map((repo: any) => (
              <RepoCard
                id={repo.id}
                name={repo.name}
                description={repo.description}
                isPrivate={repo.private}
                forksCount={repo.forks_count}
                language={repo.language}
                stargazersCount={repo.stargazers_count}
                key={repo.id}
                htmlUrl={repo.html_url}
              />
            ))}
          </div>
        </section>
      )}
    />
  );
});

export const onGet: RequestHandler = async ({ response, params }) => {
  const username = params.username;
  if (!username || username.toString().trim().length === 0) {
    throw response.redirect("/");
  }

  const [ok, data] = await fetchRepos(username.toString());

  if (!ok) {
    throw response.redirect("/");
  }

  return data;
};
