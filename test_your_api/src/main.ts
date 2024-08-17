import * as http from 'http';
import * as https from 'https';
import tests from './testFile.js';
import testerLogger from './logger.js';

interface QueryParams {
    key: string;
    value: string;
}

export interface UrlAndInputs {
    baseURL: string;
    method: string;
    queryParams: Array<QueryParams>;
    headers: { [key: string]: string };
    body: any;
}

  

async function TestCall(urlAndInputs: UrlAndInputs): Promise<any> {
    const { baseURL, method, queryParams, headers, body } = urlAndInputs;
    const queryString = queryParams.map(param => `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`).join('&');
    const urlWithQuery = queryString ? `${baseURL}?${queryString}` : baseURL;
    const isHttps = urlWithQuery.startsWith('https');
    const requestModule = isHttps ? https : http;
    if (body && typeof body === 'object' && method !== 'GET') {
        headers['Content-Type'] = headers['Content-Type'];
    }
    const options = {
        method: method,
        headers: headers
    };
    let result=await new Promise((resolve, reject) => {
        const req = requestModule.request(urlWithQuery, options, (res:any) => {
            let data = '';
            const statusCode = res.statusCode;
            res.on('data', (chunk:any) => {
                data += chunk;
            });
            res.on('end', () => {
                try {
                    const data1=JSON.parse(data);
                    resolve({statusCode,data:data1});
                } catch (error) {
                    resolve({statusCode,data});
                }
            });
        });
        req.on('error', (e:any) => {
            reject(e);
        });
        if (body && method !== 'GET') {
            req.write(typeof body === 'object' ? JSON.stringify(body) : body);
        }

        req.end();
    });
    return result;
}

async function main() {
    for(let i=0;i<tests.length;i++){
    try{
    let {statusCode}=await TestCall(tests[i]);
    if(statusCode<400){
    testerLogger.info(`Test ${i+1} with configurations BaseURL:${tests[i].baseURL} Method:${tests[i].method}\n Sucessful with status code: ${statusCode}`);
    }else{
    testerLogger.error(`Test ${i+1} with configurations BaseURL:${tests[i].baseURL} Method:${tests[i].method}\n Failed with status code: ${statusCode}`);
    }
    }catch(e:any){
    testerLogger.error(`Test ${i+1} with configurations BaseURL:${tests[i].baseURL} Method:${tests[i].method}\n failed with error:${e}`);
    }
    }
} 

await main();