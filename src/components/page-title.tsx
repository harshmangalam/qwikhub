import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { ChevLeftIcon } from "~/icons/chev-left";

export const PageTitle = component$(({ title }: { title: string }) => {
  const location = useLocation();
  return (
    <a
      href={`/${location.params.username}`}
      class="flex items-center space-x-2"
    >
      <ChevLeftIcon />
      <h2 class="text-xl font-normal">{title}</h2>
    </a>
  );
});
