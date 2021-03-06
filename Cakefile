fs      = require 'fs'
{exec}  = require 'child_process'
util    = require 'util'
{jsmin} = require 'jsmin'

targetName    = "castello"
specName    = "specs"

###
CoffeeScript Options
###
csSrcDir         = "coffee"
csTargetDir      = "javascripts"
csSpecDir        = "spec"
specTargetDir    = "#{csSpecDir}/build"

targetCoffee     = "#{csSrcDir}/build.coffee"
targetJS         = "#{csTargetDir}/#{targetName}.js"
targetMinJS      = "#{csTargetDir}/#{targetName}.min.js"
targetSpec       = "#{specTargetDir}/#{specName}.js"
targetSpecCoffee = "#{csSpecDir}/build.coffee"

coffeeOpts    = "-b -j #{targetName}.js -o #{csTargetDir} -c #{targetCoffee}"
coffeeSpecOpts= "-b -j #{specName}.js -o #{specTargetDir} -c #{targetSpecCoffee}"

projectFiles  = [
  "constants",
  "tile_types",
  "tile",
  "app"
]

specFiles    = [
  "tile_spec"
]

###
Event System
###
finishedCallback = {}
finished = (type) ->      
  finishedCallback[type]() if finishedCallback[type]?

finishListener = (type, cb) ->
  finishedCallback[type] = cb

notify = (msg) ->
  return if not growl?
  growl.notify msg, {title: "Heello Development", image: "Terminal"}

###
Tasks
###
task 'docs', 'Generates documentation for the coffee files', ->
  util.log 'Invoking docco on the CoffeeScript source files'

  files = projectFiles
  files[i] = "#{csSrcDir}/#{files[i]}.coffee" for i in [0...files.length]

  exec "docco #{files.join(' ')}", (err, stdout, stderr) ->
    util.log err if err
    util.log "Documentation built into docs/ folder."

task 'watch', 'Automatically recompile the CoffeeScript files when updated', ->
  util.log "Watching for changes in #{csSrcDir}"

  for jsFile in projectFiles then do (jsFile) ->
    fs.watchFile "#{csSrcDir}/#{jsFile}.coffee", (curr, prev) ->
      if +curr.mtime isnt +prev.mtime
        util.log "#{csSrcDir}/#{jsFile}.coffee updated"
        invoke 'build'

task 'build', 'Compile and minify all CoffeeScript source files', ->
  finishListener 'js', -> invoke 'minify'
  invoke 'compile'

task 'compile', 'Compile all CoffeeScript source files', ->
  util.log "Building #{targetJS}"
  contents = []
  remaining = projectFiles.length

  util.log "Appending #{projectFiles.length} files to #{targetCoffee}"

  for file, index in projectFiles then do (file, index) ->
    fs.readFile "#{csSrcDir}/#{file}.coffee", "utf8", (err, fileContents) ->
      util.log err if err

      contents[index] = fileContents
      util.log "[#{index + 1}] #{file}.coffee"
      process() if --remaining is 0

  process = ->
    fs.writeFile targetCoffee, contents.join("\n\n"), "utf8", (err) ->
      util.log err if err

      exec "coffee #{coffeeOpts}", (err, stdout, stderr) ->
        util.log err if err
        util.log "Compiled #{targetJS}"
        fs.unlink targetCoffee, (err) -> util.log err if err
        finished('js')

task 'spec', 'Compile and open Jasmine', ->
  util.log "Building #{targetSpec}"
  contents = []
  remaining = specFiles.length

  util.log "Appending #{specFiles.length} files to #{targetSpecCoffee}"

  for file, index in specFiles then do (file, index) ->
    fs.readFile "#{csSpecDir}/#{file}.coffee", "utf8", (err, fileContents) ->
      util.log err if err

      contents[index] = fileContents
      util.log "[#{index + 1}] #{file}.coffee"
      process() if --remaining is 0

  process = ->
    fs.writeFile targetSpecCoffee, contents.join("\n\n"), "utf8", (err) ->
      util.log err if err

      exec "coffee #{coffeeSpecOpts}", (err, stdout, stderr) ->
        util.log err if err
        util.log "Compiled #{targetSpec}"
        fs.unlink targetSpecCoffee, (err) -> util.log err if err
        finished('js')

      invoke 'build'
      exec "open SpecRunner.html"


task 'minify', 'Minify the CoffeeScript files', ->
  util.log "Minifying #{targetJS}"
  fs.readFile targetJS, "utf8", (err, contents) ->
    fs.writeFile targetMinJS, jsmin(contents), "utf8", (err) ->
      util.log err if err

