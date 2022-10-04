<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://theme.tekcloud.com/prod/github/is-logo-dark-mode.svg" width="250px">
  <source media="(prefers-color-scheme: light)" srcset="https://theme.tekcloud.com/prod/github/is-logo-light-mode.svg" width="250px">
  <img alt="IS Logo" src="https://theme.tekcloud.com/prod/github/is-logo-light-mode.svg" width="250px">
</picture>

# Check for Files Action

<p>
  <a href="https://github.com/actions/javascript-action/actions"><img alt="javscript-action status" src="https://github.com/actions/javascript-action/workflows/units-test/badge.svg"></a>
</p>

> An internal action designed to check a repository for certain files and in some cases check their contents

This action is designed to check for files like `README` and `CODEOWNERS` to ensure repositories pass a "linting" check.

## Getting Started

To use this action, just add it as a step in a job:

```
- name: Check for FILE
        id: file_name
        uses: initialstate/file-check-action@v1
        with:
          file: "PATH/TO/FILE"
```

## Basic Usage

It should work regardless of file extension, so for files with multiple extension options (README.md, README, README.txt) just provide the path without a file extension:

` file: "README"`

Current extensions that are supported include `.md`, `.txt`, `.rst`, `-MIT`, and `-APACHE`

For `CODEOWNERS` files specifically, the action will check for a global owner and throw an error if one is not found.

## Examples

Here is a working example to check for a license file:

```
  check-for-license:
    runs-on: ubuntu-latest
    steps:

      - name: Checkout repo
        uses: actions/checkout@v3

      - name: Check for LICENSE.md
        id: license_file
        uses: initialstate/file-check-action@v1
        with:
          file: "LICENSE"

      - name: LICENSE file Output Test
        run: echo ${{ steps.license_file.outputs.file_exists }}

      - name: LICENSE file exists with content
        if: steps.license_file.outputs.file_exists == 'true'
        run: echo LICENSE file exists!

      - name: LICENSE file does not exist
        if: steps.license_file.outputs.file_exists == 'false'
        run: echo LICENSE file does not exist!
```

You can find an example of a full repo-lint workflow here: [best-practice-resources/.github/workflows/is-repo-lint.yml](https://github.com/initialstate/best-practice-resources/blob/master/.github/workflows/is-repo-lint.yml)

------

See the [actions tab](https://github.com/initialstate/file-check-action/actions) for runs of this action! :rocket:

------

## Licensing

The code in this project is licensed under Apache 2.0
