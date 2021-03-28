import { Router } from 'express';
import { get_editors, upload_img, create_editor, test_send_file } from './editor.controller';

const router = Router();

router.get('/',  get_editors);
router.post('/files',  upload_img);
router.post('/',  create_editor);
router.post('/testfile',  test_send_file);

export default router;


