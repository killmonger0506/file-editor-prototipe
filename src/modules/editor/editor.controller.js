const Editor  = require('../editor/editor.models');
const {uploadFile}  = require('../s3/s3.controller');


    const test_send_file = (req, res) => {
        let imgs = req.files == null ? undefined : req.files[Object.keys(req.files)[0]];

        return res.status(200).send(imgs)
    }

    const get_editors = (req, res, next) => {

        return Editor.findAll({})
        .then(data => res.status(200).send(data))
        .catch(error => res.status(400).send(error))
    }


  // Uploads files to s3
  const upload_img = async (req, res) => {

    let imgs = req.files == null ? undefined : req.files[Object.keys(req.files)[0]];
    const archives = []
    
    if(imgs != null){

        // Quiere decir que solo hay uno
        if(imgs.length == undefined){

            let newName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            let data = {

                file: imgs.data ,
                contentType: imgs.mimetype,
                name: 'users/01987/' + newName
            }
            archives.push(data)
        }else{
            imgs.forEach(photo => {
                let newName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                
                let data = {
                    file: photo.data,
                    contentType: photo.mimetype,
                    name: 'users/01987/' + newName
                }
                archives.push(data)
            });
        }   

        var finish = []

        archives.forEach(info => {
            
            uploadFile(info)
            finish.push(
                `${process.env.SPACES_URL}/${info.name}`
            )
        });
    }

    let data = {
        url_img: finish
    }

    return res.status(200).send(data)


  }

  // Create Editor
  const create_editor = (req, res) => {

    if(req.body.data_info == ""){
        return res.json("data_info is required");
    }


    Editor.findAll({
        
            where: {
                id: 9
            }
    }).then(users => res.json(users));

    Editor.create({
        data_info: req.body.data_info,
        data_img: req.body.data_img
    }).then(editor => {
        return res.json(editor);
    }).catch(err => {
        return res.json(err);
    })


  }

module.exports = {
    get_editors,
    upload_img,
    create_editor,
    test_send_file
}