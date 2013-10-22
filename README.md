pleasant-lawyer
===============

Pleasant lawyer takes your boring task numbers and turns them into easy to remember code words. You can then use this phrase to find your task again.

## Ruby usage

Include the methods from numb.rb in your app. You can use these to convert your numbers to words and back again.

## Chrome Plugin Usage

Update background.js for the search URL you want to hit.

    var search_url = "https://desk.gotoassist.com/goto?q="


Optional - Update content.js to insert code words into your task page

content.js looks within a specified div for spans containing your task number and appends the code words to the end of the first matching span. You can customise it for your page css.

## Technical

The lawyer comes with 512^2 available phrases. All phrases take the form [adjective] [noun]. If you need more phrases, expand the word lists or double down on adjectives. To keep things pleasant, ensure the first three characters of each word is unique.


## Thanks

Adjectives and nouns from https://github.com/aaronbassett/Pass-phrase

Idea from https://github.com/jamesotron/operation-great-justice

