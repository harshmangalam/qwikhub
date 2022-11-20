import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div>
      <h1>About</h1>
      <Link href="/" class="text-blue-500">
        Home
      </Link>
    </div>
  );
});
