require 'git'

Jekyll::Hooks.register :posts, :pre_render do |post|
  g = Git.open('.')

  # get the current post last modified time
  modification_times = g.log.path(post.path)

  if modification_times.size == 0 then
    modification_time = File.mtime( post.path )
  else
    modification_time = modification_times[0].date
  end


  # inject modification_time in post's datas.
  post.data['git-last-modified-date'] = modification_time

end
