# Contributing

The SPDX specification is maintained by the SPDX [legal][spdx-legal] and [tech][spdx-tech] teams.
Design and planning is primarily done via the team [mailing][spdx-legal-list] [lists][spdx-tech-list] and meetings.

## Submitting changes

Always write a clear log message for your commits. One-line messages are fine for small changes, but significant changes should look like this:

    $ git commit -m "Subject of the commit
    > 
    > A paragraph describing what changed and its impact."

A properly formed Git commit subject line should always be able to complete the following sentence: if applied, this commit will "Subject of the commit". For example :

    if applied, this commit will Add chapter on Security Vunerabilities in SPDX
    if applied, this commit will Delete section with deprecated SPDX attributes 
    if applied, this commit will Fix grammar in SPDX 3.3 Package Version

Git itself use this approach. When you merge something it will generate a commit message like "Merge branch...", or when reverting "Revert...".

### Minor Changes
Minor changes such as markup and typo fixes may be submitted directly to this repository (either as [issues][] or [pull-requests][]) without previous discussion.
Please submit all minor changes against the `development/v2.2.1` branch which is the draft of the next version of the SPDX specification to be released.

### Major Changes
Any change that break backwards compatibility or requires significant tooling changes is considered a major change.
You may want to discuss major changes on the mailing list first to get design feedback before investing time in a pull request.
Please submit all major changes against the `development/v3.0` which is the next major version of the specification. 

[issues]: https://github.com/spdx/spdx-spec/issues/
[pull-requests]: https://github.com/spdx/spdx-spec/pulls/
[spdx-legal]: https://wiki.spdx.org/view/Legal_Team
[spdx-legal-list]: https://lists.spdx.org/mailman/listinfo/spdx-legal
[spdx-tech]: https://wiki.spdx.org/view/Technical_Team
[spdx-tech-list]: https://lists.spdx.org/mailman/listinfo/spdx-tech
