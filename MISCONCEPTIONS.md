# SPDX 3.0 - potential misconceptions

This is a list of features of SPDX 3.0 that may be confusing to implementers (both producers and consumers). Please update this as the main features of SPDX 3.0 are developed and agreed upon, so that the documentation and outreach efforts of SPDX can bring attention to these points.

## SPDX IDs that look like URLs aren't necessarily routable

The SPDX ID of an Element is a URI composed of a namespace and a sub-ID. Even if this URI *looks* like an URL, it needn't be possible for the Element's data to be retrievable via the apparent URL. For instance, `https://example.com/seabass/my-project/main.c.Element` could be a valid SPDX ID, but even though it looks like a URL, the SPDX data isn't available by making an HTTP request to that 'address'.

## SPDX IDs are composed from two parts, but form just one ID

The 'namespace' and 'sub-ID' parts form a single SPDX ID which is universally unique. Neither part can be omitted except as a serialisation feature to reduce physical document size.

## The 'sub-ID' part of a SPDX ID is merely a shorthand

The 'sub-ID' part of a SPDX ID can only be used as a shorthand, and is not a full identifier. The *serialisation*, not the model, defines how these shorthands can be expanded back into the full URI.
