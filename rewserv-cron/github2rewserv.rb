#!/usr/bin/ruby -w

require "rubygems"
require "uri"
require "open-uri"
require "json"
require "net/http"



url = 'https://api.github.com/orgs/SpringSource/repos'
result = JSON.parse(open(url).read)

result.each do|repo|
#    puts repo['name']
#    puts "\n"
#    url = 'https://api.github.com/repos/SpringSource/' + repo['name'] + '/collaborators'
#    collres = JSON.parse(open(url).read)
#    url = 'https://api.github.com/repos/SpringSource/' + repo['name'] + '/contributors'
#    contres = JSON.parse(open(url).read)

    url = 'https://api.github.com/repos/SpringSource/' + repo['name'] + '/commits'
    commres = JSON.parse(open(url).read)

    commres.each do|comm|
        puts repo['name'] + ' ' + comm['commit']['committer']['email']
        puts "\n"

    end

#    joindate=Time.at(row['joindate'].to_i).strftime("%Y-%m-%d %H:%M:%S")
    #comUser = {"email" => row['email'], "joindate" => joindate, "posts" => row['posts']}
    #puts "echo \"email="+row['email']+"&joindate="+joindate+"&posts="+row['posts']+"\"\r"
    #command = "/usr/bin/curl --data-ascii \"email="+row['email']+"&joindate="+joindate+"&posts="+row['posts']+"\" http://rew_serv.cloudfoundry.com/\r"
   ## command = "/usr/bin/curl -d \"email="+row['email']+"&joindate="+joindate+"&posts="+row['posts']+"\" http://rew_serv.cloudfoundry.com/\r"
   ## puts command+"\r"
   ## puts `#{command}`
    #puts "echo \"#############################################################################\"\r"
    #coll.insert(comUser)
#    params = {'email'=>row['email'],'joindate'=>joindate,'posts'=>row['posts']}
#    x = Net::HTTP.post_form(URI.parse('http://rewserv.cloudfoundry.com/activity'), params)
#    puts x.body
end
#=end



