<p align="center"><b>English</b> · <a href="README.ru.md">Русский</a></p>

Small web products by [Aleksey Imuzov](https://github.com/aimuzov). Each one is a static [Astro](https://astro.build) site with [Svelte](https://svelte.dev) islands, deployed over SSH to a single [Caddy](https://caddyserver.com) server.

## Projects

| Project | What it is | Site |
| --- | --- | --- |
| [codenames](https://github.com/aimuzov-projects/codenames) | Offline Codenames board game PWA: hot-seat or phone-to-phone over WebRTC | [codenames.aimuzov.online](https://codenames.aimuzov.online) |
| [community-taplist](https://github.com/aimuzov-projects/community-taplist) | Digital tap board for a craft beer bar | [taplist.aimuzov.online](https://taplist.aimuzov.online) |
| [prestige-logist](https://github.com/aimuzov-projects/prestige-logist) | Turns a forwarding order (KND 1110486) into a road cargo carriage request (KND 1110361) | [logist.aimuzov.online](https://logist.aimuzov.online) |
| [shkatova-psychologist](https://github.com/aimuzov-projects/shkatova-psychologist) | Website of perinatal psychologist Tatiana Shkatova with an AI assistant for first-session prep | [tatiana-shkatova.ru](https://tatiana-shkatova.ru) |

## Infrastructure

[infra-template-site](https://github.com/aimuzov-projects/infra-template-site) is the template every new site starts from: Prettier, oxlint, stylelint, `node --test`, a check workflow and an SSH deploy workflow.
