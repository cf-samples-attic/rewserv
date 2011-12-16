#!/usr/bin/ruby -w

require "rubygems"
require "uri"
require "open-uri"
require "json"
require "net/http"



orgs = ['SpringSource','cloudfoundry']

orgs.each do|org|


    result = JSON.parse(open('https://api.github.com/orgs/' + org + '/repos?page=0per_page=200').read)

    result.each do|repo|
#        puts repo['name']
#        puts "\n"
#        url = 'https://api.github.com/repos/SpringSource/' + repo['name'] + '/collaborators'
#        collres = JSON.parse(open(url).read)
#        url = 'https://api.github.com/repos/SpringSource/' + repo['name'] + '/contributors'
#        contres = JSON.parse(open(url).read)

        page = 0
        while done do
            grabCommit(page)

            url = 'https://api.github.com/repos/SpringSource/' + repo['name'] + '/commits?page=' + page + 'per_page=200'
            commres = JSON.parse(open(url).read)

            commres.each do|comm|
                if comm['commit']['committer'].has_key?('email') or !comm['commit']['committer']['email'].empty? then person = comm['commit']['committer']['email']
                else person = comm['committer']['login']
                end
                puts org + "\t" + repo['name'] + "\t" + person 
            end
            test = page + 1
            url = 'https://api.github.com/repos/SpringSource/' + repo['name'] + '/commits?page=' + test + 'per_page=200'
            commres = JSON.parse(open(url).read)
        end
#        joindate=Time.at(row['joindate'].to_i).strftime("%Y-%m-%d %H:%M:%S")
        #comUser = {"email" => row['email'], "joindate" => joindate, "posts" => row['posts']}
        #puts "echo \"email="+row['email']+"&joindate="+joindate+"&posts="+row['posts']+"\"\r"
        #command = "/usr/bin/curl --data-ascii \"email="+row['email']+"&joindate="+joindate+"&posts="+row['posts']+"\" http://rew_serv.cloudfoundry.com/\r"
       ## command = "/usr/bin/curl -d \"email="+row['email']+"&joindate="+joindate+"&posts="+row['posts']+"\" http://rew_serv.cloudfoundry.com/\r"
       ## puts command+"\r"
       ## puts `#{command}`
        #puts "echo \"#############################################################################\"\r"
        #coll.insert(comUser)
#        params = {'email'=>row['email'],'joindate'=>joindate,'posts'=>row['posts']}
#        x = Net::HTTP.post_form(URI.parse('http://rewserv.cloudfoundry.com/activity'), params)
#        puts x.body
    end
    #=end

end

def grabCommit(page)
    url = 'https://api.github.com/repos/SpringSource/' + repo['name'] + '/commits?page=' + page + 'per_page=200'
    commres = JSON.parse(open(url).read)

    commres.each do|comm| 
        if comm['commit']['committer'].has_key?('email') or !comm['commit']['committer']['email'].empty? then person = comm['commit']['committer']['email']
        else person = comm['committer']['login']
        end
        puts org + "\t" + repo['name'] + "\t" + person
    end
end


