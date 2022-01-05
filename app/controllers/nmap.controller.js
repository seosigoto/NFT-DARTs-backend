const nmap = require('node-nmap');
nmap.nmapLocation = 'nmap'; //default

function checkPC(ip) {
    return new Promise((resolve, reject) => {
        let quickscan = new nmap.NmapScan(ip);
        quickscan.on('complete', function(data){
            if(data[0].openPorts.length > 0) {
                resolve(true);
            }
        });
        
        quickscan.on('error', function(error){
            reject(error);
        });
        
        quickscan.startScan();
    })
}

function checkAll() {
    return new Promise((resolve, reject) => {
        let quickscan = new nmap.NmapScan("192.168.8.1/24", "-sn");
        quickscan.on('complete', function(data){
            let result = data.map(item => item.ip);
            resolve(result);
        });
        
        quickscan.on('error', function(error){
            reject(error);
        });
        
        quickscan.startScan();
    })
}

module.exports = {
    checkPC,
    checkAll
};