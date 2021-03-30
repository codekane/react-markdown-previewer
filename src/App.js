import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import marked from 'marked';

var instructions = `
# Why
I write a lot in Markdown. [Typora](https://typora.io/) is my preferred app, which, unlike this app has the editor and the previewer rolled into one. It's very good, and I recommend it highly, however what I've sought to do here isn't to build the best app for writing Markdown. What I've sought to do here is to finish a React project for the [freecodecamp](https://www.freecodecamp.org/) module I've been working on.

Markdown is (counter-intuitively) a markup language. It compiles into HTML, PDF, or virtually any other format, yet it can be written using a simple text editor. The reason I prefer it to most word processors is the lack of formatting. The lack of obtuse formatting, I mean. The output can be flavoured with CSS to look any way you want it, which can be a bit more work, but is infinitely more maintainable than something like a Word Document. There are a variety of blogging engines set up to work with markdown files (looking at you [jekyllrb](https://jekyllrb.com/)\) and parsers are readily available to integrate it into your projects.

## Headers

    #, ##, ###, ####, #####, ######  
Those are all the different header levels. Use them at the start of a line, and then add a space afterwards to enclose that line within header tags.

## Line Breaks
By default, if you press enter after a line it is not treated as a true line break.
That means spaces are inserted in between that line, and this line, however it does not go to the next line proper. To do that, you need to add either  
two spaces

-OR-

add an empty line in between. Both do the same thing.

## Links
If you read above you'll notice the syntax for links, but I'll point it out for you anyway.  
    [text for link](target url)

## Flavour
Surround the text you wish to embolden with either two asterisks (*) or two underscores (_)   
**LIKE** __THIS__

To italicize, use only one asterisk (*) or one underscore (_)   
*like* _this_

## Code Blocks
Backticks are the way here. \`<div id="text">text</div>\` One \` at the start, and one \` at the end of a statement will mark it as code, and it will automatically be escaped. Here's an example of that same statement without codeblocks: <div id="text">text</div>

This is probably a good time to let you know that you can write HTML inside markdown, to extend the (admittedly limited) options available within the markdown syntax itself.

Three backticks (\\\`\\\`\\\`) enables multiline mode, and continues until you conclude the statement with three backticks (\\\`\\\`\\\`).

\`\`\` 
<div><p><b>this is a multi-line codeblock</b></p></div> 

\`\`\`


## Lists
Denote an unordered list item with either - or *
- It doesn't matter
* See?

Indent list items to denote a sub-list
- This is an example
    - This is a sub-example
        - This is a sub-sub example (assume 4 spaces to count as indent)

Ordered lists like so:
1) Don't talk about Fight Club
2) Don't talk about Fight Club



## Blockquotes
If this were 4chan, the text below would be green:
> Greentext goes here  
> All of the same line indentation rules apply.
> See. Same line.

## Images & Tables
If you've made it this far, I'll give you a trick to give the illusion of a figure on an image without actually having one.

| ![Pidgey has Fainted](https://i.imgur.com/r4Adts4.jpg) |
| :--: |
| *Pidgey has Fainted* |

This uses tables, which I will now explain.

\\\`\\\`\\\`
| Table Header 1 | Table Header 2 | Table Header 3 |
| :--: | :--: | :--: |
|The middle code centers the contents of the table| Nothing| Nothing |

\\\`\\\`\\\`
| Table Header 1 | Table Header 2 | Table Header 3 |
| :--: | -- | :--: |
|The middle code centers the contents of the table| Nothing| Nothing |

## In Conclusion
Cheers for making it to the end. I made the actual meat and bones of this app a while ago, but I was a little embarassed by how slack-jawed the actual writing in it was, so I postponed publishing until I could take some time to do it right. I hope you enjoyed.

For more information: [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
`

function MarkdownInput(props) {
  return (
    <textarea id="editor" style={{width: "100%", height: "450px"}}>
      {props.input}
    </textarea>
  )
}

function renderMarkdown(markdown) {
  return {__html: marked(markdown)}
}


function MarkdownOutput(props) {
  return (
    <div id="preview" class="sm-hide"
      dangerouslySetInnerHTML={renderMarkdown(props.output)}>
    </div>
  )

}


function App() {
  const [input, setInput] = useState(instructions);

  function handleChange(event) {
    setInput(event.target.value);

    console.log(event.target.value)
  }

  function handlePreviewButton(event) {
    document.getElementById("editor").classList.add("sm-hide");
    document.getElementById("preview").classList.remove("sm-hide");
  }

  function handleEditButton(event) {
    document.getElementById("preview").classList.add("sm-hide");
    document.getElementById("editor").classList.remove("sm-hide");
  }



  return (

    <div className="App">
      <div className="container-fluid">
        <header>Markdown Previewer</header>
        <div className="row">
          <div class="col-md-6 col-sm-12 app-pane">
            <textarea id="editor"
              onChange={handleChange.bind(this)}>
              {input}
            </textarea>

          </div>
          <div class="col-md-6 col-sm-12 app-pane">
            <MarkdownOutput output={input}/>
          </div>
        </div>
        <div class="row" id="button-row">
          <button id="edit-button"
                  onClick={handleEditButton.bind(this)}>Edit</button>
          <button id="preview-button"
                  onClick={handlePreviewButton.bind(this)}>Preview</button>
        </div>
      </div>
    </div>
  );
}

export default App;
