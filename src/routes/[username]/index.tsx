import { component$, Resource } from "@builder.io/qwik";
import { RequestHandler, useEndpoint } from "@builder.io/qwik-city";
import { CompanyIcon } from "~/icons/company";
import { LinkIcon } from "~/icons/link";
import { LocationIcon } from "~/icons/location";
import { TwitterIcon } from "~/icons/twitter";
import { UsersIcon } from "~/icons/users";

export default component$(() => {
  const endpointData = useEndpoint();
  return (
    <Resource
      value={endpointData}
      onPending={() => <div>Loading...</div>}
      onRejected={() => <div>Error</div>}
      onResolved={(data:any) => (
        <div class="mt-6">
          <div>
            <img
              src={data.avatar_url}
              alt={data.name}
              class={`w-64 h-64  rounded-full`}
            />

            <div class={`mt-4`}>
              <h2 class={`text-2xl font-bold`}>{data.name}</h2>
              <h2 class={`text-xl text-gray-500`}>{data.login}</h2>
            </div>
            <p class={`mt-4 text-gray-700 max-w-md`}>{data.bio}</p>

            <div class={`mt-4 flex items-center space-x-2`}>
              <a
                href={`/github/${data.login}/followers`}
                class={`flex items-center space-x-1 group`}
              >
                <UsersIcon />
                <p class={`font-medium group-hover:text-blue-500`}>
                  {data.followers}
                </p>
                <p class={`text-gray-600 text-sm group-hover:text-blue-500`}>
                  {data.followers > 1 ? "followers" : "follower"}
                </p>
              </a>
              <span>&bull;</span>
              <a
                href={`/github/${data.login}/followings`}
                class={`flex items-center space-x-1 hover:text-blue-500 group`}
              >
                <p class={`font-medium group-hover:text-blue-500`}>
                  {data.following}
                </p>
                <p class={`text-gray-600 text-sm group-hover:text-blue-500`}>
                  {data.following > 1 ? "followings" : "following"}
                </p>
              </a>
            </div>

            <div class={`mt-4 flex flex-col space-y-2`}>
              {data.company && (
                <InfoItem text={data.company} icon={<CompanyIcon />} />
              )}
              {data.location && (
                <InfoItem text={data.location} icon={<LocationIcon />} />
              )}
              {data.blog && (
                <InfoItem
                  link={data.blog}
                  text={data.blog}
                  icon={<LinkIcon />}
                />
              )}
              {data.twitter_username && (
                <InfoItem
                  link={`https://twitter.com/${data.twitter_username}`}
                  text={`@${data.twitter_username}`}
                  icon={<TwitterIcon />}
                />
              )}
            </div>
          </div>
          <ul class="mt-6">
            {links.map((link) => (
              <li>
                <a
                  href={`/github/${username}/${link.href}`}
                  class=" hover:bg-gray-200 bg-gray-100  px-4 py-2 rounded-full"
                >
                  <span>{link.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    />
  );
});

export const onGet: RequestHandler = async ({ response, params }) => {
  const username = params.username;
  if (!username || username.toString().trim().length === 0) {
    throw response.redirect("/");
  }

  const res = await fetch(`https://api.github.com/users/${username}`);
  const data = await res.json();

  if (!data.login) {
    throw response.redirect("/");
  }

  return data;
};