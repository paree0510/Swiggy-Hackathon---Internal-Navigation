(function(redis){

    var Redis = require('ioredis');
    var messages = require("../messages.js");
    var logger = require('../logger').logger;
    var settings = require("../settings");

    var options = {
        host : settings.REDIS.HOST,
        port : 6379,
        db : settings.REDIS.DB,
        dropBufferSupport : true,
        enableReadyCheck : true,
        enableOfflineQueue : true,
        connectTimeout : 10000,
        retryStrategy: function (times) {
            var delay = Math.min(times * 2, 2000);
            return delay;
        },
        reconnectOnError: function (err) {
            var targetError = 'READONLY';
            if (err.message.slice(0, targetError.length) == targetError) {
                // Only reconnect when the error starts with "READONLY" -- Useful in case ElastiCache switches master to slave
                return true;
            }
        }
    };

    var client = new Redis(options);
    var pipeline = client.multi();

    client.on('ready', function (err) {
        if(!err){
            logger.info("%j", {
                "location": "redis",
                "message": messages.REDIS_CONNECTION_SUCCESS
            });
        }
        if(err){
            logger.error("%j", {
                "location": "redis",
                "error": err,
                "message": messages.REDIS_CONNECTION_ERROR
            });
        }
    });

    client.on('error', function(err) {
        logger.error("%j", {
            "location": "redis",
           "error": err,
            "message": messages.REDIS_ERROR
        });
    });

    redis.fetch = function(key, onFetch, isPipelined){
        if(isPipelined){
            pipeline.get(key);
            return;
        }
        client.exists(key, function(error, reply){
            if(error){
                onFetch(error, null);
                return;
            }
            if(reply == 1){
                client.get(key, onFetch);
            } else{
                onFetch(messages.REDIS_KEY_NOT_FOUND, null);
            }
        });
    };

    redis.setUnion = function (keys, onUnion) {
        client.sunion(keys, function(error, reply) {
            if(error) {
                onUnion(error, null);
                return;
            } else {
                onUnion(null, reply);    
            }
        });
    };

    redis.update = function(key, value, onUpdate, expiry, isPipelined){
        if(isPipelined){
            pipeline.set(key, value);
            if(expiry != null){
                pipeline.expire(key, parseInt(expiry));
            }
            return;
        }
        client.set(key, value, function(err, reply){
            if(err){
                onUpdate(err, null);
                return;
            }
            if(expiry != null){
                client.expire(key, expiry);
            }
            onUpdate(null, reply);
        });
    };
    
    redis.incr= function(key, onUpdate, isPipelined) {
        if (isPipelined) {
            pipeline.set(key, value);
            return;
        }
        client.incr(key, function(err, reply) {
            if (err) {
                onUpdate(err, null);
                return;
            }
            onUpdate(null, reply);
        });
    };

    redis.ttl = function(redisKey, onTtlFetch, isPipelined) {
        if(isPipelined){
            pipeline.ttl(redisKey);
            return;
        }
        client.ttl(redisKey, function(err, reply){
            if(err){
                onTtlFetch(err, null);
                return;
            }
            onTtlFetch(null, reply);
        });
    };

    redis.delete = function(redisKey, onDelete, isPipelined){
        if(isPipelined){
            pipeline.del(redisKey);
            return;
        }
        client.del(redisKey, function(err, reply){
            if(err){
                onDelete(err, null);
                return;
            }
            onDelete(null, reply);
        });
    };

    redis.setExpiry = function(key, expiry, expirySet, isPipelined){
        if(isPipelined){
            pipeline.expire(key,expiry);
            return;
        }
        client.expire(key, expiry, function(err, reply){
            if(err){
                expirySet(err, null);
                return;
            }
            expirySet(null, reply);
        });
    };

    redis.fetchHash = function(key, onFetch, isPipelined){
        if(isPipelined){
            pipeline.hgetall(key);
            return;
        }
        client.hgetall(key, onFetch);
    };

    redis.updateHash = function(redisKey, key, value, onUpdate, isPipelined){
        if(isPipelined){
            pipeline.hset(redisKey, key, value);
            return;
        }
        client.hset(redisKey, key, value, function(err, reply){
            if(err){
                onUpdate(err, null);
                return;
            }
            onUpdate(null, reply);
        });
    };

    redis.deleteHashFields = function(redisKey, keys, onDelete, isPipelined){
        if(isPipelined){
            pipeline.hdel(redisKey, keys);
            return;
        }
        client.hdel(redisKey, keys, function(err, reply){
            if(err){
                onDelete(err, null);
                return;
            }
            onDelete(null, reply);
        });
    };

    redis.updateMultiHash = function(key, object, onUpdate, isPipelined, expiry){
        if(isPipelined){
            pipeline.hmset(key, object);
            if(expiry != null){
                pipeline.expire(key, parseInt(expiry));
            }
            return;
        }
        client.hmset(key, object, function(err, reply){
            if(err){
                onUpdate(err, null);
            } else {
                if(expiry){
                    client.expire(key, parseInt(expiry), function(err, reply){
                        if(err){
                            onUpdate(err, null);
                            return;
                        }
                        onUpdate(null, reply);
                    });
                } else {
                    onUpdate(null, reply);
                }
            }
        });
    };

    redis.keys = function(pattern, onKeys, isPipelined){
        if(isPipelined){
            pipeline.keys(pattern);
            return;
        }
        client.keys(pattern, function(err, reply){
            if(err)
                onKeys(err, null);
            else
                onKeys(null, reply);
        });
    };

    redis.updateHashTTL = function(redisKey, key, value, expiry, onUpdate, isPipelined){
        if(isPipelined){
            pipeline.hset(redisKey, key, value);
            if(expiry != null){
                pipeline.expire(key, parseInt(expiry));
            }
            return;
        }
        client.hset(redisKey, key, value, function(err, reply){
            if(err){
                onUpdate(err, null);
                return;
            }
            client.expire(redisKey, parseInt(expiry), function(err, reply){
            if(err){
                onUpdate(err, null);
                return;
            }
            onUpdate(null, reply);
        });

        });
    };

    redis.checkIfKeyExistsInHash = function(redisKey, key, onCheck, isPipelined) {
        if (isPipelined) {
            pipeline.hexists(redisKey, key);
            return;
        }
        client.hexists(redisKey, key, function(err, reply) {
            if(err){
                onCheck(err, null);
                return;
            }
            onCheck(null, reply);
        });
    };

    redis.addToSet = function(key, members, expiry, onAdd, isPipelined){
        if(isPipelined){
            pipeline.sadd(key, members);
            if(expiry != null){
                pipeline.expire(key, parseInt(expiry));
            }
            return;
        }
        client.sadd(key, members, function(err, reply){
            if(err){
                onAdd(err, null);
                return;
            }
            if(expiry != null){
                client.expire(key, expiry);
            }
            onAdd(null, reply);
        });
    };

    redis.removeFromSet = function(key, members, onRemove, isPipelined){
        if(isPipelined){
            pipeline.srem(key, members);
            return;
        }
        client.srem(key, members, function(err, reply){
            if(err){
                onRemove(err, null);
                return;
            }
            onRemove(null, reply);
        });
    };

    redis.checkIfIsMember = function(key, value, onCheck, isPipelined){
        if(isPipelined){
            pipeline.sismember(key, value);
            return;
        }
        client.sismember(key, value, function(err, reply){
            if(err){
                onCheck(err, null);
                return;
            }
            onCheck(null, reply);
        });
    };

    redis.fetchSet = function(key, onFetch, isPipelined){
        if(isPipelined){
            pipeline.smembers(key);
            return;
        }
        client.smembers(key, function(err, reply){
            if(err){
                onFetch(err, null);
                return;
            }
            onFetch(null, reply);
        });
    };

    redis.cardinality = function (key, onCheck, isPipelined) {
        if (isPipelined) {
            pipeline.scard(key);
            return;
        }
        client.scard(key, function (err, reply) {
            if (err) {
                onCheck(err, null);
                return;
            }
            onCheck(null, reply);
        });
    };

    redis.execPipeline = function(callback){
        var tempPipeline = pipeline;
        pipeline = client.multi();
        tempPipeline.exec(execPipelineCallback);

        function execPipelineCallback(err, reply){
            if(err){
                callback(err, null);
            } else {
                if(reply.length < 1){
                    callback("No data returned", null);
                } else {
                    callback(null, reply);
                }
            }
        }
    };

    redis.getStatus = function(){
        return client.status;
    }

})(module.exports);
