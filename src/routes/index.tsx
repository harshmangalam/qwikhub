import { component$, Resource } from "@builder.io/qwik";
import { RequestHandler, useEndpoint } from "@builder.io/qwik-city";

export default component$(() => {
  const endpointData = useEndpoint<ReturnType<typeof onPost>>();
  return (
    <Resource
      value={endpointData}
      onPending={() => <div>Loading...</div>}
      onRejected={() => <div>Error</div>}
      onResolved={(data) => (
        <form method="POST" class="flex flex-col space-y-4 max-w-md mx-auto">
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

          <pre>{JSON.stringify(data, null, 4)}</pre>
        </form>
      )}
    />
  );
});

export const onPost: RequestHandler = async ({ request ,response}) => {
  const formData = await request.formData();
  const username = formData.get("username");

  if (!username || username.toString().trim().length === 0) {
    return {
      error: {
        username: "Username is required!",
      },
    };
  }

  const res = await fetch(`https://api.github.com/users/${username}`);
  const data = await res.json();

  if (!data.login) {
    return {
      error: {
        username: "Username is invalid!",
      },
    };
  }

  throw response.redirect(`/${username}`)
  
};
