# Contributing

## Commit message guidelines

Releases and changelogs are generated from commit messages, so it is imperative
that all commit messages follow the [Conventional Commits][] format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Based on a change's commit message, [semantic-release][] will determine whether
or not the change warrants a release, and if so, the package version will be
bumped based on the commits's _type_:

  1. **fix:**: a commit of _type_ `fix` will bump the PATCH version.
  2. **feat:**: a commit of _type_ `feat` will bump the MINOR version.
  3. **BREAKING CHANGE:** a commit that has a footer `BREAKING CHANGE:` will
     bump the MAJOR version.
  4. _types_ other than those above will not bump any version.

### Description

> The description is a short summary of the code changes

  * Use the imperative, present tense: "change" not "changed" nor "changes".
  * Don't capitalize the first letter.
  * No period/dot (.) at the end.

### Body

> A longer commit body MAY be provided after the short description, providing
> additional contextual information about the code changes.

Just as in the change's description, use the imperative, present tense: "change"
not "changed" nor "changes". The body should include the motivation for the
change and contrast this with previous behavior.



   [Conventional Commits]: https://www.conventionalcommits.org
   [semantic-release]: https://github.com/semantic-release/semantic-release
