# Troy's Parcel Template

[Parcel](https://parceljs.org/getting_started.html)

## Setup

1. clone the repo
1. run `yarn`
1. edit the meta properties
   - name, version, description, author, and potentially the `deploy` command(s) in `package.json`
   - title and meta description in `index.html`
   - change the favicon in the static folder

## Running Locally

There are 2 ways to run the app locally:

- `yarn dev`
- `yarn prod`

`dev` uses `Parcel`'s development config (with their internal dev server and hot reloading) while `prod` builds a production build of the app and serves that. `dev` is what should be used for regular development, `prod` should be used to check for things like lighthouse score and anything else that would change depending on production optimizations.

`dev` hosts to `localhost:1234` while `prod` hosts to `localhost:1235` so that both can be run simultaneously.

## Development

This template uses [`Prettier`](https://prettier.io/docs/en/index.html) and [`eslint`](https://eslint.org/) to maintain style and consistency. For best results, make sure your editor has its respective `Prettier` and `eslint` plugins installed and set to format on save. The `.vscode` folder included with this repo _should_ set this up automatically for you, but if you aren't using vscode you'll need to set that up yourself.

## Deploying

By default, this template assumes you're going to be deploying to github pages. If you plan on using custom hosting, you'll need to update the `deploy` command to fit your setup. If, however, you're cool with using github pages, read on.

There are two `deploy` commands in this repo. `deploy:only_first` should only be used the FIRST TIME you deploy. Subsequent deploys should use the `deploy` command.

The `deploy` command combines information from [this gist](https://gist.github.com/cobyism/4730490) and [this blog post](https://clontz.org/blog/2014/05/08/git-subtree-push-for-deployment/). Essentially, we're taking our `main` branch (check this! your default branch might be `master`, in which case you'll need to update the command or your branch name!), copying ONLY the `dist` folder where our build lives (and is created automatically by the command) and pushing that to our `gh-pages` branch, which github knows to automatiaclly deploy to a github pages page.

The reason we need a `deploy:only_first` command is that the `deploy` command will fail if the `gh-pages` branch doesn't exist. `deploy:only_first` creates and pushes this branch, then immediately runs the regular deploy command to overwrite it with the `dist` folder. `deploy:only_first` will also delete your `node_modules` folder and then re-install it, since occassionally `Parcel` will fail to build initially if your `node_modules` folder is out of date. Note that if `deploy:only_first` gets as far as creating and pushing the `gh-pages` branch (which it almost certainly will) and then errors or crashes, you still need to switch to the `deploy` command after you've fixed your errors.

To summarize:

- `npm run deploy:only_first` to deploy the first time
- `npm run deploy` to deploy every subsequent time
