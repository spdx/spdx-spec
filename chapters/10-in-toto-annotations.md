# 10 in-toto Annotations

in-toto Annotations can be used to track provenance of SPDX elements through the supply chain and authenticate these elements using cryptographic signing. They can be used to extend the information provided in an SPDX document and used to describe the relationship of artifacts as they flow through the chain 

**FIXME**: is this something we should be doing instead (i.e., adding a different type off `annotationType`... (as described in [section 8](./8-annotations.md)) with an annotation type of `annotationType_review`.

in-toto Annotations can be appended to an SPDX document to describe the relationships between the elements inside of the document, as well as SPDX elements outside of the current document and even other SPDX documents. The fields inside of an in-toto annotation field closely follow the [in-toto specification for Link metadata](https://github.com/in-toto/docs/blob/master/in-toto-spec.md#44-file-formats-namekeyid-prefixlink). For completeness, these fields will be described below.

### 10.1 \_type:

**10.1.1** Purpose: This field is included for compatibility with the
existing in-toto toolchain, and must always be `"link"`. 

**10.1.2** Intent: it is necessary to include this field so as to ensure
toolchain compatibility.

**10.1.3** Cardinality: Mandatory, one.

**10.1.4** Data Format: Single line of text, must be `"link"`.

**10.1.5** Tag: `_type`:

Example:

```
_type: "link"
```

**8.1.6** RDF: Property `spdx:in-toto:_type` in class `spdx:in_toto_annotation`
**FIXME**: I'm not familiar of how these namespaces should be handled. I'm giving
in-toto its own namespace.

Example

```
<in-toto>
  <_type>_link</_type>
</in-toto>
```

### 10.2 \_name:

**10.2.1** Purpose: the name field contains a unique identifier for this piece
of link metadata. In the SPDX context, this could be a unique `SDPX-refId` that
refers to the step who created this attestation, although any unique string
could be used (e.g., a PURL)

**10.2.2** Intent: the name field is intended to uniquely identify an operation
within the supply chain. This will also be important to describe the 

**10.2.3** Cardinality: Mandatory, one

**10.2.4** Data Format: a single line of text

**10.2.5** Tag: `_name`:

Example:

```
_name: "spdx:SPDXRef-Step-compile"
```

**10.2.6** RDF: Property `spdx:in-toto:_name` in class `spdx:in_toto_annotation`

Example 

FIXME: This is probably incredibly wrong, but I hope it conveys what we were
hoping to convey
```
<in-toto>
  <_name><spdx ref='step-compile'</spdx></_name>
</in-toto>
```

### 10.3 command:

**10.3.1** Purpose: The command field can be used to describe the action performed. If it is an automated tool, it can be used to describe parameters passed such as command-line flags or aliases to the executable name (where argv[0] inspection is done).

**10.3.2** Intent: To describe the operation as it has been performed to facilitate auditing.  

**10.3.3** Cardinality: Optional, one:

**10.3.4** Data format: a list of strings.

**FIXME**: we distinguish between a single line of text so as to avoid complications with command line escape sequences and more...
**10.3.5** Tag: `command`

Example:
```
command: ["gcc", "-lm", "-lssl", "foo.c"]
```

**10.3.6** RDF: Property `spdx:in-toto:command` in class `spdx:in_toto_annotation`

Example:

```
<in-toto>
  <command>
    <item>gcc</item>
    <item>-lm</item>
    <item>-lssl</item>
    <item>foo.c</item>
  <command>
</in-toto>
```

### 10.4 Materials

**10.4.1** Purpose: describe the elements, if any, that were used when carrying out this step.

**10.4.2** Intent: the materials list allows an annotator to identify the source elements used when generating any new artifacts.

**10.4.3** Cardinality: Optional, one:

**10.4.4** Data format: a dictionary of hash objects keyed by SPDX identifiers.

**10.4.5** Tag: `materials`

Example:
```
materials: 
  "spdx:SPDXRef-141-File-83pv-RKSJ-H-d51620a4d7d9aeca3a1cbe5ef201513f98d65f98": <HASH>,
  "spdx:SPDXRef-271-File-AUTHORS.md-109c93392646b4d55e3ca62c5b578a9ac7cc159f": <HASH>,
```

**10.4.6** RDF: Property `spdx:in-toto:materials` in class `spdx:in_toto_annotation`

Example:

```
<in-toto>
  <materials>
    <spdx ref="141-File-83pv-RKSJ"> 
      <sha256>
        ...
      </sha256>
    </spdx>
    <spdx ref="271-File-authors.md"> 
      <sha256>
        ...
      </sha256>
    </spdx>
  <materials>
</in-toto>
```

### 10.5 Products

**10.5.1** Purpose: describe the elements, if any, that were created when
carrying out this step.

**10.5.2** Intent: the product list allows an annotator to identify the elements producing during this operation.

**10.5.3** Cardinality: Optional, one:

**10.5.4** Data format: a dictionary of hash objects keyed by SPDX identifiers.

**10.5.5** Tag: `products`

Example:
```
products: 
  "spdx:SPDXRef-141-File-83pv-RKSJ-H-d51620a4d7d9aeca3a1cbe5ef201513f98d65f98": <HASH>,
  "spdx:SPDXRef-271-File-AUTHORS.md-109c93392646b4d55e3ca62c5b578a9ac7cc159f": <HASH>,
```

**10.5.6** RDF: Property `spdx:in-toto:products` in class `spdx:in_toto_annotation`

Example:

```
<in-toto>
  <products>
    <spdx ref="141-File-83pv-RKSJ"> 
      <sha256>
        ...
      </sha256>
    </spdx>
    <spdx ref="271-File-authors.md"> 
      <sha256>
        ...
      </sha256>
    </spdx>
  <products>
</in-toto>
```

### 10.6 Byproducts

**10.6.1** Purpose: describe any anciliarry information produced when carrying out this step

**10.6.2** Intent: allow annotators to describe important information such as error codes, or standard stream buffers that could aid in auditability.

**10.6.3** Cardinality: Optional, one:

**10.6.4** Data format: an Property containing `stderr`, `stdout` and `return-value`

**10.6.5** Tag: `byproducts`

Example:
```
byproducts: 
  "stderr": "",
  "stdout": "TEST OK",
  "return-value": 0
```

**10.6.6** RDF: Property `spdx:in-toto:byproducts` in class `spdx:in_toto_annotation`

Example:

```
<in-toto>
  <byproducts>
    <stderr></stderr>
    <stdout>TEST OK</stdout>
    <return-value>0</return-value>
  <byproducts>
</in-toto>
```

### 10.7 Environment

**10.7.1** Purpose: describe any anciliarry information that can be captured about the enviroment where this step was carried out

**10.7.2** Intent: allow annotators to describe important information such as filesystem integrity, environment variables or the current working directory

**10.7.3** Cardinality: Optional, one:

**10.7.4** Data format: an opaque Property containing arbitrary information

**10.7.5** Tag: `environment`

Example:
```
byproducts: 
  "workdir": "/build/spdx-spec",
  "filesystem": "docker-254:1-7371736-pool"
  "environment": "DEBUG=1"
```

**10.7.6** RDF: Property `spdx:in-toto:byproducts` in class `spdx:in_toto_annotation`

Example:

```
<in-toto>
  <environment>
    <workdir>/build/spdx-spec/</workdir>
    <filesystem>docker-254:1-7371736-pool</filesystem>
    <environment>
      <item>DEBUG=1</item>
    </environment>
  <byproducts>
</in-toto>
```

### 10.8 Signature

**FIXME**: some description of the signable buffer is in order. Ideally, we could serialize this object into a canonicalized in-toto link and then sign that (and append the result without the envelope, for simplicity)


**10.8.1** Purpose: create a cryptographically-signed record to authenticate this attestation

**10.8.2** Intent: to provide a strong proof of origin of this attestation, and avoid malicious or even accidental tampering of the contents of this attestation

**FIXME**: should this be optional in the SPDX world?

**10.8.3** Cardinality: Mandatory, one:

**10.8.4** Data format: a property following the signature object specification on the [in-toto](https://github.com/in-toto/docs/blob/master/in-toto-spec.md#42-file-formats-general-principles) documentation. This mandates a `method` property (one of `rsa` `ed25519` or `ecdsa`), and a `sig` property, which is algorithm specific and a "keyid" value.

**10.8.5** Tag: `signature`

Example:
```
signature: 
  "method": "ed25519",
  "keyid": "017e38491cccbd2bdb6da0a32a33db9ec245b5dab30fdcd09f2c742c975e5b35",
  "sig": "468f4cd91ab632a09ddd13a2a35064e17e8cbec548326e8f321296d1a37880d99de31f2915eb5782d0cc881ec50a797a0835f77a9d216b841b3334ae9da161e7"
```

**10.7.6** RDF: Property `spdx:in-toto:signature` in class `spdx:in_toto_annotation`

Example:

```
<in-toto>
  <signature>
    <method>ed25519</method>
    <keyid>017e38491cccbd2bdb6da0a32a33db9ec245b5dab30fdcd09f2c742c975e5b35</keyid>
    <sig>468f4cd91ab632a09ddd13a2a35064e17e8cbec548326e8f321296d1a37880d99de31f2915eb5782d0cc881ec50a797a0835f77a9d216b841b3334ae9da161e7</sig>
  <byproducts>
</in-toto>
```
