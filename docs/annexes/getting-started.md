# Annex B: Getting started writing SPDX 3 (Informative)
## (a.k.a My First SPDX File)

This guide is designed to walk you through the concepts behind an SPDX
document, by walking through writing one by hand. While it is possible to write
all your SPDX documents by hand, we would recommend looking at the various
language bindings that are available for crafting more complex documents.
Nevertheless, walking through an example of a hand written document can be
instructive into how SPDX documents work to better understand concepts that are
at play, even when using language bindings.

All of the provided fragments listed here are intended to be used to construct
a complete a valid SPDX JSON document when concatenated together

If you do would like to construct the complete example from this Markdown file,
use the following command:

```shell
cat getting-started.md | awk '/^```json/, $0=="```" {if ($0 !~ /^```.*/ ) print}'
```

Please note that all descriptions of properties, classes, etc. are
non-normative; that is they are intended to help you understand what is going
on in simpler language, but are not necessarily complete. Links to the full
official documentation are provided where possible.

## The Preamble

All documents need to start somewhere, and SPDX documents are no exception.

The root of all SPDX documents will be a JSON object, so start with that:
```json
{
```

Next, we need to identify that the document is an SPDX 3 JSON-LD document, which is done with:
```json
    "@context": "https://spdx.org/rdf/3.0.0/spdx-context.jsonld",
```
SPDX documents are designed to be a strict subset of [JSON-LD][1], such that
they can be parsed using either a full JSON-LD parser if you need the full
power of [linked documents][2] or [RDF][3], or a much simpler JSON parser if
all you care about is extracting meaningful SPDX data from the document.

Because the document is valid JSON-LD, the `@context` must be provided to tell
the JSON-LD parser how to expand the human readable names in the document into
full IRIs (don't worry if you don't know what that means, it's not really that
important). You can think of this line as telling us "This is an SPDX document,
and this provided URL tells us how to decode it". The [SPDX JSON
Schema][spdxjsonschema] will force you to put the correct value here when
validating a document.


Now, we need to specify the list of objects that we want to create in this
document. JSON-LD has a special way of specifying this list using the `@graph`
property of the root object like so:
```json
    "@graph": [
```


## Tell us about yourself

Our first SPDX object is going to be a [Person][Class_Person] that tells us who
is writing this document (you!), so lets get started with it:

```json
        {
            "type": "Person",
```

This is the basic format for any object in SPDX; all objects have one required
property named `type` that tells us what this object actually is, so here we
say this is a [Person][Class_Person].

Next, we need to name our object:
```json

            "spdxId": "http://spdx.example.com/Person/JoshuaWatt",
```

Most objects can have some sort of "ID" property that gives it a name. In the
case of [Person][Class_Person], that property is called `spdxId` (inherited
from [Element][Class_Element]). This property is the URI that should give this
object a universally unique name. Although this property _looks_ like a HTTP
URL, it is in fact not. Technically speaking, a URL defined a _Location_, where
as a URI defines an _Identifier_ (i.e. the name by which something is known).
In all likelihood, a URI is not a resolvable location from whence you can do an
HTTP `GET` to retrieve data, but rather just a way of constructing a namespaced
identifier. This identifier can be used within this document to refer to this
object (more on that later), or it can be referenced from other documents to
refer to this _specific_ object (although in that case there needs to be
additional information to describe how to find this document). URI's are
considered to be universally unique, so any objects constructed with this URI
are considered to be the same object, and any references to this URI is a
reference to this _specific_ object we are creating.

If you work for a company, own a domain, etc. it is encouraged to use that (or
some subdomain of it) in place of `spdx.example.com`.

In practice, many `spdxId` values will have some sort of hash or random
UUID-like string incorporated to make them unique.

Moving on from this, we have:
```json
            "creationInfo": "_:creationinfo",
```

All SPDX objects derived from [Element][Class_Element] _must_ specify how they
were created by _linking_ to a [CreationInfo][Class_CreationInfo] object. It is
important to know the providence of where objects come from; but more on this
later.

```json
            "name": "Joshua Watt",
```

The optional [name][Property_name] property is inherited from the `Element`
class, and means "the common name for the thing", or in this case, your name.

As our last step, we want to indicate another way by which You are known to the
world; specifically your E-mail address.

To do this we first need to use the (optional)
[externalIdentifier][Property_externalIdentifier] property which
[Person][Class_Person] inherits from [Element][Class_Element]:

```json
            "externalIdentifier": [
```

This property is an array of [ExternalIdentifier][Class_ExternalIdentifier]
objects, so start by adding one to the array:

```json
                {
                    "type": "ExternalIdentifier",
```

Again notice this uses the `type` property to identify what the object is.
However it should be noted that this is our first object that is not derived
from [Element][Class_Element], and therefore it does not need a `spdxId`
property.

Next, lets add the relevant information about your email address:

```json
                    "externalIdentifierType": "email",
                    "identifier": "JPEWhacker@gmail.com"
```

Two properties are used here. First,
[externalIdentifierType][Property_externalIdentifierType] is used to indicate
what type of external identifier this is. There are many choices, but in the
case we are specifying your email address, so we choose the value `email`. The
second property is the [indentifier][Property_identifier] property which is the
actual string identifier (in this case, your email address).


We are now done with our [Person][Class_Person], so close it all out and
prepare for the next object:

```json
                }
            ]
        },
```


## Where did all this stuff come from?

Our next object is going to be a [CreationInfo][Class_CreationInfo] object. It
is required to provide one for every SPDX document, as all objects derived from
[Element][Class_Element] must link to one in their
[creationInfo][Property_creationInfo] property to indicate where they came
from.

Note that the [CreationInfo][Class_CreationInfo] describes where a SPDX
[Element][Class_Element] itself came from (that is, who wrote the actual JSON).
This is a distinct concept from describing where the thing an
[Element][Class_Element] _describes_ comes from, which is covered later.

Lets get started:
```json
        {
            "type": "CreationInfo",
```
Hopefully this is making sense. We are saying this object is a
[CreationInfo][Class_CreationInfo].

```json
            "@id": "_:creationinfo",
```

This object also has an `@id` similar to the `spdxId` of our person, but it is
subtly different First of all, this one is _not_ a URI like our
[Person][Class_Person], but instead starts with a `_:`. This type of identifier
is known as a _blank node_. Blank nodes serve a similar purpose to the URI of
the `spdxId`, however they _only_ have scope within this SPDX document. What
this means is that it be impossible to reference this
[CreationInfo][Class_CreationInfo] by name outside of this document. Inside the
document, you can use this identifier to refer to this object. The string after
the `_:` is arbitrary and you may choose whatever unique (within the document)
string that you choose.

It should be noted that [CreationInfo][Class_CreationInfo] does _not_ derive
from [Element][Class_Element] class (like our previous example of
[ExternalIdentifier][Class_ExternalIdentifier]), and as such the `@id` property
is technically optional. However, since we will need to refer to this object at
other places in the document, we must give it an identifier.  This also means
that this object does not have a mandatory
[creationInfo][Property_creationInfo] property (which makes sense since it
would be a circular reference). Finally, [CreationInfo][Class_CreationInfo] is
_only_ allowed to have a blank node identifier.

If you look back at the [Person][Class_Person] we just created, you'll notice
that its [creationInfo][Property_creationInfo] property has the string value
that matches the `@id` of this object; this is how objects are linked together
by reference in SPDX.

Next, we need to specify which version of the SPDX spec that elements linking
to this [CreationInfo][Class_CreationInfo] are conforming to:

```json
            "specVersion": "3.0.0",
```

Now, we need to use the [createdBy][Property_createdBy] property to indicated
who (or what) created the elements that are linked to this
[CreationInfo][Class_CreationInfo]:

```json
            "createdBy": [
                "http://spdx.example.com/Person/JoshuaWatt"
            ],
```

This property is a list of reference to any class that derives from
[Agent][Class_Agent]. Since you are the person writing the document, put a
single list item that is the `spdxId` of your [Person][Class_Person] element
here to link them together.  Note that even though this is using a full URI
instead of a blank node, this is linking in the same way as
[creationInfo][Property_creationInfo] described above.

Also, it is worth noting that this does indeed create a circular reference
between our [Person][Class_Person].[creationInfo][Property_creationInfo]
property and [CreationInfo][Class_CreationInfo].[createdBy][Property_createdBy]
property. This is fine in SPDX, as objects are not required to be a Directed
Acyclical Graph (DAG).


Finally, we need to specify the date that any objects linking to this
[CreationInfo][Class_CreationInfo] were created using the
[created][Property_created] property and close out the object:

```json
            "created": "2024-03-06T00:00:00Z"
        },
```

Use today's date and time in [ISO 8601][4] with the format:
`"%Y-%m-%dT%H:%M:%SZ"`. The timezone should always be UTC.


## Describing the Document

SPDX requires that information about the document itself be provided. In order
to do this, we must create a [SpdxDocument][Class_SpdxDocument] object, so lets
do that now:

```json
        {
            "type": "SpdxDocument",
            "spdxId": "http://spdx.example.com/Document1",
            "creationInfo": "_:creationinfo",
```

[SpdxDocument][Class_SpdxDocument] derives from [Element][Class_Element], so it
has 3 required properties, `type`, `spdxId` and
[creationInfo][Property_creationInfo]. We've seen all of these properties
before in [Person][Class_Person], so hopefully this getting more familiar. Note
that we again link back out our previous [CreationInfo][Class_CreationInfo]
object.

Next, we need to indicate which [Profiles][SPDX_Profile] our document uses
using the [profileConformance][Property_profileConformance] property. This can
be used by consumers of the document to quickly determine if the information
they want is in the document (for example, if a user wants to find CVE data,
but the `security` profile is not present, there is no reason to continue
looking in this document).

```json
            "profileConformance": [
                "core",
                "software"
            ],
```

In this case, we are saying this document conforms to the `core` profile (all
SPDX documents should include this), and the `software` profile, since we will
be describing some software later.

The final property we need to define is [rootElement][Property_rootElement].
This property is a list of [Element][Class_Element] (or any subclass of
Element) references. Add this now and close our our
[SpdxDocument][Class_SpdxDocument]:

```json
            "rootElement": [
                "http://spdx.example.com/BOM1"
            ]
        },
```

The purpose of this property is to indicate the "interesting" element(s) in the
document. Since a document can contain a large number of elements, it might be
difficult for a consumer of the document to know what the focus of the document
is. This property clarifies that by suggesting which element(s) a user should
look at to start navigating. While it is possible to have more than one root
element, it is rare to need more than one.

Careful readers of the [SpdxDocument][Class_SpdxDocument] documentation will
note that we have omitted the [element][Property_element] (derived from the
[ElementCollection][Class_ElementCollection] parent class). Technically
speaking, the property _should_ link to all the elements that are in the
document using this property. However because this would be error prone, it is
implied that all [Element][Class_Element] objects present in the `@graph` (that
is, all the objects we are writing) are implicitly added to the
[element][Property_element] property.

## A Complete Document!

At this point, we have a completed SPDX document (albeit, one that has an
unresolved references in
[SpdxDocument][Class_SpdxDocument].[rootElement][Property_rootElement]). This
is a fully valid document because it has the SPDX 3.0 preamble, and the
required [SpdxDocument][Class_SpdxDocument] object, which in turn requires a
valid [CreationInfo][Class_CreationInfo], which we've provided. Finally, the
[CreationInfo][Class_CreationInfo] requires an [Agent][Class_Agent] to describe
who or what created the Elements in the document, which we've provided by
writing a [Person][Class_Person] object which describes you.

While this is the minimal example, it may feel long. However, as we continue in
the document it should become more apparent how reuse of these 3 objects
(particularly the [CreationInfo][Class_CreationInfo]) helps _reduce_ total
document size while still conveying precise information. In addition, there are
other options to make a more compact document that are not covered yet, such as
referring to a external [Agent][Class_Agent] instead of encoding it in the
document.

## Lets Add Some Software!

Now that we have the basic valid document, its time to start adding some
interesting data to it. Lets start with a fictitious software package called
`amazing-widget` which we distribute as a tarball for users to download and run.

To start with, we need to define a [software_Package][Class_software_Package]
object the defines how our software is distributed. In this case, the
[software_Package][Class_software_Package] will be describing a tarball which
someone can download, but it can be almost any unit of content that can be used
to distribute software (either as binaries or source). See the documentation
for more details.

Lets define our package:
```json
        {
            "type": "software_Package",
            "spdxId": "http://spdx.example.com/amazing-widget",
            "creationInfo": "_:creationinfo",
```
This should be familiar by now. Note the reuse of our previous
[CreationInfo][Class_CreationInfo].

Also note that this is our first element that is outside of the `Core` profile
in SPDX. In this specific case, the class is defined in the `Software` profile,
and as such is prefixed with `software_`. Any classes and properties that are
defined in a profile other than `Core` will be prefixed with the lower case
profile name + `_` to disambiguate them from classes and properties with the
same name in other profiles.

Again, we can use [Element][Class_Element].[name][Property_name] to give the
common name for our package:

```json
            "name": "amazing-widget",
```

Importantly, even though this is a class defined in the `Software` profile,
[name][Property_name] is defined in core so it _does not_ get prefixed. When
writing objects, pay attention to which profile the _property_ is defined in,
as that sets the prefix (the documentation should make it clear what the
serialized name of a property is if you are unsure *TODO: It does not yet*).

Next, we will define what version the `amazing-widget` package is using
[software_packageVersion][Property_software_packageVersion], and where the user
could download this package from using
[software_downloadLocation][Property_software_downloadLocation] (both are
optional):

```json
            "software_packageVersion": "1.0",
            "software_downloadLocation": "http://dl.example.com/amazing-widget_1.0.0.tar",
```

These are our first two examples of properties not defined in the `Core`
profile, and as such they get the `software_` prefix.


Now, we should define when this software was packaged using the (optional)
[builtTime][Property_builtTime] property, so that downstream users can tell how
old it is:

```json
            "builtTime": "2024-03-06T00:00:00Z",
```

Note that we are back in the `Core` profile properties here (specifically,
[builtTime][Property_builtTime] is a property of [Artifact][Class_Artifact] in
`Core`)


Next, we want to indicate who actually made the package we are describing. This
is done using the (optional) [originatedBy][Property_originatedBy] array
property:

```json
            "originatedBy": [
                "http://spdx.example.com/Person/JoshuaWatt"
            ],
```

In this example, you can put a single element that references your
[Person][Class_Person] `spdxId` here to indicate that _you_ actually made the
package. Note that while we are using the same `spdxId` as we used in the
[CreationInfo][Class_CreationInfo], this is not required.
[originatedBy][Property_originatedBy] is the property that we used to describe
who made the actual package being described by the
[software_Package][Class_software_Package] and not the JSON object itself.

Finally, we would like to inform consumers of our SPDX how they can validate
the package to ensure its contents have not changed, or to check if a file that
they have is the same one being described by this document. This is done using
the [verifiedUsing][Property_verifiedUsing] property, which is an array of
[IntegrityMethod][Class_IntegrityMethod] objects (or subclasses).

```json
            "verifiedUsing": [
                {
                    "type": "Hash",
                    "algorithm": "sha256",
                    "hashValue": "f3f60ce8615d1cfb3f6d7d149699ab53170ce0b8f24f841fb616faa50151082d"
                }
            ]
        },
```

Specifically, we are using the [Hash][Class_Hash] subclass of integrity method to
indicate that the SHA-256 checksum of the package file is
`f3f60ce8615d1cfb3f6d7d149699ab53170ce0b8f24f841fb616faa50151082d`


## Whats in our Package?

Describing that we have a distributed package is a great start, but we are able
to go further (although this is not mandatory!). Our next object is going to
describe all the files contained in our
[software_Package][Class_software_Package] by using
[software_File][Class_software_File].

Lets get started with our first file, the program executable:

```json
        {
            "type": "software_File",
            "spdxId": "http://spdx.example.com/amazing-widget/main",
            "creationInfo": "_:creationinfo",
            "name": "/usr/bin/amazing-widget",
            "verifiedUsing": [
                {
                    "type": "Hash",
                    "algorithm": "sha256",
                    "hashValue": "ee4f96ed470ea288be281407dacb380fd355886dbd52c8c684dfec3a90e78f45"
                }
            ],
            "builtTime": "2024-03-05T00:00:00Z",
            "originatedBy": [
                "http://spdx.example.com/Person/JoshuaWatt"
            ],
```

We've seen all this before, so hopefully it all makes sense.

While it's great to have a file, it's not easy to tell what purpose this file
serves. We might be able to infer that its an executable program from the
[name][Property_name], but SPDX provides the ability for us to directly specify
this using the (optional)
[software_primaryPurpose][Property_software_primaryPurpose] and
[software_additionalPurpose][Property_software_additionalPurpose] properties
(derived from [sofware_Artifact][Class_software_Artifact]):

```json
            "software_primaryPurpose": "executable",
            "software_additionalPurpose": [
                "application"
            ],
```

A [software_Artifact][Class_software_Artifact] can have as many purposes a you
want to describe, but there should always be a
[software_primaryPurpose][Property_software_primaryPurpose] property defined
before any [software_additionalPurpose][Property_software_additionalPurpose]
are added.

Finally, as one last bit of information, we'll say what the copyright text of
the program is using the (optional)
[software_copyrightText][Property_software_copyrightText] property and close
out our file:

```json
            "software_copyrightText": "Copyright 2024, Joshua Watt"
        },
```

Lets add one more file for fun. This one will describe a config file for our
program:

```json
        {
            "type": "software_File",
            "spdxId": "http://spdx.example.com/amazing-widget/config",
            "creationInfo": "_:creationinfo",
            "name": "/etc/amazing-widget.cfg",
            "verifiedUsing": [
                {
                    "type": "Hash",
                    "algorithm": "sha256",
                    "hashValue": "89a2e80bc48c4dd10044c441af0fc6fdad5d31b2fa391cb2cf9c51dbf4200ed9"
                }
            ],
            "builtTime": "2024-03-05T00:00:00Z",
            "originatedBy": [
                "http://spdx.example.com/Person/JoshuaWatt"
            ],
            "software_primaryPurpose": "configuration"
        },
```

## Linking things together with Relationships

Now we've described our [software_Package][Class_software_Package], and two
[software_File][Class_software_File]s that should be contained in it, but we
have one small problem: there is nothing that tells us that our files are
actually contained by the package.

In order to do this, we must introduce the SPDX
[Relationship][Class_Relationship].  These are a very powerful concept in SPDX
that allows linking [Element][Class_Element]s and describing how they are
related.

[Relationship][Class_Relationship]s themselves are also derived from SPDX
[Element][Class_Element]s, so we need the required three properties to start a
new one:

```json
        {
            "type": "Relationship",
            "spdxId": "http://spdx.example.com/amazing-widet-contains",
            "creationInfo": "_:creationinfo",
```

Next, we need to say what the relationship between our objects is going to be.
We do this using the [relationshipType][Property_relationshipType] property:

```json
            "relationshipType": "contains",
```

The full list of what a [Relationship][Class_Relationship] can describe is
defined by the [RelationshipType][Vocab_RelationshipType] vocabulary (a fancy
work for enumeration). There are a lot of possible options, and each one has a
specific meaning and restrictions on what types it can relate, so read the
documentation to find the specific one you need and how to use it. In our case,
we are using `contains` which is defined as "The `from`
[Element][Class_Element] contains each `to` [Element][Class_Element]". Perfect.

Now, we need to describe what [Element][Class_Element]s are being connected.
[Relationship][Class_Relationship]s always have a directionality associated
with them: you can think of them as an arrow pointing from their
[from][Property_from] property to their [to][Property_to] properties.
[from][Property_from] is always required and must be a single object, whereas
[to][Property_to] is a list of zero or more objects. Lets write the JSON to
express this:

```json
            "from": "http://spdx.example.com/amazing-widget",
            "to": [
                "http://spdx.example.com/amazing-widget/config",
                "http://spdx.example.com/amazing-widget/main"
            ],
```

This is the minimum required to define a [Relationship][Class_Relationship],
but we want to add one more property to convey additional information and close
out the object:

```json
            "completeness": "complete"
        },
```

The [completeness][Property_completeness] property is very useful as it
indicates if we know that this [Relationship][Class_Relationship] can be
considered to describe all we know about the type of relationship or not. For
example, by stating that this relationship is `complete`, we are saying that
our package contains those 2 files, and _only_ those 2 files. We could have
also stated that the relationship was `incomplete` in which case we are stating
that we know we didn't list all the files, and other are included.
Alternatively, we could have stated that the relationship
[completeness][Property_completeness] was `noAssertion` meaning we don't know
if we captured all the files or not. If this property is omitted, it's assumed
to be `noAssertion`.

## Wrapping it all up in a BOM

We've made great progress, and we are _almost_ done. For our final step, we
want to wrap up everything we know about the package into a "Software Bill of
Materials".

This is done by creating a [software_Sbom][Class_software_Sbom] object:

```json
        {
            "type": "software_Sbom",
            "spdxId": "http://spdx.example.com/BOM1",
            "creationInfo": "_:creationinfo",
```

Note that this is the object referenced by the [rootElement][Property_rootElement] of
our [SpdxDocument][Class_SpdxDocument], since it is the primary subject of our entire
document.

[software_Sbom][Class_software_Sbom] derives from
[ElementCollection][Class_ElementCollection] just like
[SpdxDocument][Class_SpdxDocument], so it has the same
[rootElement][Property_rootElement] property. In this case, it is the subject
of the SBOM, which is our [software_Package][Class_software_Package]:

```json
            "rootElement": [
                "http://spdx.example.com/amazing-widget"
            ],
```

Unlike [SpdxDocument][Class_SpdxDocument] however, there is no implicit value
for the [element][Property_element] property. Instead, we need to list all the
elements that are part of this SBOM (think of this as the line items in the
SBOM). In our specific case, this is the [software_File][Class_software_File]s
that part of our package, but if you had any other elements related to the
package (e.g.  licenses, security information, etc.) those would also be
included:

```json
            "element": [
                "http://spdx.example.com/amazing-widget/main",
                "http://spdx.example.com/amazing-widget/config"
            ],
```

Finally, we need to specify what type(s) of BOM this is using the
[software_sbomType][Property_software_sbomType] property:

```json
            "software_sbomType": [
                "build"
            ]
        }
```

This property is effectively indicating at what point in the software lifecycle
this SBOM was generated. Since we are describing an executable program, `build`
seems the most likely.

## Closing it all up

Now that we are all done, we have a few things to clean up, namely that we need
to close the `@graph` list and the root object, so lets do that now:

```json
    ]
}
```

**Congratulations!** You just wrote your first SPDX document! Hopefully this
walk through has been instructive and you are ready to get started with SPDX!

[1]: https://json-ld.org/
[2]: https://en.wikipedia.org/wiki/Linked_data
[3]: https://www.w3.org/RDF/
[4]: https://en.wikipedia.org/wiki/ISO_8601
[spdxjsonschema]: https://spdx.org/schema/3.0.0/spdx-json-schema.json
[Class_Agent]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Classes/Agent
[Class_Artifact]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Classes/Artifact
[Class_CreationInfo]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Classes/CreationInfo
[Class_ElementCollection]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Classes/ElementCollection
[Class_Element]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Classes/Element
[Class_ExternalIdentifier]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Classes/ExternalIdentifier
[Class_Hash]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Classes/Hash
[Class_IntegrityMethod]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Classes/IntegrityMethod
[Class_Person]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Classes/Person
[Class_Relationship]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Classes/Relationship
[Class_SpdxDocument]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Classes/SpdxDocument
[Class_software_Artifact]: https://spdx.github.io/spdx-spec/v3.0/model/Software/Classes/Artifact
[Class_software_File]: https://spdx.github.io/spdx-spec/v3.0/model/Software/Classes/File
[Class_software_Package]: https://spdx.github.io/spdx-spec/v3.0/model/Software/Classes/Package
[Class_software_Sbom]: https://spdx.github.io/spdx-spec/v3.0/model/Software/Classes/Sbom
[Property_builtTime]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Properties/builtTime
[Property_completeness]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Properties/completeness
[Property_createdBy]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Properties/createdBy
[Property_created]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Properties/created
[Property_creationInfo]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Properties/creationInfo
[Property_element]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Properties/element
[Property_externalIdentifier]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Properties/externalIdentifier
[Property_externalIdentifierType]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Properties/externalIdentifierType
[Property_from]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Properties/from
[Property_identifier]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Properties/identifier
[Property_name]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Properties/name
[Property_originatedBy]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Properties/originatedBy
[Property_profileConformance]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Properties/profileConformance
[Property_relationshipType]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Properties/relationshipType
[Property_rootElement]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Properties/rootElement
[Property_software_additionalPurpose]: https://spdx.github.io/spdx-spec/v3.0/model/Software/Properties/additionalPurpose
[Property_software_copyrightText]: https://spdx.github.io/spdx-spec/v3.0/model/Software/Properties/copyrightText
[Property_software_downloadLocation]: https://spdx.github.io/spdx-spec/v3.0/model/Software/Properties/downloadLocation
[Property_software_packageVersion]: https://spdx.github.io/spdx-spec/v3.0/model/Software/Properties/packageVersion
[Property_software_primaryPurpose]: https://spdx.github.io/spdx-spec/v3.0/model/Software/Properties/primaryPurpose
[Property_software_sbomType]: https://spdx.github.io/spdx-spec/v3.0/model/Software/Properties/sbomType
[Property_to]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Properties/to
[Property_verifiedUsing]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Properties/verifiedUsing
[SPDX_Profile]: https://spdx.github.io/spdx-spec/v3.0/
[Vocab_RelationshipType]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Vocabularies/RelationshipType
