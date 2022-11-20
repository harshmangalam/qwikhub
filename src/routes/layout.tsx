import { component$, Slot } from "@builder.io/qwik";
import { Appbar } from "~/components/appbar";

export default component$(() => {
  return (
    <div>
      <Appbar />
      <Slot />
    </div>
  );
});
