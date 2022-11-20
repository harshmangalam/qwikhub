import { component$ } from "@builder.io/qwik";
import { GithubIcon } from "~/icons/github";
import { QwikLogo } from "~/icons/qwik";

export const Appbar = component$(() => {
  return (
    <header class="bg-white border-b border-gray-300 shadow">
      <nav class="h-16 w-full flex items-center justify-between">
        <div>
          <QwikLogo />
        </div>

        <ul>
          <li>
            <a href="github.com" target="_blank">
              <GithubIcon />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
});
