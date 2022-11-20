import { component$, Resource } from "@builder.io/qwik";
import { RequestHandler, useEndpoint } from "@builder.io/qwik-city";
import { fetchUser } from "~/services/user";

export default component$(() => {
  const endpointData = useEndpoint<ReturnType<typeof onPost>>();
  return (
    <Resource
      value={endpointData}
      onPending={() => <div>Loading...</div>}
      onRejected={() => <div>Error</div>}
      onResolved={(data: any) => (
        <section class=" max-w-md mx-auto">
          <form method="POST" class="flex flex-col space-y-4">
            <div class="flex flex-col space-y-2">
              <label
                class={`text-gray-600 ${
                  data?.error?.username ? "text-red-500 " : ""
                }`}
                for="username"
              >
                Github username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="harshmangalam"
                class={`${data?.error?.username ? "border-red-500" : ""}`}
              />
              {data?.error && (
                <p class="text-red-500 text-sm ">{data.error.username}</p>
              )}
            </div>

            <button
              type="submit"
              class="bg-blue-500 text-white font-medium py-3 px-4"
            >
              Continue
            </button>
          </form>
          {data?.error?.message && (
            <div class="mt-6 border border-red-300 text-red-500 p-4">
              <p>{data.error.message}</p>
              {data.error.documentation_url && (
                <a
                  href={data.error.documentation_url}
                  target="_blank"
                  class="text-blue-500 mt-2 block"
                >
                  View details
                </a>
              )}
            </div>
          )}
        </section>
      )}
    />
  );
});

export const onPost: RequestHandler = async ({ request, response }) => {
  const formData = await request.formData();
  const username = formData.get("username");

  if (!username || username.toString().trim().length === 0) {
    return {
      error: {
        username: "Username is required!",
      },
    };
  }

  const [ok, data] = await fetchUser(username.toString());

  if (!ok) {
    return {
      error: data,
    };
  }

  throw response.redirect(`/${username}`);
};
