const del = require('del');


deleteFile = async (filename) => {
    // const deletedPaths = await del(['tmp/*.js', '!tmp/unicorn.js']);
    const deletedPaths = await del([`public/loads/${filename}.*`, '!public/loads']);

    console.log('Deleted files :\n', deletedPaths.join('\n'));
}

module.exports = deleteFile;