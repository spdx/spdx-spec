# Appendix VII: Version-Control URIs

Version-control systems (VCSs) are encouraged to [register a URI scheme][iana-schemes] for their system.
This appendix defines a URI scheme (based on [pip's][pip-vcs]) that can be used in the absence of such registration.
The exact syntax of license expressions is described below in [ABNF][rfc5234].
`ALPHA` is from the [ABNF core rules][rfc5234-aB].
[`scheme`][rfc3986-s3.1], [`authority`][rfc3986-s3.2], [`path-abempty`][rfc3986-s3.3], and [`fragment`][rfc3986-s3.5] are from [RFC 3986][rfc3986].

```
vcs-uri = vcs-tool ["+" transport] "://" authority path-abempty ["#" fragment]
vcs-tool = 1*ALPHA
transport = scheme
```

If the final [segment][rfc3986-s3.3] of `path-abempty` includes a `@`, the portion after the final `@` represents the tag, branch, or commit hash.
Trailing slashes in `path-abempty` are not significant.

If `fragment` is non-empty, it represents a sub-path within the referenced filesystem.
Leading and trailing slashes in `fragment` are not significant.

Authors are encouraged to use `@` and `fragment` to make their reference as specific as possible.

`vcs-tool` may be extended as needed, but this specification defines the following values:

* `bzr` for [Bazaar][].
* `git` for [Git][].
* `hg` for [Mercurial][].
* `svn` for [Subversion][].

`transport` is the [IANA-registered scheme][iana-schemes] used for VCS retrieval.

VCS URI consumers are not required to support [user names and passwords][rfc3986-s3.2.1] in `authority` and may reject URIs which include them.

## VII.1 Git <a name="VII.1"></a>

VCS URI consumers should support the following URI [schemes][rfc3986-s3.1] (`vcs-tool ["+" transport]`):

* `git` for the pack transfer service, generally on [port 9418][iana-ports].
* `git+git`, a deprecated synonym for `git`.
* `git+http` for Git over [HTTP][rfc7230-s2.7.1], generally on [port 80][rfc7230-s2.7.1].
* `git+https` for Git over [HTTPS][rfc7230-s2.7.2], generally on [port 443][rfc7230-s2.7.2].
* `git+ssh` for Git over [SSH][rfc4251], generally on [port 22][rfc4253-s4.1].

Examples:

* `git://example.net/MyProject`: the `MyProject` repository from `example.net` over `git`.
* `git+git://example.net/MyProject`: this form is semantically equivalent to the previous entry.
* `git+https://example.net/MyProject.git`: the `MyProject.git` repository from `example.net` over `git`.
    The server may decide to treat `MyProject.git` as a synonym for `MyProject` or not, depending on its configuration.
    For example, see [`git-daemon`][git-daemon.1]'s `--strict-paths`.
* `git+http://example.net/MyProject`: the `MyProject` repository from `example.net` over `git+http`.
* `git+ssh://example.net/MyProject.git`: the `MyProject.git` repository from `example.net` over `git+ssh`.
* `git://example.net/MyProject#src/somefile.c`: the `src/somefile.c` file from the `MyProject` repository from `example.net` over `git`.
* `git+https://example.net/MyProject#src/Class.java`: the `src/Class.java` file from the `MyProject` repository from `example.net` over `git+https`.
* `git://example.net/MyProject.git@master`: the `master` branch (or tag) of the `MyProject.git` repository from `example.net` over `git`.
* `git+https://example.net/MyProject.git@v1.0`: the `v1.0` tag (or branch) of the `MyProject.git` repository from `example.net` over `git+https`.
* `git://example.net/MyProject.git@da39a3ee5e6b4b0d3255bfef95601890afd80709`: the `da39a3ee5e6b4b0d3255bfef95601890afd80709` commit (or branch, or tag) of the `MyProject.git` repository from `example.net` over `git`.
* `git+https://example.net/MyProject.git@master#/src/MyClass.cpp`: the `src/MyClass.cpp` file from the `master` branch (or tag) of the `MyProject.git` repository from `example.net` over `git+https`.
* `git+https://example.net/MyProject@da39a3ee5e6b4b0d3255bfef95601890afd80709#lib/variable.rb`: the `lib/variable.rb` file from the `da39a3ee5e6b4b0d3255bfef95601890afd80709` commit (or branch, or tag) of the `MyProject` repository from `example.net` over `git+https`.

## VII.2 Mercurial <a name="VII.2"></a>

VCS URI consumers should support the following URI [schemes][rfc3986-s3.1] (`vcs-tool ["+" transport]`):

* `hg+http` for Mercurial over [HTTP][rfc7230-s2.7.1], generally on [port 80][rfc7230-s2.7.1].
* `hg+https` for Mercurial over [HTTPS][rfc7230-s2.7.2], generally on [port 443][rfc7230-s2.7.2].
* `hg+satic-http`, deprecated. [Mecurial 1.1 and later can detect this automatically][mercurial-static-http], so unless you need to support ancient ([~2008][mercurial-1.1]) clients you should use `hg+http` or `hg+https`.
* `hg+ssh` for Mercurial over [SSH][rfc4251], generally on [port 22][rfc4253-s4.1].

Examples:

* `hg+http://example.net/MyProject`: the `MyProject` repository from `example.net` over `hg+http`.
* `hg+https://example.net/MyProject`: the `MyProject` repository from `example.net` over `hg+https`.
* `hg+ssh://example.net/MyProject`: the `MyProject` repository from `example.net` over `hg+ssh`.
* `hg+https://example.net/MyProject#src/somefile.c`: the `src/somefile.c` file from the `MyProject` repository from `example.net` over `hg+https`.
* `hg+https://example.net/MyProject#src/Class.java`: the `src/Class.java` file from the `MyProject` repository from `example.net` over `hg+https`.
* `hg+https://example.net/MyProject@da39a3ee5e6b`: the `da39a3ee5e6b` commit (or branch, or tag) of the `MyProject` repository from `example.net` over `hg+https`.
* `hg+https://example.net/MyProject@v1.0`: the `v1.0` tag (or branch) of the `MyProject` repository from `example.net` over `hg+https`.
* `hg+https://example.net/MyProject@special_feature`: the `special_feature` branch (or tag) of the `MyProject` repository from `example.net` over `hg+https`.
* `hg+https://example.net/MyProject@master#/src/MyClass.cpp`: the `src/MyClass.cpp` file from the `master` branch (or tag) of the `MyProject` repository from `example.net` over `hg+https`.
* `hg+https://example.net/MyProject@da39a3ee5e6b#lib/variable.rb`: the `lib/variable.rb` file from the `da39a3ee5e6b` commit (or branch, or tag) of the `MyProject` repository from `example.net` over `hg+https`.

## VII.3 Subversion <a name="VII.3"></a>

VCS URI consumers should support the following URI [schemes][rfc3986-s3.1] (`vcs-tool ["+" transport]`):

* `svn` for the Subversion service, generally on [port 3690][iana-ports].
* `svn+svn`, a deprecated synonym for `svn`.
* `svn+http` for Subversion over [HTTP][rfc7230-s2.7.1], generally on [port 80][rfc7230-s2.7.1].
* `svn+https` for Subversion over [HTTPS][rfc7230-s2.7.2], generally on [port 443][rfc7230-s2.7.2].
* `svn+ssh` for Subversion over [SSH][rfc4251], generally on [port 22][rfc4253-s4.1].

Examples:

* `svn://example.net/MyProject`: the `MyProject` repository from `example.net` over `svn`.
* `svn+svn://example.net/MyProject`: this form is semantically equivalent to the previous entry.
* `svn+http://example.net/MyProject/trunk`: the `trunk` branch of the `MyProject` repository from `example.net` over `svn+http`.
* `svn+https://example.net/MyProject/trunk`: the `trunk` branch of the `MyProject` repository from `example.net` over `svn+https`.
* `svn+https://example.net/MyProject#src/somefile.c`: the `src/somefile.c` file from the `MyProject` repository from `example.net` over `svn+https`.
* `svn+https://example.net/MyProject#src/Class.java`: the `src/Class.java` file from the `MyProject` repository from `example.net` over `svn+https`.
* `svn+https://example.net/MyProject/trunk#src/somefile.c`: the `src/somefile.c` file from the `trunk` branch of the `MyProject` repository from `example.net` over `svn+https`.
* `svn+https://example.net/MyProject/trunk/src/somefile.c`: this form is semantically equivalent to the previous entry.
* `svn+https://example.net/MyProject/trunk@2019`: the `2019` revision of the `trunk` branch of the `MyProject` repository from `example.net` over `svn+https`.
* `svn+https://example.net/MyProject@123#/src/MyClass.cpp`: the `src/MyClass.cpp` file from the `123` revision of the `MyProject` repository from `example.net` over `svn+https`.
* `svn+https://example.net/MyProject/trunk@1234#lib/variable.rb`: the `lib/variable.rb` file from the `1233` revision of the `trunk` branch of the `MyProject` repository from `example.net` over `svn+https`.

## VII.4 Bazaar <a name="VII.4"></a>

VCS URI consumers should support the following URI [schemes][rfc3986-s3.1] (`vcs-tool ["+" transport]`):

* `bzr+http` for Bazaar over [HTTP][rfc7230-s2.7.1], generally on [port 80][rfc7230-s2.7.1].
* `bzr+https` for Bazaar over [HTTPS][rfc7230-s2.7.2], generally on [port 443][rfc7230-s2.7.2].
* `bzr+ssh` for Bazaar over [SSH][rfc4251], generally on [port 22][rfc4253-s4.1].
* `bzr+sftp` for Bazaar over [SFTP][sftp-draft-13], generally on [port 22][rfc4253-s4.1].
* `bzr+ftp` for Bazaar over [FTP][rfc-959], generally on ports [20][rfc-959-p18] and [21][rfc-959-s8].
* `bzr+lp` for Bazaar from [Launchpad][bzr-lp].

Examples:

* `bzr+http://example.net/MyProject/trunk`: the `trunk` branch of the `MyProject` repository from `example.net` over `bzr+http`.
* `bzr+https://example.net/MyProject/trunk`: the `trunk` branch of the `MyProject` repository from `example.net` over `bzr+https`.
* `bzr+sftp://example.net/MyProject/trunk`: the `trunk` branch of the `MyProject` repository from `example.net` over `bzr+sftp`.
* `bzr+ssh://example.net/MyProject/trunk`: the `trunk` branch of the `MyProject` repository from `example.net` over `bzr+ssh`.
* `bzr+ftp://example.net/MyProject/trunk`: the `trunk` branch of the `MyProject` repository from `example.net` over `bzr+ftp`.
* `bzr+lp:MyProject`: the `MyProject` repository from Launchpad.
* `bzr+https://example.net/MyProject/trunk#src/somefile.c`: the `src/somefile.c` file from the `trunk` branch of the `MyProject` repository from `example.net` over `svn+https`.
* `bzr+https://example.net/MyProject/trunk#src/Class.java`: the `src/Class.java` file from the `trunk` branch of the `MyProject` repository from `example.net` over `svn+https`.
* `bzr+https://example.net/MyProject/trunk@2019`: the `2019` revision of the `trunk` branch of the `MyProject` repository from `example.net` over `bzr+https`.
* `bzr+http://example.net/MyProject/trunk@v1.0`: the `v1.0` tag of the `trunk` branch of the `MyProject` repository from `example.net` over `bzr+http`.
* `bzr+https://example.net/MyProject/trunk@2019#src/somefile.c`: the `src/somefile.c` file from the `2019` revision of the `trunk` branch of the `MyProject` repository from `example.net` over `svn+https`.

[Bazaar]: https://bazaar.canonical.com/
[Git]: https://git-scm.com/
[git-daemon.1]: https://git-scm.com/docs/git-daemon
[iana-ports]: https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xml
[iana-schemes]: https://www.iana.org/assignments/uri-schemes/uri-schemes.xhtml
[bzr-lp]: http://doc.bazaar.canonical.com/bzr.2.7/en/tutorials/using_bazaar_with_launchpad.html#getting-the-code-for-a-project
[Mercurial]: https://www.mercurial-scm.org/
[mercurial-1.1]: https://www.mercurial-scm.org/repo/hg-stable/rev/1.1
[mercurial-static-http]: https://www.mercurial-scm.org/wiki/StaticHTTP
[pip-vcs]: https://pip.pypa.io/en/stable/reference/pip_install/#vcs-support
[rfc959]: https://tools.ietf.org/html/rfc959
[rfc959-p18]: https://tools.ietf.org/html/rfc959#page-18
[rfc959-s8]: https://tools.ietf.org/html/rfc959#section-8
[rfc3986]: https://tools.ietf.org/html/rfc3986
[rfc3986-s3.1]: https://tools.ietf.org/html/rfc3986#section-3.1
[rfc3986-s3.2]: https://tools.ietf.org/html/rfc3986#section-3.2
[rfc3986-s3.2.1]: https://tools.ietf.org/html/rfc3986#section-3.2.1
[rfc3986-s3.3]: https://tools.ietf.org/html/rfc3986#section-3.3
[rfc3986-s3.5]: https://tools.ietf.org/html/rfc3986#section-3.5
[rfc4251]: https://tools.ietf.org/html/rfc4251
[rfc4253-s4.1]: https://tools.ietf.org/html/rfc4253#section-4.1
[rfc5234]: http://tools.ietf.org/html/rfc5234
[rfc5234-aB]: https://tools.ietf.org/html/rfc5234#appendix-B
[rfc7230-s2.7.1]: http://tools.ietf.org/html/rfc7230#section-2.7.1
[rfc7230-s2.7.2]: http://tools.ietf.org/html/rfc7230#section-2.7.2
[sftp-draft-13]: https://tools.ietf.org/html/draft-ietf-secsh-filexfer-13
[Subversion]: https://subversion.apache.org/
