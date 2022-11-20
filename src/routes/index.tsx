import { component$ } from "@builder.io/qwik";
import { RequestHandler } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <section class="max-w-md mx-auto">
      <form method="POST" class="flex flex-col space-y-4">
        <div class="flex flex-col space-y-2">
          <label class="text-gray-600" for="username">
            Github username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="harshmangalam"
          />
        </div>

        <button
          type="submit"
          class="bg-blue-500 text-white font-medium py-3 px-4"
        >
          Continue
        </button>
      </form>
    </section>
  );
});

export const onPost: RequestHandler = async ({ request }) => {
  const formData = await request.formData();
  const username = formData.get("username");

  if (!username || username.toString().trim().length === 0) {
    return {
      error: {
        username: "Username is required!",
      },
    };
  }
};
