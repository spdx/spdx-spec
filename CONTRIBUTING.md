# Contributing

The SPDX specification is maintained by the SPDX [legal][spdx-legal] and
[tech][spdx-tech] teams.
Design and planning is primarily done via the team [mailing][spdx-legal-list]
[lists][spdx-tech-list] and [meetings][meetings].

## Contribution License Agreement

Contributions to this repo are made pursuant to the
[SPDX Community Specification Contributor License Agreement 1.0][cla]. You do
not need to submit a signed copy of the contributor license agreement; by
making a contribution to this repo, you agree to the terms set forth in that
agreement.

## Submitting changes

Always write a clear log message for your commits. One-line messages are fine
for small changes, but significant changes should look like this:

```shell
$ git commit -m "Subject of the commit
>
> A paragraph describing what changed and its impact.
>
> Signed-off-by: Contributor Name <name@example.com>"
```

Every commit message also needs a sign-off line, or it will not pass a test in
the workflow. This line starts with `Signed-off-by:` and specifies the name and
the email address of the person who submitted the changes. You can also use the
`-s` or `--signoff` option with `git commit` to automatically append the line
to your commit message (it will use `user.name` and `user.email` from your
`.git/config` configuration file).

A properly formed Git commit subject line should always be able to complete the
following sentence: if applied, this commit will "Subject of the commit".

For example :

```text
if applied, this commit will Add chapter on Security Vulnerabilities in SPDX
if applied, this commit will Delete section with deprecated SPDX attributes 
if applied, this commit will Fix grammar in Package Version field description
```

Git itself uses this approach. When you merge something it will generate a
commit message like "Merge branch...", or when reverting "Revert...".

### Minor Changes

Minor changes such as markup and typo fixes may be submitted directly to this
repository (either as [issues][] or [pull-requests][]) without previous
discussion.

Please submit all minor changes against the `development/v3.0.1` branch which
is the current development version of the SPDX specification.

### Major Changes

Any change that break backwards compatibility or requires significant tooling
changes is considered a major change.
You may want to discuss major changes on the mailing list first to get design
feedback before investing time in a pull request.

Please submit all major changes against the `development/v3.1` which is the
next major version of the specification.

### Target Milestones

When submitting an issue or pull request, please add a suggested release
milestone. This will ensure the issue or pull request is reviewed for inclusion
in that release.

If your issue or pull request is independent of a release, you can use the
`release-independent` milestone.

[cla]: https://github.com/spdx/governance/blob/main/0._SPDX_Contributor_License_Agreement.md
[issues]: https://github.com/spdx/spdx-spec/issues/
[meetings]: https://github.com/spdx/meetings/
[pull-requests]: https://github.com/spdx/spdx-spec/pulls/
[spdx-legal]: https://wiki.spdx.org/view/Legal_Team
[spdx-legal-list]: https://lists.spdx.org/mailman/listinfo/spdx-legal
[spdx-tech]: https://wiki.spdx.org/view/Technical_Team
[spdx-tech-list]: https://lists.spdx.org/mailman/listinfo/spdx-tech
