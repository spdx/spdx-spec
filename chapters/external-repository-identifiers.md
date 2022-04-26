# Annex F External repository identifiers (Normative)

## F.1 Introduction <a name="F.1"></a>

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

## F.2 Security <a name="F.2"></a>

It’s recommended practice for SPDX SBOM document creators to include one or more package identifiers (e.g.  CPE, GitBOM, PURL or SWID) when using SPDX external references for the purpose of resolving current security vulnerability information. The specified identifiers are contained in this section, F.2 Security, as well as section F.4.

### F.2.1 cpe22Type <a name="cpe22"></a>

Locator Format:

```text
[c][pP][eE]:/[AHOaho]?(:[A-Za-z0-9\._\-~%]*){0,6}
```

Contextual Example:

```text
cpe:/o:canonical:ubuntu_linux:10.04:-:lts
```

External Reference Site: <https://nvd.nist.gov/cpe>

Documentation: <https://cpe.mitre.org/files/cpe-specification_2.2.pdf>

### F.2.2 cpe23Type <a name="cpe23"></a>

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

External Reference Site: <https://nvd.nist.gov/cpe>

Documentation: <https://nvlpubs.nist.gov/nistpubs/Legacy/IR/nistir7695.pdf>

### F.2.3 advisory <a name="advisory"></a>

Locator Format: URL as defined by <https://www.ietf.org/rfc/rfc1738.txt>.

Contextual Example: <https://nvd.nist.gov/vuln/detail/CVE-2020-28498>.

Documentation: A reference to the published security advisory (where advisory as defined per ISO 29147:2018). It may contain an impact statement whether a package (e.g. a product) is or is not affected by vulnerabilities.

### F.2.4 fix <a name="fix"></a>

Locator Format: URL as defined by <https://www.ietf.org/rfc/rfc1738.txt>

Contextual Example: <https://github.com/indutny/elliptic/commit/441b7428>

Documentation: A reference to the source code with a fix for the vulnerability (e.g., a GitHub commit). 

### F.2.5 url <a name="url"></a>

Locator Format: URL as defined by <https://www.ietf.org/rfc/rfc1738.txt>.

Contextual Example:  <https://github.com/christianlundkvist/blog/blob/master/2020_05_26_secp256k1_twist_attacks/secp256k1_twist_attacks.md>

Documentation: A reference to related security information of unspecified type.

### F.2.6 swid <a name="swid"></a>

Locator format: URI as defined by <https://www.ietf.org/archive/id/draft-ietf-sacm-coswid-21.html#name-uri-schemes>.

Conceptual Example: 2df9de35-0aff-4a86-ace6-f7dddd1ade4c

External Reference Site: <https://csrc.nist.gov/Projects/Software-Identification-SWID>

Documentation: <https://www.ietf.org/archive/id/draft-ietf-sacm-coswid-21.html#section-2.3)>

Note: A binary tag-id should be base64url encoded.

## F.3 Package-Manager <a name="F.3"></a>

### F.3.1 maven-central <a name="maven"></a>

Locator Format:

```text
group:artifact[:version]
^[^:]+:[^:]+(:[^:]+)?$
```

Contextual Example:

```text
org.apache.tomcat:tomcat:9.0.0.M4
```

External Reference Site: <https://repo1.maven.org/maven2/>

Documentation: <https://maven.apache.org>

### F.3.2 npm <a name="npm"></a>

Locator Format:

```text
package@version
^[^@]+@[^@]+$
```

Contextual Example:

```text
http-server@0.3.0
```

External Reference Site: <https://www.npmjs.com>

Documentation: <https://docs.npmjs.com/files/package.json>

### F.3.3 nuget <a name="nuget"></a>

Locator Format:

```text
package/version
^[^\/]+\/[^\/]+$
```

Contextual Example:

```text
Microsoft.AspNet.MVC/5.0.0
```

External Reference Site: <https://www.nuget.org>

Documentation: <https://docs.nuget.org>

### F.3.4 bower <a name="bower"></a>

Locator Format:

```text
package#version
^[^#]+#[^#]+$
```

Contextual Example:

```text
modernizr#2.6.2
```

External Reference Site: <https://bower.io>

Documentation: <https://bower.io/docs/api/#install>

### F.3.5 purl <a name="purl"></a>

Locator Format:

```text
scheme:type/namespace/name@version?qualifiers#subpath
```

Contextual Example:

```text
pkg:docker/debian@sha256:2f04d3d33b6027bb74ecc81397abe780649ec89f1a2af18d7022737d0482cefe
```

External Reference Site: <https://github.com/package-url/purl-spec>

Documentation: <https://github.com/package-url/purl-spec>

## F.4 Persistent-Id <a name="F.4"></a>

### F.4.1 swh <a name="swh"></a>

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

External Reference Site: [Software Heritage persistent IDentifiers](https://docs.softwareheritage.org/devel/swh-model/persistent-identifiers.html)

### F.4.1 gitbom <a name="gitbom"></a>

Locator Format: gitoid":"\<git object type>":"\<hash algorithm>":"\<hash value>
	
Contextual Example: gitoid:blob:sha1:261eeb9e9f8b2b4b0d119366dda99c6fd7d35c64

External Reference Site: <https://gitbom.dev/>

Documentation: GitBOM uses a similar algorithm as Git to uniquely identify files by using their 40-byte hash. Gitoid stands for Git Object ID.  Git is an object store, see <https://git-scm.com/book/en/v2/Git-Internals-Git-Objects>.

## F.5 Other <a name="F.5"></a>

### F.5.1 [idstring] <a name="idstring"></a>

Locator Format:

No spaces, but anything else goes
