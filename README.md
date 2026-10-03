# Tahr

A lightweight framework with templating support, data manipulation and basic UI components.

## What is tahr?

Tahr is a (very) lightweight (meant to be at least) templating engine, and a bit of framework around it to handle (not so simple) single page applications.

## How to use it?

This needs to be described indeed. It will come.

It is being extracted from my [worldcup](https://github.com/sfidanza/worldcup) website, so this is how to use it. ;-D

## Should I use it?

Right now, clearly no.

## Publication flow

```bash
npm version patch # minor / major: to bump package.json, commit and tag
npm pack # to locally generate the tgz
npm login
npm publish --access=public # to publish once logged in (with 2FA)
npm cache clean --force # publication takes a few minutes. Beyond that, clean npm cache.
```

References:
- <https://docs.npmjs.com/creating-and-publishing-scoped-public-packages>
- Automate publication to npm
    * <https://dev.to/mir_mursalin_ankur/publishing-your-first-npm-package-a-real-world-guide-that-actually-helps-4l4>
    * <https://docs.npmjs.com/trusted-publishers>
    * <https://github.com/actions/setup-node/blob/main/docs/advanced-usage.md#publishing-to-npm-with-trusted-publisher-oidc>
