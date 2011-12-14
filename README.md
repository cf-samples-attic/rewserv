# Overview
This is the repository for rewserv.cloudfoundry.com. 
It is a node.js/express/mongodb application.
This application will provide activity stats per community user

Planned activity stats:
* forum posts on forum.springsource.org
* commits on springsource projects on github

There's a javascript that will collect stats in real time from form submissions
on the client browsers (see public/javascripts)

A separate cron job will collect stats.

