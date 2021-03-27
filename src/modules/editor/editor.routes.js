import { Router } from 'express';
import { get_editors, upload_img, create_editor } from './editor.controller';

const router = Router();

router.get('/',  get_editors);
router.post('/files',  upload_img);
router.post('/',  create_editor);

export default router;
