const through = require('through2'),
      PluginError = require('gulp-util').PluginError;
const cheerio = require('cheerio');
const webp = require('gulp-webp');
const utf8 = require('utf8');
//const autozamena = /^\$/;
const svg =  /\.svg/;

module.exports = function myTransformation(options) {
  if(!options) {
    options = {};
  }

  return through.obj(function (file, enc, cb) {
//return through({ objectMode: true, encoding: 'utf8' },(file, enc, cb) => {
    if (file.isNull()) {
      // return as is
      cb(null, file);

    } else if (file.isBuffer()) {
      try {
        let content =  file.contents.toString();

        const $ = cheerio.load(content, { decodeEntities: false });
        $('img').each(function(){
        let src = $(this).attr('src');
        let nocreate = $(this).attr('data-nocreate');
          if (nocreate !='nocreate' && src){
            let imgclass = $(this).attr('class');
            let alt = $(this).attr('alt');
            let title = $(this).attr('title');
            let srcArr = src.split('.');
            let filetype = srcArr.pop();
            if (filetype!='gif') {
          //    srcArr.pop();
              srcArr = srcArr.join('.');
            //  srcArr = srcArr.replace(' ', '');
            //  srcArr = srcArr.replace('-', '');
            //  srcArr = srcArr.replace('_', '');
              srcArr = encodeURI (srcArr);
              let srcWebp = srcArr + '.webp'
              let checkTitle='';
              let checkAlt = '';
              let checkClass='';
              if (!svg.test(src)) {
                if(alt){checkAlt = "alt='"+alt+"'"};
                if(imgclass){checkClass = "class='"+imgclass+"'"};
                if(title) {checkTitle = "title='"+title+"'"};
                $(this).replaceWith("<picture><source srcset='"+srcWebp+"' type='image/webp'><img  "+checkClass+" "+checkTitle+" "+checkAlt+" loading='lazy' src='"+src+"'></picture>");
              }
            }
          }
        })
      //  file.contents = String.fromCharCode(...file.contents);

        file.contents = Buffer.from($.html(), 'utf-8')
  //      file.contents = Buffer.from($.html(), 'utf-8')
        cb(null, file);
      }
      catch (err) {
        throw new PluginError('my-transformation', err);
      }

    } else if (file.isStream()) {
      throw new PluginError('my-transformation', 'Streams are not supported!');
    }
  });
};
