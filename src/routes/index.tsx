import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import { UsersIcon } from "~/icons/users";

export default component$(() => {
  return (
    <div>
      Hello Home
      <Link href="/about">About</Link>
      <Link href="/flower">Flower</Link>

      <UsersIcon size={32} />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
