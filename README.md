shnort - Simple Html Notes with the Observable RunTime
================================================================================

The [Observable Runtime][] is a JavaScript library that powers
[Observable Notes][].  Observable Notebooks however aren't authored
in JavaScript, but in a [JS-like language] (compiled to JS, using the Observable
Runtime as it's core library).

This is an experiment to see if the runtime can be made "easier" to use in
JavaScript itself.

We'll see!

[Observable Runtime]: https://github.com/observablehq/runtime
[Observable Notes]: https://observablehq.com/@observablehq/five-minute-introduction
[JS-like language]: https://observablehq.com/@observablehq/observables-not-javascript


usage
================================================================================

To run the samples, you'll need to arrange to run them with a web server,
as they load code dynamically and that doesn't work well with file:// URLs.


[`serve`](https://www.npmjs.com/package/serve) is a dev dependency of this
package, and you can launch it via `npm run serve`.

Assuming it's launched from the repo directory with port 3000, you can 
access the samples from:

http://localhost:3000/notes/index.note.html

They are also available publically at:

https://pmuellr.github.io/shnort/notes/index.note.html


install
================================================================================

    npm install -g pmuellr/shnort


license
================================================================================

This package is licensed under the MIT license.  See the [LICENSE.md][] file
for more information.


contributing
================================================================================

Awesome!  We're happy that you want to contribute.

Please read the [CONTRIBUTING.md][] file for more information.


[LICENSE.md]: LICENSE.md
[CONTRIBUTING.md]: CONTRIBUTING.md
[CHANGELOG.md]: CHANGELOG.md