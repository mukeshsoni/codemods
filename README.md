# codemods

This repository contains a collection of codemod scripts for use with [JSCodeshift](https://github.com/facebook/jscodeshift) that transform your source code in useful ways.

### Setup & Run

1.  `npm install -g jscodeshift`
1.  `git clone https://github.com/mukeshsoni/codemods.git` or download a zip file from `https://github.com/mukeshsoni/codemods/archive/master.zip`
1.  `jscodeshift -t <codemod-script> <path>`
    * `codemod-script` - path to the transform file, see available scripts below;
    * `path` - files or directory to transform;
    * use the `-d` option for a dry-run and use `-p` to print the output for comparison;
    * use the `--extensions` option if your files have different extensions than `.js` (for example, `--extensions js,jsx`);
    * if you use flowtype, you might also need to use `--parser=flow`;
    * see all available [jscodeshift options](https://github.com/facebook/jscodeshift#usage-cli).

### Included Scripts

#### `jsx-add-data-test-id-attribute.js`

Adds a `data-test-id` attribute to all jsx html elements. Helpful for test writers to grab an element and simulate some action/event on it.
It does not add the attribute to custom components. Also, doesn't add the attribute if it already exists on an element.

```sh
jscodeshift -t codemods/transforms/jsx-add-data-test-id-attribute.js <path>
```

E.g. - converts

```
<div style={{ backgroundColor: 'red' }}>Beautiful</div>
```

to

```
<div style={{ backgroundColor: 'red' }} data-test-id='<path/to/the/component>_test_id_<number>'>Beautiful</div>
```
