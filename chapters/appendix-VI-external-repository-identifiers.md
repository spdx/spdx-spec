# Appendix VI: External Repository Identifiers

This specification allows external resources
to be referenced from SPDX documents.
The identifiers are a combination of a category, a type and a locator.

There are currently four defined categories:

* Security
* Package-Manager
* Persistent-Id
* Other

The following sections provide details on the available types
and the locator formats for each of the categories.

## Security

### cpe22Type <a name="cpe22"></a>

Locator Format:

```text
[c][pP][eE]:/[AHOaho]?(:[A-Za-z0-9\._\-~%]*){0,6}
```

Contextual Example:

```text
cpe:/o:canonical:ubuntu_linux:10.04:-:lts
```

External Reference Site: [https://nvd.nist.gov/cpe](https://nvd.nist.gov/cpe)

Documentation: [https://cpe.mitre.org/files/cpe-specification_2.2.pdf](https://cpe.mitre.org/files/cpe-specification_2.2.pdf)

### cpe23Type <a name="cpe23"></a>

Locator Format:

```text
cpe:2\.3:[aho\*\­]
(:(((\?*|\*?)([a­zA­Z0­9\­\._]|(\\[\\\*\?!
"#$$%&'\(\)\+,/:;<=>@\[\]\^`\{\|}~])
)+(\?*|\*?))|[\*\­])){5}
(:(([a­zA­Z]{2,3}(­([a­zA­Z]{2}|[0­9]{3
}))?)|[\*\­]))
(:(((\?*|\*?)([a­zA­Z0­9\­\._]|(\\[\\\*\?!
"#$$%&'\(\)\+,/:;<=>@\[\]\^`\{\|}~])
)+(\?*|\*?))|[\*\­])){4}
```

Contextual Example:

```text
cpe:2.3:o:canonical:ubuntu_linux:10.04:­:lts:*:*:*:*:*
```

External Reference Site: [https://nvd.nist.gov/cpe](https://nvd.nist.gov/cpe)

Documentation: [http://csrc.nist.gov/publications/nistir/ir7695/NISTIR-7695-CPE-Naming.pdf](http://csrc.nist.gov/publications/nistir/ir7695/NISTIR-7695-CPE-Naming.pdf)

## Package-Manager

### maven-central <a name="maven"></a>

Locator Format:

```text
group:artifact[:version]
^[^:]+:[^:]+(:[^:]+)?$
```

Contextual Example:

```text
org.apache.tomcat:tomcat:9.0.0.M4
```

External Reference Site: [http://repo1.maven.org/maven2/](http://repo1.maven.org/maven2/)

Documentation: [https://maven.apache.org](https://maven.apache.org)

### npm <a name="npm"></a>

Locator Format:

```text
package@version
^[^@]+@[^@]+$
```

Contextual Example:

```text
http-server@0.3.0
```

External Reference Site: [https://www.npmjs.com/](https://www.npmjs.com/)

Documentation: [https://docs.npmjs.com/files/package.json](https://docs.npmjs.com/files/package.json)

### nuget <a name="nuget"></a>

Locator Format:

```text
package/version
^[^\/]+\/[^\/]+$
```

Contextual Example:

```text
Microsoft.AspNet.MVC/5.0.0
```

External Reference Site: [https://www.nuget.org/](https://www.nuget.org/)

Documentation: [https://docs.nuget.org/](https://docs.nuget.org/)

### bower <a name="bower"></a>

Locator Format:

```text
package#version
^[^#]+#[^#]+$
```

Contextual Example:

```text
modernizr#2.6.2
```

External Reference Site: [http://bower.io/](http://bower.io/)

Documentation: [http://bower.io/docs/api/#install](http://bower.io/docs/api/#install)

### purl <a name="purl"></a>

Locator Format:

```text
scheme:type/namespace/name@version?qualifiers#subpath
```

Contextual Example:

```text
pkg:docker/debian@sha256:2f04d3d33b6027bb74ecc81397abe780649ec89f1a2af18d7022737d0482cefe
```

External Reference Site: [https://github.com/package-url/purl-spec](https://github.com/package-url/purl-spec)

Documentation: [https://github.com/package-url/purl-spec](https://github.com/package-url/purl-spec)

## Persistent-Id

### swh <a name="swh"></a>

These point to objects present in the Software Heritage archive by the means of
SoftWare Heritage persistent Identifiers (SWHID),
that are guaranteed to remain stable (persistent) over time.
Their syntax is described below.
Note that they are identifiers and not URLs.

A persistent identifier can point to any software artifact (or “object”)
available in the Software Heritage archive.
Objects come in different types, and most notably:

* contents
* directories
* revisions
* releases
* snapshots

The SWHID follow the `swh:` IANA-registered URI scheme.

Grammar for locator format:

```text
<locator> ::= "swh" ":" <scheme_version> ":" <object_type> ":" <object_id> ;
<scheme_version> ::= "1" ;
<object_type> ::= "cnt" | "dir" | "rev" | "rel" | "snp" ;
<object_id> ::= 40 * <hex_digit> ;  *intrinsic object id, as hex-encoded SHA1*
<hex_digit> ::= "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "a" | "b" | "c" | "d" | "e" | "f" ;
```

Examples:

* `swh:1:cnt:94a9ed024d3859793618152ea559a168bbcbb5e2` points to the content of a file containing the full text of the GPL3 license
* `swh:1:dir:d198bc9d7a6bcf6db04f476d29314f157507d505` points to a directory containing the source code of the Darktable photography application as it was at some point on 4 May 2017
* `swh:1:rev:309cf2674ee7a0749978cf8265ab91a60aea0f7d` points to a commit in the development history of Darktable, dated 16 January 2017, that added undo/redo supports for masks
* `swh:1:rel:22ece559cc7cc2364edc5e5593d63ae8bd229f9f` points to Darktable release 2.3.0, dated 24 December 2016
* `swh:1:snp:c7c108084bc0bf3d81436bf980b46e98bd338453` points to a snapshot of the entire Darktable Git repository taken on 4 May 2017 from GitHub

External documentation: [Software Heritage](https://docs.softwareheritage.org/devel/swh-model/persistent-identifiers.html)

## Other

### [idstring] <a name="idstring"></a>

Locator Format:

No spaces, but anything else goes
