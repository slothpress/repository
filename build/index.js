const fs = require('fs-extra')
const path = require('path')

const registry = path.join(__dirname, '..', 'registry.json')

const writeRegistry = () => {
  const modulesDirectory = path.join(__dirname, '..')
  const moduleDirectories = fs.readdirSync(modulesDirectory)

  const registryData = moduleDirectories.map((directory, i) => {
    const configFile = path.resolve(modulesDirectory, directory, 'config.json')

    if (fs.pathExistsSync(configFile)) {
      const configObject = fs.readJSONSync(configFile)
      return { ...configObject }
    }
  })
  const filteredRegistry = registryData.filter(item => item)

  fs.writeJSONSync(registry, filteredRegistry)
  console.log('created registry.json')
}

writeRegistry()
