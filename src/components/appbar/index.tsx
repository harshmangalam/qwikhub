import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { GithubIcon } from "~/icons/github";
import { QwikIcon } from "~/icons/qwik";

export const Appbar = component$(() => {
  return (
    <header class="bg-white border-b border-gray-300 shadow">
      <nav class="max-w-7xl px-4 mx-auto h-16 w-full flex items-center justify-between">
        <Link href="/" class="flex items-center space-x-3">
          <QwikIcon size={36} />
          <h1 class="text-2xl ">Qwikhub</h1>
        </Link>

        <ul>
          <li>
            <a href="https://www.github.com" target="_blank">
              <GithubIcon />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
});
