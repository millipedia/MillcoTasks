# MillcoTasks

Building a todo list rather than doing any actual work.

Very rough Kanban board for ProcessWire using htmx and sortable.js  

The idea is to keep todo lists in the PW admin rather than explain to users how to use Github Projects or Trello.

It's an early stage at the moment but kind of works ... kind of... expect things to break though. Hopefully I'll be able to polish it up with all the time I'll save by being more productive.

s.

## What it looked like once


https://github.com/millipedia/MillcoTasks/assets/1379269/4f8a793a-158c-4076-887a-d8b5a5f5b663


That's just the default styling for the admin page. 

You can also add it to the front end of your site:

	$mt=$modules->get('MillcoTasks');
	echo $mt->board(1);

and you can style that however you want.

## Things it doesn't do yet but will soon

- [ ] Board management. Need to be able to add and remove boards
- [ ] Hmmm... I seem to have broken something so an admin page isn't created automagically .. ought to fix that
- [ ] Needs config setting not to load htmx / sortable if you already load it.
