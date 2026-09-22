importScripts('vendor/sql-wasm.js');
let db, SQL;
const ready=initSqlJs({locateFile:file=>new URL('vendor/'+file,self.location.href).href}).then(value=>SQL=value);
self.onmessage=async({data})=>{try{await ready;if(data.type==='reset'){db?.close();db=new SQL.Database();db.run(data.seed);self.postMessage({id:data.id,ok:true,reset:true});return;}if(!db)throw Error('Reinicie a base primeiro.');const results=db.exec(data.sql).map(r=>({columns:r.columns,values:r.values.slice(0,300),truncated:r.values.length>300}));self.postMessage({id:data.id,ok:true,results,changed:db.getRowsModified()});}catch(e){self.postMessage({id:data.id,ok:false,error:e.message});}};
