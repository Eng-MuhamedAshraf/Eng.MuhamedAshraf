/* Settings you may need to change.

   IMAGE_EXTENSIONS  picture file types the page looks for, in this order (.webp = small copies from tools/shrink-pictures.html)
   PROJECT_ROOTS     where the project pictures are. The page tries these folders in order and uses the first one that works.
   CERT_ROOTS        the same for the certificates.
   PHOTO_FILES       your personal photo (first one found is used).
   All paths are relative to index.html. "../" means "one folder up". */
var IMAGE_EXTENSIONS = ['.webp', '.png', '.jpg'];
var PROJECT_ROOTS = ['Projects PNGs/', '../Projects PNGs/', 'assets/projects/Projects PNGs/', 'assets/projects/'];
var CERT_ROOTS = ['Certifications/', '../Certifications/', 'assets/Certifications/Certifications/', 'assets/certifications/'];
var PHOTO_FILES = ['Personal image/M.webp', 'Personal image/M.png', 'Personal image/M.jpg', '../Personal image/M.webp', '../Personal image/M.png', 'assets/img/photo.jpg'];
