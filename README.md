# This repository is no longer actively maintained by VMware, Inc.


## Overview
```
This is the repository for rewserv.cloudfoundry.com and the data collection cron job.

rewsers is a node.js/express/mongodb application.
This application will provide activity stats per community user.

Planned activity stats:
  * forum posts on forum.springsource.org
  * commits on springsource projects on github

There's a javascript that will collect stats in real time from form submissions
on the client browsers (see rewserv/public/javascripts)

A separate cron job will collect stats.
```
