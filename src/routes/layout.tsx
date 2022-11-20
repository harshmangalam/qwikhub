import { component$, Slot } from "@builder.io/qwik";
import { Appbar } from "~/components/appbar";

export default component$(() => {
  return (
    <div>
      <Appbar />
      <main class="max-w-7xl w-full mx-auto px-4 py-6">
        <Slot />
      </main>
    </div>
  );
});
