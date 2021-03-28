const fs = require('fs');
const { s3 } = require('../s3/s3.config');

/*

    PUBLIC URL = https://barriowealth.sfo3.digitaloceanspaces.com/

*/


const principal = (req, res) => {

    return res.json({msg: "Not access"})

    // This is a test of s3
    switch (req.params.action) {
        case 'created':
            return (createBucket(res))
            break;

        case 'listBucket':
            return (listBucket(res))
            break;

        case 'uploadFile':
            return (uploadFile(res))
            break;

        case 'listAllFile':
            return (listAllFileSpace(res))
            break;

        case 'dowloadFileSpace':
            return (downloadFileSpace(res))
            break;

        case 'urlDowloadTime':
            return (generateUrlDownloadForTime(res))
            break;

        case 'deleteFile':
            return (deleteFileSpace(res))
            break;

        case 'deleteSpace':
            return (deleteSpace(res))
            break;

        default:
            return res.status(404).json("Action undefined")
            break;
    }
}

// Create New Bucket - Crear un Nuevo Espacio
const createBucket = () => {
    var params = {
        Bucket: process.env.SPACES_BUCKET
    };

    s3.createBucket(params, function (err, data) {
        if (err) {
            console.log('err :>> ', err);
            return (err)
        } else {
            console.log(`${'SUCCESS'.green}: creating bucket ${process.env.SPACES_BUCKET}`)
            //console.log(data);
            return (data)
        }
    });
}

// List all bucket space
const listBucket = (res) => {
    s3.listBuckets({}, function (err, data) {
        if (err) {
            console.log(err, err.stack);
            return res.json(err)
        }
        else {
            data['Buckets'].forEach(function (space) {
                console.log(space['Name']);
            })
            return res.json(data['Buckets'])
        };
    });
}

// Upload file to bucket space
const uploadFile = async (data) => {

    var params = {
        Bucket: process.env.SPACES_BUCKET,
        Key: data.name,
        Body: data.file,
        //ACL: "private",
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: data.contentType
    };

    console.log("Received data in params =>", params);


    // The upload() is used instead of putObject() as we'd need the location url and assign that to our user profile/database
    let location = '';
    let key = '';
    try {
        const { Location, Key } = await s3.upload(params).promise();
        location = Location;
        key = Key;
        console.log("Store file success", location);
    } catch (error) {
        console.log("Error upload file", error)
    }

    // Save the Location (url) to your database and Key if needs be.
    // As good developers, we should return the url and let other function do the saving to database etc
    //console.log(location, key);

    return location;
}

// List all files in a space
const listAllFileSpace = (res) => {
    var params = {
        Bucket: process.env.SPACES_BUCKET,
    };

    s3.listObjects(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
            return res.json(err)
        }
        else {
            data['Contents'].forEach(function (obj) {
                console.log(obj['Key']);
            })

            return res.json(data['Contents'])
        };
    });
}

// Download file of the space
const downloadFileSpace = (res) => {

    var params = {
        Bucket: process.env.SPACES_BUCKET,
        Key: "avatars/waka.jpg"
    };

    s3.getObject(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
            return res.json(err)
        }
        else {
            //return res.json(fs.writeFileSync("/tmp/local-file.ext", data.Body))
            return res.json(fs.writeFileSync("/home/josue/Documentos/Barriowealth/temp/local-file.ext", data.Body));
        }
    });
}

// Generate a pre-signed URL to download a private file
const generateUrlDownloadForTime = (res) => {
    const expireSeconds = 60 * 5

    const url = s3.getSignedUrl('getObject', {
        Bucket: 'barriowealth',
        Key: 'avatars/panteras.jpg',
        Expires: expireSeconds
    });

    //https://barriowealth.sfo3.digitaloceanspaces.com/avatars/panteras.jpg%20avatars/panteras.jpg
    //https://barriowealth.sfo3.digitaloceanspaces.com/avatars/panteras.jpg?AWSAccessKeyId=OBM5LTRDLV5CPATJA5BK&Expires=1615868829&Signature=MVIsAAB7WKPx8fCe43kejjO0A%2BE%3D

    console.log(url);
    return res.json(url)
}

// Delete a file from a Space
const deleteFileSpace = (Key) => {
    var params = {
        Bucket: process.env.SPACES_BUCKET,
        Key
    };

    s3.deleteObject(params, function (err, data) {
        if (err) {
            console.log("Imagen inexistente".red);
        }
        else {

            console.log("Imagen eliminada.".green);
        }
    });

    return
}

// Delete all files from a Space
const deleteAllFileSpace = (bucket) => {
    var params = {
        Bucket: bucket
    };

    s3.listObjects(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
        }
        else {
            data['Contents'].forEach(function (obj) {
                console.log(obj['Key']);

                var deleteParams = {Bucket: bucket, Key: obj['Key']}
                s3.deleteObject(deleteParams, function (err, data) {
                    if (err) {
                        console.log("Imagen inexistente".red);
                    }
                    else {
            
                        console.log("Imagen eliminada.".green);
                    }
                });
            })

            console.log('dataContents :>> ', data['Contents']);
        };
    });

    
    

    return
}

// Delete space
const deleteSpace = (res) => {
    var params = {
        Bucket: process.env.SPACES_BUCKET,
    };

    s3.deleteBucket(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
            return res.json(err)
        }
        else {

            console.log(data);
            return res.json(data)
        }
    });
}


module.exports = {
    principal,
    uploadFile,
    createBucket,
    deleteFileSpace
}