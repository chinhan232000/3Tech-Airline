import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
/**

Type definition for the callback function that is called when a file is being uploaded
@callback DestinationCallback
@param {Error | null} error - An error object or null if no error occurred
@param {string} destination - The path to where the uploaded file should be stored
*/
type DestinationCallback = (error: Error | null, destination: string) => void;

/**

Type definition for the callback function that is called to determine the name of the uploaded file
@callback FileNameCallback
@param {Error | null} error - An error object or null if no error occurred
@param {string} filename - The name that should be given to the uploaded file
*/
type FileNameCallback = (error: Error | null, filename: string) => void;

/**

A multer disk storage object that specifies how files should be stored on disk
@type {multer.diskStorage}
*/
const fileStorage = multer.diskStorage({
  destination: (request: Request, file: Express.Multer.File, cb: DestinationCallback): void => {
    cb(null, './public/uploads');
  },

  filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback): void => {
    console.log('file', file);

    const originalname = file.originalname.split('.');
    const fileName = Date.now() + '.' + originalname[originalname.length - 1];
    cb(null, fileName);
  },
});

/**

A function that specifies which types of files are allowed to be uploaded
@type {Function}
*/
const fileFilter = (request: Request, file: Express.Multer.File, callback: FileFilterCallback): void => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

/**

A multer object that uses the disk storage and file filter objects to process file uploads
@type {multer.Instance}
*/
export const uploadDiskStorage = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
});
