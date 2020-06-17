const fs = require('fs-extra')
const path = require('path')

const registry = 'registry.json'

const writeRegistry = () => {
  const modulesDirectory = path.resolve('sloth_modules')
  const moduleDirectories = fs.readdirSync(modulesDirectory)

  const registryData = moduleDirectories.map((directory, i) => {
    const configFile = path.resolve(modulesDirectory, directory, 'config.json')

    if (fs.pathExistsSync(configFile)) {
      const configObject = fs.readJSONSync(configFile)
      return { ...configObject }
    }
  })

  fs.writeJSONSync(registry, registryData)
  console.log('created registry.json')
}

writeRegistry()
