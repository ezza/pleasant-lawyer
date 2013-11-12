pleasant-lawyer
===============

Pleasant lawyer takes your boring task numbers and turns them into easy to remember code words. You can then use this phrase to find your task again.

## Ruby usage

Add the gem to your gem file. Call it using any of these formats

    PleasantLawyer.convert 'wacky juice'
    PleasantLawyer.convert 'wac jui'
    PleasantLawyer.convert '36320'
    PleasantLawyer.convert 36320

## Chrome Plugin Usage

For Go To Assist users, simply install the pleasant lawyer plugin: https://chrome.google.com/webstore/detail/service-desk-pleasant-law/cbakkidlcnemoecaghbmnnkpacpfgfjh

For use with other services

Update background.js for the search URL you want to hit.

    var search_url = "https://desk.gotoassist.com/goto?q="


Optional - Update content.js to insert code words into your task page

content.js looks within a specified div for spans containing your task number and appends the code words to the end of the first matching span. You can customise it for your page css.

## Technical

The lawyer comes with 512^2 available phrases. All phrases take the form [adjective] [noun]. If you need more phrases, expand the word lists or double down on adjectives. To keep things pleasant, ensure the first three characters of each word is unique.


## Thanks

Adjectives and nouns from https://github.com/aaronbassett/Pass-phrase

Idea from https://github.com/jamesotron/operation-great-justice

