const ftp = require('basic-ftp');
var ftpDeployConfig = require('./ftpDeployConfig.js');

deploy()
 
async function deploy() {
  console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
  console.log(`> deploy to "${ftpDeployConfig.config.host}"`);
  console.log(`> sourcePath --> ${ftpDeployConfig.config.sourcePath}`);
  console.log(`> remotePath --> ${ftpDeployConfig.config.remotePath}`);

  const client = new ftp.Client();
  client.ftp.verbose = true;
  try {
    await client.access({
      host: ftpDeployConfig.config.host,
      user: ftpDeployConfig.config.user,
      password: ftpDeployConfig.config.password,
      secure: false,
      forcePasv: true
    });
    console.log(await client.list());
    await client.ensureDir(ftpDeployConfig.config.remotePath);
    await client.clearWorkingDir();
    await client.uploadFromDir(ftpDeployConfig.config.sourcePath);
  }
  catch(err) {
    console.log(err)
  }
  client.close();
}
