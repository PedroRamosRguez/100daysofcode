const util = require('util');
const exec = util.promisify(require('child_process').exec);
const getIpAddress = async () => {
  const address = {eth:'', wlan: ''}
  const { stdout,stderr } = await exec("ifconfig wlan0 | grep 'inet ' | awk -F'[: ]+' '{ print $3 }'");
  if(stderr){
    console.log(`error ${stderr}`);
  }else{
    if(stdout.match(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gm)){
      address.wlan = stdout;
    }else{
      const { stdout,stderr } = await exec("ifconfig wlan0 | grep 'ether ' | awk -F'[: ]+' '{ print $3 }'");
      if(stderr){
        console.log(`error ${stderr}`);
      }else{
        if(stdout.match(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gm)){
          address.ether = stdout.toString();
        }
      }
    }
  }
  return address;
}

module.exports = { getIpAddress };