/**
 * 2011 Peter 'Pita' Martischka
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var Memcached = require("memcached");
var async = require("async");

exports.database = function(settings)
{
  this.db=null; 
  
  if(!settings || !settings.filename)
  {
    settings = {filename:null};
  }
  
  this.settings = settings;
  
  //set default settings
  this.settings.cache = 0;
  this.settings.writeInterval = 0;
  this.settings.json = false;
}

exports.database.prototype.init = function(callback)
{
  this.db = new Memcached("127.0.0.1:11211");
  //this.db.on('load', function(err)
  //{
    callback();
  //});
}

exports.database.prototype.get = function (key, callback)
{
  this.db.get(key, function( err, result ){
    if( err ) console.error( err );
    //console.log(result);
    callback(err, result ? result : null);
  });
  //callback(null, this.db.get(key));
}

exports.database.prototype.set = function (key, value, callback)
{
  this.db.set(key,value,0,function( err, data ){
    //if( err ) console.error( err );
    callback();
  });
}

exports.database.prototype.remove = function (key, callback)
{
  this.db.del( key, function( err, result) {
    if( err ) console.error( err );
    //console.info( result );
  }); 
  callback();
}

exports.database.prototype.close = function(callback)
{
  this.db.end(); //close the connection to the database^^
  if(callback) callback();
}


exports.database.prototype.doBulk = function (bulk, callback)
{ 
  //var sql = "BEGIN TRANSACTION;\n";
  for(var i in bulk)
  {
    if(bulk[i].type == "set")
    {
    //  set(bulk[i].key, bulk[i].value, callback);
      //this.db.set(bulk[i].key, bulk[i].value, callback);
    }
    else if(bulk[i].type == "remove")
    {
      //this.db.delete(bulk[i].key, callback);
      remove(bulk[i].key, callback);
    }
  }
  //sql += "END TRANSACTION;";
  
  //this.db.exec(sql, function(err){
    //if(err)
    //{
    //  console.error("ERROR WITH SQL: ");
    //  console.error(sql);
    //}
    
    //callback(err);
  //});
}
