import { component$, Resource } from "@builder.io/qwik";
import { RequestHandler, useEndpoint } from "@builder.io/qwik-city";
import { PageTitle } from "~/components/page-title";
import { UserCard } from "~/components/user-card";

import { fetchFollowers } from "~/services/api";

export default component$(() => {
  const endpointData = useEndpoint();

  return (
    <Resource
      value={endpointData}
      onPending={() => <div>Loading...</div>}
      onRejected={() => <div>Error</div>}
      onResolved={(users: any) => (
        <section>
          <PageTitle title="Followers" />
          <div class={`grid grid-cols-1 md:grid-cols-3 gap-4 mt-6`}>
            {users.map((user: any) => (
              <UserCard
                avatarUrl={user.avatar_url}
                login={user.login}
                type={user.type}
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

  const [ok, data] = await fetchFollowers(username.toString());

  if (!ok) {
    throw response.redirect("/");
  }

  return data;
};
